const { Sequelize, QueryTypes } = require("sequelize");
//CONEXION
const sequelize = new Sequelize("dblocal", "root", "", {
  host: "localhost",
  port: 3306,
  dialect: "mariadb",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  logging: false,
});

const getConnection = () => {
  return sequelize;
  /* .then(() => {
      console.log("Conexion exitosa");
      return sequelize;
    })
    .catch((err) => {
      console.log("Error", err);
    }); */
};

module.exports = {
  getConnection,
};
