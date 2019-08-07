import { shallowMount, createLocalVue, createWrapper, mount, config } from "@vue/test-utils";
const localVue = createLocalVue();
import Vue from 'vue/dist/vue.min';
import ElementUI, {Form, FormItem} from 'element-ui';
Vue.use(ElementUI);
localVue.use(ElementUI);

config.stubs.transition = false;

const mockScript = () => {
    const script = document.createElement('script');
    script.setAttribute('data-injectcss', '1');
    window.__iconfont__svg__cssinject__ = true;
    document.body.appendChild(script);
};
mockScript();

const UserInfoDialog = require('../components/userinfo-dialog').default;

let wrapper = null, vm = null, userInfoWrapper = null;

describe('UserInfoDialog', () => {
    afterEach(() => {
        wrapper = null;
        vm = null;
        userInfoWrapper = null;
    });

    it('toggle visible', done => {
        vm = new Vue({
            template: '<div><UserInfoDialog :visible.sync="visible" :user-info-data="data" theme="dashboard"></UserInfoDialog></div>',
            data() {
                return {
                    visible: false,
                    data: {
                        username: 'test',
                        fullName: 'test full name',
                        roles: [{name: 'role1'}],
                        groups: [{name: 'group1'}, {name: 'group2'}]
                    }
                };
            },
            components: {
                UserInfoDialog
            }
        }).$mount(document.createElement('div'));
        vm.child = vm.$children[0];
        wrapper = createWrapper(vm);
        userInfoWrapper = wrapper.find('.sdxw-userinfo');
        expect(userInfoWrapper.isVisible()).toBeFalsy();
        vm.visible = true;
        setTimeout(() => {
            expect(userInfoWrapper.isVisible()).toBeTruthy();
            done();
        }, 100);
    });

    it('dashboard模式的正常渲染', done => {
        wrapper = mount(UserInfoDialog, {
            propsData: {
                visible: true,
                userInfoData: {
                    username: 'test',
                    fullName: 'test full name',
                    roles: [{name: 'role1'}],
                    groups: [{name: 'group1'}, {name: 'group2'}]
                },
                theme: 'dashboard'
            },
            stubs: {
                'sdxu-dialog': '<div class="sdxu-dialog"><slot></slot></div>'
            }
        });
        setTimeout(() => {
            expect(wrapper.find('.el-form-item').exists()).toBeTruthy()
            expect(wrapper.find('.sdxw-userinfo__full-name input').element.value).toEqual('test full name');
            expect(wrapper.findAll('.el-form-item__content').at(0).text()).toEqual('test');
            expect(wrapper.findAll('.el-form-item__content').at(2).text()).toEqual('role1');
            expect(wrapper.findAll('.el-form-item__content').at(3).findAll('.sdxw-fold-label').length).toBe(2);
            done();
        }, 1000);
    });

    it('非dashboard模式不支持输入', done => {
        wrapper = mount(UserInfoDialog, {
            propsData: {
                visible: true,
                userInfoData: {
                    username: 'test',
                    fullName: 'test full name',
                    roles: [{name: 'role1'}],
                    groups: [{name: 'group1'}, {name: 'group2'}]
                },
                theme: 'user'
            },
            stubs: {
                'sdxu-dialog': true
            }
        });
        setTimeout(() => {
            expect(wrapper.find('.sdxw-userinfo__full-name input').exists()).toEqual(false);
            done();
        }, 1000);
    });
});

