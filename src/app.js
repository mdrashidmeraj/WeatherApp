import express from 'express';
import path from 'path';
import hbs from 'hbs';
import {geocode} from "./utils/geocode.js";
import {forecast} from './utils/forecast.js';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// console.log(__dirname);
// console.log(path.join(__dirname, '../public'));

const app = express()

//Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath  = path.join(__dirname, "../templates/views")
const partialPaths = path.join(__dirname, "../templates/partials")

//setup handlebars engine and vies location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPaths)
//setup static directory to servers
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Rashid'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Rashid'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    geocode(req.query.address, (error, { lat, lng, location } = {}) => {
        if (error) {
            return res.send({ error })
        }
        forecast (lat, lng, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address,
            })
        
        })
    })
})

app.get('*',(req,res)=> {
    res.render("404", {
        title: '404',
        name: "Rashid",
        errorMessage:" page not found",
    })
})

app.listen(3000, () => {
    console.log('Server is up and running');
})