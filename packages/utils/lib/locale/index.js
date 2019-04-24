"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setLang = setLang;
exports.getLang = getLang;
exports.t = t;
exports.registerI18n = registerI18n;
exports["default"] = void 0;
var defaultLang = 'zh-CN';
var merged = false;
var i18n;

function getLangMessage(lang) {
  var langMsg;

  try {
    langMsg = require("./lang/".concat(lang));
  } catch (e) {
    return null;
  }

  return langMsg["default"];
}

function setLang(lang) {
  defaultLang = lang;

  try {
    getLangMessage(lang);
  } catch (e) {
    defaultLang = 'zh-CN';
  }

  return defaultLang;
}

function getLang() {
  return defaultLang;
}

function registerI18n(i18nInstance) {
  i18n = i18nInstance;
}

function i18nHandler() {
  var vuei18n = Object.getPrototypeOf(this).$t || i18n && i18n.t;

  if (typeof vuei18n === 'function' && (!!this.$i18n || !!i18n)) {
    if (!merged) {
      merged = true;
      defaultLang = (this.$i18n || i18n).locale;
      (this.$i18n || i18n).mergeLocaleMessage(defaultLang, getLangMessage(defaultLang));
    }

    return vuei18n.apply(this, arguments);
  }
}

function t(key, langOpt) {
  var value = i18nHandler.apply(this, [key]);
  if (value !== null && value !== undefined) return value;
  var lang = getLangMessage(langOpt || defaultLang);
  if (!lang) return key;
  var keys = key.split('.');

  for (var i = 0; i < keys.length; i++) {
    value = (value || lang)[keys[i]];
  }

  if (value !== null && value !== undefined) {
    return value;
  }

  return key;
}

var _default = {
  setLang: setLang,
  getLang: getLang,
  t: t,
  registerI18n: registerI18n
};
exports["default"] = _default;