import ContentPanel from './src/Panel';

ContentPanel.install = Vue => {
    Vue.component(ContentPanel.name, ContentPanel);
};

export default ContentPanel;
