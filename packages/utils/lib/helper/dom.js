"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getBodyScrollTop = getBodyScrollTop;
exports.getNodeScrollTop = getNodeScrollTop;
exports.clacTextWidth = clacTextWidth;
exports.getParentNode = getParentNode;

function getBodyScrollTop() {
  return document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
}

function getNodeScrollTop(node) {
  return node.scrollTop;
}

function clacTextWidth(text) {
  var $el = document.createElement('span');
  $el.innerText = text;
  $el.style.position = 'absolute';
  $el.style.opacity = 0;
  document.appendChild($el);
  var width = $el.offsetWidth;
  $el.remove();
  return width;
}

function getParentNode(node) {
  return node.parentNode;
}