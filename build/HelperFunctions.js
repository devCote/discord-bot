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
exports.logger = exports.idFunc = exports.incFunc = exports.generateNumber = exports.capitalize = exports.dateToday = void 0;
var discord = __importStar(require("discord.js"));
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
var Field = /** @class */ (function () {
    function Field(name, value, inline) {
        this.name = name;
        this.value = value;
        this.inline = inline;
    }
    return Field;
}());
exports.logger = function (kills, iskLost, idKill, message) {
    var i = 0;
    var i2 = 0;
    var pref = '```';
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
