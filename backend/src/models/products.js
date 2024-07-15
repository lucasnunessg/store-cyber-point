
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product',{
    title: DataTypes.STRING,
    price: DataTypes.NUMBER,
    description: DataTypes.STRING,
    category: DataTypes.STRING,
    image: DataTypes.STRING
  }, {
    timestamps: false,
    tableName: 'products'
  } )

  return Product;
}