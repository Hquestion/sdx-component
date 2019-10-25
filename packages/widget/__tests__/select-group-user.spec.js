import { mount, shallowMount, createLocalVue } from '@vue/test-utils';
import 'babel-polyfill';
import SelectGroupUser from '../components/select-group-user';
import ElementUI from 'element-ui';

const localVue = createLocalVue();
localVue.use(ElementUI);

jest.mock('@sdx/utils/src/api/user', () => {
    return {
        getGroups() {
            return Promise.resolve({
                groups: []
            });
        },
        getUserList() {
            return Promise.resolve({
                users: []
            });
        }
    };
});

describe('SelectGroupUser', () => {
    it('test render works', () => {
        var wrapper = shallowMount(SelectGroupUser, {
            propsData: {
                mode: 'group',
                users: [],
                groups: []
            }
        });
        expect(wrapper.vm.mode).toEqual('group');
        expect(wrapper.classes('sdxw-select-group-user')).toEqual(true);
    });

    it('test users prop works', () => {
        var wrapper = shallowMount(SelectGroupUser, {
            propsData: {
                users: ['test', 'test1'],
                groups: []
            }
        });
        expect(wrapper.vm.users).toEqual(['test', 'test1']);
    });

    it('test groups prop works', () => {
        var wrapper = shallowMount(SelectGroupUser, {
            propsData: {
                users: [],
                groups: ['test', 'test1']
            }
        });
        expect(wrapper.vm.groups).toEqual(['test', 'test1']);
    });

    it('test event emitted', (done) => {
        var wrapper = mount(SelectGroupUser, {
            propsData: {
                mode: 'group',
                users: [],
                groups: ['test', 'test1']
            },
            localVue
        });
        wrapper.setData({
            tmpTags: ['1/1', '2/2']
        });
        setTimeout(() => {
            expect(wrapper.emitted('update:groups')).toBeTruthy();
            done();
        }, 500);

    })

});
