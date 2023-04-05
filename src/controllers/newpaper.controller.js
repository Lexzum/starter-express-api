//import { getConnection } from "../database/database.js";
//const { getConnection } = require("../database/database");
//const { Sequelize, QueryTypes } = require("sequelize");
//import { Sequelize, QueryTypes } from "sequelize";
const { consulta } = require("../scrap/scrapnews");

async function pTrome() {
  let adeporte = [],
    aespectaculo = [],
    aactualidad = [];
  let tags = ["actualidad", "espectaculos", "deportes"];
  await tags.forEach(async function (element) {
    await request(
      "https://trome.pe/" + element + "/",
      function (error, response, body) {
        //console.log("TAG: ", element);
        let tag = element;
        let $ = cheerio.load(body);
        $(".story-grid__info.flex").each((i, elem) => {
          let objeto = {};
          let enlace = $(elem)
            .find(".story-grid__title.block.overflow-hidden.mt-10")
            .attr("href");
          let titular = $(elem)
              .find(".story-grid__content-title.overflow-hidden")
              .toArray(),
            image = $(elem)
              .find(
                ".lazy.story-grid__img.object-cover.object-center.w-full.h-full"
              )
              .toArray();

          $(image).each((i, elem) => {
            objeto.titular = elem.attribs.alt;
            objeto.img = elem.attribs["data-src"];
          });
          objeto.enlace = $(elem)
            .find(".story-grid__title.block.overflow-hidden.mt-10")
            .attr("href");
          if (tag == "actualidad") {
            aactualidad.push(objeto);
          } else if (tag == "espectaculos") {
            aespectaculo.push(objeto);
          } else if (tag == "deportes") {
            adeporte.push(objeto);
            //return deportes(arreglo)
          }
        });
        if (element == "actualidad") {
          let arr = [];
          aactualidad.forEach((element, index) => {
            let obj = {};
            obj = element;
            obj.id = index + 1;
            arr.push(obj);
          });
          actualidad(arr);
        } else if (element == "espectaculos") {
          let arr = [];
          aespectaculo.forEach((element, index) => {
            let obj = {};
            obj = element;
            obj.id = index + 1;
            arr.push(obj);
          });
          //console.log(arr);
          espectaculos(arr);
        } else if (element == "deportes") {
          let arr = [];
          adeporte.forEach((element, index) => {
            let obj = {};
            obj = element;
            obj.id = index + 1;
            arr.push(obj);
          });
          deportes(arr);
        }
        //console.log("UPDATE DATA");

        /* arreglo.forEach((element, i) => {
                  console.log(i+1, element);
              }); */
      }
    );
  });
}

const getDeportes = async (req, res) => {
  try {
    const resultado = await consulta("deportes");

    res.json(resultado);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

const getPresent = async (req, res) => {
  try {
    const resultado = await consulta("actualidad");

    res.json(resultado);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

const getShows = async (req, res) => {
  try {
    const resultado = await consulta("espectaculos");

    res.json(resultado);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

const postLogin = async (req, res) => {
  try {
    console.log(req.body);
    if (req.body.username === 'ritzu' && req.body.password === '1234') {
      res.send('Login Exitoso')
    } else {
      res.send('Datos Erroneos')
    }
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
}

module.exports = {
  getDeportes,
  getPresent,
  getShows,
  postLogin
};
