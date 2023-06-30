import './css/styles.css';
import CurrencyExchange from './currencyAPI.js';
// Business Logic
function getCurrency(currency) {
  let promise = CurrencyExchange.getCurrency(currency);
  promise.then(function (getCurrencyRate) {
    printElements(getCurrencyRate);
  }, function (errorArray) {
    printError(errorArray);
  }
  );
}

function printError(apiResponse) {
  console.log(apiResponse);
  document.querySelector('#showResponse').innerText = `There was an error accessing the gif: ${apiResponse.result}`;
}

function printElements(apiResponse) {
  console.log(apiResponse);
  document.querySelector('#showResponse').innerText = `Your exchange ragte is ${apiResponse.conversion_rate}`;
}
function handleFormSubmission(event) {
  event.preventDefault();
  const currency = document.querySelector('#currency').value;
  document.querySelector('#currency').value = null;
  getCurrency(currency);
}

window.addEventListener("load", function () {
  document.querySelector('form').addEventListener("submit", handleFormSubmission);
});