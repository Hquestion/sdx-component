!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(require("element-ui"),require("@sdx/ui/lib/dialog"),require("@sdx/ui/lib/input"),require("@sdx/ui/lib/button")):"function"==typeof define&&define.amd?define(["element-ui","@sdx/ui/lib/dialog","@sdx/ui/lib/input","@sdx/ui/lib/button"],t):"object"==typeof exports?exports["@sdx/ui"]=t(require("element-ui"),require("@sdx/ui/lib/dialog"),require("@sdx/ui/lib/input"),require("@sdx/ui/lib/button")):e["@sdx/ui"]=t(e["element-ui"],e["@sdx/ui/lib/dialog"],e["@sdx/ui/lib/input"],e["@sdx/ui/lib/button"])}(window,function(e,t,s,i){return function(e){var t={};function s(i){if(t[i])return t[i].exports;var n=t[i]={i:i,l:!1,exports:{}};return e[i].call(n.exports,n,n.exports,s),n.l=!0,n.exports}return s.m=e,s.c=t,s.d=function(e,t,i){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:i})},s.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(s.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)s.d(i,n,function(t){return e[t]}.bind(null,n));return i},s.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="./",s(s.s=8)}([function(t,s){t.exports=e},function(e,s){e.exports=t},function(e,t){e.exports=s},function(e,t){e.exports=i},function(e,t){e.exports=require("@sdx/utils/src/helper/dom")},function(e,t){e.exports=require("@sdx/utils/src/api")},function(e,t){e.exports=require("@sdx/utils/lib/locale")},function(e,t){e.exports=require("@sdx/utils/src/theme-common/iconfont/iconfont.js")},function(e,t,s){"use strict";s.r(t);var i=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"sdxw-breadcrumb"},[e.breadcrumbs.length?s("el-breadcrumb",{attrs:{separator:e.seperator,"separator-class":e.seperatorClass}},e._l(e.breadcrumbs,function(t,i){return s("el-breadcrumb-item",{key:i,attrs:{to:t}},[e._v("\n            "+e._s(t.meta.breadcrumb)+"\n        ")])}),1):e._e()],1)};i._withStripped=!0;var n,r=s(0);function o(e,t,s){return t in e?Object.defineProperty(e,t,{value:s,enumerable:!0,configurable:!0,writable:!0}):e[t]=s,e}function a(e,t,s,i,n,r,o,a){var l,d="function"==typeof e?e.options:e;if(t&&(d.render=t,d.staticRenderFns=s,d._compiled=!0),i&&(d.functional=!0),r&&(d._scopeId="data-v-"+r),o?(l=function(e){(e=e||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(e=__VUE_SSR_CONTEXT__),n&&n.call(this,e),e&&e._registeredComponents&&e._registeredComponents.add(o)},d._ssrRegister=l):n&&(l=a?function(){n.call(this,this.$root.$options.shadowRoot)}:n),l)if(d.functional){d._injectStyles=l;var c=d.render;d.render=function(e,t){return l.call(t),c(e,t)}}else{var u=d.beforeCreate;d.beforeCreate=u?[].concat(u,l):[l]}return{exports:e,options:d}}var l=a({name:"SdxwBreadcrumb",data:function(){return{breadcrumbs:[]}},components:(n={},o(n,r.Breadcrumb.name,r.Breadcrumb),o(n,r.BreadcrumbItem.name,r.BreadcrumbItem),n),props:{seperator:{type:String,default:"/"},seperatorClass:{type:String,default:""}},watch:{$route:{handler:function(e){var t=this;this.breadcrumbs=[],e.matched.forEach(function(e){e.meta&&e.meta.breadcrumb&&t.breadcrumbs.push(e)})},immediate:!0}}},i,[],!1,null,null,null);l.options.__file="components/breadcrumb/src/Breadcrumb.vue";var d=l.exports;d.install=function(e){e.component(d.name,d)};var c=d,u=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"sdxw-fold-label-group",class:["sdxw-fold-label-group--"+e.mode]},e._l(e.visibleList,function(t,i){return s("sdxw-fold-label",{key:i,attrs:{label:t,index:i,type:e.type,fold:e.isFold(i),ellipse:e.isEllipse(i)}})}),1)};u._withStripped=!0;var p=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"sdxw-fold-label",class:[e.fold?"is-fold":"",e.ellipse?"is-ellipse":"","sdxw-fold-label--"+e.type],on:{mouseover:e.onMouseOver,mouseout:e.onMouseOut}},[e.ellipse?s("i",{staticClass:"sdx-icon iconicon-more"}):s("span",[e._v(e._s(e.labelShown))])])};p._withStripped=!0;var m=a({name:"SdxwFoldLabel",data:function(){return{}},inject:["control"],props:{label:{type:String,default:""},type:{type:String,default:"primary"},fold:{type:Boolean,default:!1},ellipse:{type:Boolean,default:!1},index:{type:Number,default:0}},computed:{labelShown:function(){return this.fold?this.label.slice(0,1):this.label}},methods:{onMouseOver:function(){this.ellipse||(this.control.expand=[this.index])},onMouseOut:function(){this.ellipse||(this.control.expand=[0,1])}}},p,[],!1,null,null,null);m.options.__file="components/fold-label/src/FoldLabel.vue";var f=m.exports,b=s(4),h=a({name:"SdxwFoldLabelGroup",data:function(){return{control:{expand:[0,1]}}},components:{SdxwFoldLabel:f},provide:function(){return{control:this.control}},props:{list:{type:Array,default:function(){return[]}},mode:{type:String,default:"list"},type:{type:String,default:"primary"},inlineMaxShow:{type:Number,default:3}},computed:{visibleList:function(){return"inline"===this.mode?this.list.slice(0,this.inlineMaxShow):this.list.slice()}},methods:{isEllipse:function(e){return"inline"===this.mode&&(this.list.length>this.inlineMaxShow&&e===this.visibleList.length-1)},isFold:function(e){return"inline"===this.mode&&!this.control.expand.includes(e)}},mounted:function(){var e=this;this.$nextTick(function(){var t=e.$el.offsetWidth,s=Object(b.getParentNode)(e.$el).offsetWidth;e.$el.style.width="".concat(Math.min(t,s),"px")})}},u,[],!1,null,null,null);h.options.__file="components/fold-label/src/FoldLabelGroup.vue";var w=h.exports,v={FoldLabel:f,FoldLabelGroup:w,install:function(e){e.component(f.name,f),e.component(w.name,w)}},x=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("sdxu-dialog",{staticClass:"sdxw-change-password",attrs:{visible:e.dialogVisible},on:{"update:visible":function(t){e.dialogVisible=t},close:e.dialogClose}},[s("div",{staticClass:"sdxw-change-password__title",attrs:{slot:"title"},slot:"title"},[s("svg",{staticClass:"icon",attrs:{"aria-hidden":"true"}},[s("use",{attrs:{"xlink:href":"#iconicon-password"}})]),e._v(" "),s("span",[e._v("修改密码")])]),e._v(" "),s("el-form",{ref:"changePwdForm",attrs:{"label-width":"110px","label-position":"left",model:e.changePwdForm,rules:e.changePwdFormRule}},[s("el-form-item",{attrs:{label:"旧密码：",prop:"oldPasswd"}},[s("sdxu-input",{attrs:{type:"password","password-visibleness":""},model:{value:e.changePwdForm.oldPasswd,callback:function(t){e.$set(e.changePwdForm,"oldPasswd",t)},expression:"changePwdForm.oldPasswd"}})],1),e._v(" "),s("el-form-item",{attrs:{label:"新密码：",prop:"newPasswd"}},[s("sdxu-input",{attrs:{type:"password","password-visibleness":"","password-strength":""},model:{value:e.changePwdForm.newPasswd,callback:function(t){e.$set(e.changePwdForm,"newPasswd",t)},expression:"changePwdForm.newPasswd"}})],1),e._v(" "),s("el-form-item",{attrs:{label:"确认新密码：",prop:"repeatNewPasswd"}},[s("sdxu-input",{attrs:{type:"password","password-visibleness":""},model:{value:e.changePwdForm.repeatNewPasswd,callback:function(t){e.$set(e.changePwdForm,"repeatNewPasswd",t)},expression:"changePwdForm.repeatNewPasswd"}})],1)],1),e._v(" "),s("div",{attrs:{slot:"footer"},slot:"footer"},[s("SdxuButton",{attrs:{type:"default",size:"small"},on:{click:e.cancel}},[e._v("\n            取消\n        ")]),e._v(" "),s("SdxuButton",{attrs:{type:"primary",size:"small"},on:{click:e.confirm}},[e._v("\n            确认\n        ")])],1)],1)};x._withStripped=!0;var _,g=s(1),y=s.n(g),P=s(2),j=s.n(P),C=s(3),F=s.n(C),S=(s(7),s(5));function $(e,t,s){return t in e?Object.defineProperty(e,t,{value:s,enumerable:!0,configurable:!0,writable:!0}):e[t]=s,e}var M=a({name:"SdxwChangePassword",data:function(){return{dialogVisible:this.visible,changePwdForm:{oldPasswd:"",newPasswd:"",repeatNewPasswd:""},changePwdFormRule:{oldPasswd:[{required:!0,message:"请输入旧密码",trigger:"blur"},{min:6,max:20,message:"密码长度在 6 到 20 个字符",trigger:"blur"},{validator:this.validatePwd,trigger:"blur"}],newPasswd:[{required:!0,message:"请输入新密码",trigger:"blur"},{min:6,max:20,message:"密码长度在 6 到 20 个字符",trigger:"blur"},{validator:this.validatePwd,trigger:"blur"}],repeatNewPasswd:[{required:!0,message:"请确认新密码",trigger:"blur"},{min:6,max:20,message:"密码长度在 6 到 20 个字符",trigger:"blur"},{validator:this.validatePwd,trigger:"blur"}]}}},components:(_={},$(_,y.a.name,y.a),$(_,r.Form.name,r.Form),$(_,r.FormItem.name,r.FormItem),$(_,j.a.name,j.a),$(_,F.a.name,F.a),_),props:{visible:{type:Boolean,default:!1},handler:{type:Function,default:void 0}},watch:{visible:function(e){this.dialogVisible=e}},methods:{dialogClose:function(){this.$refs.changePwdForm.clearValidate(),this.changePwdForm={oldPasswd:"",newPasswd:"",repeatNewPasswd:""},this.$emit("update:visible",!1),this.$emit("close")},validatePwd:function(e,t,s){t&&/^(?![0-9]+$)(?![a-zA-Z]+$)(?![\x21-\x2f\x3a-\x40\x5b-\x60\x7B-\x7F]+$)[a-zA-Z0-9\x21-\x2f\x3a-\x40\x5b-\x60\x7B-\x7F]{6,20}$/.test(t)?s():s(new Error("密码由字母、数字及特殊符号（除空格）组成且至少包含2种"))},cancel:function(){this.dialogVisible=!1},confirm:function(){var e=this;this.$refs.changePwdForm.validate(function(t){if(t){if(e.changePwdForm.newPasswd!==e.changePwdForm.repeatNewPasswd)return void r.Message.error("请确保两次输入的密码一致。");var s={oldPasswd:e.changePwdForm.oldPasswd,newPasswd:e.changePwdForm.newPasswd};e.handler?e.handler(s):S.userApi.changePassword(s).then(function(){Object(r.Message)({message:"密码修改成功！",type:"success"}),e.$emit("on-success"),e.dialogVisible=!1}).catch(function(){e.$emit("on-error")})}else r.Message.error("请输入必填信息")})}}},x,[],!1,null,null,null);M.options.__file="components/changePassword/src/ChangePassword.vue";var k=M.exports;k.install=function(e){e.component(k.name,k)};var O=k,B=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"sdxw-project-card",on:{mouseover:e.handleMouseover,mouseout:e.handleMouseout}},[s("header",{staticClass:"sdxw-project-card__header"},[s("i",{staticClass:"sdxw-project-card__header--icon sdx-icon",class:[e.projectType.state,e.projectType.icon]}),e._v(" "),s("span",{staticClass:"sdxw-project-card__header--name"},[e._v(e._s(e.meta.name))])]),e._v(" "),s("main",{staticClass:"sdxw-project-card__main"},[s("div",{staticClass:"sdxw-project-card__info"},[s("i",{staticClass:"sdx-icon iconicon-user"}),e._v(" "),s("span",[e._v(e._s(e.meta.creator))])]),e._v(" "),s("div",{staticClass:"sdxw-project-card__info"},[s("i",{staticClass:"sdx-icon iconicon-time"}),e._v(" "),s("span",[e._v(e._s(e.meta.createdAt))])])]),e._v(" "),s("footer",{staticClass:"sdxw-project-card__footer"},["template"===e.operateType?s("div",{staticClass:"sdxw-project-card__footer--select",on:{click:function(t){return e.$emit("operate",{id:e.meta.id,type:"template"})}}},[s("i",{staticClass:"sdx-icon iconicon-detail"}),e._v(" "),e._t("operationName",[s("span",[e._v("选择模板")])])],2):"project"===e.operateType?s("div",{staticClass:"sdxw-project-card__footer--select",on:{click:function(t){return e.$emit("operate",{id:e.meta.id,type:"project"})}}},[s("i",{staticClass:"sdx-icon iconicon-detail"}),e._v(" "),e._t("operationName",[s("span",[e._v("选择项目")])])],2):s("div",{staticClass:"sdxw-project-card__footer--operation"},[e.viewAble?s("i",{staticClass:"sdx-icon iconicon-detail",attrs:{title:"查看详情"},on:{click:function(t){return e.$emit("operate",{id:e.meta.id,type:"detail"})}}}):e._e(),e._v(" "),e.editAble?s("i",{staticClass:"sdx-icon iconicon-edit1",attrs:{title:"编辑"},on:{click:function(t){return e.$emit("operate",{id:e.meta.id,type:"edit"})}}}):e._e(),e._v(" "),e.deleteAble?s("i",{staticClass:"sdx-icon iconicon-delete1",attrs:{title:"删除"},on:{click:function(t){return e.$emit("operate",{id:e.meta.id,type:"delete"})}}}):e._e()])]),e._v(" "),s("div",{staticClass:"sdxw-project-card__mask",class:e.projectType.state,style:{display:e.showMask?"inherit":"none"}},[s("span",{staticClass:"sdxw-project-card__mask--text"},[e._v("\n            "+e._s(e.meta.decription)+"\n        ")])])])};B._withStripped=!0;var q=a({name:"SdxwProjectCard",props:{meta:{type:Object,default:function(){return{}}},viewAble:{type:Boolean,default:!0},editAble:{type:Boolean,default:!0},deleteAble:{type:Boolean,default:!0},operateType:{type:String,default:"rud",validator:function(e){return["rud","template","project"].includes(e)}}},data:function(){return{showMask:!1}},computed:{projectType:function(){var e={};return this.meta.isTemplate?(e.state="is-template",e.icon="iconicon-muban1"):Array.isArray(this.meta.users)&&this.meta.users.length>0||Array.isArray(this.meta.groups)&&this.meta.groups.length>0?(e.state="is-cooperation",e.icon="iconicon-xiezuo1"):(e.state="is-self",e.icon="iconicon-zijian1"),e}},methods:{handleMouseover:function(){this.showMask=!0},handleMouseout:function(){this.showMask=!1}}},B,[],!1,null,null,null);q.options.__file="components/projectcard/src/ProjectCard.vue";var A=q.exports,N=function(){var e=this.$createElement;return(this._self._c||e)("div",{staticClass:"sdxw-project-card-list"},[this._t("default")],2)};N._withStripped=!0;var T=a({name:"SdxwProjectCardList"},N,[],!1,null,null,null);T.options.__file="components/projectcard/src/ProjectCardList.vue";var E=T.exports,L={ProjectCard:A,ProjectCardList:E,install:function(e){e.components(A.name,A),e.components(E.name,E)}},V=L,R=s(6),z={Breadcrumb:c,FoldLabel:v,ProjectCard:V,ChangePassword:O,install:function(e){var t=(arguments.length>1&&void 0!==arguments[1]?arguments[1]:{}).i18n;c.install(e),v.install(e),O.install(e),V.install(e),Object(R.registerI18n)(t)}};t.default=z}]).default});