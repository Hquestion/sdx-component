!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports["@sdx/ui"]=t():e["@sdx/ui"]=t()}(window,function(){return function(e){var t={};function n(o){if(t[o])return t[o].exports;var r=t[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}return n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(o,r,function(t){return e[t]}.bind(null,r));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="./",n(n.s=3)}([function(e,t,n){"use strict";function o(e,t,n,o,r,i,u,s){var a,c="function"==typeof e?e.options:e;if(t&&(c.render=t,c.staticRenderFns=n,c._compiled=!0),o&&(c.functional=!0),i&&(c._scopeId="data-v-"+i),u?(a=function(e){(e=e||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(e=__VUE_SSR_CONTEXT__),r&&r.call(this,e),e&&e._registeredComponents&&e._registeredComponents.add(u)},c._ssrRegister=a):r&&(a=s?function(){r.call(this,this.$root.$options.shadowRoot)}:r),a)if(c.functional){c._injectStyles=a;var f=c.render;c.render=function(e,t){return a.call(t),f(e,t)}}else{var d=c.beforeCreate;c.beforeCreate=d?[].concat(d,a):[a]}return{exports:e,options:c}}n.d(t,"a",function(){return o})},,,function(e,t,n){"use strict";n.r(t);var o=function(){var e=this.$createElement;return(this._self._c||e)("div",{staticClass:"sdxui-radio"},[this._v("\n    这是一个radio\n")])};o._withStripped=!0;var r={name:"IlvRadio",data:()=>({})},i=n(0),u=Object(i.a)(r,o,[],!1,null,"6a031c71",null);u.options.__file="components/radio/src/Radio.vue";var s=u.exports;s.install=(e=>{e.component(s.name,s)});t.default=s}]).default});
