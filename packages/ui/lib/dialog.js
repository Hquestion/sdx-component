!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(require("element-ui"),require("@sdx/ui/lib/button")):"function"==typeof define&&define.amd?define(["element-ui","@sdx/ui/lib/button"],t):"object"==typeof exports?exports["@sdx/ui"]=t(require("element-ui"),require("@sdx/ui/lib/button")):e["@sdx/ui"]=t(e["element-ui"],e["@sdx/ui/lib/button"])}(window,function(e,t){return function(e){var t={};function o(n){if(t[n])return t[n].exports;var i=t[n]={i:n,l:!1,exports:{}};return e[n].call(i.exports,i,i.exports,o),i.l=!0,i.exports}return o.m=e,o.c=t,o.d=function(e,t,n){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},o.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)o.d(n,i,function(t){return e[t]}.bind(null,i));return n},o.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="./",o(o.s=25)}({0:function(e,t,o){"use strict";function n(e,t,o,n,i,l,r,s){var a,u="function"==typeof e?e.options:e;if(t&&(u.render=t,u.staticRenderFns=o,u._compiled=!0),n&&(u.functional=!0),l&&(u._scopeId="data-v-"+l),r?(a=function(e){(e=e||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(e=__VUE_SSR_CONTEXT__),i&&i.call(this,e),e&&e._registeredComponents&&e._registeredComponents.add(r)},u._ssrRegister=a):i&&(a=s?function(){i.call(this,this.$root.$options.shadowRoot)}:i),a)if(u.functional){u._injectStyles=a;var d=u.render;u.render=function(e,t){return a.call(t),d(e,t)}}else{var c=u.beforeCreate;u.beforeCreate=c?[].concat(c,a):[a]}return{exports:e,options:u}}o.d(t,"a",function(){return n})},1:function(t,o){t.exports=e},2:function(e,o){e.exports=t},25:function(e,t,o){"use strict";o.r(t);var n=function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("el-dialog",{class:["sdxu-dialog","sdxu-dialog--"+e.size],attrs:{visible:e.dialogVisible,fullscreen:e.fullscreen,top:e.top,modal:e.modal,"modal-append-to-body":e.modalAppendToBody,"append-to-body":e.appendToBody,"lock-scroll":e.lockScroll,"custom-class":e.customClass,"close-on-click-modal":e.closeOnClickModal,"close-on-press-escape":e.closeOnPressEscape,"show-close":e.showClose,"before-close":e.beforeClose,center:""},on:{"update:visible":function(t){e.dialogVisible=t},close:e.dialogClose,closed:e.dialogClosed,open:e.dialogOpen,opened:e.dialogOpened}},[o("div",{attrs:{slot:"title"},slot:"title"},[e._t("title",[e._v("\n            "+e._s(e.title)+"\n        ")])],2),e._v(" "),o("div",[e._t("default")],2),e._v(" "),e.noFooter?e._e():o("div",{attrs:{slot:"footer"},slot:"footer"},[e._t("footer",[o("SdxuButton",{attrs:{type:"default",size:"small"},on:{click:e.cancel}},[e._v("\n                取消\n            ")]),e._v(" "),o("SdxuButton",{attrs:{type:"primary",size:"small"},on:{click:e.confirm}},[e._v("\n                确认\n            ")])])],2)])};n._withStripped=!0;var i,l=o(1),r=o(2),s=o.n(r);function a(e,t,o){return t in e?Object.defineProperty(e,t,{value:o,enumerable:!0,configurable:!0,writable:!0}):e[t]=o,e}var u={name:"SdxuDialog",data:function(){return{dialogVisible:this.visible}},watch:{visible:function(e){this.dialogVisible=e}},components:(i={},a(i,l.Dialog.name,l.Dialog),a(i,s.a.name,s.a),i),props:{visible:{type:Boolean,default:!1},title:{type:String,default:""},size:{type:String,default:"normal"},fullscreen:{type:Boolean,default:!1},top:{type:String,default:"15vh"},modal:{type:Boolean,default:!0},modalAppendToBody:{type:Boolean,default:!0},appendToBody:{type:Boolean,default:!0},lockScroll:{type:Boolean,default:!0},customClass:{type:String,default:""},closeOnClickModal:{type:Boolean,default:!0},closeOnPressEscape:{type:Boolean,default:!0},showClose:{type:Boolean,default:!0},beforeClose:{type:Function,default:function(e){e()}},noFooter:{type:Boolean,default:!1}},methods:{dialogClose:function(){this.$emit("update:visible",!1),this.$emit("close")},dialogClosed:function(){this.$emit("closed")},dialogOpen:function(){this.$emit("open")},dialogOpened:function(){this.$emit("opened")},confirm:function(){this.dialogVisible=!1,this.$emit("update:visible",!1),this.$emit("confirm")},cancel:function(){this.dialogVisible=!1,this.$emit("update:visible",!1),this.$emit("cancel")}}},d=o(0),c=Object(d.a)(u,n,[],!1,null,null,null);c.options.__file="components/dialog/src/Dialog.vue";var f=c.exports;f.install=function(e){e.component(f.name,f)};t.default=f}}).default});