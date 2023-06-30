import './css/styles.css';
import CurrencyExchange from './currencyAPI.js';
// Business Logic
function getCurrency(currency, ammount) {
  let promise = CurrencyExchange.getCurrency(currency);
  promise.then(function (getCurrencyRate) {
    printElements(getCurrencyRate, currency, ammount);
  }, function (errorArray) {
    printError(errorArray);
  }
  );
}

function printError(apiResponse) {
  document.querySelector('#showResponse').innerText = `We were unable to get your conversion due to an ${apiResponse.result} with ${apiResponse['error-type']}`;
}

function printElements(apiResponse, currency, ammount) {
  const totalConverted = (ammount * apiResponse.conversion_rate).toFixed(2);
  document.querySelector('#showResponse').innerText = `Your exchange rate from ${ammount} USD to ${currency} is ${totalConverted}`;
}
function handleFormSubmission(event) {
  event.preventDefault();
  const currency = document.querySelector('#currency').value;
  document.querySelector('#currency').value = null;
  const ammount = document.querySelector('#ammount').value;
  document.querySelector('#ammount').value = null;
  getCurrency(currency, ammount);
}

window.addEventListener("load", function () {
  document.querySelector('form').addEventListener("submit", handleFormSubmission);
});

// function printError(apiResponse) {
//   console.log(apiResponse);
//   document.querySelector('#showResponse').innerText = `We were unable to get your conversion due to an ${apiResponse['error-type']}`;
// }