// 这里会暴露所有组件
import UserManage from './components/resource-manage/index.js';

import { registerI18n } from '@sdx/utils/src/locale';

const SdxView = {
    UserManage
};

SdxView.install = (vue, { i18n } = {}) => {
    UserManage.install(vue);

    // 通用服务注入i18n服务
    registerI18n(i18n);
};

export default SdxView;
