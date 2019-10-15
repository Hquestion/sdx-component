import authDirective, {auth} from './src/auth';

authDirective.install = Vue => {
    Vue.prototype.$auth = auth;
    Vue.directive(authDirective.name, authDirective);
};

export default authDirective;
