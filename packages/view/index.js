// 这里会暴露所有组件
import ProjectManagement from './components/project-management';

import { registerI18n } from "@sdx/utils/lib/locale";

const SdxView = {
    ProjectManagement
};

SdxView.install = (vue, { i18n } = {}) => {
    ProjectManagement.install(vue);

    // 通用服务注入i18n服务
    registerI18n(i18n);
};

export default SdxView;
