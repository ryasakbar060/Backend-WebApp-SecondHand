'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class transactions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      transactions.belongsTo(models.products, {
        foreignKey: 'product_id'
      });

      transactions.belongsTo(models.users, {
        foreignKey: 'seller_id'
      });

      transactions.belongsTo(models.users, {
        foreignKey: 'user_id'
      });
    }
  }
  transactions.init({
    seller_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    product_id: DataTypes.INTEGER,
    bargain_price: DataTypes.INTEGER,
    isAccepted: DataTypes.BOOLEAN,
    isRejected: DataTypes.BOOLEAN,
    isOpened: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'transactions',
  });
  return transactions;
};