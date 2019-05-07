// 这里会暴露所有组件
import Breadcrumb from './components/breadcrumb';
import UserInfoDialog from './components/userinfo-dialog';
const IluvatarWidget = {
    Breadcrumb,
    UserInfoDialog
};

IluvatarWidget.install = vue => {
    Breadcrumb.install(vue);
    UserInfoDialog.install(vue);
};

export default IluvatarWidget;
