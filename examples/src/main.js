import Vue from 'vue';
import ElementUI from 'element-ui';
import App from './App.vue';
import router from './router';
import store from './store';
import i18n from './i18n';
import './assets/scss/app.scss';
import {Button} from '@sdx/ui';
import SdxWidget from '@sdx/widget/index.js';
import enMsg from  '@sdx/utils/lib/locale/lang/en';
import febAlive from 'feb-alive';
import Dialog from '@sdx/ui/components/dialog';
import Pagination from '@sdx/ui/components/pagination';
import Breadcrumb from '@sdx/widget/components/breadcrumb';
import ChangePassword from '@sdx/widget/components/change-password';
import Project from '@sdx/view/components/project-management';
import Image from '@sdx/view/components/image-management';
import Model from '@sdx/view/components/model-manage';
import shareCenter from '@sdx/utils/src/helper/shareCenter';
import '@sdx/ui/theme/index.scss';
import '@sdx/widget/theme/index.scss';
import '@sdx/view/theme/index.scss';
Vue.use(febAlive, { router, keyName: 'feb'});
Vue.use(Button);
Vue.use(Dialog);
Vue.use(ElementUI);
Vue.use(Breadcrumb);
Vue.use(Pagination);
Vue.use(ChangePassword);
Vue.use(SdxWidget);

shareCenter.setup({
    user: {
        name: 'zhansan',
        uuid: '222',
        allPermissions: [
            {key: 'USER-MANAGER:USER:ACCESS:""', tags: ['BUTTON']},
            {key: 'USER-MANAGER:USER:CREATE:""', tags: ['BUTTON']},
        ]
    }
});


// 项目管理
Project.viewRouter.register(router, '/');

// 镜像管理
// Vue.use(Image.ImageManageIndex);
// Image.viewRouter.register(router, '/imageManageTest');

Model.viewRouter.register(router, '/modelManageTest');

Vue.config.productionTip = false;

const app = new Vue({
    router,
    store,
    i18n,
    render: h => h(App)
}).$mount('#app');

app.$i18n.mergeLocaleMessage('en', enMsg);
