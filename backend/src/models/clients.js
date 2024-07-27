
const ClientsModel = (sequelize, DataTypes) => {
  const Client = sequelize.define('Client', {
    fullName: DataTypes.STRING,
    address: DataTypes.STRING,
    contact: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {
    timestamps: false, 
    underscored: true, 
    tableName: 'clients', 
  });

  Client.associate = (models) => {
    Client.hasMany(models.Comment, { foreignKey: 'clientId', as: 'comments' });
  };

  return Client;
};

module.exports = ClientsModel;
