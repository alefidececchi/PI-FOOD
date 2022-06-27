require('dotenv').config();
const { request, response } = require('express');

const { createRecipeDB, searchAllRecipesDB, searchRecipesByNameDB } = require('./recipesDB')
const { allRecipesAPI, searchAllRecipesAPI, searchRecipesByNameAPI } = require('./recipesAPI')



const getRecipes = async (req = request, res = response) => {

    const name = req.query.name
    let searchInDb = req.query.searchInDb
    let searchAll = req.query.searchAll
    try {
        if (name) {
            //SEARCH AT DB
            let search = await searchRecipesByNameDB(name)
            //DO REQUEST
            search = await searchRecipesByNameAPI(name, search)
            search.length !== 0
                ? res.status(200).send(search)
                : res.status(200).send('The recipe doesn\'t exists')
        } else {
            searchInDb = searchInDb ? JSON.parse(searchInDb) : undefined
            searchAll = searchAll ? JSON.parse(searchAll) : undefined
            if (Boolean(searchInDb) === searchInDb && searchInDb) {
                res.status(200).send(await searchAllRecipesDB())
            } else if (Boolean(searchAll) === searchAll && searchAll) {
                const recipesDB = await searchAllRecipesDB()
                await searchAllRecipesAPI()
                const allRecipes = typeof recipesDB === 'string' ? allRecipesAPI : recipesDB.concat(...allRecipesAPI)
                res.status(200).send(allRecipes)
            } else {
                await searchAllRecipesAPI()
                res.status(200).send(allRecipesAPI)
            }
        }
    } catch (error) {
        res.status(404).send(`Sorry, we couldn't find any recipe.`)
    }
}

const postRecipes = async (req = request, res = response) => {

    const { healthScore, image, summary, steps, title, types } = req.body
    try {
        await createRecipeDB(image, healthScore, steps, summary, title, types)
        res.status(200).send(`Great! You've created a new recipe.`)
    } catch (error) {
        res.status(404).send(`Something went wrong =(`)
    }
}



module.exports = {
    getRecipes,
    postRecipes,
}