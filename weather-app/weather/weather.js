const request = require('request');

const getWeather = (lat,lng,callback)=>{
  request({
    url: `https://api.darksky.net/forecast/a38df9d38aad8b7e38c33a4771e1275b/${lat},${lng}`,
    json: true
  },(error, response, body)=>{
    if (!error && response.statusCode === 200){
      callback(undefined,{
        temperature: body.currently.temperature,
        apparent_temperature: body.currently.apparentTemperature
      });
    } else {
      console.log("unable to fetch weather");
    }
  });
};

module.exports.getWeather = getWeather;
