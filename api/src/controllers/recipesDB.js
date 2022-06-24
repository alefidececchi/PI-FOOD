const { Recipe, Type } = require('../db.js')

const searchRAllecipesDB = async () => {
    const recipesDB = await Recipe.findAll({
        include: Type,
        raw: true
    })
    if (recipesDB.length === 0) return (`You haven't created a recipe yet.`)
    let recipesToReturn = []
    let recipe = {}
    let types = []
    let lastTitleRecipe = recipesDB[0].title
    recipesDB.forEach((r, ind) => {
        const { id, image, title, } = r;
        if (title !== lastTitleRecipe) {
            recipesToReturn.push(recipe)
            recipe = {};
            types = []
        }
        types.push(r["types.name"]);
        recipe = { id, image, title, dietTypes: types }
        lastTitleRecipe = title
        if (ind === recipesDB.length - 1) recipesToReturn.push(recipe)
    })
    return recipesToReturn
}

module.exports = {
    searchRAllecipesDB
}