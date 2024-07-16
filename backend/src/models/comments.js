const CommentModel = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'product_id',
    },
    clientId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'client_id',
    }
  }, 
  {
    timestamps: true, 
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

module.exports = CommentModel;
