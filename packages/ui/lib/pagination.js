!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(require("element-ui")):"function"==typeof define&&define.amd?define(["element-ui"],t):"object"==typeof exports?exports["@sdx/ui"]=t(require("element-ui")):e["@sdx/ui"]=t(e["element-ui"])}(window,function(e){return function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="./",n(n.s=26)}({0:function(e,t,n){"use strict";function r(e,t,n,r,o,u,i,a){var c,l="function"==typeof e?e.options:e;if(t&&(l.render=t,l.staticRenderFns=n,l._compiled=!0),r&&(l.functional=!0),u&&(l._scopeId="data-v-"+u),i?(c=function(e){(e=e||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(e=__VUE_SSR_CONTEXT__),o&&o.call(this,e),e&&e._registeredComponents&&e._registeredComponents.add(i)},l._ssrRegister=c):o&&(c=a?function(){o.call(this,this.$root.$options.shadowRoot)}:o),c)if(l.functional){l._injectStyles=c;var s=l.render;l.render=function(e,t){return c.call(t),s(e,t)}}else{var f=l.beforeCreate;l.beforeCreate=f?[].concat(f,c):[c]}return{exports:e,options:l}}n.d(t,"a",function(){return r})},1:function(t,n){t.exports=e},26:function(e,t,n){"use strict";n.r(t);var r=function(){var e=this,t=e.$createElement;return(e._self._c||t)("el-pagination",{staticClass:"sdxu-pagination",attrs:{background:"",layout:"prev, pager, next",total:e.total,"current-page":e.current,"page-size":e.pageSize,disabled:e.disabled,"pager-count":e.pagerCount},on:{"update:currentPage":function(t){e.current=t},"update:current-page":function(t){e.current=t},"current-change":e.currentChange}})};r._withStripped=!0;var o=n(1);var u,i,a,c={name:"SdxuPagination",data:function(){return{current:this.currentPage}},watch:{currentPage:function(e){this.current=e}},components:(u={},i=o.Pagination.name,a=o.Pagination,i in u?Object.defineProperty(u,i,{value:a,enumerable:!0,configurable:!0,writable:!0}):u[i]=a,u),props:{total:{type:Number,default:null},disabled:{type:Boolean,default:!1},currentPage:{type:Number,default:1},pageSize:{type:Number,default:10},pagerCount:{type:Number,default:7}},methods:{currentChange:function(e){this.$emit("update:currentPage",e),this.$emit("current-change",e)}}},l=n(0),s=Object(l.a)(c,r,[],!1,null,null,null);s.options.__file="components/pagination/src/Pagination.vue";var f=s.exports;f.install=function(e){e.component(f.name,f)};t.default=f}}).default});