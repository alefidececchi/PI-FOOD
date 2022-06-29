const { Type } = require('../db.js')
const dietTypes = require('../../types.json')

let typesDbCreated = false;
const diets = async (req = request, res = response) => {

    try {
        if (!typesDbCreated) {
            typesDbCreated = true;
            await Type.bulkCreate(dietTypes.map(t => ({ name: t })))
        }
        const dietTypesDb = await Type.findAll({
            attributes: ['name']
        })
        res.status(200).send(dietTypesDb.map(({name}) => name));
    } catch (error) {
        throw new Error(error.message)
    }
}

module.exports = {
    diets
}