!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(require("@sdx/utils/lib/mixins/locale")):"function"==typeof define&&define.amd?define(["@sdx/utils/lib/mixins/locale"],t):"object"==typeof exports?exports["@sdx/ui"]=t(require("@sdx/utils/lib/mixins/locale")):e["@sdx/ui"]=t(e["@sdx/utils/lib/mixins/locale"])}(window,function(e){return function(e){var t={};function n(o){if(t[o])return t[o].exports;var r=t[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}return n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(o,r,function(t){return e[t]}.bind(null,r));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="./",n(n.s=2)}([function(e,t,n){"use strict";function o(e,t,n,o,r,i,u,s){var l,c="function"==typeof e?e.options:e;if(t&&(c.render=t,c.staticRenderFns=n,c._compiled=!0),o&&(c.functional=!0),i&&(c._scopeId="data-v-"+i),u?(l=function(e){(e=e||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(e=__VUE_SSR_CONTEXT__),r&&r.call(this,e),e&&e._registeredComponents&&e._registeredComponents.add(u)},c._ssrRegister=l):r&&(l=s?function(){r.call(this,this.$root.$options.shadowRoot)}:r),l)if(c.functional){c._injectStyles=l;var a=c.render;c.render=function(e,t){return l.call(t),a(e,t)}}else{var d=c.beforeCreate;c.beforeCreate=d?[].concat(d,l):[l]}return{exports:e,options:c}}n.d(t,"a",function(){return o})},function(t,n){t.exports=e},function(e,t,n){"use strict";n.r(t);var o=function(){var e=this.$createElement;return(this._self._c||e)("div",{staticClass:"sdxui-button",on:{click:this.handleClick}},[this._t("default")],2)};o._withStripped=!0;var r=n(1),i={name:"SdxuiButton",mixins:[n.n(r).a],data:()=>({}),props:{size:{type:String,default:"medium"}},methods:{handleClick(){this.$emit("click")}}},u=n(0),s=Object(u.a)(i,o,[],!1,null,null,null);s.options.__file="components/button/src/Button.vue";var l=s.exports;l.install=(e=>{e.component(l.name,l)});t.default=l}]).default});
