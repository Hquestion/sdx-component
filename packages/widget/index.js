// 这里会暴露所有组件
import Breadcrumb from './components/breadcrumb';
import FoldLabel from './components/fold-label';
import ChangePassword from './components/change-password';
import UserinfoDialog from './components/userinfo-dialog';
import ProjectCard from './components/projectcard';
import SelectGroupUser from './components/select-group-user';
import SearchLayout from './components/search-layout';
import FileSelect from './components/file-select';
import UserPicker from './components/user-picker';
import ShareSetting from './components/share-setting';
import PodLog from './components/pod-log';
import TaskResourceList from './components/task-list';
import TaskStartDialog from './components/task-start-dialog';
import TaskStopDialog from './components/task-stop-dialog';
import CodeEditor from './components/code-editor';
import ResourceConfig from './components/resource-config';
import TaskRunningLimit from './components/task-running-limit';
import Auth from './components/auth';
import ShareForm from './components/share-form';
import LangHandle from './components/lang-handle';
import SubjectCard from './components/subject-card';
import { registerI18n } from '@sdx/utils/src/locale';

const SdxWidget = {
    Breadcrumb,
    FoldLabel,
    ProjectCard,
    ChangePassword,
    UserinfoDialog,
    SelectGroupUser,
    SearchLayout,
    FileSelect,
    UserPicker,
    ShareSetting,
    TaskResourceList,
    PodLog,
    TaskStartDialog,
    TaskStopDialog,
    CodeEditor,
    ResourceConfig,
    TaskRunningLimit,
    Auth,
    ShareForm,
    LangHandle,
    SubjectCard
};

SdxWidget.install = (vue, { i18n } = {}) => {
    Breadcrumb.install(vue);
    FoldLabel.install(vue);
    ChangePassword.install(vue);
    UserinfoDialog.install(vue);
    ProjectCard.install(vue);
    SelectGroupUser.install(vue);
    SearchLayout.install(vue);
    FileSelect.install(vue);
    UserPicker.install(vue);
    ShareSetting.install(vue);
    PodLog.install(vue);
    TaskResourceList.install(vue);
    TaskStartDialog.install(vue);
    TaskStopDialog.install(vue);
    CodeEditor.install(vue);
    ResourceConfig.install(vue);
    TaskRunningLimit.install(vue);
    SubjectCard.install(vue);
    vue.use(Auth);
    vue.use(ShareForm);
    vue.use(LangHandle);
    // 通用服务注入i18n服务
    registerI18n(i18n);
};

export default SdxWidget;
