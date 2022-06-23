const { Type } = require('../db.js')
const types = require('../../types.json')

let typesDbCreated = false;
const diets = async (req = request, res = response) => {

    try {
        if (!typesDbCreated) {
            typesDbCreated = true;
            await Type.bulkCreate(types.map(t => ({ name: t })))
        }
        const typesDb = await Type.findAll({
            attributes: ['name']
        })
        res.status(200).send(typesDb.map(({name}) => name));
    } catch (error) {
        throw new Error(error.message)
    }
}

module.exports = {
    diets
}