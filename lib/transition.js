let TRANSITION = null;
let TRANSITIONEND = null;
let TRANSITION_CSS = null;
if (typeof document.body.style.transition === 'string') {
    TRANSITION = 'transition';
    TRANSITIONEND = 'transitionend';
    TRANSITION_CSS = 'transition';
} else if (typeof document.body.style.webkitTransition === 'string') {
    TRANSITION = 'WebkitTransition';
    TRANSITION_CSS = '-webkit-transition';
    TRANSITIONEND = 'webkitTransitionEnd';
}

let TRANSFORM = null;
let TRANSFORM_CSS = null;
if (typeof document.body.style.transform === 'string') {
    TRANSFORM = 'transform';
    TRANSFORM_CSS = 'transform';
} else if (typeof document.body.style.webkitTransform === 'string') {
    TRANSFORM = 'WebkitTransform';
    TRANSFORM_CSS = '-webkit-transform';
}

export {
    TRANSITION,
    TRANSITIONEND,
    TRANSITION_CSS,
    TRANSFORM,
    TRANSFORM_CSS,
};
