/**
 * 扩展 VuePress 应用
 */
import VueHighlightJS from 'vue-highlight.js'; //代码高亮组件
import 'highlight.js/styles/atom-one-dark.css'; //代码高亮样式
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import '@sdx/ui/theme/index.scss';
import '@sdx/widget/theme/index.scss';
import '@sdx/view/theme/index.scss';

import '../.vuepress/public/css/index.css'

// const { JSDOM } = require('jsdom')
// const dom = new JSDOM('<!doctype html><html><body></body></html>',
// { url: 'http://localhost' })

// global.window = dom.window
// global.document = window.document
// global.navigator = window.navigator


// const mockScript = () => {
//   const script = document.createElement('script');
//   script.setAttribute('data-injectcss', '1');
//   window.__iconfont__svg__cssinject__ = true;
//   document.body.appendChild(script);
// };
// mockScript();

export default ({
                    Vue, // VuePress 正在使用的 Vue 构造函数
                    options, // 附加到根实例的一些选项
                    router, // 当前应用的路由实例
                    siteData // 站点元数据
                }) => {
    // ...做一些其他的应用级别的优化
    Vue.use(VueHighlightJS)
    Vue.use(Element)
    Vue.mixin({
        mounted() {
            import('../../packages/utils/src/theme-common/iconfont/iconfont.js');
        }
    })
}
