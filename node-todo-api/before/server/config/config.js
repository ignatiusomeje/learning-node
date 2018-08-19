const env = process.env.NODE_ENV || 'development';

if (env === 'development' || env === 'test'){
  var config = require('./config.json');
  var envCOnfig = config[env];

  Object.keys(envCOnfig).forEach((key) => {
    process.env[key] = envCOnfig[key];
  });
};

