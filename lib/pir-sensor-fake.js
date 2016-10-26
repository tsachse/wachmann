const events = require('events');
const util = require("util");
const fs = require('fs');


function PirSensor(gpio) { 
  events.EventEmitter.call(this);

  this.gpio = gpio;
  this.fn_gpio = this.gpio.toString() + '.txt';
  that = this;

  fs.writeFile(this.fn_gpio, "0", function(err) {
    if(err) {
      return console.log(err);
    }
    console.log(that.fn_gpio + " init o.k.");
  });

  fs.watch(this.fn_gpio, function(event) {
    var data = fs.readFileSync(that.fn_gpio).toString();
    if(data.match(/^1/)) {
      that.emit('motion');
    } else {
      that.emit('nothing');
    }
  });



};

util.inherits(PirSensor, events.EventEmitter);

module.exports = PirSensor;
