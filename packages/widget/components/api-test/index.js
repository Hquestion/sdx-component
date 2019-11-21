import SdxwApiTest from './src/ApiTest';
import SdxwApiTestPopper from './src/ApiTestPopper';

const _ApiTest = {
    install(vue) {
        vue.component(SdxwApiTest.name, SdxwApiTest);
        vue.component(SdxwApiTestPopper.name, SdxwApiTestPopper);
    },
    ApiTest: SdxwApiTest,
    ApiTestPopper: SdxwApiTestPopper
};

export default _ApiTest;
