import { Client } from 'discord.js';
import dotenv from 'dotenv';
import { greetings } from './Greetings';
import * as myFunc from './HelperFunctions';
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
          const today = myFunc.dateToday();
          if (lastDateZK === today) {
            const killlist = $('#killlist').children().next().children();
            let allkills = killlist.next().text();
            let cut = allkills.search('2020');
            cut -= 11;
            allkills = allkills.slice(0, cut).replace(/\s/g, ' ');
            allkills = allkills.slice(2);
            const arr = allkills.split('    ');
            const killsToday = arr
              .filter((val) => {
                if (!val) return false;
                return true;
              })
              .map((e) => e);
            const iskLost = killsToday
              .filter((val) => {
                if (val.includes(':')) return true;
                return false;
              })
              .map((e) => e.slice(6));
            const killsNum = killsToday.length / 4;
            let count = 0;

            const kills: [
              {
                iks: string;
                where: string;
                whom: string;
                who: string;
              }
            ] = [{ iks: '', where: '', whom: '', who: '' }];

            for (let i = 0; i < killsNum; i++) {
              if (i === 0) {
                kills[0].iks = killsToday[count];
                kills[0].where = killsToday[count + 1];
                kills[0].whom = killsToday[count + 2];
                kills[0].who = killsToday[count + 3];
              } else {
                kills.push({
                  iks: killsToday[count],
                  where: killsToday[count + 1],
                  whom: killsToday[count + 2],
                  who: killsToday[count + 3],
                });
              }

              count += 4;
            }

            const idKill = myFunc.idFunc(killsNum, killlist);

            myFunc.logger(kills, iskLost, idKill, message);
          } else {
            console.log('Сегодня нету сливов, котики торжествуют!');
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
      myFunc.capitalize(greetings[myFunc.generateNumber(greetings.length)])
    );
  }
});

client.login(process.env.TOKEN);

// axios
//         .get('https://zkillboard.com/corporation/98359204/')
//         .then((respond) => {
//           const $ = cheerio.load(respond.data);
//           const lastDateZK = $('.no-stripe').first().text();
//           if (lastDateZK === myFunc.dateToday()) {
//             message.channel.send('ОМГ сегодня есть сливы');
//           } else {
//             message.channel.send('Сегодня нету сливов, котики торжествуют!');
//           }
//         });
