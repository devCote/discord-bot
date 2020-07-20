import { Client } from 'discord.js';
import dotenv from 'dotenv';
import { greetings } from './Greetings';
import * as helperFunc from './HelperFunctions';
// import ejs from 'ejs';
import express from 'express';
import bodyparser from 'body-parser';
import axios from 'axios';
import cheerio from 'cheerio';
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
    messageOBJ.channel.send(req.body.inputText.replace(/<\/?[^>]+(>|$)/g, ''));
  }

  if (txtToSend.length > 0) {
    if (txtToSend[0].toLowerCase().includes('!online')) {
      res.render('index', { texToSend: txtToSend[0], color: 'green' });
    } else {
      res.render('index', { texToSend: txtToSend[0], color: 'red' });
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
        .then((json) => {
          message.channel.send(json.joke);
        });
      break;

    case `${prefix}report`:
      axios
        .get('https://zkillboard.com/corporation/98359204/')
        .then((respond) => {
          const $ = cheerio.load(respond.data);
          const lastDateZK = $('.no-stripe').first().text();
          if (lastDateZK === helperFunc.dateToday()) {
            message.channel.send('ОМГ сегодня есть сливы');
          } else {
            message.channel.send('Сегодня нету сливов, котики торжествуют!');
          }
        });
      break;
    default:
      break;
  }

  if (
    message.content[0] === prefix &&
    greetings.includes(message.content.slice(1))
  ) {
    message.channel.send(
      helperFunc.capitalize(
        greetings[helperFunc.generateNumber(greetings.length)]
      )
    );
  }
});

client.login(process.env.TOKEN);
