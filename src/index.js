import './css/styles.css';
import MapSearch from './postalCodeAPI.js';

// Business Logic
function postalCodeSearch(city, zipcode) {
  let promise = MapSearch.postalCodeSearch(city, zipcode);
  promise.then(function (getLonLat) {
    // printElements(getLonLat, city, zipcode);
    const coordArray = getLonLat.resourceSets[0].resources[0].point.coordinates
    console.log(coordArray);
    const coordString = coordArray.join(', ');
    console.log(coordString);
    nurserySearchTwo(coordString);
  }, function (errorArray) {
    printError(errorArray);
  });
}



function nurserySearchTwo(coordString) {
  let promise = MapSearch.nurserySearchTwo(coordString);
  promise.then(function (info) {
    console.log(info.resourceSets[0]);
    printElements(info.resourceSets[0].resources);
  }, function (errorArray) {
    printError(errorArray);
  });
}


function printError(apiResponse) {
  document.querySelector('#showResponse').innerText = `We were unable to get your conversion due to an ${apiResponse.statusDescription} with ${apiResponse.errorDetails}`;
}

function printElements(info) {
  console.log(info);
  let showResponseElement = document.querySelector('#showResponse');
  showResponseElement.innerText = ''; // Clear the content before appending
  for (let i = 0; i < 5; i++) {
    showResponseElement.innerText += `${info[i].name} + ${info[i].PhoneNumber} + ${info[i].Address.addressLine} + ${info[i].Website}\n`;
  }
}

function handleFormSubmission(event) {
  event.preventDefault();
  const city = document.querySelector('#city').value;
  document.querySelector('#city').value = null;
  const zipcode = document.querySelector('#zipcode').value;
  document.querySelector('#zipcode').value = null;
  postalCodeSearch(city, zipcode);
  console.log(city, zipcode);
}

window.addEventListener("load", function () {
  document.querySelector('form').addEventListener("submit", handleFormSubmission);
});


