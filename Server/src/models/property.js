import { Model } from 'sequelize';
export default (sequelize, DataTypes) => {
  class property extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  property.init({
    appCode: DataTypes.STRING,
    locale: DataTypes.STRING,
    propertyCode: DataTypes.STRING,
    name: DataTypes.STRING,
    starRating: DataTypes.INTEGER,
    location: DataTypes.STRING,
    trustYou: DataTypes.STRING,
    checkInTime: DataTypes.STRING,
    checkOutTime: DataTypes.STRING,
    contacts: DataTypes.STRING,
    airportCode: DataTypes.STRING,
    heroImage: DataTypes.STRING,
    categoryId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'property',
  });
  return property;
};