export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('packages', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      propertyCode: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      supplierDescription: {
        type: Sequelize.STRING
      },
      foodCode: {
        type: Sequelize.INTEGER
      },
      roomType: {
        type: Sequelize.STRING
      },
      roomView: {
        type: Sequelize.STRING
      },
      beds: {
        type: Sequelize.STRING
      },
      nonRefundable: {
        type: Sequelize.STRING
      },
      rateType: {
        type: Sequelize.STRING
      },
      pricingVer: {
        type: Sequelize.STRING
      },
      initialForex: {
        type: Sequelize.STRING
      },
      displayRate: {
        type: Sequelize.STRING
      },
      adjustedDisplayRate: {
        type: Sequelize.STRING
      },
      rakutenPoint: {
        type: Sequelize.INTEGER
      },
      payAtHotel: {
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
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('packages');
  }
};