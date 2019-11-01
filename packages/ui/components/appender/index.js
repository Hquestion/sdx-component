import Appender from './src/Appender';

Appender.install = vue => {
    vue.component(Appender.name, Appender);
};

export default Appender;
