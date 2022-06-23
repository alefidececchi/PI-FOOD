require('dotenv').config();
const { json } = require('body-parser');
const { request, response } = require('express');
const axios = require('axios').default
const { Op, Sequelize } = require('sequelize')

const { API_KEY } = process.env
const { Recipe, Type } = require('../db.js')

let allRecipesAPI = []

const getRecipes = async (req = request, res = response) => {
    let name = req.query.name
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
            const { data } = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&offset=0&number=2`)
            let promises = []
            data.results.forEach(({ id, image, title }) => {
                allRecipesAPI.push(({ id, image, title }))
                promises.push(axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`))
            })
            await Promise.all(promises)
                .then(resp => resp
                    .forEach(({ data }, i) => {
                        allRecipesAPI[i] = {
                            ...allRecipesAPI[i],
                            dietTypes: data.diets,
                            dishTypes: data.dishTypes,
                            healthScore: data.healthScore,
                            summary: data.summary,
                            steps: data.analyzedInstructions.length !== 0
                                ? data.analyzedInstructions[0].steps.map(({ number, step }) => ({ number, step }))
                                : []
                        }
                    }))
            res.status(200).send(allRecipesAPI)
        }
    } catch (error) {
        throw new Error(error.message)
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
        res.status(200).send(recipe)
    } catch (error) {
        throw new Error(error.message)
    }
}



module.exports = {
    allRecipesAPI,
    getRecipes,
    postRecipes,
}