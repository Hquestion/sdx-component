import UserInfoDialog from './src/UserInfoDialog';

UserInfoDialog.install = vue => {
    vue.component(UserInfoDialog.name, UserInfoDialog);
};

export default UserInfoDialog;
