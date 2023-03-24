// ==UserScript==
// @name         my_hero_char_list_hide_spoilers
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       Manyu Lakhotia
// @match        https://myheroacademia.fandom.com/wiki/List_of_Characters
// @icon         s
// @grant        none
// ==/UserScript==

function hide(eles) {
  for (const ele of eles) {
    ele.setAttribute('hidden', true);
  }
}

(function () {
  'use strict';
  const subcaptions = document.getElementsByClassName('chargallery-profile-subcaption');
  hide(subcaptions);
  const headers = document.getElementsByClassName('customheader');
  hide(headers);
})();
