const cheerio = require("cheerio");
const axios = require("axios").default;

async function consultaBvb() {
  try {
    const response = await axios.get(
      "https://onefootball.com/es/equipo/borussia-dortmund-155"
    );
    const $ = cheerio.load(response.data);
    let content = [];
    $(".teaser__link").each((i, elem) => {
      const title = $(elem).find(".teaser__title").text();
      const description = $(elem)
        .find(".teaser__preview")
        .text()
        .replace(/\n/g, " ")
        .trim();
      const image = $(elem).find(".of-image__picture>source").attr("srcset");
      const text = $(elem).find(".teaser__publisher-name-text").text().trim();
      const pub_image = $(elem)
        .find(
          ".teaser__publisher-name-image>.of-image>.of-image__picture>.of-image__img"
        )
        .attr("src");
      const time = $(elem).find(".publisher__time").text().trim();
      ("");
      content.push({
        title,
        description,
        image,
        text,
        pub_image,
        time,
      });
    });
    return content;
  } catch (error) {
    return console.log(error);
  }
}

module.exports = {
  consultaBvb,
};
