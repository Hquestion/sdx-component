export function getBodyScrollTop() {
    return document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
}

export function getNodeScrollTop(node) {
    return node.scrollTop;
}

export function clacTextWidth(text) {
    const $el = document.createElement('span');
    $el.innerText = text;
    $el.style.position = 'absolute';
    $el.style.opacity = 0;
    document.appendChild($el);
    let width = $el.offsetWidth;
    $el.remove();
    return width;
}

export function calcNodeWidth(node) {
    const clone = node.cloneNode(true);
    let tempPosition = node.style.position;
    let tempOpacity = node.style.opacity;
    clone.style.opacity = 0;
    clone.style.position = 'absolute';

    document.body.appendChild(clone);
    let width = clone.offsetWidth;
    clone.remove();
    node.style.position = tempPosition;
    node.style.opacity = tempOpacity;
    return width;
}

export function getParentNode(node) {
    return node.parentNode;
}

export function addClass(el, name) {
    if (el.classList && !el.classList.contains(name)) {
        el.classList.add(name);
    }
}

export function removeClass(el, name) {
    el.classList.remove(name);
}

export function getClientWidth() {
    return document.body.clientWidth;
}
