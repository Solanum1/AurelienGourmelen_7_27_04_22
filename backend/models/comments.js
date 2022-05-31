"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Comments extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            models.Comments.belongsTo(models.Message);
            models.Comments.belongsTo(models.User);
        }
    }
    Comments.init(
        {
            UserId: DataTypes.INTEGER,
            MessageId: DataTypes.INTEGER,
            content: DataTypes.TEXT,
        },
        {
            sequelize,
            modelName: "Comments",
        }
    );
    return Comments;
};
