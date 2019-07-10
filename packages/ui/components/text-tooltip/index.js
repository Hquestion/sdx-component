import TextTooltip from './src/text-tooltip';

TextTooltip.install = Vue => {
    Vue.component(TextTooltip.name, TextTooltip);
};

export default TextTooltip;
