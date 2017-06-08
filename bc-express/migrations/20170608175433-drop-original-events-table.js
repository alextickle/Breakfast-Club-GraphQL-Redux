'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('Bevents');
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.createTable('Bevents', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      date: {
        type: Sequelize.DATE
      },
      placeId: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  }
};
