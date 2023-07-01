import './css/styles.css';
import CurrencyExchange from './currencyAPI.js';
// Business Logic
function getCurrency(currency, amount) {
  let promise = CurrencyExchange.getCurrency(currency);
  promise.then(function (getCurrencyRate) {
    printElements(getCurrencyRate, currency, amount);
  }, function (errorArray) {
    printError(errorArray);
  }
  );
}

function printError(apiResponse) {
  if (apiResponse['error-type'] === "invalid-key") {
    document.querySelector('#showResponse').innerText = `We were unable to get your conversion due to an ${apiResponse.result} with ${apiResponse['error-type']}`;
  } else if (apiResponse['error-type'] === "malformed-request") {
    document.querySelector('#showResponse').innerText = `The request made was for an unsupported currency. Please check your input or see list of supported currencies.`;
  } else {
    document.querySelector('#showResponse').innerText = `We were unable to get your conversion due to an ${apiResponse.result} with ${apiResponse['error-type']}`;
  }
}

function printElements(apiResponse, currency, amount) {
  if (isNaN(amount)) {
    document.querySelector('#showResponse').innerText = "Please enter a number value"
  } else {
    const totalConverted = (amount * apiResponse.conversion_rate).toFixed(2);
    document.querySelector('#showResponse').innerText = `Your exchange rate from ${amount} USD to ${currency.toUpperCase()} is ${totalConverted}`;
  }
}
function handleFormSubmission(event) {
  event.preventDefault();
  const currency = document.querySelector('#currency').value;
  document.querySelector('#currency').value = null;
  const amount = document.querySelector('#amount').value;
  document.querySelector('#amount').value = null;
  getCurrency(currency, amount);
}

window.addEventListener("load", function () {
  document.querySelector('form').addEventListener("submit", handleFormSubmission);
});

// function printError(apiResponse) {
//   console.log(apiResponse);
//   document.querySelector('#showResponse').innerText = `We were unable to get your conversion due to an ${apiResponse['error-type']}`;
// }