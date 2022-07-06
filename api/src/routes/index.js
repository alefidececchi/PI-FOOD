const { Router } = require('express');

const { getRecipes, postRecipes } = require('../controllers/recipes.js')
const { getRecipesDetails } = require('../controllers/recipesDetails.js')
const { diets } = require('../controllers/diets.js')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get('/recipes', getRecipes);
router.post('/recipes', postRecipes)
router.get('/recipes/:id', getRecipesDetails)
router.get('/diets', diets)


module.exports = router;
