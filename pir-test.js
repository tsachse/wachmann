var Gpio = require('onoff').Gpio;
var pir = new Gpio(17, 'in', 'both');

pir.watch(function(err, value) {
  if (err) exit();
  console.log('Intruder detected');
});
