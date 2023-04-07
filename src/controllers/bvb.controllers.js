const { consultaBvb, leaderboardBL } = require("../scrap/scrapbvb");

const getBvb = async (req, res) => {
  try {
    const resultado = await consultaBvb();
    console.log(resultado);

    res.json({
      total: resultado.length,
      data: resultado,
    });
    res.status(200);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

const getLeaderboard = async (req, res) => {
  try {
    const resultado = await leaderboardBL();
    console.log(resultado);

    res.json(resultado);
    res.status(200);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

module.exports = {
  getBvb,
  getLeaderboard,
};
