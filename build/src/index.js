"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const config = __importStar(require("../config.json"));
const client = new discord_js_1.Client();
client.on('ready', () => {
    console.log(`Client is logged in as ${client.user.tag} and ready!`);
});
client.on('message', (message) => {
    console.log(message.content);
    if (message.content === `${config.prefix}Привет`) {
        // send back "Pong." to the channel the message was sent in
        message.channel.send('Мурмур');
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
client.login(config.token);
