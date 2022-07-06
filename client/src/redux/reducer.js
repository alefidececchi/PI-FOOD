import {
    CREATE_RECIPE,
    // FILTER_RECIPES_BY_DIET,
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
    message: '',
    orderType: 'default',
    recipeDetails: {},
    recipes: [],
    recipesPerPage: 9
    // recipesFiltered: [],
    // recipesApi: [],
    // recipesByName: [],
    // recipesDb: [],
}

function reducer(state = initialState, action) {

    switch (action.type) {
        case CREATE_RECIPE:
            return {
                ...state,
                message: action.payload,
            }
        // case FILTER_RECIPES_BY_DIET:
        //     return {
        //         ...state,
        //         recipes: state.recipes.filter(r => r.dietTypes.includes(payload))
        //     }
        case FILTER_SELECTED:
            return {
                ...state,
                filterType: action.payload
            }
        case GET_DIETS:
            let diets = action.payload.sort((a, b) => a.title > b.title ? 1 : a.title < b.title ? -1 : 0)
            return {
                ...state,
                diets: diets
            }
        case GET_RECIPES_ALL:
            if (action.filter !== 'none'
                || action.filter === undefined) {
                return {
                    ...state,
                    recipes: action.payload.filter(r => r.dietTypes.includes(action.filter))
                }
            } else {
                return {
                    ...state,
                    recipes: action.payload
                }
            }
        case GET_RECIPES_BY_NAME:
            return {
                ...state,
                recipes: action.payload
            }
        case GET_RECIPE_DETAILS:
            return {
                ...state,
                recipeDetails: action.payload
            }
        case MESSAGE:
            return {
                ...state,
                message: action.payload
            }
        case ORDER:
            //ordenamos
            let newRecipes = state.recipes.slice()
            if (action.payload === "AZ") {
                newRecipes = newRecipes.sort((a, b) => a.title > b.title ? 1 : a.title < b.title ? -1 : 0)
            } else if (action.payload === "ZA") {
                newRecipes = newRecipes.sort((a, b) => b.title > a.title ? 1 : b.title < a.title ? -1 : 0)
            } else if (action.payload === "+HS") {
                newRecipes = newRecipes.sort((a, b) => b.healthScore > a.healthScore ? 1 : b.healthScore < a.healthScore ? -1 : 0)
            } else if (action.payload === "-HS") {
                newRecipes = newRecipes.sort((a, b) => a.healthScore > b.healthScore ? 1 : a.healthScore < b.healthScore ? -1 : 0)
            }
            return {
                ...state,
                recipes: newRecipes
            }
        case RESET_RECIPES:
            return {
                ...state,
                recipes: action.payload
            }
        case RESET_RECIPES_DETAILS:
            return {
                ...state,
                recipeDetails: action.payload
            }
        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.payload
            }
        case SET_ORDER:
            return {
                ...state,
                orderType: action.payload
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