  function addGlobalStyleToEula(css) {
    var head, style;
    const iframe = document.getElementById('eula');
    if (!(iframe && iframe.contentWindow && iframe.contentWindow.document)) return;
    head = iframe.contentWindow.document.getElementsByTagName('head')[0];
    if (!head) return;
    style = document.createElement('style');
    // deprecated and the default is 'text/css' anyways
    // style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
  }

function addFlagClasses() {
const iframe = document.getElementById('eula');
if (!(iframe && iframe.contentWindow && iframe.contentWindow.document)) return;
addGlobalStyleToEula('.eula-flag-img { max-height: 20.5rem; }');
addGlobalStyleToEula('@media (max-width: 767px) , (max-height: 767px) { .whiteLogo { max-height: 6.5rem; } .eula-flag-img { max-height: 6.25rem; } }');
addGlobalStyleToEula('@media (max-height: 835px) and (max-width: 500px) , (max-height: 550px) { .eula-flag-img { max-height: 3.25rem; } }');
const flagImgs = iframe.contentWindow.document.querySelectorAll('.x-anchor-content .x-graphic img');
for (const flagImg of flagImgs) {
  flagImg.classList.add('eula-flag-img');
}
}

