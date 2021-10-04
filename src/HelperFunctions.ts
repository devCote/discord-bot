import { Message } from 'discord.js';
import * as discord from 'discord.js';
import axios from 'axios';
import cheerio from 'cheerio';

export const dateToday = (): string => {
  const date = new Date();
  const dateTimeFormat = new Intl.DateTimeFormat('en', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
  const [
    { value: month },
    ,
    { value: day },
    ,
    { value: year },
  ] = dateTimeFormat.formatToParts(date);

  return `${month} ${day}, ${year}`;
};

export const capitalize = (str: string) => {
  if (typeof str !== 'string') return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const generateNumber = (greetingsSize: number): number => {
  const max = greetingsSize;
  const min = 0;
  const randomNum = Math.random() * (max - min) + min;
  return Math.round(randomNum);
};

export const incFunc = (txtToSend: string[], str: string): boolean => {
  return txtToSend[0].toLowerCase().includes(str);
};

export const idFunc = (killNum: number, list: Cheerio): string[] => {
  const slist = list.next().first();
  function sl(str: string) {
    return str.slice(52, 60);
  }
  let res1: string;
  let res2: string;
  let res3: string;
  let res4: string;
  let res5: string;
  switch (killNum) {
    case 1:
      return [sl(slist.html())];
    case 2:
      res1 = sl(slist.html());
      res2 = sl(slist.next().html());
      return [res1, res2];
    case 3:
      res1 = sl(slist.html());
      res2 = sl(slist.next().html());
      res3 = sl(slist.next().next().html());
      return [res1, res2, res3];
    case 4:
      res1 = sl(slist.html());
      res2 = sl(slist.next().html());
      res3 = sl(slist.next().next().html());
      res4 = sl(slist.next().next().next().html());
      return [res1, res2, res3, res4];
    case 5:
      res1 = sl(slist.html());
      res2 = sl(slist.next().html());
      res3 = sl(slist.next().next().html());
      res4 = sl(slist.next().next().next().html());
      res5 = sl(slist.next().next().next().next().html());
      return [res1, res2, res3, res4, res5];
    default:
      return null;
  }
};

export const logger = (
  kills: any,
  iskLost: string[],
  idKill: string[],
  message: Message
): void => {
  let i = 0;
  let i2 = 0;

  kills.forEach((e: any) => {
    let link = `https://zkillboard.com/kill/${idKill[i2++]}/`;
    const emb = new discord.MessageEmbed();
    if (e.whom.includes('Real Enemy of Angel Cartel')) {
      emb.title = 'Zkillboard';
      emb.description = 'Наша потеря!';
      emb.color = 0x92140c;
    } else {
      emb.title = 'Zkillboard';
      emb.description = 'Наш герой!';
      emb.color = 0x415819;
    }

    emb.addField(`Нападающий`, `${e.who}`, true);
    emb.addField(`Жертва`, `${e.whom}`, false);
    emb.addField(`Потеря`, `${iskLost[i++]}`, false);
    emb.setURL(link);

    message.channel.send(emb);
  });
};

export const reportFoo = (message): void => {
  axios.get('https://zkillboard.com/corporation/98359204/').then((respond) => {
    const $ = cheerio.load(respond.data);
    const lastDateZK = $('.no-stripe').first().text();
    const today = dateToday();
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

      const idKill = idFunc(killsNum, killlist);

      logger(kills, iskLost, idKill, message);
    } else {
      message.channel.send('Сегодня нету сливов, котики торжествуют!');
    }
  });
};
