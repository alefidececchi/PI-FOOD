require('dotenv').config();
const { request, response } = require('express');

const { createRecipeDB, searchAllRecipesDB, searchRecipesByNameDB } = require('./recipesDB')
const { allRecipesAPI, searchAllRecipesAPI, searchRecipesByNameAPI } = require('./recipesAPI')

const {filterRecipes} = require('./filter.js')



const getRecipes = async (req = request, res = response) => {

    const name = req.query.name
    // let searchAll = req.query.searchAll
    // let searchInDb = req.query.searchInDb
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
            let filter = req.query.filter
            // searchInDb = searchInDb ? JSON.parse(searchInDb) : undefined
            // searchAll = searchAll ? JSON.parse(searchAll) : undefined
            // if (Boolean(searchInDb) === searchInDb && searchInDb) {
            //     res.status(200).send(await searchAllRecipesDB())
            // } else if (Boolean(searchAll) === searchAll && searchAll) {
            await searchAllRecipesAPI()
            const recipesDB = await searchAllRecipesDB()
            let allRecipes = typeof recipesDB === 'string' ? allRecipesAPI : recipesDB.concat(...allRecipesAPI)
            if(filter) {
                allRecipes = filterRecipes(allRecipes, filter)
            }
            res.status(200).send(allRecipes)
            // } else {
            //     await searchAllRecipesAPI()
            //     res.status(200).send(allRecipesAPI)
        }
    } catch (error) {
        throw new Error(error.message)
    // res.status(404).send(`Sorry, we couldn't find any recipe.`)
}
}

const postRecipes = async (req = request, res = response) => {

    const { healthScore, image, summary, steps, title, dietTypes } = req.body
    try {
        await createRecipeDB(image, healthScore, steps, summary, title, dietTypes)
        res.status(200).send(`Great! You've created a new recipe.`)
    } catch (error) {
        res.status(404).send(`Something went wrong =(`)
    }
}



module.exports = {
    getRecipes,
    postRecipes,
}