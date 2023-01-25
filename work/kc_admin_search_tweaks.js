// ==UserScript==
// @name         kc_admin_search_tweaks
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  keycloak admin console user list tweaks
// @author       You
// @match        https://*.conservis.cc/auth/admin/master/console*
// @match        http://localhost:9080/auth/admin/master/console*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

function ready(callback) {
  // in case the document is already rendered
  if (document.readyState !== 'loading') setTimeout(callback, 1);
  // modern browsers
  else if (document.addEventListener) document.addEventListener('DOMContentLoaded', callback);
}

function onStateChange(doOnNotReady, doOnReady, isReadyPred) {
  let isNotReadyCallBackSuccess = false;
  let intervalId = window.setInterval(function () {
    const isReady = isReadyPred.call(this);
    if (isReady) {
      doOnReady.call(this);
      window.clearInterval(intervalId);
    } else {
      if (!isNotReadyCallBackSuccess) {
        isNotReadyCallBackSuccess = doOnNotReady.call(this);
      }
    }
  }, 500);
}

function getSearchBtn() {
  return document.querySelector('button[aria-label="Search"]');
}

function getInputBox() {
  return document.querySelector('input[name="search-input"]');
}

function elesThatMustExist() {
  return getInputBox() && getSearchBtn();
}

function guts() {
  onStateChange(function () {
    return true;
  }, function () {
    const input = getInputBox();
    input.value = '*';
    const search = getSearchBtn();
    search.focus();
  }, getInputBox
  );
}

function main() {
  'use strict';
  guts();
}

ready(main);
