const axios = require('axios');

const getExchangeRate = async (from, to) => {
  try {
    let response = await axios.get(`http://data.fixer.io/api/convert?access_key=5f47554547b4b6af9e5659fc96643746&from=${from}&to${to}`);
    const rate = response;
    if (rate){
      return rate
    } else {
      throw new Error()
    }
  } catch (e){
    throw new Error (`Unable to get exchange rate for ${from} and ${to} `)
  }
}

getExchangeRate('NGN', 'USD').then((response) => {
  console.log(response);
});

const getCountries = async (currencyCode)=> {
  try{
    let response = await axios.get(`https://restcountries.eu/rest/v2/currency/${currencyCode}`);
    return response.data.map((country) => country.name);
  }catch (e) {
    throw new Error(`unable to get countries that uses ${currencyCode}`)
  }
};

getCountries('NGN').then((countries) => {
  console.log(countries);
}).catch((e)=> console.log(e))


const convertCurrency = async (from, to, amount) => {
  let countries = await getCountries(to);
  let rate = await getExchangeRate(from, to);
  let exchangedAmount = amount * rate;
  return `${amount} ${from} is worth ${exchangedAmount} ${to}. ${to} can be used in the following countries: ${countries.join(', ')}.`
}
// http://data.fixer.io/api/latest?access_key=5f47554547b4b6af9e5659fc96643746

// https://restcountries.eu/rest/v2/currency/cop