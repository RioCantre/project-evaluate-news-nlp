var path = require('path')
const mockAPIResponse = require('./mockAPI.js')
const bodyParser = require('body-parser')
const fetch = require('node-fetch');
const express = require('express')
const app = express()


const dotenv = require('dotenv');
dotenv.config();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());



// Initialize the main project folder
app.use(express.static('dist'))

console.log(__dirname)

// API
const baseURL = 'https://api.meaningcloud.com/sentiment-2.1?'
const apiKey = process.env.API_KEY
let allData = [];

// GET route
app.get('/',  (req, res) => {
    res.sendFile(path.resolve('dist/index.html'));
})

app.get('/test',  (req, res) => {
    res.send(mockAPIResponse)
})

// POST route
app.post('/apiCall', async (req, res) => {
    allData = req.body.url;
    const apiURL = `${baseURL}key=${apiKey}&url=${allData}&lang=en`

    const response = await fetch(apiURL)
    const data = await response.json()
    console.log(data)
    res.send(data)
})


// designates what port the app will listen to for incoming requests
const port = process.env.PORT || 8888;
app.listen(port, () => {
 console.log('app listening on port 8888!')
})

