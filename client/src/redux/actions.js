import axios from 'axios'

export const CREATE_RECIPE = "CREATE_RECIPE";
export const GET_DIETS = "GET_DIETS";
export const GET_RECIPES_ALL = "GET_RECIPES_ALL";
export const GET_RECIPES_API = "GET_RECIPES_API";
export const GET_RECIPES_BY_NAME = "GET_RECIPES_BY_NAME";
export const GET_RECIPES_DB = "GET_RECIPES_DB";
export const GET_RECIPE_DETAILS = "GET_RECIPE_DETAILS"

export const createRecipe = (data) => {
    return (dispatch) => {
        axios.post('http://localhost:3001/recipes', data)
            .then(({ data }) => dispatch({ type: CREATE_RECIPE, payload: data }))
            .catch(e => e.message)
    }
}

export const getDiets = () => {
    return (dispatch) => {
        axios.get('http://localhost:3001/diets')
            .then(({ data }) => dispatch({ type: GET_DIETS, payload: data }))
            .catch(e => e.message)
    }
}

export const getRecipesAll = () => {
    return (dispatch) => {
        axios.get(`http://localhost:3001/recipes?searchAll=true`)
            .then(({ data }) => dispatch({ type: GET_RECIPES_ALL, payload: data }))
            .catch(e => e.message)
    }
}

export const getRecipesApi = () => {
    return (dispatch) => {
        axios.get(`http://localhost:3001/recipes`)
            .then(({ data }) => dispatch({ type: GET_RECIPES_API, payload: data }))
            .catch(e => e.message)
    }
}

export const getRecipesByName = (name) => {
    return (dispatch) => {
        axios.get(`http://localhost:3001/recipes?name=${name}`)
            .then(({ data }) => dispatch({ type: GET_RECIPES_BY_NAME, payload: data }))
            .catch(e => e.message)
    }
}

export const getRecipesDb = () => {
    return (dispatch) => {
        axios.get(`http://localhost:3001/recipes?searchInDb=true`)
            .then(({ data }) => dispatch({ type: GET_RECIPES_DB, payload: data }))
            .catch(e => e.message)
    }
}

export const getRecipeDetails = (id) => {
    return (dispatch) => {
        axios.get(`http://localhost:3001/recipes/${id}`)
            .then(({ data }) => dispatch({ type: GET_RECIPE_DETAILS, payload: data }))
            .catch(e => e.message)
    }
}

