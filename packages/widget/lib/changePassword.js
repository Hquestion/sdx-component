!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(require("element-ui"),require("@sdx/ui/lib/dialog"),require("@sdx/ui/lib/input"),require("@sdx/ui/lib/button")):"function"==typeof define&&define.amd?define(["element-ui","@sdx/ui/lib/dialog","@sdx/ui/lib/input","@sdx/ui/lib/button"],t):"object"==typeof exports?exports["@sdx/widget"]=t(require("element-ui"),require("@sdx/ui/lib/dialog"),require("@sdx/ui/lib/input"),require("@sdx/ui/lib/button")):e["@sdx/widget"]=t(e["element-ui"],e["@sdx/ui/lib/dialog"],e["@sdx/ui/lib/input"],e["@sdx/ui/lib/button"])}(window,function(e,t,s,r){return function(e){var t={};function s(r){if(t[r])return t[r].exports;var n=t[r]={i:r,l:!1,exports:{}};return e[r].call(n.exports,n,n.exports,s),n.l=!0,n.exports}return s.m=e,s.c=t,s.d=function(e,t,r){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},s.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(s.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)s.d(r,n,function(t){return e[t]}.bind(null,n));return r},s.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="./",s(s.s=11)}([function(e,t,s){"use strict";function r(e,t,s,r,n,i,o,a){var d,l="function"==typeof e?e.options:e;if(t&&(l.render=t,l.staticRenderFns=s,l._compiled=!0),r&&(l.functional=!0),i&&(l._scopeId="data-v-"+i),o?(d=function(e){(e=e||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(e=__VUE_SSR_CONTEXT__),n&&n.call(this,e),e&&e._registeredComponents&&e._registeredComponents.add(o)},l._ssrRegister=d):n&&(d=a?function(){n.call(this,this.$root.$options.shadowRoot)}:n),d)if(l.functional){l._injectStyles=d;var u=l.render;l.render=function(e,t){return d.call(t),u(e,t)}}else{var c=l.beforeCreate;l.beforeCreate=c?[].concat(c,d):[d]}return{exports:e,options:l}}s.d(t,"a",function(){return r})},function(t,s){t.exports=e},function(e,s){e.exports=t},function(e,t){e.exports=s},function(e,t){e.exports=r},function(e,t){e.exports=require("@sdx/utils/src/api")},,function(e,t){e.exports=require("@sdx/utils/src/theme-common/iconfont/iconfont.js")},,,,function(e,t,s){"use strict";s.r(t);var r=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("sdxu-dialog",{staticClass:"sdxw-change-password",attrs:{visible:e.dialogVisible},on:{"update:visible":function(t){e.dialogVisible=t},close:e.dialogClose}},[s("div",{staticClass:"sdxw-change-password__title",attrs:{slot:"title"},slot:"title"},[s("svg",{staticClass:"icon",attrs:{"aria-hidden":"true"}},[s("use",{attrs:{"xlink:href":"#iconicon-password"}})]),e._v(" "),s("span",[e._v("修改密码")])]),e._v(" "),s("el-form",{ref:"changePwdForm",attrs:{"label-width":"110px","label-position":"left",model:e.changePwdForm,rules:e.changePwdFormRule}},[s("el-form-item",{attrs:{label:"旧密码：",prop:"oldPasswd"}},[s("sdxu-input",{attrs:{type:"password","password-visibleness":""},model:{value:e.changePwdForm.oldPasswd,callback:function(t){e.$set(e.changePwdForm,"oldPasswd",t)},expression:"changePwdForm.oldPasswd"}})],1),e._v(" "),s("el-form-item",{attrs:{label:"新密码：",prop:"newPasswd"}},[s("sdxu-input",{attrs:{type:"password","password-visibleness":"","password-strength":""},model:{value:e.changePwdForm.newPasswd,callback:function(t){e.$set(e.changePwdForm,"newPasswd",t)},expression:"changePwdForm.newPasswd"}})],1),e._v(" "),s("el-form-item",{attrs:{label:"确认新密码：",prop:"repeatNewPasswd"}},[s("sdxu-input",{attrs:{type:"password","password-visibleness":""},model:{value:e.changePwdForm.repeatNewPasswd,callback:function(t){e.$set(e.changePwdForm,"repeatNewPasswd",t)},expression:"changePwdForm.repeatNewPasswd"}})],1)],1),e._v(" "),s("div",{attrs:{slot:"footer"},slot:"footer"},[s("SdxuButton",{attrs:{type:"default",size:"small"},on:{click:e.cancel}},[e._v("\n            取消\n        ")]),e._v(" "),s("SdxuButton",{attrs:{type:"primary",size:"small"},on:{click:e.confirm}},[e._v("\n            确认\n        ")])],1)],1)};r._withStripped=!0;var n,i=s(2),o=s.n(i),a=s(3),d=s.n(a),l=s(4),u=s.n(l),c=(s(7),s(1)),p=s(5);function f(e,t,s){return t in e?Object.defineProperty(e,t,{value:s,enumerable:!0,configurable:!0,writable:!0}):e[t]=s,e}var w={name:"SdxwChangePassword",data:function(){return{dialogVisible:this.visible,changePwdForm:{oldPasswd:"",newPasswd:"",repeatNewPasswd:""},changePwdFormRule:{oldPasswd:[{required:!0,message:"请输入旧密码",trigger:"blur"},{min:6,max:20,message:"密码长度在 6 到 20 个字符",trigger:"blur"},{validator:this.validatePwd,trigger:"blur"}],newPasswd:[{required:!0,message:"请输入新密码",trigger:"blur"},{min:6,max:20,message:"密码长度在 6 到 20 个字符",trigger:"blur"},{validator:this.validatePwd,trigger:"blur"}],repeatNewPasswd:[{required:!0,message:"请确认新密码",trigger:"blur"},{min:6,max:20,message:"密码长度在 6 到 20 个字符",trigger:"blur"},{validator:this.validatePwd,trigger:"blur"}]}}},components:(n={},f(n,o.a.name,o.a),f(n,c.Form.name,c.Form),f(n,c.FormItem.name,c.FormItem),f(n,d.a.name,d.a),f(n,u.a.name,u.a),n),props:{visible:{type:Boolean,default:!1},handler:{type:Function,default:void 0}},watch:{visible:function(e){this.dialogVisible=e}},methods:{dialogClose:function(){this.$refs.changePwdForm.clearValidate(),this.changePwdForm={oldPasswd:"",newPasswd:"",repeatNewPasswd:""},this.$emit("update:visible",!1),this.$emit("close")},validatePwd:function(e,t,s){t&&/^(?![0-9]+$)(?![a-zA-Z]+$)(?![\x21-\x2f\x3a-\x40\x5b-\x60\x7B-\x7F]+$)[a-zA-Z0-9\x21-\x2f\x3a-\x40\x5b-\x60\x7B-\x7F]{6,20}$/.test(t)?s():s(new Error("密码由字母、数字及特殊符号（除空格）组成且至少包含2种"))},cancel:function(){this.dialogVisible=!1},confirm:function(){var e=this;this.$refs.changePwdForm.validate(function(t){if(t){if(e.changePwdForm.newPasswd!==e.changePwdForm.repeatNewPasswd)return void c.Message.error("请确保两次输入的密码一致。");var s={oldPasswd:e.changePwdForm.oldPasswd,newPasswd:e.changePwdForm.newPasswd};e.handler?e.handler(s):p.userApi.changePassword(s).then(function(){Object(c.Message)({message:"密码修改成功！",type:"success"}),e.$emit("on-success"),e.dialogVisible=!1}).catch(function(){e.$emit("on-error")})}else c.Message.error("请输入必填信息")})}}},m=s(0),g=Object(m.a)(w,r,[],!1,null,null,null);g.options.__file="components/changePassword/src/ChangePassword.vue";var b=g.exports;b.install=function(e){e.component(b.name,b)};t.default=b}]).default});