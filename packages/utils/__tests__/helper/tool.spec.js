import { shallowMount, createLocalVue } from '@vue/test-utils';
import {deepCopy, isNaN, removeBlankAttr, paginate } from '@sdx/utils/src/helper/tool';
describe('tool', () => {
    it('test deepCopy', () => {
        const data = [{age: 12, name: 'edison'}]
        expect(deepCopy(data)).toStrictEqual(data);
    });

    it('test isNaN', () => {
        let num = NaN
        expect(isNaN(num)).toBe(true);
        num = 12
        expect(isNaN(num)).toBe(false);
    });

    
})