import { Client } from 'discord.js';
import dotenv from 'dotenv';
import { greetings } from './Greetings';
import * as myFunc from './HelperFunctions';
import express from 'express';
import bodyparser from 'body-parser';
import puppet from 'puppeteer';
import fetch from 'node-fetch';
/////////////////////////------------------------
const app = express();
const client = new Client();
dotenv.config();
app.use(bodyparser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
let txtToSend = [];
const prefix = '!';
let messageOBJ = {
  channel: {
    send(str: string) {},
  },
};
////////////////////////--------------------------
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.post('/', (req, res) => {
  if (req.body.inputText) {
    const str = req.body.inputText.toString();
    messageOBJ.channel.send(str.replace(/<[^>]*>/g, ''));
    if (txtToSend && txtToSend[0].toLowerCase().includes('!online')) {
      res.render('index', { texToSend: txtToSend[0], color: 'green' });
    } else if (txtToSend) {
      res.render('index', { texToSend: txtToSend[0], color: 'red' });
    } else {
      res.sendFile(__dirname + '/index.html');
    }
    return;
  }

  if (txtToSend) {
    if (myFunc.incFunc(txtToSend, '!online')) {
      res.render('index', { texToSend: txtToSend[0], color: 'green' });
    } else {
      if (
        !myFunc.incFunc(txtToSend, '!report') ||
        !myFunc.incFunc(txtToSend, '!joke')
      ) {
        res.render('index', { texToSend: txtToSend[0], color: 'red' });
      }
    }

    txtToSend.shift();
  } else {
    res.sendFile(__dirname + '/index.html');
  }
});

let port: number | string = process.env.PORT;
if (port == null || port == '') {
  port = 8000;
}
app.listen(port);

client.on('ready', () => {
  console.log(`Client is logged in as ${client.user!.tag} and ready!`);
});

client.on('message', (message) => {
  if (message.channel.id === '734071880490942524' && !message.author.bot) {
    messageOBJ = message;
    txtToSend.push(`${message.author.username}: "${message.content}"`);
  }
  switch (message.content.toLowerCase()) {
    case `${prefix}joke`:
      fetch('https://sv443.net/jokeapi/v2/joke/Dark?type=single')
        .then((res) => res.json())
        .then(({ joke }) => {
          (async () => {
            const browser = await puppet.launch();

            const page = await browser.newPage();
            await page.goto(
              'https://www.reverso.net/text_translation.aspx?lang=RU'
            );

            await page.type('#txtSource', joke);
            await page.click('#lnkSearch');
            await page.waitFor(2500);

            const result = await page.evaluate(() => {
              function copyText(selector: any) {
                var copyText = document.querySelector(selector);
                copyText.select();
                document.execCommand('Copy');
                return copyText.value;
              }
              return copyText('#txtTranslation');
            });
            await browser.close();
            message.channel.send(`\n${joke}\n\n${result}`);
          })();
        });
      break;

    case `${prefix}report`:
      myFunc.reportFoo(message);
      break;
    default:
      break;
  }

  if (
    message.content[0] === prefix &&
    greetings.includes(message.content.slice(1))
  ) {
    message.channel.send(
      myFunc.capitalize(greetings[myFunc.generateNumber(greetings.length)])
    );
  }
});

client.login(process.env.TOKEN);
