!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(require("element-ui")):"function"==typeof define&&define.amd?define(["element-ui"],t):"object"==typeof exports?exports["@sdx/ui"]=t(require("element-ui")):e["@sdx/ui"]=t(e["element-ui"])}(window,function(e){return function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="./",n(n.s=22)}({0:function(e,t,n){"use strict";function r(e,t,n,r,o,i,a,u){var l,s="function"==typeof e?e.options:e;if(t&&(s.render=t,s.staticRenderFns=n,s._compiled=!0),r&&(s.functional=!0),i&&(s._scopeId="data-v-"+i),a?(l=function(e){(e=e||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(e=__VUE_SSR_CONTEXT__),o&&o.call(this,e),e&&e._registeredComponents&&e._registeredComponents.add(a)},s._ssrRegister=l):o&&(l=u?function(){o.call(this,this.$root.$options.shadowRoot)}:o),l)if(s.functional){s._injectStyles=l;var f=s.render;s.render=function(e,t){return l.call(t),f(e,t)}}else{var c=s.beforeCreate;s.beforeCreate=c?[].concat(c,l):[l]}return{exports:e,options:s}}n.d(t,"a",function(){return r})},1:function(t,n){t.exports=e},22:function(e,t,n){"use strict";n.r(t);var r=function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"sdxu-table"},[t("el-table",this._b({staticStyle:{width:"100%"},attrs:{data:this.data,"row-class-name":this.tableRowClassName}},"el-table",this.params,!1),[this._t("default")],2)],1)};r._withStripped=!0;var o=n(1);var i,a,u,l={name:"SdxuTable",components:(i={},a=o.Table.name,u=o.Table,a in i?Object.defineProperty(i,a,{value:u,enumerable:!0,configurable:!0,writable:!0}):i[a]=u,i),data:function(){return{}},props:{data:{type:Array,default:function(){return[]}},highlightKey:{type:String,default:""},params:{type:Object,default:function(){return{}}}},methods:{tableRowClassName:function(e){return e.row.key===this.highlightKey?"highlight-row":""}}},s=n(0),f=Object(s.a)(l,r,[],!1,null,null,null);f.options.__file="components/table/src/Table.vue";var c=f.exports;c.install=function(e){e.component(c.name,c)};t.default=c}}).default});