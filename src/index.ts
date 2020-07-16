import { Client } from 'discord.js';
import * as config from './config.json';
import dotenv from 'dotenv';
import { greetings } from './Greetings';

const client: Client = new Client();
dotenv.config();

client.on('ready', () => {
  console.log(`Client is logged in as ${client.user!.tag} and ready!`);
});

const capitalize = (s: string) => {
  if (typeof s !== 'string') return '';
  return s.charAt(0).toUpperCase() + s.slice(1);
};

const generateNumber = (): number => {
  const max = greetings.length;
  const min = 0;
  const randomNum = Math.random() * (max - min) + min;
  return Math.round(randomNum);
};

client.on('message', (message) => {
  console.log(message.content);

  if (
    message.content[0] === config.prefix &&
    greetings.includes(message.content.toLowerCase().slice(1))
  ) {
    // send back "Pong." to the channel the message was sent in
    message.channel.send(capitalize(greetings[generateNumber()]));
  }
});

// client.on('guildCreate', (g) => {
//   const channel = g.channels.cache.random();
//   if (!channel) return;

//   channel.setName('foo').then((updatedChannel) => {
//     console.log(`New channel name: ${updatedChannel.name}`);
//   });
// });

// client.on('messageReactionRemoveAll', async (message) => {
//   console.log(
//     `messageReactionRemoveAll - id: ${message.id} (${message.id.length})`
//   );

//   if (message.partial) message = await message.fetch();

//   console.log(`messageReactionRemoveAll - content: ${message.content}`);
// });

client.login(process.env.TOKEN);
