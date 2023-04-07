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
      const pub_name = $(elem).find(".teaser__publisher-name-text").text().trim();
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
        pub_image,
        time,
        pub_name,
      });
    });
    console.log(content);
    return content;
  } catch (error) {
    return console.log(error);
  }
}

async function leaderboardBL() {
  try {
    const response = await axios.get(
      "https://onefootball.com/es/competicion/bundesliga-1/clasificacion"
    );
    const $ = cheerio.load(response.data);
    let content = [];
    $(".standings__row--link").each((i, elem) => {
      const team = $(elem).find(".standings__team-name").text().trim();
      const image = $(elem).find(".of-image__img").attr("src");
      const gamesp = $(elem).find(".standings__cell-text--dimmed").eq(0).text().trim();
      const wins = $(elem).find(".standings__cell-text--dimmed").eq(1).text().trim();
      const draws = $(elem).find(".standings__cell-text--dimmed").eq(2).text().trim();
      const losses = $(elem).find(".standings__cell-text--dimmed").eq(3).text().trim();
      const goald = $(elem).find(".standings__cell-text--dimmed").eq(4).text().trim();
      const points = $(elem).find(".standings__cell.standings__cell--numeric>span").eq(6).text().trim();
      const svg =  'https://onefootball.com' + $(elem).find(".of-image__img").attr("src")
      content.push({
        team,
        image,
        gamesp,
        wins,
        draws,
        losses,
        goald,
        points,
        svg
      });
    });
    console.log(content[1]);
    return content;
  } catch (error) {
    return console.log(error);
  }
}

 module.exports = {
  consultaBvb,
  leaderboardBL,
}; 
