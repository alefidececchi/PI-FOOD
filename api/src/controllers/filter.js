


const filterRecipes = (allRecipes, filter) => {
    filter = filter.split('_').join(' ')
    return allRecipes.filter(r => r.dietTypes.includes(filter))
}

module.exports = {
    filterRecipes
}