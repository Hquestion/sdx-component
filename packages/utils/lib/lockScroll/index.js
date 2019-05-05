"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.lock = lock;
exports.unlock = unlock;

var _dom = require("@sdx/utils/src/helper/dom");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var scrollTop = 0;

function lock() {
  var target = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

  if (!target) {
    return;
  }

  if (typeof target === 'boolean') {
    scrollTop = (0, _dom.getBodyScrollTop)();
    document.body.style.top = -1 * scrollTop + 'px';
    document.body.style.position = 'fixed';
    document.body.style.overflow = 'hidden';
    document.body.style.width = '100%';
  } else if (typeof target === 'string') {
    var lockEl = document.querySelector(target);

    if (lockEl) {
      scrollTop = (0, _dom.getNodeScrollTop)(lockEl);
      lockEl.style.top = -1 * scrollTop + 'px';
      lockEl.style.position = 'fixed';
    } else {
      throw new Error("".concat(target, "\u8282\u70B9\u4E0D\u5B58\u5728\uFF01"));
    }
  } else if (_typeof(target) === 'object' && target instanceof HTMLElement) {
    scrollTop = (0, _dom.getNodeScrollTop)(target);
    target.style.top = -1 * scrollTop + 'px';
    target.style.position = 'fixed';
  }
}

function unlock(target) {
  if (!target) {
    return;
  }

  if (typeof target === 'boolean') {
    document.body.style.overflow = 'auto';
    document.body.style.position = 'static';
    document.body.style.top = null;

    if (document.documentElement) {
      document.documentElement.scrollTop = scrollTop;
    } else if (window.pageYOffset) {
      window.pageYOffset = scrollTop;
    } else {
      document.body.scrollTop = scrollTop;
    }
  } else if (typeof target === 'string') {
    var lockEl = document.querySelector(target);
    lockEl.style.overflow = 'auto';
    lockEl.style.position = 'static';
    lockEl.style.top = null;
    lockEl.scrollTop = scrollTop;
  } else if (_typeof(target) === 'object' && target instanceof HTMLElement) {
    target.style.overflow = 'auto';
    target.style.position = 'static';
    target.style.top = null;
    target.scrollTop = scrollTop;
  }

  scrollTop = 0;
}