const PirSensor = require('./lib/pir-sensor-fake.js');
var TelegramBot = require('node-telegram-bot-api');

if(process.argv.length < 3) {
  console.log("usage: " + process.argv[1] + " <config>");
  process.exit();
}

const config_file = process.argv[2];
const config  = require(config_file);
const para = config.telegram;

console.log(para.token);
console.log(para.chat_id);

var bot = new TelegramBot(para.token, {polling: true});
var pir = new PirSensor(17);
var check_motion = true;


pir.on('motion', function() {
  console.log('motion ...');
  if(check_motion) {
    bot.sendMessage(para.chat_id,'motion ...');
  }
});

pir.on('nothing', function() {
  console.log('nothing ...');
});

bot.on('message', function (msg) {
  console.log(msg);
});

bot.onText(/^Start/, function (msg, match) {
  var fromId = msg.from.id;
  check_motion = true;
  bot.sendMessage(fromId, "Überwachung gestartet ...");
});

bot.onText(/^Stop/, function (msg, match) {
  var fromId = msg.from.id;
  check_motion = false;
  bot.sendMessage(fromId, "Überwachung gestoppt ...");
});
