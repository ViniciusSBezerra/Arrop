const Sequelize = require("sequelize");

const sequelize = new Sequelize("arrop", "root", "123456", {
    host: "localhost",
    dialect: "mysql"
});

sequelize.authenticate();

module.exports = sequelize;