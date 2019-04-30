import Button from './components/button';
import Radio from './components/radio';
import Dialog from './components/dialog';
import TabRadio from './components/tab-radio';

import { registerI18n } from "@sdx/utils/lib/locale";

const IluvatarUI = {
    Button,
    Radio,
    Dialog,
    TabRadio
};

IluvatarUI.install = (vue, { i18n } = {}) => {
    Button.install(vue);
    Radio.install(vue);
    Dialog.install(vue);
    TabRadio.install(vue);

    // 通用服务注入i18n服务
    registerI18n(i18n);
};

export default IluvatarUI;
