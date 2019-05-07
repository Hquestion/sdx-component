!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e(require("element-ui/lib/transitions/collapse-transition")):"function"==typeof define&&define.amd?define(["element-ui/lib/transitions/collapse-transition"],e):"object"==typeof exports?exports["@sdx/ui"]=e(require("element-ui/lib/transitions/collapse-transition")):t["@sdx/ui"]=e(t["element-ui/lib/transitions/collapse-transition"])}(window,function(t){return function(t){var e={};function n(o){if(e[o])return e[o].exports;var i=e[o]={i:o,l:!1,exports:{}};return t[o].call(i.exports,i,i.exports,n),i.l=!0,i.exports}return n.m=t,n.c=e,n.d=function(t,e,o){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:o})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)n.d(o,i,function(e){return t[e]}.bind(null,i));return o},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="./",n(n.s=21)}({0:function(t,e,n){"use strict";function o(t,e,n,o,i,r,s,d){var u,l="function"==typeof t?t.options:t;if(e&&(l.render=e,l.staticRenderFns=n,l._compiled=!0),o&&(l.functional=!0),r&&(l._scopeId="data-v-"+r),s?(u=function(t){(t=t||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(t=__VUE_SSR_CONTEXT__),i&&i.call(this,t),t&&t._registeredComponents&&t._registeredComponents.add(s)},l._ssrRegister=u):i&&(u=d?function(){i.call(this,this.$root.$options.shadowRoot)}:i),u)if(l.functional){l._injectStyles=u;var a=l.render;l.render=function(t,e){return u.call(e),a(t,e)}}else{var c=l.beforeCreate;l.beforeCreate=c?[].concat(c,u):[u]}return{exports:t,options:l}}n.d(e,"a",function(){return o})},21:function(t,e,n){"use strict";n.r(e);var o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{class:["sdxu-button","sdxu-button--"+t.size,"sdxu-button--"+t.type,t.plain?"is-plain":"",t.disabled?"is-disabled":"",t.loading?"is-loading":"",t.invert?"is-invert":"",t.shadow?"is-shadow":"",t.block?"is-block":"",t.iconOnly?"is-icon":""],on:{click:function(e){return e.stopPropagation(),t.handleClick(e)},mouseover:t.handleMouseOver,mouseout:t.handleMouseOut}},[t.iconShown?n("i",{class:["sdxu-button__icon sdx-icon",t.iconShown]}):t._e(),t._v(" "),n("span",{staticClass:"sdxu-button__main"},[t._t("default")],2),t._v(" "),t.$slots.dropdown&&!t.iconOnly?n("span",{staticClass:"sdxu-button__icon--dropdown",class:[t.dropdownVisible?"is-reverse":""]},[n("i",{staticClass:"sdx-icon iconicon-caret-bottom"})]):t._e(),t._v(" "),n("el-collapse-transition",[t.$slots.dropdown?n("div",{directives:[{name:"show",rawName:"v-show",value:t.dropdownVisible,expression:"dropdownVisible"}],staticClass:"sdxu-button__dropdown",class:["hover"===t.trigger?"is-hover":"","right"===t.placement?"sdxu-button__dropdown--place-right":"sdxu-button__dropdown--place-left"],style:{width:"calc("+t.dropdownWidth+" + 20px)"}},[n("div",{staticClass:"sdxu-button__dropdown--main"},[t._t("dropdown")],2)]):t._e()])],1)};o._withStripped=!0;var i=n(6),r=n.n(i),s=n(8);var d,u,l,a={name:"SdxuButton",componentName:"SdxuButton",data:function(){return{dropdownVisible:!1}},mixins:[n.n(s).a],components:(d={},u=r.a.name,l=r.a,u in d?Object.defineProperty(d,u,{value:l,enumerable:!0,configurable:!0,writable:!0}):d[u]=l,d),props:{size:{type:String,default:"regular"},type:{type:String,default:"primary"},invert:{type:Boolean,default:!1},plain:{type:Boolean,default:!1},disabled:{type:Boolean,default:!1},shadow:{type:Boolean,default:!1},icon:{type:String,default:""},iconOnly:{type:Boolean,default:!1},loading:{type:Boolean,default:!1},block:{type:Boolean,default:!1},trigger:{type:String,default:"hover"},dropdownWidth:{type:String,default:"100%"},placement:{type:String,default:"left"}},computed:{iconShown:function(){return this.loading?"iconicon-success":this.icon}},methods:{handleClick:function(){"click"===this.trigger?this.dropdownVisible=!0:this.$emit("click"),this.dispatch("SdxuButton","sdxu.button.hideDropdown")},handleMouseOver:function(){"hover"===this.trigger?this.dropdownVisible=!0:this.$emit("mosueover")},handleMouseOut:function(){"hover"===this.trigger?this.dropdownVisible=!1:this.$emit("mosueout")},hideDropdown:function(t){this.$el.contains(t.target)||(this.dropdownVisible=!1)}},mounted:function(){var t=this;document.addEventListener("click",this.hideDropdown),this.$on("sdxu.button.hideDropdown",function(){t.dropdownVisible=!1})},beforeDestroy:function(){document.removeEventListener("click",this.hideDropdown),this.$off("sdxu.button.hideDropdown")}},c=n(0),p=Object(c.a)(a,o,[],!1,null,null,null);p.options.__file="components/button/src/Button.vue";var f=p.exports;f.install=function(t){t.component(f.name,f)};e.default=f},6:function(e,n){e.exports=t},8:function(t,e){t.exports=require("@sdx/utils/src/mixins/emitter")}}).default});