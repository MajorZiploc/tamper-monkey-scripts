// If position: sticky isnt working. a missing height property on any ancestor of the ele in question may cause it
// add height: 100% from closest ancestor up until it fixes the sticky position
// get parent of item with position sticky set
let parent = document.querySelector('.sticky-header').parentElement;

while (parent) {
    const hasOverflow = getComputedStyle(parent).overflow;
    if (hasOverflow !== 'visible') {
        console.log(hasOverflow, parent);
    }
    parent = parent.parentElement;
}

