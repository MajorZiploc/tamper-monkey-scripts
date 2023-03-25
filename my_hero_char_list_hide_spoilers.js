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

(function () {
  'use strict';

  function changeText(ele, textChange) {
    ele.innerText = textChange(ele);
  }

  function removeSpoiler(ele) {
    return ele.innerText.replace(new RegExp('Former|Retired|Deceased|Arrested|Defected|Inactive|Active', 'i'), '');
  }

  function removeSpoilers() {
    const domEles = [
      ...document.getElementsByClassName('chargallery-profile-subcaption'),
      ...document.getElementsByClassName('customheader'),
    ];
    domEles.forEach(domEle => changeText(domEle, removeSpoiler));
  }

  const targetNode = document.getElementsByTagName('html')[0];
  const observerConfig = {attributes: true, childList: true};
  const observer = new MutationObserver(removeSpoilers);
  observer.observe(targetNode, observerConfig);
})();
