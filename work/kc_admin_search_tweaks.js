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

function onEleStateChange(doOnNotReady, doOnReady, isEleReadPred) {
  let asNotReadyCallBackSuccess = false;
  let intervalId = window.setInterval(function () {
    const isEleReady = isEleReadPred.call(this);
    if (isEleReady) {
      doOnReady.call(this);
      window.clearInterval(intervalId);
    } else {
      if (!asNotReadyCallBackSuccess) {
        asNotReadyCallBackSuccess = doOnNotReady.call(this);
      }
    }
  }, 500);
}

function getInputBox() {
  return document.querySelector('input[name="search-input"]');
}

function guts() {
  onEleStateChange(function () {
    return true;
  }, function () {
    const input = getInputBox();
    input.value = '*';
  },
    function () {
      return getInputBox();
    }
  );
}

function main() {
  'use strict';
  guts();
}

ready(main);
