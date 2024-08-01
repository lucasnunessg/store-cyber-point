module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    comment: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
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
      as: 'client'
    });
  };

  return Comment;
};
