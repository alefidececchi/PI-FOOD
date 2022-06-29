const { DataTypes, INTEGER } = require("sequelize");


module.exports = (sequelize) => {

    sequelize.define('type', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.ENUM([
                "dairy free",
                "gluten free",
                "ketogenic",
                "lacto ovo vegetarian",
                "lowFodmap",
                "ovo vegetarian",
                "paleolithic",
                "pescetarian",
                "primal",
                "vegan",
                "vegetarian",
                "whole 30"
            ]),
            allowNull: false,
        }
    }, {
        timestamps: false
    })
}

