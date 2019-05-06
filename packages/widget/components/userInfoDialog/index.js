import UserInfoDialog from './src/userInfoDialog';

UserInfoDialog.install = vue => {
    vue.component(UserInfoDialog.name, UserInfoDialog);
};

export default UserInfoDialog;
