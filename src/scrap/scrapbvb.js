const cheerio = require("cheerio");
const axios = require("axios").default;
const url = require("url");

async function consultaBvb() {
  try {
    const response = await axios.get(
      "https://onefootball.com/es/equipo/borussia-dortmund-155"
    );
    const $ = cheerio.load(response.data);
    //console.log($(".Gallery_grid__WPr91.Gallery_gallery__grid__QXQRr").find('article > a > .NewsTeaserV2_teaser__title__9dpbH') .html());
    let content = [];
    $(".Gallery_grid__WPr91.Gallery_gallery__grid__QXQRr")
      .find("article")
      .each((i, elem) => {
        //const title = $(elem).find(".NewsTeaserV2_teaser__title__41fg5").text();
        const title = $(elem)
          .find("a > .NewsTeaserV2_teaser__title__9dpbH")
          .text();
        //console.log(title);
        const description = $(elem)
          //.find(".NewsTeaserV2_teaser__preview__rQSgt")
          .find(".NewsTeaserV2_teaser__preview__KB0zI")
          .text()
          .replace(/\n/g, " ")
          .trim();
        //desc class ".NewsTeaserV2_teaser__preview__rQSgt"
        const image = $(elem)
          //.find(".ImageWithSets_of-image__picture__IHP7O > source")
          .find(".ImageWithSets_of-image__picture__4hzsN > source")
          .last()
          .attr("srcset");
        const pub_name = $(elem).find("footer a span").text().trim();
        const pub_image = $(elem).find("footer a div img").attr("src");
        const time = $(elem).find("footer a time").text().trim();
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
      "https://www.bundesliga.com/es/bundesliga/clasificacion"
    );
    const $ = cheerio.load(response.data);
    const base = "https://assets.bundesliga.com";
    let content = [];
    /* console.log($("tr.ng-star-inserted td.logo > a.logolink > clublogo").html()); */
    $("tr.ng-star-inserted").each((i, elem) => {
      const team = $(elem)
        .find("td.team > div > span:nth-child(3)")
        .text()
        .trim();
      /* const image = $(elem)
        .find("td.logo > a.logolink > clublogo img")
        .attr("src"); */
      const image = `https://assets.bundesliga.com/tachyon/sites/2/2021/08/${
        i == 3
          ? "Union-Berlin"
          : i == 9
          ? "Moenchengladbach"
          : i == 10
          ? "Koeln"
          : team
      }.png?fit=70,70`;
      const gamesp = $(elem).find(".matches").text().trim();
      const wins = $(elem).find(".wins").text().trim();
      const draws = $(elem).find(".draws").text().trim();
      const losses = $(elem).find(".losses").text().trim();
      const goald = $(elem)
        .find(".difference")

        .text()
        .trim();
      const points = $(elem).find(".pts").text().trim();

      content.push({
        team,
        image,
        gamesp,
        wins,
        draws,
        losses,
        goald,
        points,
      });
    });
    //console.log(content[1]);
    return content;
  } catch (error) {
    return console.log(error);
  }
}

async function matchesBL() {
  try {
    const response = await axios.get(
      "https://www.bundesliga.com/es/bundesliga/partidos/2022-2023/26"
    );
    const $ = cheerio.load(response.data);
    let mf = [];
    let matches = [];

    let isMatching = false;

    $("match-date-header").each((index, elem) => {
      const array = $(elem).find(".day").text().trim().split("  ");
      const objheader = {
        day: array[0],
        date: array[1],
        matchFixture: [],
      };

      //;
      //obj.hour =
      //matches.push(objheader);
      // console.log($(elem).parent().hasClass(".ng-star-inserted"));
      //if ($(elem).parent().hasClass("match-fixture")) {
      //console.log('hola');
      // const $matchFixtures = $(elem).nextUntil(".match-date-header", ".");

      $(".matchFixture").each((i, elem) => {
        //let obj = {};
        let objHome = {
          team: "",
          shortName: "",
          logo: "",
        };
        let objAway = {
          team: "",
          shortName: "",
          logo: "",
        };
        objHome.team = $(elem).find('match-team[side="home"]').text();
        objHome.shortName = $(elem).find(".cell.home>.tlc").text();
        objHome.score = $(elem)
          .find(".cell.home>.score.ng-star-inserted")
          .text();
        objHome.logo = $(elem).find('match-team[side="home"] img').attr("src");

        objAway.team = $(elem).find('match-team[side="away"]').text();
        objAway.shortName = $(elem).find(".cell.away>.tlc").text();
        objAway.score = $(elem)
          .find(".cell.away>.score.ng-star-inserted")
          .text();
        objAway.logo = $(elem).find('match-team[side="away"] img').attr("src");

        const obj = {
          objHome,
          objAway,
        };
        //return obj;

        /*console.log({
            home: objHome,
            away: objAway
          }); */

        //console.log(matches.matchFixture);
        if (i === 0) {
          objheader.matchFixture[index].push(obj);
        }
      });

      console.log(objheader.matchFixture);
    });

    //return content;
  } catch (error) {
    return console.log("gaa" + error);
  }
}

async function fixtureBL(fecha) {
  const response = await axios.get(
    "https://www.bundesliga.com/es/bundesliga/partidos/2023-2024/" + fecha
  );

  const $ = cheerio.load(response.data);
  const date = $("h1").text().trim().split(" ").slice(0, 2).join(" ");
  let content = {
    date: date,
    matches: [],
  };

  $("match-date-header").each((index, el) => {
    const date = $(el).text().trim().split("  ");
    const matchesByDate = {
      date: date[0] + " " + date[1],
      hour: date[2],
      fixtures: [],
    };

    $(el)
      .nextUntil(
        "match-date-header",
        "div.matchRow.elevation-t-card.ng-star-inserted"
      )
      .each((i, elem) => {
        let homeTeam = {
          name: $(elem).find('match-team[side="home"] > div > ').first().text(),
          shortName: $(elem).find(".cell.home>.tlc").text(),
          score: $(elem).find(".cell.home>.score.ng-star-inserted").text(),
          logo: $(elem).find('match-team[side="home"] img').attr("src"),
        };
        let awayTeam = {
          name: $(elem).find('match-team[side="away"]  > div >').first().text(),
          shortName: $(elem).find(".cell.away>.tlc").text(),
          score: $(elem).find(".cell.away>.score.ng-star-inserted").text(),
          logo: $(elem).find('match-team[side="away"] img').attr("src"),
        };

        if (!matchesByDate.fixtures.includes({ homeTeam, awayTeam })) {
          matchesByDate.fixtures.push({
            homeTeam: homeTeam,
            awayTeam: awayTeam,
          });
        }
      });

    content.matches.push(matchesByDate);
  });

  return content;
}

async function schedulea() {
  try {
    const response = await axios.get("https://futbol-libre.org/agenda");
    const $ = cheerio.load(response.data);
    let content = [];

    //cha => chanpions league
    //pe => peru
    $("li.CHA").each(async (index, elem) => {
      let pe = {
        flag: "https://upload.wikimedia.org/wikipedia/commons/c/cf/Flag_of_Peru.svg",
        match: $(elem)
          .find("a")
          .contents()
          .filter(function () {
            return this.nodeType === 3;
          })
          .first()
          .text()
          .trim(),
        hour: getHour($(elem).find("a > .t").text().trim()),
        canales: [],
      };

      /* $(elem)
        .find("ul > .subitem1")
        .each(async (i, el) => {
          let canal = {
            name: $(el)
              .find("a")
              .contents()
              .filter(function () {
                return this.nodeType === 3;
              })
              .text()
              .trim(),
            link: $(el).find("a").attr("href"),
            streamUrl: await streamUrl($(el).find("a").attr("href")),
          };

          pe.canales.push(canal);
        }); */

      const subitems = $(elem).find("ul > .subitem1");
      for (let i = 0; i < subitems.length; i++) {
        const el = subitems[i];
        let canal = {
          name: $(el)
            .find("a")
            .contents()
            .filter(function () {
              return this.nodeType === 3;
            })
            .text()
            .trim(),
          link: $(el).find("a").attr("href"),
          streamUrl: await streamUrl($(el).find("a").attr("href")),
        };
        pe.canales.push(canal);
      }

      content.push(pe);
    });
    //console.log(content);
    return content;
  } catch (error) {
    return console.log(error);
  }
}

async function schedule() {
  try {
    const response = await axios.get("https://futbol-libre.org/agenda");
    const $ = cheerio.load(response.data);
    let content = [];

    //cha => chanpions league
    //pe => peru

    const cha = $("li.CHA");
    for (let i = 0; i < cha.length; i++) {
      const element = cha[i];
      let pe = {
        flag: "https://upload.wikimedia.org/wikipedia/commons/c/cf/Flag_of_Peru.svg",
        match: $(element)
          .find("a")
          .contents()
          .filter(function () {
            return this.nodeType === 3;
          })
          .first()
          .text()
          .trim(),
        hour: getHour($(element).find("a > .t").text().trim()),
        canales: [],
      };

      /* $("li.CHA").each(async(index, elem) => {
      let pe = {
        flag: "https://upload.wikimedia.org/wikipedia/commons/c/cf/Flag_of_Peru.svg",
        match: $(elem)
          .find("a")
          .contents()
          .filter(function () {
            return this.nodeType === 3;
          })
          .first()
          .text()
          .trim(),
        hour: getHour($(elem).find("a > .t").text().trim()),
        canales: [],
      }; */

      const subitems = $(element).find("ul > .subitem1");
      for (let i = 0; i < subitems.length; i++) {
        const el = subitems[i];
        let canal = {
          name: $(el)
            .find("a")
            .contents()
            .filter(function () {
              return this.nodeType === 3;
            })
            .text()
            .trim(),
          link: $(el).find("a").attr("href"),
          streamUrl: await streamUrl($(el).find("a").attr("href")),
        };

        pe.canales.push(canal);
      }

      content.push(pe);
    }

    return content;
  } catch (error) {
    console.log(error);
  }
}

function getHour(hora) {
  // Crear objeto Date con la hora en formato de 24 horas
  let fecha = new Date(`2000/01/01 ${hora}`);
  // Obtener la diferencia horaria entre España y Perú en minutos
  let diferenciaHoraria = -360;
  // Sumar la diferencia horaria a la hora en España
  fecha.setMinutes(fecha.getMinutes() + diferenciaHoraria);
  // Convertir la hora a formato de 12 horas
  let horaPeru = fecha.toLocaleString("en-US", {
    hour: "numeric",
    hour12: true,
    minute: "numeric",
  });
  // Retornar la hora en formato peruano de 12 horas
  return horaPeru;
}

async function streamUrl(link) {
  try {
    const response = await axios.get(link);
    const $ = cheerio.load(response.data);
    console.log($("iframe").attr("src"));
    return $("iframe").attr("src");
  } catch (error) {
    return "";
  }
}

//leaderboardBL();

module.exports = {
  consultaBvb,
  leaderboardBL,
  fixtureBL,
  schedule,
};
