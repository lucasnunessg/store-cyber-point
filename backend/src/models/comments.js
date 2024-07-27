module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {

    comment: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    productId: {
      type: DataTypes.INTEGER,
      foreignKey: true,
    },
    clientId: {
      type: DataTypes.INTEGER,
    }
  }, 
  {
    timestamps: false, 
    underscored: true, 
    tableName: 'comments', 
  });

  Comment.associate = (models) => {
    Comment.belongsTo(models.Product, {
      foreignKey: 'productId',
      as: 'product'  
    });
    Comment.belongsTo(models.Client, {
      foreignKey: 'clientId',
    });
  };

  return Comment;
};
