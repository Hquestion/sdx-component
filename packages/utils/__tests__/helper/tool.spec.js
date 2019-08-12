import {deepCopy, isNaN, isString, isUndefined, isObject,isEmptyObject, isFunction, isArray, isStringArray, isObjectArray, removeSameAttr, removeBlankAttr, paginate } from '@sdx/utils/src/helper/tool';
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

    it('test isString', () => {
        let str = 'ada'
        expect(isString(str)).toBe(true);
        str = 12
        expect(isString(str)).toBe(false);
    });

    it('test isUndefined', () => {
        let udf = undefined
        expect(isUndefined(udf)).toBe(true);
        udf = 12
        expect(isUndefined(udf)).toBe(false);
    });

    it('test isObject', () => {
        let obj = undefined
        expect(isObject(obj)).toBe(false);
        obj = {}
        expect(isObject(obj)).toBe(true);
        obj = null
        expect(isObject(obj)).toBe(false);
    });

    it('test isEmptyObject', () => {
        let obj = undefined
        expect(isEmptyObject(obj)).toBe(false);
        obj = {}
        expect(isEmptyObject(obj)).toBe(true);
        obj = null
        expect(isEmptyObject(obj)).toBe(false);
        obj = {age:12}
        expect(isEmptyObject(obj)).toBe(false);
    });

    it('test isFunction', () => {
        let fun = function() {}
        expect(isFunction(fun)).toBe(true);
        fun = null
        expect(isFunction(fun)).toBe(false);
    });

    it('test isArray', () => {
        let ary = []
        expect(isArray(ary)).toBe(true);
        ary = null
        expect(isArray(ary)).toBe(false);
    });

    it('test isStringArray', () => {
        let ary = [12,23]
        expect(isStringArray(ary)).toBe(false);
        ary = ['12', 's']
        expect(isStringArray(ary)).toBe(true);
    });

    it('test isObjectArray', () => {
        let ary = [{}, {}]
        expect(isObjectArray(ary)).toBe(true);
        ary = [null, null]
        expect(isObjectArray(ary)).toBe(false);
    });

    it('test paginate', () => {
        let [pageIndex, pageSize] = [2, 10]
        expect(paginate(pageIndex, pageSize)).toEqual({
            start: 11,
            count: 10
        });
    });

    it('test removeBlankAttr', () => {
        let obj = {
            name: '',
            age: 12
        }
        removeBlankAttr(obj)
        expect(obj).toEqual({
            age: 12
        });
    });

    it('test removeSameAttr', () => {
        let nObj = {
            name: '',
            age: 12,
        }
        let oObj = {
            name: 'edison',
            age: 12,
        }
        let params = removeSameAttr(nObj, oObj)
        expect(params).toEqual({
            name: 'edison'
        });
    });
})