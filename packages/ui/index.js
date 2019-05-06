import Button from './components/button';
import Radio from './components/radio';
import Transfer from './components/transfer';
import Dialog from './components/dialog';
import Pagination from './components/pagination';
import TabRadio from './components/tab-radio';
import Input from './components/input';
import AutoComplete from './components/autocomplete';

import Table from './components/table';
import { registerI18n } from "@sdx/utils/lib/locale";

const IluvatarUI = {
    Button,
    Radio,
    Transfer,
    Dialog,
    Pagination,
    TabRadio,
    Input,
    AutoComplete,
    Table
};

IluvatarUI.install = (vue, { i18n } = {}) => {
    Button.install(vue);
    Radio.install(vue);
    Transfer.install(vue);
    Dialog.install(vue);
    Pagination.install(vue);
    TabRadio.install(vue);
    Input.install(vue);
    AutoComplete.install(vue);

    Table.install(vue);
    // 通用服务注入i18n服务
    registerI18n(i18n);
};

export default IluvatarUI;
