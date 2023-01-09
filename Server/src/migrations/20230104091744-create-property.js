export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('properties', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      appCode: {
        type: Sequelize.STRING
      },
      locale: {
        type: Sequelize.STRING
      },
      propertyCode: {
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING
      },
      starRating: {
        type: Sequelize.INTEGER
      },
      location: {
        type: Sequelize.STRING
      },
      trustYou: {
        type: Sequelize.STRING
      },
      checkInTime: {
        type: Sequelize.STRING
      },
      checkOutTime: {
        type: Sequelize.STRING
      },
      contacts: {
        type: Sequelize.STRING
      },
      airportCode: {
        type: Sequelize.STRING
      },
      heroImage: {
        type: Sequelize.STRING
      },
      categoryId: {
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
    await queryInterface.dropTable('properties');
  }
};