!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e(require("@sdx/utils/src/mixins/locale")):"function"==typeof define&&define.amd?define(["@sdx/utils/src/mixins/locale"],e):"object"==typeof exports?exports["@sdx/ui"]=e(require("@sdx/utils/src/mixins/locale")):t["@sdx/ui"]=e(t["@sdx/utils/src/mixins/locale"])}(window,function(t){return function(t){var e={};function n(o){if(e[o])return e[o].exports;var r=e[o]={i:o,l:!1,exports:{}};return t[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}return n.m=t,n.c=e,n.d=function(t,e,o){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:o})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)n.d(o,r,function(e){return t[e]}.bind(null,r));return o},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="./",n(n.s=1)}([function(e,n){e.exports=t},function(t,e,n){"use strict";n.r(e);var o=function(){var t=this.$createElement;return(this._self._c||t)("div",{staticClass:"ilv-button",on:{click:this.handleClick}},[this._t("default",[this._v(this._s(this.t("ui.button.ok")))])],2)};o._withStripped=!0;var r=n(0);var i=function(t,e,n,o,r,i,s,u){var l,c="function"==typeof t?t.options:t;if(e&&(c.render=e,c.staticRenderFns=n,c._compiled=!0),o&&(c.functional=!0),i&&(c._scopeId="data-v-"+i),s?(l=function(t){(t=t||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(t=__VUE_SSR_CONTEXT__),r&&r.call(this,t),t&&t._registeredComponents&&t._registeredComponents.add(s)},c._ssrRegister=l):r&&(l=u?function(){r.call(this,this.$root.$options.shadowRoot)}:r),l)if(c.functional){c._injectStyles=l;var a=c.render;c.render=function(t,e){return l.call(e),a(t,e)}}else{var f=c.beforeCreate;c.beforeCreate=f?[].concat(f,l):[l]}return{exports:t,options:c}}({name:"IlvButton",mixins:[n.n(r).a],data:()=>({}),methods:{handleClick(){this.$emit("click")}}},o,[],!1,null,null,null);i.options.__file="components/button/src/Button.vue";var s=i.exports;s.install=(t=>{t.component(s.name,s)});var u=s;const l={Button:u,install:t=>{u.install(t)}};e.default=l}]).default});