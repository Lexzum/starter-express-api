const { getConnection } = require("../database/database");
const { Sequelize, QueryTypes } = require("sequelize");

const getUsuarios = async (req, res) => {
  try {
    const con = await getConnection();
    const result = await con.query("SELECT * FROM `users`", {
      type: QueryTypes.SELECT,
    });
    res.json(result);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

module.exports = getUsuarios;
