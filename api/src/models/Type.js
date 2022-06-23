const { DataTypes, INTEGER } = require("sequelize");


module.exports = (sequelize) => {

    sequelize.define('type', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.ENUM(["gluten free", "dairyFree", "ketogenic", "vegetarian", "lacto-vegetarian", "ovo-vegetarian",
                "vegan", "pescetarian", "paleo", "primal", "lowFodmap", "whole30"]),
            allowNull: false,
        }
    }, {
        timestamps: false
    })
}

