var path = require('path')
const mockAPIResponse = require('./mockAPI.js')
const bodyParser = require('body-parser')
const fetch = require('node-fetch');
const express = require('express')
const cors = require('cors');
const app = express()

const dotenv = require('dotenv');
dotenv.config();

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());
app.use(express.static('dist'))

console.log(__dirname)

const baseURL = 'https://api.meaningcloud.com/sentiment-2.1?'
const apiKey = process.env.API_KEY
let allData = [];

app.get('/',  (req, res) => {
    res.sendFile('dist/index.html')
})

app.get('/test',  (req, res) => {
    res.send(mockAPIResponse)
})

app.post('/apiCall', async (req, res) => {
    allData = req.body.url;
    const apiURL = `${baseURL}key=${apiKey}&url=${allData}&lang=en`

    const response = await fetch(apiURL)
    const data = await response.json()
    console.log(data)
    res.send(data)
})


// designates what port the app will listen to for incoming requests
app.listen(8081, () => {
 console.log('app listening on port 8081!')
})

module.exports = {
    app,
}