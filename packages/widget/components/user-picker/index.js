import UserPicker from './src/UserPicker';

UserPicker.install = Vue => {
    Vue.component(UserPicker.name, UserPicker);
};

export default UserPicker;
