const fetch = require('node-fetch');
const fs = require('fs');
const { exec } = require("child_process");


fetch('https://animechan.vercel.app/api/random')
    .then(response => response.json())
    .then(quote => {
      const new_quote = `# ${quote.anime}

${quote.character}

${quote.quote}`;
      try {
        fs.writeFileSync('README.md', new_quote);
        exec("git add .");
        exec(`git commit -m 'update quote ${quote.character}'`);
        exec(`git push origin master`);
      } catch (err) {
        console.error(err)
      }



    })

