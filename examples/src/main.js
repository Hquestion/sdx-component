import Vue from 'vue';
import ElementUI from 'element-ui';
import App from './App.vue';
import router from './router';
import store from './store';
import i18n from './i18n';
import './assets/scss/app.scss';
import {Button} from '@sdx/ui';
import enMsg from  '@sdx/utils/lib/locale/lang/en';
import febAlive from 'feb-alive';
import Dialog from '@sdx/ui/components/dialog';
import Pagination from '@sdx/ui/components/pagination';
import Breadcrumb from '@sdx/widget/components/breadcrumb';
import ChangePassword from '@sdx/widget/components/changePassword';
import '@sdx/ui/theme/index.scss';
import '@sdx/widget/theme/index.scss';
Vue.use(febAlive, { router, keyName: 'feb'});
Vue.use(Button);
Vue.use(Dialog);
Vue.use(ElementUI);
Vue.use(Breadcrumb);
Vue.use(Pagination);
Vue.use(ChangePassword);

Vue.config.productionTip = false;

const app = new Vue({
    router,
    store,
    i18n,
    render: h => h(App)
}).$mount('#app');

app.$i18n.mergeLocaleMessage('en', enMsg);
