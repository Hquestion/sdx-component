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

export function getParentNode(node) {
    return node.parentNode;
}
