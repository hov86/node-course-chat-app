const moment = require('moment');

// var date = new Date();
// console.log(date.getMonth() + 1);

// let date = moment();
// date.subtract(32, 'years');
// console.log(date.format('MMM Do, YYYY'));

// 12:27 am
// 6:01 am

let createdAt = 1234;
let date = moment(createdAt);
console.log(date.format('LT'));