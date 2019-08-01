import ResourceConfig from '../components/resource-config';
import { shallowMount, mount, createLocalVue } from "@vue/test-utils";
import { t } from '@sdx/utils/src/locale';
const localVue = createLocalVue();
import Vue from 'vue';
import ElementUI from 'element-ui';
Vue.use(ElementUI)
localVue.use(ElementUI);


describe('ResourceConfig', () => {
    it('default type', () => {
        const wrapper = shallowMount(ResourceConfig);
        expect(wrapper.classes('sdxw-resource-config__title')).toBe(false);
    });

    it('customize cpu type', () => {
        const wrapper = shallowMount(ResourceConfig, {
            propsData: {
                type: 'cpu'
            }
        });
        expect(wrapper.text()).toBe(t('widget.resourceConfig.CPU_Memory'));
    });

    it('customize gpu type', () => {
        const wrapper = shallowMount(ResourceConfig, {
            propsData: {
                type: 'gpu'
            }
        });
        expect(wrapper.text()).toBe('GPU');
    });

    it('customize cpulabel', () => {
        const wrapper = shallowMount(ResourceConfig, {
            propsData: {
                type: 'cpu',
                cpulabel: 'abc'
            }
        });
        expect(wrapper.text()).toBe('abc');
    });

    it('customize gpulabel', () => {
        const wrapper = shallowMount(ResourceConfig, {
            propsData: {
                type: 'gpu',
                gpulabel: 'abc'
            }
        });
        expect(wrapper.text()).toBe('abc');
    });

    it('default readOnly', () => {
        const wrapper = shallowMount(ResourceConfig);
        expect(wrapper.vm.readOnly).toBe(false);
    });

    it('customize readOnly', () => {
        const randomBoo = [true, false][Math.floor(Math.random()*2)];
        const wrapper = shallowMount(ResourceConfig, {
            propsData: {
                readOnly: randomBoo
            }
        });
        expect(wrapper.vm.readOnly).toBe(randomBoo);
    });

    it('default required', () => {
        const wrapper = shallowMount(ResourceConfig, {
            propsData: {
                type: 'gpu',
            }
        });
        expect(wrapper.vm.required).toBe(false);
        expect(wrapper.find('.sdxw-resource-config__title').contains('span')).toBe(false);
    });

    it('customize required', () => {
        const randomBoo = [true, false][Math.floor(Math.random()*2)];
        const wrapper = shallowMount(ResourceConfig, {
            propsData: {
                type: 'gpu',
                required: randomBoo
            }
        });
        expect(wrapper.vm.required).toBe(randomBoo);
        expect(wrapper.find('.sdxw-resource-config__title').contains('span')).toBe(randomBoo);
    });

    it('default showError', () => {
        const wrapper = shallowMount(ResourceConfig, {
            propsData: {
                dataReady: true,
            }
        });
        expect(wrapper.vm.showError).toBe(true);
    });

    // it('etches async when a resourceConfig is render', done => {
    //     // const mockFn = jest.fn();
    //     const wrapper = mount(ResourceConfig, {
    //         localVue,
    //         propsData: {
    //             type: 'gpu',
    //             value: {
    //                 label: 'XX',
    //                 count: 1,
    //                 uuid: 'XX-1'
    //             }
    //         }
    //     });
    //     setTimeout(() => {
    //         console.log(wrapper.html());
    //         done();
    //     }, 1000)
    //     // wrapper.setMethods({getResourceList: mockFn});
    //     // expect(mockFn).toBeCalled();
    // });
});
