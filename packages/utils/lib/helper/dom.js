"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getBodyScrollTop = getBodyScrollTop;
exports.getNodeScrollTop = getNodeScrollTop;

function getBodyScrollTop() {
  return document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
}

function getNodeScrollTop(node) {
  return node.scrollTop;
}