!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports["@sdx/widget"]=t():e["@sdx/widget"]=t()}(window,function(){return function(e){var t={};function n(o){if(t[o])return t[o].exports;var i=t[o]={i:o,l:!1,exports:{}};return e[o].call(i.exports,i,i.exports,n),i.l=!0,i.exports}return n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)n.d(o,i,function(t){return e[t]}.bind(null,i));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="./",n(n.s=9)}({1:function(e,t,n){"use strict";function o(e,t,n,o,i,l,r,s){var u,a="function"==typeof e?e.options:e;if(t&&(a.render=t,a.staticRenderFns=n,a._compiled=!0),o&&(a.functional=!0),l&&(a._scopeId="data-v-"+l),r?(u=function(e){(e=e||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(e=__VUE_SSR_CONTEXT__),i&&i.call(this,e),e&&e._registeredComponents&&e._registeredComponents.add(r)},a._ssrRegister=u):i&&(u=s?function(){i.call(this,this.$root.$options.shadowRoot)}:i),u)if(a.functional){a._injectStyles=u;var d=a.render;a.render=function(e,t){return u.call(t),d(e,t)}}else{var c=a.beforeCreate;a.beforeCreate=c?[].concat(c,u):[u]}return{exports:e,options:a}}n.d(t,"a",function(){return o})},6:function(e,t){e.exports=require("@sdx/utils/src/helper/dom")},9:function(e,t,n){"use strict";n.r(t);var o=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"sdxw-fold-label-group",class:["sdxw-fold-label-group--"+e.mode]},e._l(e.visibleList,function(t,o){return n("sdxw-fold-label",{key:o,attrs:{label:t,index:o,type:e.type,fold:e.isFold(o),ellipse:e.isEllipse(o)}})}),1)};o._withStripped=!0;var i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"sdxw-fold-label",class:[e.fold?"is-fold":"",e.ellipse?"is-ellipse":"","sdxw-fold-label--"+e.type],on:{mouseover:e.onMouseOver,mouseout:e.onMouseOut}},[e.ellipse?n("i",{staticClass:"sdx-icon iconicon-more"}):n("span",[e._v(e._s(e.labelShown))])])};i._withStripped=!0;var l={name:"SdxwFoldLabel",data:function(){return{}},inject:["control"],props:{label:{type:String,default:""},type:{type:String,default:"primary"},fold:{type:Boolean,default:!1},ellipse:{type:Boolean,default:!1},index:{type:Number,default:0}},computed:{labelShown:function(){return this.fold?this.label.slice(0,1):this.label}},methods:{onMouseOver:function(){this.ellipse||(this.control.expand=[this.index])},onMouseOut:function(){this.ellipse||(this.control.expand=[0,1])}}},r=n(1),s=Object(r.a)(l,i,[],!1,null,null,null);s.options.__file="components/fold-label/src/FoldLabel.vue";var u=s.exports,a=n(6),d={name:"SdxwFoldLabelGroup",data:function(){return{control:{expand:[0,1]}}},components:{SdxwFoldLabel:u},provide:function(){return{control:this.control}},props:{list:{type:Array,default:function(){return[]}},mode:{type:String,default:"list"},type:{type:String,default:"primary"},inlineMaxShow:{type:Number,default:3}},computed:{visibleList:function(){return"inline"===this.mode?this.list.slice(0,this.inlineMaxShow):this.list.slice()}},methods:{isEllipse:function(e){return"inline"===this.mode&&(this.list.length>this.inlineMaxShow&&e===this.visibleList.length-1)},isFold:function(e){return"inline"===this.mode&&!this.control.expand.includes(e)}},mounted:function(){var e=this;this.$nextTick(function(){var t=e.$el.offsetWidth,n=Object(a.getParentNode)(e.$el).offsetWidth;e.$el.style.width="".concat(Math.min(t,n),"px")})}},c=Object(r.a)(d,o,[],!1,null,null,null);c.options.__file="components/fold-label/src/FoldLabelGroup.vue";var f=c.exports,p={FoldLabel:u,FoldLabelGroup:f,install:function(e){e.component(u.name,u),e.component(f.name,f)}};t.default=p}}).default});