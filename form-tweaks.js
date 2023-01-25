// ==UserScript==
// @name         form-tweaks
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Various QOL generic form tweaks
// @author       Manyu Lakhotia
// @match        https://*/*
// @icon         s
// @grant        GM_addStyle
// @grant  GM_getResourceText
// ==/UserScript==

/**
 *
 * deprecated in favor of using GM_addStyle
 *
 */
function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    // deprecated and the default is 'text/css' anyways
    // style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

function setSpinnerVisible(spinner) {
    if (!spinner) return;
    spinner.removeAttribute('hidden');
    return true;
  }

function setSpinnerInvisible(spinner) {
  if (!spinner) return;
  spinner.setAttribute('hidden', 'true');
  return true;
}

const onClickSubmitShowSpinner = function (spinnerId) {
  const forms = document.getElementsByTagName('form');
  let allFormsValid = true;
  for (const form of forms) {
    if (!form.checkValidity()) {
      allFormsValid = false;
      break;
    }
  }
  if (allFormsValid) {
    const spinner = document.getElementById(spinnerId);
    setTimeout(function () {
      setSpinnerVisible(spinner);
    }, 1000);
  }
}

  function addSubmitSpinners() {
    const submitBtns = document.querySelectorAll('input[type="submit"]');
    for (let i=0; i < submitBtns.length; i++) {
      const submitBtn = submitBtns[i];
      const submitBtnWrapper = submitBtn.parentElement;
      const spinnerIdPrefix = i+'-generic-submit-spinner-';
      const spinner = makeSpinner(submitBtnWrapper, spinnerIdPrefix);
      let onClickValue = submitBtn.getAttribute('onclick');
      onClickValue = onClickValue && onClickValue.length > 0 ? onClickValue + ';' : onClickValue;
      onClickValue = onClickValue || '';
      onClickValue += 'identityLogin.onClickSubmitShowSpinner("'+spinner.id+'");';
      submitBtn.setAttribute('onclick', onClickValue);
    }
  }

