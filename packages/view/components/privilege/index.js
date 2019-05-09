import Privilege from './src/Privilege';

Privilege.install = vue => {
    vue.component(Privilege.name, Privilege);
};

export default Privilege;
