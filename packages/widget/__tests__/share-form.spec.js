import { mount, shallowMount, createLocalVue, config  } from '@vue/test-utils';
import 'babel-polyfill';
import ShareForm from '../components/share-form';
import ElementUI from 'element-ui';

const localVue = createLocalVue();
localVue.use(ElementUI);

describe('ShareForm', () => {
    it('test render works', (done) => {
        var wrapper = shallowMount(ShareForm, {
            propsData: {
                defaultUsers: ['1','2','3'],
                defaultGroups: ['4','5','6'],
                defaultShareType: 'PUBLIC',
                sync: false,
                labelWidth: '150px'
            },
            localVue,
            sync: false
        });
        expect(wrapper.vm.labelWidth).toEqual('150px');
        expect(wrapper.classes('sdxw-share-form')).toEqual(true);
        wrapper.destroy();
        done();
    });

    it('test props works', (done) => {
        var wrapper = shallowMount(ShareForm, {
            localVue,
            propsData: {
                defaultUsers: ['1','2','3'],
                defaultGroups: ['4','5','6'],
                defaultShareType: 'PRIVATE',
                sync: false,
                labelWidth: '120px'
            },
            sync: false
        });
        expect(wrapper.vm.defaultUsers).toEqual(['1','2','3']);
        expect(wrapper.vm.defaultGroups).toEqual(['4','5','6']);
        expect(wrapper.vm.defaultShareType).toEqual('PRIVATE');
        expect(wrapper.vm.sync).toEqual(false);
        expect(wrapper.vm.labelWidth).toEqual('120px');
        wrapper.destroy();
        done();
    });

    it('test event emitted', (done) => {
        var wrapper = shallowMount(ShareForm, {
            propsData: {
                mode: 'group',
                users: [],
                groups: ['test', 'test1'],
                sync: true
            },
            localVue,
            sync: false
        });
        wrapper.setData({
            shareForm: {
                selectedUsers: ['1', '3'],
                selectedGroups: [],
                shareType: 'PRIVATE'
            }
        });
        setTimeout(() => {
            expect(wrapper.emitted('update:defaultUsers')).toBeTruthy();
            expect(wrapper.emitted('update:defaultGroups')).toBeTruthy();
            expect(wrapper.emitted('update:defaultShareType')).toBeTruthy();
            wrapper.destroy();
            done();
        }, 500);
    })

});
