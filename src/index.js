import  keys  from "../config"

const ipifyApiKey = keys.ipify
const geoApiKey = keys.geo
const searchButton = document.querySelector('.search-btn')
  
const ipAddress = document.getElementById('ip-address')
const ipLocation = document.getElementById('location')
const timeZone = document.getElementById('time-zone')
const isp = document.getElementById('isp')

const greenIcon = L.icon({
  iconUrl: 'images/icon-location.svg',

  iconSize:     [32, 38], // size of the icon
  iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
  popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
})
  
  
  async function logIPInfo(ip = "8.8.8.8") {
    console.log("https://geo.ipify.org/api/v2/country?apiKey="+ ipifyApiKey + "&" + ip)
      let response = await fetch("https://geo.ipify.org/api/v2/country?apiKey="+ ipifyApiKey + "&ipAddress=" + ip);
      let data = await response.json();
      console.log(data);
      ipAddress.innerHTML = data.ip
      ipLocation.innerHTML = data.location.region +", "+ data.location.country
      timeZone.innerHTML = data.location.timezone
      isp.innerHTML = data.isp
      logGeoLocation( data.location.region, data.location.country);
    }
  
  async function logGeoLocation(city, country) {
    
    
      let response = await fetch("https://api.api-ninjas.com/v1/geocoding?city="+ city + "&country=" + country, {
          method: 'GET',
          headers: { 
              'X-Api-Key': geoApiKey,
              "Content-Type": "application/json",},
      });
      let data = await response.json();
      console.log(data);
      document.querySelector('.map').innerHTML = "<div id='map' style='width: 100%; height: 100%;'></div>";
      let map = L.map('map').setView([data[0].latitude, data[0].longitude], 13);

    L.marker([data[0].latitude, data[0].longitude], {icon: greenIcon}).addTo(map);
  
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 19,
          attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      }).addTo(map);
    }

    logIPInfo();
  
  
    
  
  searchButton.addEventListener('click',  () =>{
    let ip = document.querySelector('.search-bar').value
    console.log(ip)
    logIPInfo(ip)
  })