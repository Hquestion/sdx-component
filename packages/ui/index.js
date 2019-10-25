import Button from './components/button';
import Radio from './components/radio';
import Transfer from './components/transfer';
import Dialog from './components/dialog';
import Pagination from './components/pagination';
import TabRadio from './components/tab-radio';
import Input from './components/input';
import AutoComplete from './components/autocomplete';
import MessageBox from './components/message-box';
import ContentPanel from './components/content-panel';
import Table from './components/table';
import PlaceholderBlock from './components/placeholder-block';
import IconButton from './components/icon-button';
import Empty from './components/empty';
import UserAvatar from './components/user-avatar';
import Scroll from './components/scroll';
import Upload from './components/upload';
import Layout from './components/layout';
import LazyList from './components/lazy-list';
import IconButtonGroup from './components/icon-button-group';
import RadialProgress from './components/radial-progress';
import SortButton from './components/sort-button';
import TextTooltip from './components/text-tooltip';
import LogDetail from './components/log-detail';
import Tabs from './components/tab';
import ContextMenu from './components/context-menu';
import BubbleTip from './components/bubble-tip';
import { registerI18n } from '@sdx/utils/src/locale';

const SdxUI = {
    Button,
    Radio,
    Transfer,
    Dialog,
    Pagination,
    TabRadio,
    Input,
    MessageBox,
    AutoComplete,
    Table,
    ContentPanel,
    PlaceholderBlock,
    IconButton,
    Empty,
    UserAvatar,
    Scroll,
    Upload,
    Layout,
    LazyList,
    IconButtonGroup,
    RadialProgress,
    SortButton,
    TextTooltip,
    LogDetail,
    Tabs,
    ContextMenu,
    BubbleTip
};

SdxUI.install = (vue, { i18n } = {}) => {
    Button.install(vue);
    Radio.install(vue);
    Transfer.install(vue);
    Dialog.install(vue);
    Pagination.install(vue);
    TabRadio.install(vue);
    Input.install(vue);
    MessageBox.install(vue);
    AutoComplete.install(vue);
    Table.install(vue);
    ContentPanel.install(vue);
    PlaceholderBlock.install(vue);
    IconButton.install(vue);
    Empty.install(vue);
    UserAvatar.install(vue);
    Scroll.install(vue);
    Upload.install(vue);
    Layout.install(vue);
    LazyList.install(vue);
    IconButtonGroup.install(vue);
    RadialProgress.install(vue);
    SortButton.install(vue);
    TextTooltip.install(vue);
    LogDetail.install(vue);
    Tabs.install(vue);
    ContextMenu.install(vue);
    BubbleTip.install(vue);
    // 通用服务注入i18n服务
    registerI18n(i18n);
};

export default SdxUI;
