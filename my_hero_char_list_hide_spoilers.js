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

function changeText(eles, textChange) {
  for (const ele of eles) {
    ele.innerText = textChange(ele);
  }
}

function removeSpoiler(ele) {
  return ele.innerText.replace(new RegExp('Former|Retired|Deceased|Arrested|Defected|Inactive', 'i'), '');
}

(function () {
  'use strict';
  const subcaptions = document.getElementsByClassName('chargallery-profile-subcaption');
  changeText(subcaptions, removeSpoiler);
  const headers = document.getElementsByClassName('customheader');
  changeText(headers, removeSpoiler);
})();
