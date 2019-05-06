!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports["@sdx/ui"]=t():e["@sdx/ui"]=t()}(window,function(){return function(e){var t={};function n(s){if(t[s])return t[s].exports;var r=t[s]={i:s,l:!1,exports:{}};return e[s].call(r.exports,r,r.exports,n),r.l=!0,r.exports}return n.m=e,n.c=t,n.d=function(e,t,s){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:s})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var s=Object.create(null);if(n.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(s,r,function(t){return e[t]}.bind(null,r));return s},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="./",n(n.s=2)}([function(e,t,n){"use strict";function s(e,t,n,s,r,i,o,u){var a,l="function"==typeof e?e.options:e;if(t&&(l.render=t,l.staticRenderFns=n,l._compiled=!0),s&&(l.functional=!0),i&&(l._scopeId="data-v-"+i),o?(a=function(e){(e=e||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(e=__VUE_SSR_CONTEXT__),r&&r.call(this,e),e&&e._registeredComponents&&e._registeredComponents.add(o)},l._ssrRegister=a):r&&(a=u?function(){r.call(this,this.$root.$options.shadowRoot)}:r),a)if(l.functional){l._injectStyles=a;var c=l.render;l.render=function(e,t){return a.call(t),c(e,t)}}else{var d=l.beforeCreate;l.beforeCreate=d?[].concat(d,a):[a]}return{exports:e,options:l}}n.d(t,"a",function(){return s})},,function(e,t,n){"use strict";n.r(t);var s=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"sdxu-input",class:"sdxu-input--"+e.size},[n("el-input",e._g(e._b({ref:"input",scopedSlots:e._u([{key:"prefix",fn:function(){return[e._t("prefix")]},proxy:!0},{key:"suffix",fn:function(){return[e.passwordVisibleness&&!e.isDisabled?n("i",{staticClass:"sdx-icon sdxu-input__icon",class:e.pwdSuffixIcon,on:{click:function(t){e.showPwd=!e.showPwd}}}):e._t("suffix")]},proxy:!0},{key:"prepend",fn:function(){return[e._t("prepend")]},proxy:!0},{key:"append",fn:function(){return[e._t("append")]},proxy:!0}],null,!0),model:{value:e.modelVaule,callback:function(t){e.modelVaule=t},expression:"modelVaule"}},"el-input",e.attrs,!1),e.listeners)),e._v(" "),e.isPwdType&&e.passwordStrength&&e.pwdLevel?n("div",{staticClass:"sdxu-input__pwd-strength"},[n("span",{staticClass:"sdxu-input__pwd-strength--bar",class:e.levelClass(1)}),e._v(" "),n("span",{staticClass:"sdxu-input__pwd-strength--bar",class:e.levelClass(2)}),e._v(" "),n("span",{staticClass:"sdxu-input__pwd-strength--bar",class:e.levelClass(3)})]):e._e()],1)};s._withStripped=!0;var r={name:"SdxuInput",inheritAttrs:!1,props:{searchable:{type:Boolean,default:!1},passwordVisibleness:{type:Boolean,default:!1},passwordStrength:{type:Boolean,default:!1},size:{type:String,default:"regular",validator:function(e){return["regular","small"].includes(e)}}},data:function(){return{showPwd:!1}},computed:{attrs:function(){var e={size:"","show-password":!1};return this.searchable&&(e["suffix-icon"]="sdx-icon iconicon-search"),"password"===this.$attrs.type&&(e["suffix-icon"]="",e.type=this.showPwd?"text":"password"),Object.assign({},this.$attrs,e)},listeners:function(){return Object.assign({},this.$listeners,{})},isPwdType:function(){return"password"===this.$attrs.type},modelVaule:{get:function(){return this.$attrs.value},set:function(e){this.$emit("input",e)}},pwdSuffixIcon:function(){return this.showPwd?"iconicon-eye-close":"iconicon-eye-open"},pwdLevel:function(){var e=0,t=this.$attrs.value.trim();return t.match(/[0-9]/g)&&e++,t.match(/[A-z]/g)&&e++,t.match(/[^0-9A-z\s]/g)&&e++,t.length<6&&t.length>0&&(e=1),e},isDisabled:function(){return this.$attrs.hasOwnProperty("disabled")&&!1!==this.$attrs.disabled}},methods:{levelClass:function(e){return this.pwdLevel<e?"is-none":1===this.pwdLevel?"is-weak":2===this.pwdLevel?"is-normal":3===this.pwdLevel?"is-strong":void 0}}},i=n(0),o=Object(i.a)(r,s,[],!1,null,null,null);o.options.__file="components/input/src/Input.vue";var u=o.exports;u.install=function(e){e.component(u.name,u)};t.default=u}]).default});