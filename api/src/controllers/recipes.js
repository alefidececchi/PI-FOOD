require('dotenv').config();
const { json } = require('body-parser');
const { request, response } = require('express');
const axios = require('axios').default
const { Op, Sequelize } = require('sequelize')

const { API_KEY } = process.env
const { searchRAllecipesDB } = require('./recipesDB')
const { allRecipesAPI, recipesAPI } = require('./recipesAPI')
const { Recipe, Type } = require('../db.js')


const getRecipes = async (req = request, res = response) => {
    let name = req.query.name
    let searchInDb = req.query.searchInDb
    try {
        if (name) {
            //SEARCH AT DB
            let searchName = await Recipe.findAll({
                attributes: ['id', 'title', 'image'],
                where: {
                    title: {
                        [Op.substring]: `${name}`
                    }
                },
                include: Type
            })
            //==============================
            if (searchName.length !== 0) {
                searchName = searchName
                    .map(({ id, image, title, types }) => ({
                        id, title, image, dietTypes: types
                            .map(({ name }) => name)
                    }))
            }
            //DO REQUEST
            const { data } = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&titleMatch=${name}&offset=0&number=2`)
            let promises = []
            data.results.forEach(({ id, image, title }) => {
                searchName.push(({ id, image, title }))
                promises.push(axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`))
            })
            await Promise.all(promises)
                .then(resp => resp
                    .forEach(({ data }, i) => {
                        searchName[searchName.length - promises.length + i] = {
                            ...searchName[searchName.length - promises.length + i],
                            dietTypes: data.diets
                        }
                    }))
            if (searchName.length !== 0) {
                res.status(200).send(searchName)
            } else {
                res.status(200).send('The recipe doesn\'t exists')
            }
        } else {
            searchInDb = searchInDb ? JSON.parse(searchInDb) : undefined
            if (Boolean(searchInDb) === searchInDb && searchInDb) {
                const recipesToReturn = await searchRAllecipesDB()
                res.status(200).send(recipesToReturn)
            } else {
                await recipesAPI()
                res.status(200).send(allRecipesAPI)
            }
        }
    } catch (error) {
        throw new Error(error.message)
        // res.status(404).send(`Sorry, we couldn't find any recipe.`)
    }
}

const postRecipes = async (req = request, res = response) => {
    const { healthScore, image, summary, steps, title, types } = req.body
    try {
        const recipe = await Recipe.create({ healthScore, image, summary, steps, title })
        let typesFounded = await Type.findAll({
            where: {
                name: {
                    [Op.or]: types
                }
            }
        })
        recipe.addTypes(typesFounded)
        res.status(200).send(`Great! You've created a new recipe.`)
    } catch (error) {
        // throw new Error(error.message)
        res.status(404).send(`Something went wrong =(`)
    }
}



module.exports = {
    allRecipesAPI,
    getRecipes,
    postRecipes,
}