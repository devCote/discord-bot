"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateNumber = exports.capitalize = exports.dateToday = void 0;
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
