// 这里会暴露所有组件
import Breadcrumb from './components/breadcrumb';
import ChangePassword from './components/changePassword';

const IluvatarWidget = {
    Breadcrumb,
    ChangePassword
};

IluvatarWidget.install = vue => {
    Breadcrumb.install(vue);
    ChangePassword.install(vue);
};

export default IluvatarWidget;
