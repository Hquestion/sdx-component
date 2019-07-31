import { mount } from '@vue/test-utils';
import Pagination from '../components/pagination';

describe('Pagination', () => {
    it('test total works', () => {
        var wrapper = mount(Pagination, {
            propsData: {
                total: 234,
                currentPage: 1
            },
            stubs: { transition: false },
            sync: false
        });
        expect(wrapper.vm.total).toEqual(234);
        expect(wrapper.html()).toContain('<span class="el-pagination__total">共 234 条</span>');
    });

    it('test currentPage updated', (done) => {
        const wrapper = mount(Pagination, {
            propsData: {
                total: 234,
                currentPage: 1
            },
            stubs: { transition: false },
            sync: false
        });

        wrapper.find('button.btn-next').trigger('click');
        setTimeout((done) => {
            expect(wrapper.emitted()['update:currentPage']).toBeTruthy();
            expect(wrapper.emitted()['update:currentPage'][0]).toEqual([2]);
            done();
        }, 500, done);
    });

    it('test disabled works', () => {
        const wrapper = mount(Pagination, {
            propsData: {
                total: 234,
                currentPage: 1,
                disabled: true
            },
            stubs: { transition: false },
            sync: false
        });
        wrapper.find('.btn-next').trigger('click');
        expect(wrapper.vm.currentPage).toEqual(1);
    });

    it('test current change event emitted', (done) => {
        const wrapper = mount(Pagination, {
            propsData: {
                total: 234,
                currentPage: 1
            },
            stubs: { transition: false },
            sync: false
        });
        wrapper.find('button.btn-next').trigger('click');
        setTimeout((done) => {
            expect(wrapper.emitted()['current-change']).toBeTruthy();
            expect(wrapper.emitted()['current-change'][0]).toEqual([2]);
            done();
        }, 500, done);
    });

    it('test html rendered', () => {
        const wrapper = mount(Pagination, {
            propsData: {
                total: 234,
                currentPage: 1
            },
            stubs: { transition: false },
            sync: false
        });
        expect(wrapper.classes('sdxu-pagination')).toBe(true);
    });

    it('test pageSize works', () => {
        const wrapper = mount(Pagination, {
            propsData: {
                total: 1107,
                currentPage: 1,
                pageSize: 9
            },
            stubs: { transition: false },
            sync: false
        });
        expect(wrapper.vm.pageSize).toEqual(9);
        expect(wrapper.html()).toContain('<li class="number">123</li>');
    });
});
