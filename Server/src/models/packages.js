import { Model } from 'sequelize';
export default (sequelize, DataTypes) => {
  class packages extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  packages.init({
    propertyCode: DataTypes.STRING,
    description: DataTypes.STRING,
    supplierDescription: DataTypes.STRING,
    foodCode: DataTypes.INTEGER,
    roomType: DataTypes.STRING,
    roomView: DataTypes.STRING,
    beds: DataTypes.STRING,
    nonRefundable: DataTypes.STRING,
    rateType: DataTypes.STRING,
    pricingVer: DataTypes.STRING,
    initialForex: DataTypes.STRING,
    displayRate: DataTypes.STRING,
    adjustedDisplayRate: DataTypes.STRING,
    rakutenPoint: DataTypes.INTEGER,
    payAtHotel: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'packages',
  });
  return packages;
};