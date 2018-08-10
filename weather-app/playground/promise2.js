const request = require('request');

var geocodeAddress = (address) => {
  return new Promise((resolve, reject) => {

  var input = encodeURIComponent(address);

  request({
    // url: 'https://maps.googleapis.com/maps/api/geocode/json?address=1301%20street%20philadelphia',
    url: `https://api.opencagedata.com/geocode/v1/json?q=${input}&key=2ca2a6c78a5b4bdfb0496df794772c70`,
    json: true
  },(error,response,body)=>{
      if (error){
        reject('unable to connect to server')
      } else if (!body.results[0]){
        reject('unable to find location')
      } else if (body.results[0]){
        resolve({
          address: body.results[0].formatted,
          latitude: body.results[0].geometry.lat,
          longitude: body.results[0].geometry.lng
        })
      }
    })
  })
};

geocodeAddress('a').then((message) => {
  console.log(JSON.stringify(message, undefined, 2));
}, (error) => {
  console.log(error)
});