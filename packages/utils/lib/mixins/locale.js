"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _locale = require("../locale");

var _default = {
  methods: {
    t: function t(key) {
      return _locale.t.call(this, key);
    }
  }
};
exports["default"] = _default;