import './css/styles.css';
import MapSearch from './postalCodeAPI.js';

// Business Logic
function postalCodeSearch(city, zipcode) {
  let promise = MapSearch.postalCodeSearch(city, zipcode);
  promise.then(function (getLonLat) {
    printElements(postalCodeSearch, city, zipcode);
    console.log(getLonLat);
    console.log(postalCodeSearch);
  }, function (errorArray) {
    printError(errorArray);
  }
  );
}

function printError(apiResponse) {
  document.querySelector('#showResponse').innerText = `We were unable to get your conversion due to an ${apiResponse.statusDescription} with ${apiResponse.errorDetails}`;
}


var map = L.map('map').setView([45.512794, -122.679565], 15);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

function printElements(apiResponse, city, zipcode) {
  document.querySelector('#showResponse').innerText = `Your coordinates for ${city} in the zip code of ${zipcode}  ${apiResponse.resourceSets[0].resources[0].point.coordinates}`;
}

function handleFormSubmission(event) {
  event.preventDefault();
  const city = document.querySelector('#city').value;
  document.querySelector('#city').value = null;
  const zipcode = document.querySelector('#zipcode').value;
  document.querySelector('#zipcode').value = null;
  getCurrency(city, zipcode);
}

window.addEventListener("load", function () {
  document.querySelector('form').addEventListener("submit", handleFormSubmission);
});

