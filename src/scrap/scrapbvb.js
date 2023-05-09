const { Axios } = require("axios");
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
      const pub_name = $(elem)
        .find(".teaser__publisher-name-text")
        .text()
        .trim();
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
      const image = $(elem)
        .find(".standings__team-logo>of-image>div>picture>img.of-image__img")
        .attr("src");
      const gamesp = $(elem)
        .find(".standings__cell-text--dimmed")
        .eq(0)
        .text()
        .trim();
      const wins = $(elem)
        .find(".standings__cell-text--dimmed")
        .eq(1)
        .text()
        .trim();
      const draws = $(elem)
        .find(".standings__cell-text--dimmed")
        .eq(2)
        .text()
        .trim();
      const losses = $(elem)
        .find(".standings__cell-text--dimmed")
        .eq(3)
        .text()
        .trim();
      const goald = $(elem)
        .find(".standings__cell-text--dimmed")
        .eq(4)
        .text()
        .trim();
      const points = $(elem)
        .find(".standings__cell.standings__cell--numeric>span")
        .eq(6)
        .text()
        .trim();
      const svg =
        "https://onefootball.com" + $(elem).find(".of-image__img").attr("src");
      content.push({
        team,
        image,
        gamesp,
        wins,
        draws,
        losses,
        goald,
        points,
        svg,
      });
    });
    console.log(content[1]);
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
    "https://www.bundesliga.com/es/bundesliga/partidos/2022-2023/" + fecha
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
          name: $(elem).find('match-team[side="home"]').text(),
          shortName: $(elem).find(".cell.home>.tlc").text(),
          score: $(elem).find(".cell.home>.score.ng-star-inserted").text(),
          logo: $(elem).find('match-team[side="home"] img').attr("src"),
        };
        let awayTeam = {
          name: $(elem).find('match-team[side="away"]').text(),
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

    const cha =  $("li.CHA");
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
      }
    

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
    };

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

module.exports = {
  consultaBvb,
  leaderboardBL,
  fixtureBL,
  schedule,
};
