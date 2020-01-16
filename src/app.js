const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

//Defines path for Express config
const publicDirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partiasPath = path.join(__dirname, '../templates/partials');

//Set up handlebars engine and views locaiton
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partiasPath);

//Set up statis directory to serve
app.use(express.static(publicDirPath));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Vinh Van'
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    name: 'Vinh Van'
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    message: 'This is help page',
    name: 'Vinh Van'
  });
});

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'You must provide a search term'
    });
  }

  console.log(req.query);
  return res.send({
    products: []
  });
});

app.get('/weather', (req, res) => {
  if (req.query.search) {
    geocode(req.query.search)
      .then(({ lat, long, location }) => {
        forecast(lat, long)
          .then(forecastData => {
            return res.send({
              location: location,
              forecast: forecastData,
              address: req.query.search
            });
          })
          .catch(error => {
            res.send({
              error
            });
          });
      })
      .catch(error => {
        res.send({
          error
        });
      });
  } else {
    return res.send({
      error: 'You must provide a search term'
    });
  }
});

app.get('/help/*', (req, res) => {
  res.render('error', {
    title: 'Error',
    errorMessage: 'Help article not found',
    name: 'Vinh Van'
  });
});

app.get('*', (req, res) => {
  res.render('error', {
    title: 'Error',
    message: 'Page Not Found',
    name: 'Vinh Van'
  });
});

app.listen(3000, () => {
  console.log('Server is up on port 3000.');
});
