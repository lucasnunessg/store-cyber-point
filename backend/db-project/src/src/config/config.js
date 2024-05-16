const config = {
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT, // Alterado para port
  dialect: 'mysql',
};

module.exports = {
  development: config,
  test: config,
  production: config,
};