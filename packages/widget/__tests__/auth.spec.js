import auth from '../components/auth';
import {shallowMount, createLocalVue, createWrapper} from "@vue/test-utils";
const localVue = createLocalVue();
import Vue from 'vue/dist/vue.min';

// 注意：'SYSTEM:ALL:ADMIN:'为最高权限，当有此权限时，校验会直接通过。
// 但这里不好mock，故没有测试该权限
jest.mock('@sdx/utils/src/helper/shareCenter', () => {
    return {
        getUser() {
            return {
                allPermissions: [
                    {key: 'SYSTEM-MANAGER:API:READ', tags: ['button', 'api']}
                ]
            };
        },
        getAuthSwitcher() {
            return true;
        }
    };
});

describe('Auth', () => {
    it('作为指令使用,无权限时', () => {
        const div = document.createElement('span');
        const vm = new Vue({
            template: '<div class="my-div"><a v-auth.file.button="\'FILE:READ:\'">test auth</a></div>',
            data() {
                return {};
            },
            directives: {
                auth
            }
        }).$mount();
        div.appendChild(vm.$el);
        Vue.nextTick(() => {
            expect(window.getComputedStyle(div.querySelector('a')).display).toEqual('none');
        });
    });

    it('作为指令使用,有权限时', () => {
        const div = document.createElement('span');
        const vm = new Vue({
            template: '<div class="my-div"><a v-auth.system.button="\'API:READ:\'">test auth</a></div>',
            data() {
                return {};
            },
            directives: {
                auth
            }
        }).$mount();
        div.appendChild(vm.$el);
        Vue.nextTick(() => {
            expect(window.getComputedStyle(div.querySelector('a')).display).not.toEqual('none');
        });
    });

    it('作为函数使用', () => {
        expect(auth.checkAuth('SYSTEM-MANAGER:API:READ:', 'button')).toBeTruthy();
        expect(auth.checkAuth('FILE-MANAGER:API:READ:', 'button')).toBeFalsy();
    });
});
