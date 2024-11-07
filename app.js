'use strict';

const ipAddressField = document.querySelector('.ipAddressField');
const timezoneInput = document.querySelector('.timezoneInput');
const countryLocationInput = document.querySelector('.locationInput');
const ispInput = document.querySelector('.ispInput');
const submitBtn = document.querySelector('.submit-btn');
const inputField = document.querySelector('.input-field');

let map = L.map('map').setView([51.505, -0.09], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

const mapLocation = (lat, lng) => {
  var markerIcon = L.icon({
    iconUrl: 'images/icon-location.svg',
    iconSize: [46, 56],
    iconAnchor: [23, 55],
  });
  map.setView([lat, lng], 17);

  L.marker([lat, lng], { icon: markerIcon }).addTo(map);
};

const fetchLocationData = (ip) => {
  const url = `https://api.ipgeolocation.io/ipgeo?apiKey=${process.env.API_KEY}&ip=${ip}`;
  fetch(url)
    .then((response) => response.json())
    .then((response) => {
      const { ip, time_zone, country_name, city, zipcode, isp, latitude, longitude } = response;

      ipAddressField.innerHTML = ip;
      timezoneInput.innerHTML = `UTC ${time_zone.offset}`;
      countryLocationInput.innerHTML = `${country_name}, ${city} ${zipcode}`;
      ispInput.innerHTML = isp;
      mapLocation(latitude, longitude);
    })
    .catch((error) => console.error('Error fetching location data:', error));
};

fetchLocationData('');

submitBtn.addEventListener('click', (event) => {
  event.preventDefault();
  const ip = inputField.value;

  if (
    ip.match(
      /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
    )
  ) {
    fetchLocationData(ip);
  } else {
    alert('You have entered an invalid IP address!');
  }
});
