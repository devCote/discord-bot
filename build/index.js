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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var discord_js_1 = require("discord.js");
var dotenv_1 = __importDefault(require("dotenv"));
var Greetings_1 = require("./Greetings");
var helperFunc = __importStar(require("./HelperFunctions"));
// import ejs from 'ejs';
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var axios_1 = __importDefault(require("axios"));
var cheerio_1 = __importDefault(require("cheerio"));
/////////////////////////------------------------
var app = express_1.default();
var client = new discord_js_1.Client();
dotenv_1.default.config();
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
var txtToSend = [];
var prefix = '!';
var messageOBJ = {
    channel: {
        send: function (str) { },
    },
};
////////////////////////--------------------------
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});
app.post('/', function (req, res) {
    if (req.body.inputText) {
        messageOBJ.channel.send(req.body.inputText);
    }
    if (txtToSend.length > 0) {
        res.render('index', { texToSend: txtToSend[0] });
    }
    else {
        res.sendFile(__dirname + '/index.html');
    }
    txtToSend.shift();
});
var port = process.env.PORT;
if (port == null || port == '') {
    port = 8000;
}
app.listen(port);
client.on('ready', function () {
    console.log("Client is logged in as " + client.user.tag + " and ready!");
});
client.on('message', function (message) {
    if (message.channel.id === '734071880490942524' && !message.author.bot) {
        messageOBJ = message;
        txtToSend.push(message.author.username + ": " + message.content);
    }
    switch (message.content.toLowerCase()) {
        case prefix + "joke":
            fetch('https://sv443.net/jokeapi/v2/joke/Dark?type=single')
                .then(function (res) { return res.json(); })
                .then(function (json) {
                message.channel.send(json.joke);
            });
            break;
        case prefix + "report":
            axios_1.default
                .get('https://zkillboard.com/corporation/98359204/')
                .then(function (respond) {
                var $ = cheerio_1.default.load(respond.data);
                var lastDateZK = $('.no-stripe').first().text();
                if (lastDateZK === helperFunc.dateToday()) {
                    message.channel.send('ОМГ сегодня есть сливы');
                }
                else {
                    message.channel.send('Сегодня нету сливов, котики торжествуют!');
                }
            });
            break;
        default:
            break;
    }
    if (message.content[0] === prefix &&
        Greetings_1.greetings.includes(message.content.slice(1))) {
        message.channel.send(helperFunc.capitalize(Greetings_1.greetings[helperFunc.generateNumber(Greetings_1.greetings.length)]));
    }
});
client.login(process.env.TOKEN);
