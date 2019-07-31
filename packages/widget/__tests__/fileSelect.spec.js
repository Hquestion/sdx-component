import Vue from 'vue';
import { shallowMount, mount, createLocalVue } from '@vue/test-utils';

const mockScript = () => {
    const script = document.createElement('script');
    script.setAttribute('data-injectcss', '1');
    window.__iconfont__svg__cssinject__ = true;
    document.body.appendChild(script);
};
mockScript();

const FileSelect = require('../components/file-select').default;
import ElementUI from 'element-ui';

const localVue = createLocalVue();

localVue.use(ElementUI);



describe('FileSelect', () => {
    var wrapper = mount(FileSelect.FileSelectMix, {
        localVue,
        attachToDocument: true,
        propsData: {
            source: 'local'
        }
    });
   it('source', () => {
       var buttons = wrapper.findAll('.sdxu-button');
       console.log(buttons);
   });
});
