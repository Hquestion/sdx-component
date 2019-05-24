import Vue from 'vue';
import { shallowMount, mount, createLocalVue } from '@vue/test-utils';
import FileSelect from '../components/file-select';
import ElementUI from 'element-ui';

const localVue = createLocalVue();


// import '@sdx/utils/src/theme-common/iconfont/iconfont.js';
jest.mock('@sdx/utils/src/theme-common/iconfont/iconfont.js');
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
