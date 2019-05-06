export function getBodyScrollTop() {
    return document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
}

export function getNodeScrollTop(node) {
    return node.scrollTop;
}
