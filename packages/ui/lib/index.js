!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(require("@sdx/utils/lib/mixins/locale")):"function"==typeof define&&define.amd?define(["@sdx/utils/lib/mixins/locale"],t):"object"==typeof exports?exports["@sdx/ui"]=t(require("@sdx/utils/lib/mixins/locale")):e["@sdx/ui"]=t(e["@sdx/utils/lib/mixins/locale"])}(window,function(e){return function(e){var t={};function n(i){if(t[i])return t[i].exports;var o=t[i]={i:i,l:!1,exports:{}};return e[i].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=e,n.c=t,n.d=function(e,t,i){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:i})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(i,o,function(t){return e[t]}.bind(null,o));return i},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="./",n(n.s=2)}([function(t,n){t.exports=e},function(e,t){e.exports=require("@sdx/utils/lib/locale")},function(e,t,n){"use strict";n.r(t);var i=function(){var e=this.$createElement;return(this._self._c||e)("div",{staticClass:"sdxui-button",on:{click:this.handleClick}},[this._t("default")],2)};i._withStripped=!0;var o=n(0);function r(e,t,n,i,o,r,s,l){var u,a="function"==typeof e?e.options:e;if(t&&(a.render=t,a.staticRenderFns=n,a._compiled=!0),i&&(a.functional=!0),r&&(a._scopeId="data-v-"+r),s?(u=function(e){(e=e||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(e=__VUE_SSR_CONTEXT__),o&&o.call(this,e),e&&e._registeredComponents&&e._registeredComponents.add(s)},a._ssrRegister=u):o&&(u=l?function(){o.call(this,this.$root.$options.shadowRoot)}:o),u)if(a.functional){a._injectStyles=u;var c=a.render;a.render=function(e,t){return u.call(t),c(e,t)}}else{var d=a.beforeCreate;a.beforeCreate=d?[].concat(d,u):[u]}return{exports:e,options:a}}var s=r({name:"SdxuiButton",mixins:[n.n(o).a],data:()=>({}),props:{size:{type:String,default:"medium"}},methods:{handleClick(){this.$emit("click")}}},i,[],!1,null,null,null);s.options.__file="components/button/src/Button.vue";var l=s.exports;l.install=(e=>{e.component(l.name,l)});var u=l,a=function(){var e=this.$createElement;return(this._self._c||e)("div",{staticClass:"sdxui-radio"},[this._v("\n    这是一个radio\n")])};a._withStripped=!0;var c=r({name:"IlvRadio",data:()=>({})},a,[],!1,null,"6a031c71",null);c.options.__file="components/radio/src/Radio.vue";var d=c.exports;d.install=(e=>{e.component(d.name,d)});var f=d,p=n(1);const _={Button:u,Radio:f,install:(e,{i18n:t}={})=>{u.install(e),f.install(e),Object(p.registerI18n)(t)}};t.default=_}]).default});