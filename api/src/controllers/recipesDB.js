const { Op } = require('sequelize')
const { Recipe, Type } = require('../db.js')

const searchAllRecipesDB = async () => {
    const recipesDB = await Recipe.findAll({
        include: Type,
        raw: true
    })
    if (recipesDB.length === 0) return (`You haven't created a recipe yet.`)
    let recipesToReturn = []
    let recipe = {}
    let types = []
    let lastTitleRecipe = recipesDB[0].title.split(' ').map(t => t[0].toUpperCase() + t.slice(1)).join(' ')
    recipesDB.forEach((r, ind) => {
        let { healthScore, id, image, title } = r;
        title = title.split(' ').map(t => t[0].toUpperCase() + t.slice(1)).join(' ')
        if (title !== lastTitleRecipe) {
            recipesToReturn.push(recipe)
            recipe = {};
            types = []
        }
        types.push(r["types.name"]);
        recipe = { healthScore, id, image, title, dietTypes: types }
        lastTitleRecipe = title
        if (ind === recipesDB.length - 1) recipesToReturn.push(recipe)
    })
    return recipesToReturn
}

const searchRecipesByNameDB = async (name) => {

    let recipeToReturn = await Recipe.findAll({
        attributes: ['id', 'title', 'image'],
        where: {
            title: {
                [Op.substring]: `${name}`
            }
        },
        include: Type
    })
    if (recipeToReturn.length !== 0) {
        recipeToReturn = recipeToReturn
            .map(({ id, image, title, types }) => ({
                id, title, image, dietTypes: types
                    .map(({ name }) => name)
            }))
    }
    return recipeToReturn
}

const createRecipeDB = async (image, healthScore, steps, summary, title, dietTypes) => {
    const recipe = await Recipe.create({ healthScore, image, summary, steps, title })
    let dietTypesFounded = await Type.findAll({
        where: {
            name: {
                [Op.or]: dietTypes
            }
        }
    })
    recipe.addTypes(dietTypesFounded)
    return
}

module.exports = {
    createRecipeDB,
    searchAllRecipesDB,
    searchRecipesByNameDB
}