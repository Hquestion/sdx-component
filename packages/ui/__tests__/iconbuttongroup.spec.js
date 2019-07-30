import { shallowMount, mount, createLocalVue } from "@vue/test-utils";
import IconButtonGroup from '../components/icon-button-group';
import IconButton from '../components/icon-button';
import ElementUI from 'element-ui';

const localVue = createLocalVue();
localVue.use(IconButton);
localVue.use(ElementUI);


describe('IconButtonGroup', () => {
    it('小于三个图标正常展示', () => {
        const wrapper = shallowMount(IconButtonGroup, {
            localVue,
            slots: {
                default: [
                    '<SdxuIconButton icon="sdx-icon sdx-icon-1" />',
                    '<SdxuIconButton icon="sdx-icon sdx-icon-2" />'
                ]
            }
        });

        const iconbuttons = wrapper.findAll(IconButton);
        expect(iconbuttons.length).toBe(3);
        expect(wrapper.findAll('.sdxu-icon-button-group__ellipse-item').length).toBe(0)
    });

    it('三个图标正常展示, 无下拉展示', () => {
        const wrapper = shallowMount(IconButtonGroup, {
            localVue,
            slots: {
                default: [
                    '<SdxuIconButton icon="sdx-icon sdx-icon-1" />',
                    '<SdxuIconButton icon="sdx-icon sdx-icon-2" />',
                    '<SdxuIconButton icon="sdx-icon sdx-icon-2" />'
                ]
            }
        });

        const iconbuttons = wrapper.findAll(IconButton);
        expect(iconbuttons.length).toBe(4);
        expect(wrapper.findAll('.sdxu-icon-button-group__ellipse-item').length).toBe(0);
    });

    it('超过三个图标折叠展示', () => {
        const wrapper = mount(IconButtonGroup, {
            localVue,
            slots: {
                default: [
                    '<SdxuIconButton icon="sdx-icon sdx-icon-1" title="1" />',
                    '<SdxuIconButton icon="sdx-icon sdx-icon-2" title="2" />',
                    '<SdxuIconButton icon="sdx-icon sdx-icon-3" title="3" />',
                    '<SdxuIconButton icon="sdx-icon sdx-icon-4" title="4" />',
                    '<SdxuIconButton icon="sdx-icon sdx-icon-5" title="5" />',
                    '<SdxuIconButton icon="sdx-icon sdx-icon-6" title="6" />'
                ]
            }
        });

        const iconbuttons = wrapper.findAll(IconButton);
        expect(iconbuttons.length).toBe(7);
        // 不知什么原因，popover内部无法渲染，这里只测试vm中的allIconButtons / hiddenIcons 是否正确
        expect(wrapper.vm.hiddenIcons.length).toEqual(4);
        expect(wrapper.vm.allIconButtons.length).toEqual(6);
    });
});
