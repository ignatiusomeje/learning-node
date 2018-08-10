const yargs = require('yargs');
const axios = require('axios');

const argv = yargs
  .options({
    a:{
      alias: "address",
      demand: true,
      describe: "Address to fetch weather data using its longitude and latitude.",
      string: true
    }
  })
  .help()
  .alias("help", 'h')
  .argv;

  var input = encodeURIComponent(argv.address);
  var url = `https://api.opencagedata.com/geocode/v1/json?q=${input}&key=2ca2a6c78a5b4bdfb0496df794772c70`;

  axios.get(url).then(res => {
    var lat = res.data.results[0].geometry.lat;
    var lng = res.data.results[0].geometry.lng;
    var weatherUrl = `https://api.darksky.net/forecast/a38df9d38aad8b7e38c33a4771e1275b/${lat},${lng}`;
    console.log(res.data.results[0].formatted);
    return axios.get(weatherUrl);
  }).then((res)=>{
    var temperature = res.data.currently.temperature;
    var apparent_temperature = res.data.currently.apparentTemperature;
    console.log(`it's currently ${temperature}. it feels like ${apparent_temperature}`)
  }).catch(e => {
    if (e.code === 'ENOTFOUND' || e.codeStatus !== 200){
      console.log('unable to connect to server');
    }
  });

 
// 2ca2a6c78a5b4bdfb0496df794772c70 

