const access_token = 'pk.eyJ1IjoiYmxhbms5OTMiLCJhIjoiY2tuc3ZrNGEzMHRsYzJ2bzcwYWR6NnRjdyJ9.2i1WQ4cOhD3jIg0Lwjys-A'
const coordinates = document.querySelector('input[type=hidden]')
const lat = Number(coordinates.name)
const lng = Number(coordinates.value)
var mymap = L.map('mapid').setView([lat, lng], 13);
L.tileLayer(`https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${access_token}`, {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 13,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1
}).addTo(mymap);
L.marker([lat, lng]).addTo(mymap)