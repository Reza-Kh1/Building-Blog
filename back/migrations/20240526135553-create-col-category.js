'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeIndex("User", ["email"], { unique: true })
    await queryInterface.removeIndex("User", ["phone"], { unique: true })
    // await queryInterface.addColumn("Category", "img", {
    //   type: Sequelize.STRING
    // })
    // await queryInterface.addIndex("Category", ["img"], { unique: false })
    // await queryInterface.createTable('NewModel', {
    //   id: {
    //     allowNull: false,
    //     autoIncrement: true,
    //     primaryKey: true,
    //     type: Sequelize.INTEGER
    //   },
    //   // اضافه کردن فیلدهای جدید
    //   name: {
    //     type: Sequelize.STRING,
    //     allowNull: false
    //   },
    //   // و غیره...
    //   createdAt: {
    //     allowNull: false,
    //     type: Sequelize.DATE
    //   },
    //   updatedAt: {
    //     allowNull: false,
    //     type: Sequelize.DATE
    //   }
    // });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.addIndex("User", ["email"], { unique: true })
    await queryInterface.addIndex("User", ["phone"], { unique: true })
    // await queryInterface.removeColumn("Category", "img")
    // await queryInterface.removeIndex("Category", ["img"])
    // await queryInterface.dropTable('NewModel');
  }
};