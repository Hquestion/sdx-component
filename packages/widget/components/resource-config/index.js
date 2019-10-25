import ResourceConfig from './src/ResourceConfig';

ResourceConfig.install = Vue => {
    Vue.component(ResourceConfig.name, ResourceConfig);
};

export default ResourceConfig;