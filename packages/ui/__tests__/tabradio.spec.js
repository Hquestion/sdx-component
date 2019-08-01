import {createWrapper, shallowMount} from "@vue/test-utils";
import TabRadio from '../components/tab-radio';
import Vue from 'vue/dist/vue.min';

const factory = {
    createTabRadio() {
        const vm = new Vue({
            template: `<div>
                    <TabRadioGroup v-model="active">
                        <TabRadioItem name="radio1" size="regular">radio1</TabRadioItem>
                        <TabRadioItem name="radio2" size="regular">radio2</TabRadioItem>
                    </TabRadioGroup>
                </div>`,
            data() {
                return {
                    active: 'radio1'
                };
            },
            components: {
                TabRadioItem: TabRadio.TabRadioItem,
                TabRadioGroup: TabRadio.TabRadioGroup
            }
        }).$mount(document.createElement('div'));
        vm.child = vm.$children[0];
        return {
            wrapper: createWrapper(vm),
            vm: vm
        };
    }
};

describe('TabRadio', () => {
    it('渲染size', () => {
        const wrapper = factory.createTabRadio().wrapper;
        expect(wrapper.find(TabRadio.TabRadioItem).classes('sdxu-tab-radio--regular')).toBe(true);
    });

    it('渲染v-model,激活设置的TAB', done => {
        const wrapperVM = factory.createTabRadio();
        const wrapper = wrapperVM.wrapper;
        setTimeout(() => {
            const activeWrapper = wrapper.findAll(TabRadio.TabRadioItem).at(0);
            expect(activeWrapper.classes('is-active')).toBe(true);
            done();
        }, 200);
    });

    it('点击时切换当前激活的TAB', done => {
        const wrapperVM = factory.createTabRadio();
        const wrapper = wrapperVM.wrapper;
        const vm = wrapperVM.vm;
        const wrapperItem = wrapper.findAll(TabRadio.TabRadioItem).at(1);
        wrapperItem.trigger('click');
        setTimeout(() => {
            expect(vm.active).toEqual('radio2');
            expect(wrapperItem.classes('is-active')).toBe(true);
            done();
        }, 100);
    });
});
