import UserAvatar from './src/UserAvatar';

UserAvatar.install = Vue => {
    Vue.component(UserAvatar.name, UserAvatar);
};

export default UserAvatar;
