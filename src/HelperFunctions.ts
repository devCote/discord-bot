import { Message } from 'discord.js';
import * as discord from 'discord.js';
import { link } from 'fs';
import { title } from 'process';

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
  let res1;
  let res2;
  let res3;
  let res4;
  let res5;
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

class Field {
  constructor(
    public name: string,
    public value: string,
    public inline: boolean
  ) {}
}

export const logger = (
  kills: any,
  iskLost: string[],
  idKill: string[],
  message: Message
): void => {
  let i = 0;
  let i2 = 0;
  const pref = '```';

  kills.forEach((e) => {
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
