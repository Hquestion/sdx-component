import Button from './components/button';
import Radio from './components/radio';

const IluvatarUI = {
    Button,
    Radio
};

IluvatarUI.install = vue => {
    Button.install(vue);
    Radio.install(vue);
};

export default IluvatarUI;
