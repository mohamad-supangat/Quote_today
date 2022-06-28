const fetch = require("node-fetch");
const fs = require("fs");
const { exec } = require("child_process");
const getEmoji = require("get-random-emoji");

fetch("https://nekos.best/api/v2/neko")
  .then((response) => response.json())
  .then((response) => {
    let new_quote = "";

    for (const anime of response.results) {
      new_quote += `
<p align="center">
  <img width="500" src="${anime.url}">


  ### <a href="${anime.source_url}">${anime.artist_name}</a>
</p>

`;
    }

    console.log(new_quote);
    try {
      fs.writeFileSync("README.md", new_quote);
      exec("git add .");
      exec(`git commit -m '${getEmoji()}'`);
      exec(`git push origin master`);
    } catch (err) {
      console.error(err);
    }
  });
