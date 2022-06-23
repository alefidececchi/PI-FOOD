const { request, response } = require('express')
const axios = require('axios').default

const { allRecipesAPI } = require('./recipes.js')
const { Recipe, Type } = require('../db.js')
const { API_KEY } = process.env


const getRecipesDetails = async (req = request, res = response) => {

    const { id } = req.params
    try {
        if (Number(id) == id) {
            const rApiSaved = allRecipesAPI.find(r => r.id === id)
            if (rApiSaved) {
                res.status(200).send(rApi)
            } else {
                const rApi = await axios(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`)
                    .then(({ data }) => ({
                        id,
                        title: data.title,
                        image: data.image,
                        dietTypes: data.diets,
                        dishTypes: data.dishTypes,
                        healthScore: data.healthScore,
                        summary: data.summary,
                        steps: data.analyzedInstructions.length !== 0
                            ? data.analyzedInstructions[0].steps.map(({ number, step }) => ({ number, step }))
                            : []
                    }))
                res.status(200).send(rApi)
            }
        } else {
            let recipe = await Recipe.findAll({
                where: {
                    id: id
                },
                raw: true,
                include: Type,
            })
            const { image, title, summary, healthScore, steps } = recipe[0]
            const types = recipe.map(r => r["types.name"])
            const recipeToReturn = { dietTypes: types, id, image, healthScore, steps, summary, title }
            res.status(200).send(recipeToReturn)
            //peticion a API
        }
    } catch (error) {
        throw new Error(error.message)
    }
}

module.exports = {
    getRecipesDetails
}