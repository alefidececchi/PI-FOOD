import {
    CREATE_RECIPE,
    GET_DIETS,
    GET_RECIPES_ALL,
    GET_RECIPES_API,
    GET_RECIPES_BY_NAME,
    GET_RECIPES_DB,
    GET_RECIPE_DETAILS,
} from './actions.js'


const initialState = {
    diets: [],
    createMessage: '',
    recipes: [],
    // recipesApi: [],
    // recipesByName: [],
    // recipesDb: [],
    recipeDetails: {}
}

function reducer(state = initialState, { type, payload }) {

    switch (type) {
        case CREATE_RECIPE:
            return {
                ...state,
                createMessage: payload,
            }
        case GET_DIETS:
            return {
                ...state,
                diets: payload
            }
        case GET_RECIPES_ALL:
            return {
                ...state,
                recipes: payload,
            }
        case GET_RECIPES_API:
            return {
                ...state,
                recipes: payload
            }
        case GET_RECIPES_BY_NAME:
            return {
                ...state,
                recipes: payload
            }
        case GET_RECIPES_DB:
            return {
                ...state,
                recipes: payload
            }
        case GET_RECIPE_DETAILS:
            return {
                ...state,
                recipeDetails: payload
            }
        default: return state;
    }

}

export default reducer;

