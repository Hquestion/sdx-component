import Button from './components/button';
import Radio from './components/radio';
import Dialog from './components/dialog';
import Pagination from './components/pagination';
import TabRadio from './components/tab-radio';
import Input from './components/input';
import MessageBox from './components/message-box';

import { registerI18n } from "@sdx/utils/lib/locale";

const SdxUI = {
    Button,
    Radio,
    Dialog,
    Pagination,
    TabRadio,
    Input,
    MessageBox
};

SdxUI.install = (vue, { i18n } = {}) => {
    Button.install(vue);
    Radio.install(vue);
    Dialog.install(vue);
    Pagination.install(vue);
    TabRadio.install(vue);
    Input.install(vue);
    MessageBox.install(vue);

    // 通用服务注入i18n服务
    registerI18n(i18n);
};

export default SdxUI;
