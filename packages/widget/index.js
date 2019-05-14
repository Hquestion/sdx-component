// 这里会暴露所有组件
import Breadcrumb from './components/breadcrumb';
import FoldLabel from './components/fold-label';
import ChangePassword from './components/change-password';
import UserInfoDialog from './components/userinfo-dialog';
import ProjectCard from './components/projectcard';
import SelectGroupUser from './components/select-group-user';

import { registerI18n } from '@sdx/utils/src/locale';

const SdxWidget = {
    Breadcrumb,
    FoldLabel,
    ProjectCard,
    ChangePassword,
    UserInfoDialog,
    SelectGroupUser
};

SdxWidget.install = (vue, { i18n } = {}) => {
    Breadcrumb.install(vue);
    FoldLabel.install(vue);
    ChangePassword.install(vue);
    UserInfoDialog.install(vue);
    ProjectCard.install(vue);
    SelectGroupUser.install(vue);

    // 通用服务注入i18n服务
    registerI18n(i18n);
};

export default SdxWidget;
