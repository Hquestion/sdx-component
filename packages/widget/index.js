// 这里会暴露所有组件
import Breadcrumb from './components/breadcrumb';
import FoldLabel from './components/fold-label';

import { registerI18n } from "@sdx/utils/lib/locale";

const SdxWidget = {
    Breadcrumb,
    FoldLabel
};

SdxWidget.install = (vue, { i18n } = {}) => {
    Breadcrumb.install(vue);
    FoldLabel.install(vue);

    // 通用服务注入i18n服务
    registerI18n(i18n);
};

export default SdxWidget;
