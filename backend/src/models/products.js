
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

  Product.associate = (models) => {
    Product.hasMany(models.Comment, { foreignKey: "productId", as: "comments" });
  }
  
  return Product;
}
