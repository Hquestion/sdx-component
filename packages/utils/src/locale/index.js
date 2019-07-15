let defaultLang = 'zh-CN';
let merged = false;
let i18n;

function getLangMessage(lang) {
    let langMsg;
    try {
        langMsg = require(`./lang/${lang}`);
    }catch (e) {
        return null;
    }
    return langMsg.default;
}

function setLang(lang) {
    defaultLang =lang;
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
    if (this) {
        const vuei18n = Object.getPrototypeOf(this).$t || (i18n && i18n.t);
        if (typeof vuei18n === 'function' && (!!this.$i18n || !!i18n)) {
            if (!merged) {
                merged = true;
                defaultLang = (this.$i18n || i18n).locale;
                (this.$i18n || i18n).mergeLocaleMessage(defaultLang, getLangMessage(defaultLang));
            }
            if (Object.getPrototypeOf(this).$t) {
                return vuei18n.apply(this, arguments);
            } else {
                return i18n.t(arguments[0], arguments[1]);
            }
        }
    } else {
        const vuei18n = i18n && i18n.t;
        if (typeof vuei18n === 'function') {
            if (!merged) {
                merged = true;
                defaultLang = i18n.locale;
                i18n.mergeLocaleMessage(defaultLang, getLangMessage(defaultLang));
            }
            return i18n.t(arguments[0], arguments[1]);
        }
    }
}

function t(key, langOpt) {
    let value = i18nHandler.apply(this, [key]);
    if (value !== null && value !== undefined) return value;
    let lang = getLangMessage(langOpt || defaultLang);
    if (!lang) return key;
    let keys = key.split('.');
    for (let i = 0; i < keys.length; i++) {
        value = (value || lang)[keys[i]];
    }
    if (value !== null && value !== undefined) {
        return value;
    }
    return key;
}

export {setLang, getLang, t, registerI18n};
export default {setLang, getLang, t, registerI18n};
