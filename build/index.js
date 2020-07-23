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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var discord_js_1 = require("discord.js");
var dotenv_1 = __importDefault(require("dotenv"));
var Greetings_1 = require("./Greetings");
var myFunc = __importStar(require("./HelperFunctions"));
// import ejs from 'ejs';
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var axios_1 = __importDefault(require("axios"));
var cheerio_1 = __importDefault(require("cheerio"));
var puppeteer_1 = __importDefault(require("puppeteer"));
var node_fetch_1 = __importDefault(require("node-fetch"));
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
        var str = req.body.inputText.toString();
        messageOBJ.channel.send(str.replace(/<[^>]*>/g, ''));
        if (txtToSend && txtToSend[0].toLowerCase().includes('!online')) {
            res.render('index', { texToSend: txtToSend[0], color: 'green' });
        }
        else if (txtToSend) {
            res.render('index', { texToSend: txtToSend[0], color: 'red' });
        }
        else {
            res.sendFile(__dirname + '/index.html');
        }
        return;
    }
    if (txtToSend) {
        if (myFunc.incFunc(txtToSend, '!online')) {
            res.render('index', { texToSend: txtToSend[0], color: 'green' });
        }
        else {
            if (!myFunc.incFunc(txtToSend, '!report') ||
                !myFunc.incFunc(txtToSend, '!joke')) {
                res.render('index', { texToSend: txtToSend[0], color: 'red' });
            }
        }
        txtToSend.shift();
    }
    else {
        res.sendFile(__dirname + '/index.html');
    }
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
        txtToSend.push(message.author.username + ": \"" + message.content + "\"");
    }
    switch (message.content.toLowerCase()) {
        case prefix + "joke":
            node_fetch_1.default('https://sv443.net/jokeapi/v2/joke/Dark?type=single')
                .then(function (res) { return res.json(); })
                .then(function (json) {
                // console.log(json.joke);
                (function () { return __awaiter(void 0, void 0, void 0, function () {
                    var browser, page, result;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, puppeteer_1.default.launch()];
                            case 1:
                                browser = _a.sent();
                                return [4 /*yield*/, browser.newPage()];
                            case 2:
                                page = _a.sent();
                                return [4 /*yield*/, page.goto('https://www.reverso.net/text_translation.aspx?lang=RU')];
                            case 3:
                                _a.sent();
                                return [4 /*yield*/, page.type('#txtSource', json.joke)];
                            case 4:
                                _a.sent();
                                return [4 /*yield*/, page.click('#lnkSearch')];
                            case 5:
                                _a.sent();
                                return [4 /*yield*/, page.waitFor(2500)];
                            case 6:
                                _a.sent();
                                return [4 /*yield*/, page.evaluate(function () {
                                        function copyText(selector) {
                                            var copyText = document.querySelector(selector);
                                            copyText.select();
                                            document.execCommand('Copy');
                                            return copyText.value;
                                        }
                                        return copyText('#txtTranslation');
                                    })];
                            case 7:
                                result = _a.sent();
                                // console.log(result);
                                message.channel.send(json.joke);
                                message.channel.send(result);
                                return [4 /*yield*/, browser.close()];
                            case 8:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); })();
            });
            break;
        case prefix + "report":
            axios_1.default
                .get('https://zkillboard.com/corporation/98359204/')
                .then(function (respond) {
                var $ = cheerio_1.default.load(respond.data);
                var lastDateZK = $('.no-stripe').first().text();
                var today = myFunc.dateToday();
                if (lastDateZK === today) {
                    var killlist = $('#killlist').children().next().children();
                    var allkills = killlist.next().text();
                    var cut = allkills.search('2020');
                    cut -= 11;
                    allkills = allkills.slice(0, cut).replace(/\s/g, ' ');
                    allkills = allkills.slice(2);
                    var arr = allkills.split('    ');
                    var killsToday = arr
                        .filter(function (val) {
                        if (!val)
                            return false;
                        return true;
                    })
                        .map(function (e) { return e; });
                    var iskLost = killsToday
                        .filter(function (val) {
                        if (val.includes(':'))
                            return true;
                        return false;
                    })
                        .map(function (e) { return e.slice(6); });
                    var killsNum = killsToday.length / 4;
                    var count = 0;
                    var kills = [{ iks: '', where: '', whom: '', who: '' }];
                    for (var i = 0; i < killsNum; i++) {
                        if (i === 0) {
                            kills[0].iks = killsToday[count];
                            kills[0].where = killsToday[count + 1];
                            kills[0].whom = killsToday[count + 2];
                            kills[0].who = killsToday[count + 3];
                        }
                        else {
                            kills.push({
                                iks: killsToday[count],
                                where: killsToday[count + 1],
                                whom: killsToday[count + 2],
                                who: killsToday[count + 3],
                            });
                        }
                        count += 4;
                    }
                    var idKill = myFunc.idFunc(killsNum, killlist);
                    myFunc.logger(kills, iskLost, idKill, message);
                }
                else {
                    console.log('Сегодня нету сливов, котики торжествуют!');
                }
            });
            break;
        default:
            break;
    }
    if (message.content[0] === prefix &&
        Greetings_1.greetings.includes(message.content.slice(1))) {
        message.channel.send(myFunc.capitalize(Greetings_1.greetings[myFunc.generateNumber(Greetings_1.greetings.length)]));
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
