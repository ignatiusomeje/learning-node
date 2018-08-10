const request = require('request');

const geocodeAddress = (address, callback)=>{
  var input = encodeURIComponent(address);

  request({
    // url: 'https://maps.googleapis.com/maps/api/geocode/json?address=1301%20street%20philadelphia',
    url: `https://api.opencagedata.com/geocode/v1/json?q=${input}&key=2ca2a6c78a5b4bdfb0496df794772c70`,
    json: true
  },(error,response,body)=>{
    if (error){
      callback('unable to connect to server')
    } else if (!body.results[0]){
      callback('unable to find location')
    } else if (body.results[0]){
      callback(undefined,{
        address: body.results[0].formatted,
        latitude: body.results[0].geometry.lat,
        longitude: body.results[0].geometry.lng
      })
    }
  })
}

// a38df9d38aad8b7e38c33a4771e1275b

module.exports = {
  geocodeAddress
}