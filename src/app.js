const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geocode = require('../utils/geocode');
const forecast = require('../utils/forecast');

const app = express();

//Define paths for Express config
const publicDirectory = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partiasPath = path.join(__dirname, '../templates/partials');

//Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partiasPath);

//Setup static directory to serve
app.use(express.static(publicDirectory));



app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Aquina Jose'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Robot',
        name: 'Aquina Jose'
    });
});
app.get('/help', (req, res) => {
    res.render('help', {
        message: 'What help do you need',
        title: 'Help',
        name: 'Aquina Jose'
    })
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide a address'
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location}={}) => {
        if (error) {
            return res.send({error})
        }
        forecast(latitude, longitude, (error, {temperature, precipProbability}) => {
            if (error) {
                return res.send({error})
            }
            res.send({
                 location,
                forecast: `it is currently ${temperature} degrees out.There is a ${precipProbability}% chance of rain`,
                address: req.query.address
            });
        })
    })

});
app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search);
    res.send({
        products: []
    })
});
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 page',
        name: 'Aquina Jose',
        message: 'Help article not found'
    })
});
app.get('*', (req, res) => {
    res.render('404', {
        title: '404 page',
        name: 'Aquina Jose',
        message: 'Page not found'
    })
});
app.listen(3000, () => {
    console.log('Server is up and running');
})