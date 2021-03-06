// 这里会暴露所有组件
import ProjectManagement from './components/project-management';
import ImageManagement from './components/image-management';
import UserManage from './components/resource-manage/index.js';

import { registerI18n } from '@sdx/utils/src/locale';

const SdxView = {
    ProjectManagement,
    UserManage,
    ImageManagement
};

SdxView.install = (vue, { i18n } = {}) => {
    ProjectManagement.install(vue);
    UserManage.install(vue);
    ImageManagement.install(vue);

    // 通用服务注入i18n服务
    registerI18n(i18n);
};

export default SdxView;
