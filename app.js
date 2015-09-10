var L = require('leaflet');
L.Icon.Default.imagePath = 'leaflet/images'

var map = L.map('map') //

L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

map.on('locationfound', onLocationFound);
map.on('locationerror', onLocationError);

map.locate({
  setView: true,
  maxZoom: 16,
  watch: true,
  enableHighAccuracy: true
});

function debug(obj) {
  var div = document.createElement("div");
  var content = document.createTextNode(
    JSON.stringify(JSON.decycle(obj)));
  div.appendChild(content); //add the text node to the newly created div.
  document.body.appendChild(div);
}

function onLocationFound(e) {
  var radius = e.accuracy / 2;

  L.marker(e.latlng).addTo(map)
    .bindPopup("You are within " + radius + " meters from this point").openPopup();

  L.circle(e.latlng, radius).addTo(map);
  sendPost(e);
}

function onLocationError(e) {
  map.setView([-31.6333, -60.7], 12);
}

function sendPost(e){
  var position = new XMLHttpRequest();
  var formData = new FormData();
  formData.append('Lat', e.latlng.lat);
  formData.append('Lng', e.latlng.lng);
  position.open('post', 'https://escolares.herokuapp.com/');
  position.send(formData);
}
