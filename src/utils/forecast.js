const axios = require('axios');

const forecast = async (lat, long) => {
  const url = `https://api.darksky.net/forecast/19f1c477e51d49018a65263317707ac4/${lat},${long}?units=si`;

  try {
    const res = await axios(url);

    const {summary} = res.data.daily.data[0];
    const {temperature, precipProbability} = res.data.currently;
    return `${summary} It is currently ${temperature} degrees out. There is a ${precipProbability} chance of rain.`;
  
  } catch (err) {
    const errMsg =
      err.response.data.code === 400
        ? 'Unable to find location'
        : 'Unable to connect to weather service';
        
    throw errMsg;
  }
};

module.exports = forecast;
