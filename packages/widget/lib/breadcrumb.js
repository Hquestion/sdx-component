!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(require("element-ui")):"function"==typeof define&&define.amd?define(["element-ui"],t):"object"==typeof exports?exports["@sdx/widget"]=t(require("element-ui")):e["@sdx/widget"]=t(e["element-ui"])}(window,function(e){return function(e){var t={};function r(n){if(t[n])return t[n].exports;var o=t[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}return r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)r.d(n,o,function(t){return e[t]}.bind(null,o));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="./",r(r.s=1)}([function(t,r){t.exports=e},function(e,t,r){"use strict";r.r(t);var n=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"bread-crumb-container"},[e.breadcrumbs.length?r("el-breadcrumb",{attrs:{separator:e.seperator,"separator-class":e.seperatorClass}},e._l(e.breadcrumbs,function(t,n){return r("el-breadcrumb-item",{key:n,attrs:{to:t}},[e._v("\n            "+e._s(t.meta.breadcrumb)+"\n        ")])}),1):e._e()],1)};n._withStripped=!0;var o=r(0);var a=function(e,t,r,n,o,a,u,i){var s,c="function"==typeof e?e.options:e;if(t&&(c.render=t,c.staticRenderFns=r,c._compiled=!0),n&&(c.functional=!0),a&&(c._scopeId="data-v-"+a),u?(s=function(e){(e=e||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(e=__VUE_SSR_CONTEXT__),o&&o.call(this,e),e&&e._registeredComponents&&e._registeredComponents.add(u)},c._ssrRegister=s):o&&(s=i?function(){o.call(this,this.$root.$options.shadowRoot)}:o),s)if(c.functional){c._injectStyles=s;var d=c.render;c.render=function(e,t){return s.call(t),d(e,t)}}else{var l=c.beforeCreate;c.beforeCreate=l?[].concat(l,s):[s]}return{exports:e,options:c}}({name:"SdxwBreadcrumb",data:()=>({breadcrumbs:[]}),components:{[o.Breadcrumb.name]:o.Breadcrumb},props:{seperator:{type:String,default:"/"},seperatorClass:{type:String,default:""}},watch:{$route:{handler(e){this.breadcrumbs=[],e.matched.forEach(e=>{e.meta&&e.meta.breadcrumb&&this.breadcrumbs.push(e)})},immediate:!0}}},n,[],!1,null,null,null);a.options.__file="components/breadcrumb/src/Breadcrumb.vue";var u=a.exports;u.install=(e=>{e.component(u.name,u)});t.default=u}]).default});