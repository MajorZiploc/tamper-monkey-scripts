// ==UserScript==
// @name         video-playback-rate-change
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       Manyu Lakhotia
//// TODO: change this url
// @match        https://1anime.to/episode/* 
// @icon         s
// @grant        none
// ==/UserScript==

(function() {
  'use strict';
  // find a <video tag and speed up the playbackRate
  document.querySelector('video').playbackRate = 10
})();
