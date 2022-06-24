const axios = require('axios').default

const { API_KEY } = process.env

let allRecipesAPI = []

const recipesAPI = async () => {
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
    axios.get(`http://localhost:3001/diets`)
}

module.exports = {
    allRecipesAPI,
    recipesAPI,
}