const fetch = require("node-fetch");
const HttpsProxyAgent = require('https-proxy-agent');
const fs = require("fs");
const { exec } = require("child_process");
const getEmoji = require("get-random-emoji");
// const proxyAgent = new HttpsProxyAgent("http://106.75.171.235:8080");

fetch("https://nekos.best/api/v2/neko", { agent: null})
  .then((response) => response.json())
  .then((response) => {
    let new_quote = "";

    for (const anime of response.results) {
      new_quote += `
<p align="center">
  <img width="500" src="${anime.url}">
  <hr/>
  <center>
    artist: <a href="${anime.source_url}">${anime.artist_name}</a>
  </center>
</p>


###### Auto generate README.md from update.js

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
