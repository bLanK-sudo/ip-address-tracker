const express = require('express')
const request = require('request')
const fetch = require('node-fetch')
const bodyParser = require('body-parser')
require('dotenv').config()
const app = express()
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(express.static('public'))
app.set('view engine', 'ejs');
let location;
let ipAddress;
let getIpAddress
let isp;
let lat
let timezone;
let lng
const url = `https://geo.ipify.org/api/v1?apiKey=${process.env.ACCESS_TOKEN}&ipAddress=${getIpAddress}`
const url1 = 'https://geo.ipify.org/api/v1?apiKey=at_RTIKKCKbi1ePibmioN1Dbp2Z1iK24'
app.get('/', (req, res) => {
    request({
        url: url1
    }, (err, response) => {
        const data = JSON.parse(response.body)
        lat = data.location.lat
        lng = data.location.lng
        location = `${data.location.region} ${data.location.country} ${data.location.postalCode}`
        ipAddress = data.ip
        isp = data.isp
        timezone = data.location.timezone
        res.render('home', {
            location,
            timezone,
            isp,
            ipAddress,
            lat,
            lng
        })
    })

})
app.post('/', (req, res) => {
    getIpAddress = req.body.ipAddress
    request({
        url:`https://geo.ipify.org/api/v1?apiKey=${process.env.ACCESS_TOKEN}&ipAddress=${getIpAddress}`
    }, (err, response) => {
        const data = JSON.parse(response.body)
        if (!data.code) {
            location = `${data.location.region} ${data.location.country} ${data.location.postalCode}`
            lat = data.location.lat
            lng = data.location.lng
            ipAddress = data.ip
            isp = data.isp
            timezone = data.location.timezone
            res.render('home', {
                location,
                ipAddress,
                isp,
                timezone,
                lat,
                lng
            })
        } else {
            const code = data.code
            const message = data.messages
            res.render('reject', {
                code,
                message
            })
        }
    })

})
app.listen(3000, (req, res) => {
    console.log('Server is up and running!');
})