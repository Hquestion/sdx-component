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
import ContextMenu from './components/context-menu';
import BubbleTip from './components/bubble-tip';
import DropdownTip from './components/dropdown-tip';
import Appender from './components/appender';
import ButtonGroup from './components/button-group';
import Copyable from './components/copyable';
import Codepan from './components/codepan';
import ArticleTitle from './components/article-title';
import ArticlePanel from './components/article-panel';
import SectionPanel from './components/section-panel';
import AutosizeCopyable from './components/autosize-copyable';
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
    ContextMenu,
    BubbleTip,
    DropdownTip,
    Appender,
    ButtonGroup,
    Codepan,
    Copyable,
    SectionPanel,
    ArticlePanel,
    ArticleTitle,
    AutosizeCopyable
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
    ContextMenu.install(vue);
    BubbleTip.install(vue);
    DropdownTip.install(vue);
    Appender.install(vue);
    ButtonGroup.install(vue);
    Copyable.install(vue);
    Codepan.install(vue);
    ArticleTitle.install(vue);
    ArticlePanel.install(vue);
    SectionPanel.install(vue);
    AutosizeCopyable.install(vue);
    // 通用服务注入i18n服务
    registerI18n(i18n);
};

export default SdxUI;
