// ==UserScript==
// @name         1anime-rm-nav
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       Manyu Lakhotia
// @match        https://1anime.to/episode/*
// @icon         s
// @grant        none
// ==/UserScript==

(function() {
  'use strict';
  var el = document.querySelector('nav');
  el.setAttribute('hidden', true);
})();
