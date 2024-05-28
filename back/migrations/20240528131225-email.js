'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn("User", "email", {
      type: Sequelize.STRING,
      allowNull: false,
      unique: false
    })
    await queryInterface.changeColumn("User", "phone", {
      type: Sequelize.STRING,
      allowNull: false,
      unique: false
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn("User", "phone", {
      type: Sequelize.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: "شماره تلفن قبلا در سیستم ثبت شده است"
      },
      validate: {
        is: {
          args: /^(?:[0-9] ?){9,10}[0-9]$/,
          msg: "لطفا شماره تلفن خود را صحیح وارد کنید",
        },
      },
    });
    await queryInterface.changeColumn("User", "email", {
      type: Sequelize.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: "ایمیل قبلا در سیستم ثبت شده است"
      },
    });
  }
};
