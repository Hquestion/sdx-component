import Button from './components/button';
import Radio from './components/radio';
import Transfer from './components/transfer';
import { registerI18n } from "@sdx/utils/src/locale";
import Dialog from './components/dialog';
import Pagination from './components/pagination';
import TabRadio from './components/tab-radio';
import Input from './components/input';



const IluvatarUI = {
    Button,
    Radio,
    Transfer,
    Dialog,
    Pagination,
    TabRadio,
    Input
};

IluvatarUI.install = (vue, { i18n } = {}) => {
    Button.install(vue);
    Radio.install(vue);
    Transfer.install(vue);
    Dialog.install(vue);
    Pagination.install(vue);
    TabRadio.install(vue);
    Input.install(vue);

    // 通用服务注入i18n服务
    registerI18n(i18n);
};

export default IluvatarUI;
