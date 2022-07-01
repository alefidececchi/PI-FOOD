import axios from 'axios'

//============RECIPES============//
export const CREATE_RECIPE = "CREATE_RECIPE";
export const FILTER_SELECTED = "FILTER_SELECTED";
export const GET_DIETS = "GET_DIETS";
export const GET_RECIPES_ALL = "GET_RECIPES_ALL";
export const GET_RECIPES_API = "GET_RECIPES_API";
export const GET_RECIPES_BY_NAME = "GET_RECIPES_BY_NAME";
export const GET_RECIPES_DB = "GET_RECIPES_DB";
export const GET_RECIPE_DETAILS = "GET_RECIPE_DETAILS"
export const MESSAGE = "MESSAGE"
export const RESET_RECIPES = "RESET_RECIPES"
export const RESET_RECIPES_DETAILS = "RESET_RECIPES_DETAILS";
export const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
export const SET_ORDER = "SET_ORDER";
//============ORDER============//
export const ORDER = "ORDER";


export const createRecipe = (data) => {
    return (dispatch) => {
        axios.post('http://localhost:3001/recipes', data)
            .then(({ data }) => dispatch({ type: CREATE_RECIPE, payload: data }))
            .catch(e => e.message)
    }
}

export const filterSelected = (filter) => {
    return ({type: FILTER_SELECTED, payload: filter})
}

export const getDiets = () => {
    return (dispatch) => {
        axios.get('http://localhost:3001/diets')
            .then(({ data }) => dispatch({ type: GET_DIETS, payload: data }))
            .catch(e => e.message)
    }
}

export const getRecipesAll = (filter) => {
    return async (dispatch) => {
        (filter
            ? axios.get(`http://localhost:3001/recipes?filter=${filter}`)
            : axios.get(`http://localhost:3001/recipes`))
            .then(({ data }) => dispatch({ type: GET_RECIPES_ALL, payload: data }))
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


export const getRecipeDetails = (id) => {
    return (dispatch) => {
        axios.get(`http://localhost:3001/recipes/${id}`)
        .then(({ data }) => dispatch({ type: GET_RECIPE_DETAILS, payload: data }))
        .catch(e => e.message)
    }
}

export const message = () => {
    return ({ type: MESSAGE, payload: '' })
}

export const order = (order) => {
    return ({ type: ORDER, payload: order })
}

export const resetRecipes = () => {
    return ({type: RESET_RECIPES, payload: ''})
}

export const resetRecipesDetails = () => {
    return ({type: RESET_RECIPES_DETAILS, payload: {}})
}

export const setCurrentPage = (page) => {
    return ({type: SET_CURRENT_PAGE, payload: page})
}

export const setOrder = (setOrder) => {
    return ({type: SET_ORDER, payload:setOrder })
}

// export const getRecipesApi = () => {
//     return (dispatch) => {
    //         axios.get(`http://localhost:3001/recipes`)
    //             .then(({ data }) => dispatch({ type: GET_RECIPES_API, payload: data }))
    //             .catch(e => e.message)
    //     }
    // }
    
    // export const getRecipesDb = () => {
        //     return (dispatch) => {
            //         axios.get(`http://localhost:3001/recipes?searchInDb=true`)
            //             .then(({ data }) => {
                //                 if( typeof data === "string") dispatch({ type: MESSAGE, payload: data })
                //                 else dispatch({ type: GET_RECIPES_DB, payload: data })
                //             })
                //             .catch(e => e.message)
                //     }
                // }
                
                
                
                // export const filterRecipeByDiet = (data) => {
                //     return ({ type: FILTER_RECIPE_BY_DIET, payload: data })
                // }
                
                // export const filterSelectedByDiet = (dietSelected) => {
                //     return ({ type: FILTER_SELECTED_BY_DIET, payload: dietSelected })
                // }