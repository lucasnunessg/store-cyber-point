const config = {
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || 'password',
  database: process.env.MYSQL_DATABASE || 'db_store_cyber',
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3307, 
  dialect: 'mysql',
};

module.exports = {
  development: config,
  test: config,
  production: config,
};
