const request = require("request");
const cheerio = require("cheerio");
const axios = require("axios").default;

async function consulta(tag) {
  try {
    const response = await axios.get("https://trome.pe/" + tag);
    const $ = cheerio.load(response.data);
    let content = [];

    $(".story-grid__info").each((i, elem) => {
      //const obj = {};
      const link = $(elem).find("a.story-grid__title").attr("href");
      const title = $(elem).find("a.story-grid__title").text();
      const image = $(elem)
        .find("img.lazy.story-grid__img.object-cover.object-center")
        .attr("data-src");
      //console.log(image);
      //const title = $(elem).find("a.story-grid__title").text();
      content.push({
        link,
        title,
        image,
      });
    });
    return content;
  } catch (error) {
    return console.log(error);
  }
}

module.exports = {
  consulta,
};