/**
 * POTENTIAL LOAD GIF IN PURE CSS
 * from: https://365webresources.com/best-pure-css-loading-spinners/
 * 

.dots-bars-4 {
  width: 40px;
  height: 20px;
  --c:radial-gradient(farthest-side,currentColor 93%,#0000);
  background:
    var(--c) 0    0,
    var(--c) 50%  0,
    var(--c) 100% 0;
  background-size:8px 8px;
  background-repeat: no-repeat;
  position: relative;
  animation: db4-0 1s linear infinite alternate;
}

.dots-bars-4:before {
  content: "";
  position: absolute;
  width: 8px;
  height: 12px;
  background:currentColor;
  left:0;
  top:0;
  animation: 
    db4-1 1s  linear infinite alternate,
    db4-2 0.5s cubic-bezier(0,200,.8,200) infinite;
}

@keyframes db4-0 {
  0%      {background-position: 0  100%,50% 0   ,100% 0}
  8%,42%  {background-position: 0  0   ,50% 0   ,100% 0}
  50%     {background-position: 0  0   ,50% 100%,100% 0}
  58%,92% {background-position: 0  0   ,50% 0   ,100% 0}
  100%    {background-position: 0  0   ,50% 0   ,100% 100%}
}

@keyframes db4-1 {
  100% {left:calc(100% - 8px)}
}

@keyframes db4-2 {
  100% {top:-0.1px}
}

 */

  // TODO: make a generic spinner or message or icon or toast for any site to use
  // currently using a patternfly spinner. wont work on all sites
  function makeSpinner(parentElement, idPrefix) {
    if (!parentElement) return undefined;

    /*
    <div id="undefined-spinner-div" hidden="true">
      <span class="pf-c-spinner pf-m-md" role="progressbar" aria-valuetext="Loading..." aria-label="Contents">
        <span class="pf-c-spinner__clipper"></span>
        <span class="pf-c-spinner__lead-ball"></span>
        <span class="pf-c-spinner__tail-ball"></span>
      </span>
    </div>
    */

    const spinnerDiv = document.createElement('div');
    const spinnerDivAttrs = [
      {label: 'id', value: idPrefix+'-spinner-div'},
      {label: 'hidden', value: 'true'},
    ];
    for (const attr of spinnerDivAttrs) {
      spinnerDiv.setAttribute(attr.label, attr.value);
    }

    const spinnerWrapper = document.createElement('span');
    const spinnerWrapperAttrs = [
      {label: 'id', value: idPrefix+'-spinner'},
      {label: 'class', value: 'pf-c-spinner pf-m-xl'},
      {label: 'role', value: 'progressbar'},
      {label: 'aria-valuetext', value: 'Loading...'},
      {label: 'aria-label', value: 'Contents'},
    ];
    for (const attr of spinnerWrapperAttrs) {
      spinnerWrapper.setAttribute(attr.label, attr.value);
    }

    const spinnerClipper = document.createElement('span');
    const spinnerClipperAttrs = [
      {label: 'id', value: idPrefix+'-spinner-clipper'},
      {label: 'class', value: 'pf-c-spinner__clipper'},
    ];
    for (const attr of spinnerClipperAttrs) {
      spinnerClipper.setAttribute(attr.label, attr.value);
    }
    spinnerWrapper.appendChild(spinnerClipper);

    const spinnerLeadBall = document.createElement('span');
    const spinnerLeadBallAttrs = [
      {label: 'id', value: idPrefix+'-spinner-lead-ball'},
      {label: 'class', value: 'pf-c-spinner__lead-ball'},
    ];
    for (const attr of spinnerLeadBallAttrs) {
      spinnerLeadBall.setAttribute(attr.label, attr.value);
    }
    spinnerWrapper.appendChild(spinnerLeadBall);

    const spinnerTailBall = document.createElement('span');
    const spinnerTailBallAttrs = [
      {label: 'id', value: idPrefix+'-spinner-tail-ball'},
      {label: 'class', value: 'pf-c-spinner__tail-ball'},
    ];
    for (const attr of spinnerTailBallAttrs) {
      spinnerTailBall.setAttribute(attr.label, attr.value);
    }
    spinnerWrapper.appendChild(spinnerTailBall);

    spinnerDiv.appendChild(spinnerWrapper);
    parentElement.appendChild(spinnerDiv);
    return spinnerDiv;
  }

(function() {
  'use strict';
  // GM_addStyle('body { background-color: red !important; }');
  // GM_addStyle('h1 { background-color: red !important; }');
  GM_addStyle('h1 { background-color: red !important; }');
  GM_addStyle('.dots-bars-4 { width: 40px; height: 20px; --c:radial-gradient(farthest-side,currentColor 93%,#0000); background: var(--c) 0    0, var(--c) 50%  0, var(--c) 100% 0; background-size:8px 8px; background-repeat: no-repeat; position: relative; animation: db4-0 1s linear infinite alternate; }');
  GM_addStyle('.dots-bars-4:before { content: ""; position: absolute; width: 8px; height: 12px; background:currentColor; left:0; top:0; animation: db4-1 1s  linear infinite alternate, db4-2 0.5s cubic-bezier(0,200,.8,200) infinite; }');
  GM_addStyle(`
@keyframes db4-0 {
  0%      {background-position: 0  100%,50% 0   ,100% 0}
  8%,42%  {background-position: 0  0   ,50% 0   ,100% 0}
  50%     {background-position: 0  0   ,50% 100%,100% 0}
  58%,92% {background-position: 0  0   ,50% 0   ,100% 0}
  100%    {background-position: 0  0   ,50% 0   ,100% 100%}
}
  `);
  GM_addStyle(`
@keyframes db4-1 {
  100% {left:calc(100% - 8px)}
}
`);
  GM_addStyle(`
@keyframes db4-2 {
  100% {top:-0.1px}
}
  `);

  const h1s = document.getElementsByTagName('h1')
  for (const h1 of h1s) {
    const dotsBars4 = document.createElement('div');
    dotsBars4.setAttribute('class', 'dots-bars-4');
    const p = h1.parentElement;
    p.appendChild(dotsBars4);
  }

  // TODO: add password visible toggle btn
  // would be nice if it only happened if a toggle didnt exist
  //
  // TODO: add spinner on click of submit buttons on valid form after 1 second

})();

