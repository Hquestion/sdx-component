// 这里会暴露所有组件
import Breadcrumb from './components/breadcrumb';

const IluvatarWidget = {
    Breadcrumb
};

IluvatarWidget.install = vue => {
    Breadcrumb.install(vue);
};

export default IluvatarWidget;
