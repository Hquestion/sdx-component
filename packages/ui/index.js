import Button from './components/button';
import Radio from './components/radio';

import { registerI18n } from "@sdx/utils/src/locale";

const IluvatarUI = {
    Button,
    Radio
};

IluvatarUI.install = (vue, { i18n } = {}) => {
    Button.install(vue);
    Radio.install(vue);

    // 通用服务注入i18n服务
    registerI18n(i18n);
};

export default IluvatarUI;
