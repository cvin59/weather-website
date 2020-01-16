const axios = require('axios');

const geocode = async (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoiY3ZpbjU5IiwiYSI6ImNrNGx0M3h6azBxbWUza21ycm4xM3VsNGMifQ.CDGZydPd3tENCCDRLc59GQ&limit=1`;

  try {
    const res = await axios(url);
    if (res.data.features.length === 0) {
      throw {
        code: 400,
        message: 'Unable to find location. Try another search.'
      };
    }

    const {place_name: location, geometry} = res.data.features[0];
    return {
      location,
      long: geometry.coordinates[0],
      lat: geometry.coordinates[1]
    };
    
  } catch (err) {
    if (err.code === 400) throw err.message;
    throw 'Unable to connect to location service';
  }
};

module.exports = geocode;
