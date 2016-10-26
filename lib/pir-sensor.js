const events = require('events');
const util = require("util");
const Gpio = require('onoff').Gpio;

function PirSensor(gpio) { 
  events.EventEmitter.call(this);

  this.gpio = gpio;
  this.pir = new Gpio(this.gpio, 'in', 'both');

  that = this;

  this.pir.watch(function(err, value) {
    if (err) exit();
    if(value == 1) {
      that.emit('motion');
    } else {
      that.emit('nothing');
    }
  });

};

util.inherits(PirSensor, events.EventEmitter);

module.exports = PirSensor;
