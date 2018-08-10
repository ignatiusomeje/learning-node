const yargs = require('yargs');

const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

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

    geocode.geocodeAddress(argv.address, (errormessage, results)=>{
      if (errormessage){
        console.log(errormessage);
      } else {
        console.log(results.address);
        weather.getWeather(results.latitude,results.longitude,(errormessage, weatherResults)=>{
          if (errormessage){
            console.log(errormessage);
          }else{
            console.log(`it's currently ${weatherResults.temperature}. it feels like ${weatherResults.apparent_temperature}`);
          }
        });
      }
    });

    
 
// 2ca2a6c78a5b4bdfb0496df794772c70 

