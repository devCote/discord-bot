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
exports.reportFoo = exports.logger = exports.idFunc = exports.incFunc = exports.generateNumber = exports.capitalize = exports.dateToday = void 0;
var discord = __importStar(require("discord.js"));
var axios_1 = __importDefault(require("axios"));
var cheerio_1 = __importDefault(require("cheerio"));
exports.dateToday = function () {
    var date = new Date();
    var dateTimeFormat = new Intl.DateTimeFormat('en', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    });
    var _a = dateTimeFormat.formatToParts(date), month = _a[0].value, day = _a[2].value, year = _a[4].value;
    return month + " " + day + ", " + year;
};
exports.capitalize = function (str) {
    if (typeof str !== 'string')
        return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
};
exports.generateNumber = function (greetingsSize) {
    var max = greetingsSize;
    var min = 0;
    var randomNum = Math.random() * (max - min) + min;
    return Math.round(randomNum);
};
exports.incFunc = function (txtToSend, str) {
    return txtToSend[0].toLowerCase().includes(str);
};
exports.idFunc = function (killNum, list) {
    var slist = list.next().first();
    function sl(str) {
        return str.slice(52, 60);
    }
    var res1;
    var res2;
    var res3;
    var res4;
    var res5;
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
exports.logger = function (kills, iskLost, idKill, message) {
    var i = 0;
    var i2 = 0;
    kills.forEach(function (e) {
        var link = "https://zkillboard.com/kill/" + idKill[i2++] + "/";
        var emb = new discord.MessageEmbed();
        if (e.whom.includes('Real Enemy of Angel Cartel')) {
            emb.title = 'Zkillboard';
            emb.description = 'Наша потеря!';
            emb.color = 0x92140c;
        }
        else {
            emb.title = 'Zkillboard';
            emb.description = 'Наш герой!';
            emb.color = 0x415819;
        }
        emb.addField("\u041D\u0430\u043F\u0430\u0434\u0430\u044E\u0449\u0438\u0439", "" + e.who, true);
        emb.addField("\u0416\u0435\u0440\u0442\u0432\u0430", "" + e.whom, false);
        emb.addField("\u041F\u043E\u0442\u0435\u0440\u044F", "" + iskLost[i++], false);
        emb.setURL(link);
        message.channel.send(emb);
    });
};
exports.reportFoo = function (message) {
    axios_1.default.get('https://zkillboard.com/corporation/98359204/').then(function (respond) {
        var $ = cheerio_1.default.load(respond.data);
        var lastDateZK = $('.no-stripe').first().text();
        var today = exports.dateToday();
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
            var idKill = exports.idFunc(killsNum, killlist);
            exports.logger(kills, iskLost, idKill, message);
        }
        else {
            message.channel.send('Сегодня нету сливов, котики торжествуют!');
        }
    });
};
