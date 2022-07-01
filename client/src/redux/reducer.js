import {
    CREATE_RECIPE,
    FILTER_SELECTED,
    GET_DIETS,
    GET_RECIPES_ALL,
    // GET_RECIPES_API,
    GET_RECIPES_BY_NAME,
    // GET_RECIPES_DB,
    GET_RECIPE_DETAILS,
    MESSAGE,
    ORDER,
    RESET_RECIPES,
    RESET_RECIPES_DETAILS,
    SET_CURRENT_PAGE,
    SET_ORDER
} from './actions.js'


const initialState = {
    currentPage: 1,
    diets: [],
    filterType: 'none',
    indexFirstRecipe: 0,
    indexLastRecipe: 8,
    message: '',
    orderType: 'default',
    recipeDetails: {},
    recipes: [],
    // recipesApi: [],
    // recipesByName: [],
    // recipesDb: [],
}

function reducer(state = initialState, { type, payload }) {

    switch (type) {
        case CREATE_RECIPE:
            return {
                ...state,
                message: payload,
            }
        case FILTER_SELECTED:
            return {
                ...state,
                filterType: payload
            }
        case GET_DIETS:
            let diets = payload.sort((a, b) => a.title > b.title ? 1 : a.title < b.title ? -1 : 0)
            return {
                ...state,
                diets: diets
            }
        case GET_RECIPES_ALL:
            return {
                ...state,
                recipes: payload
            }
        case GET_RECIPES_BY_NAME:
            return {
                ...state,
                recipes: payload
            }
        case GET_RECIPE_DETAILS:
            return {
                ...state,
                recipeDetails: payload
            }
        case MESSAGE:
            return {
                ...state,
                message: payload
            }
        case ORDER:
            //ordenamos
            let newRecipes = state.recipes.slice()
            if (payload === "AZ") {
                newRecipes = newRecipes.sort((a, b) => a.title > b.title ? 1 : a.title < b.title ? -1 : 0)
            } else if (payload === "ZA") {
                newRecipes = newRecipes.sort((a, b) => b.title > a.title ? 1 : b.title < a.title ? -1 : 0)
            } else if (payload === "+HS") {
                newRecipes = newRecipes.sort((a, b) => b.healthScore > a.healthScore ? 1 : b.healthScore < a.healthScore ? -1 : 0)
            } else if (payload === "-HS") {
                newRecipes = newRecipes.sort((a, b) => a.healthScore > b.healthScore ? 1 : a.healthScore < b.healthScore ? -1 : 0)
            }
            return {
                ...state,
                recipes: newRecipes
            }
        case RESET_RECIPES:
            return {
                ...state,
                recipes: payload
            }
        case RESET_RECIPES_DETAILS:
            return {
                ...state,
                recipeDetails: payload
            }
        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: payload
            }
        case SET_ORDER:
            return {
                ...state,
                orderType: payload
            }
        default: return state;
    }
}

export default reducer;


    // case GET_RECIPES_API:
    //     return {
        //         ...state,
        //         recipes: payload
        //     }
        // case GET_RECIPES_DB:
        //     return {
            //         ...state,
            //         recipes: payload
            //     }