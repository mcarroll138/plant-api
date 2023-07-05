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

// let promise = fetch(url, [options])
// let url = 'https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits';
// let response = await fetch(url);

// let commits = await response.json(); // read response body and parse as JSON

// alert(commits[0].author.login);

function nurserySearchTwo(coordString) {
  let promise = MapSearch.nurserySearchTwo(coordString);
  promise.then(function (info) {
    console.log(info.resourceSets[0].resources);
    for (let i = 0; i < info.resourceSets[0].resources.length; i++) {
      printElements(info.resourceSets[0].resources[i].name + info.resourceSets[0].resources[i].PhoneNumber + info.resourceSets[0].resources[i].Address + info.resourceSets[0].resources[i].Website)
      if (i === 5) {
        break;
      }
    }
  }, function (errorArray) {
    printError(errorArray);
  });
}

// function nurserySearchTwo(userLocation) {
//   const url = `https://dev.virtualearth.net/REST/v1/LocalSearch/?query=nursery&userLocation=${userLocation}&key=${process.env.BING_KEY}`;
//   const apiResponse = fetch(url);
//   console.log(apiResponse);
//   // const website2 = apiResponse.resourceSets[0].resources[0].point.coordinates;
//   // console.log(website2)
// }

// function nurserySearch(userLocation) {
//   const url = `https://dev.virtualearth.net/REST/v1/LocalSearch/?query=nursery&userLocation=${userLocation}&key=${process.env.BING_KEY}`;
//   fetch(url)
//     .then(response => response.json())
//     .then(data => {
//       const website1 = apiResponse.resourceSets[0].resources[0].Website;
//       console.log(website1);
//       // Handle the response data from the nursery search API request
//       console.log("Searched parameters:");
//       console.log("User Location:", userLocation);
//       console.log("Response Data:", data);
//       // Further processing or manipulation of the response data
//       // ...
//     })
//     .catch(error => {
//       // Handle the error from the nursery search API request
//       console.error(error);
//     });
// }

function printError(apiResponse) {
  document.querySelector('#showResponse').innerText = `We were unable to get your conversion due to an ${apiResponse.statusDescription} with ${apiResponse.errorDetails}`;
}

function printElements(apiResponse, city, zipcode) {
  const userLocation = apiResponse.resourceSets[0].resources[0].point.coordinates;
  document.querySelector('#showResponse').innerText = `Your coordinates for ${city} with the zip code of ${zipcode}, is ${apiResponse.resourceSets[0].resources[0].point.coordinates}`;

  console.log(userLocation);
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


// let promise = fetch(url, [options])