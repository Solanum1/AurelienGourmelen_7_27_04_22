"use strict";
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("Messages", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            UserId: {
                allowNull: false,
                type: Sequelize.INTEGER,
                references: {
                    model: "Users",
                    key: "id",
                },
            },
            title: {
                allowNull: true,
                type: Sequelize.STRING,
            },
            attachment: {
                allowNull: true,
                type: Sequelize.STRING,
            },
            content: {
                allowNull: true,
                type: Sequelize.STRING,
            },
            likes: {
                allowNull: true,
                type: Sequelize.INTEGER,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("Messages");
    },
};
