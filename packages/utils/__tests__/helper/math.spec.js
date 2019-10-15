import {minIndex, minAbsIndex} from '../../src/helper/math';

describe('math', () => {
    it('test minIndex', () => {
        let list = [9,5,1,8,1];
        expect(minIndex(list)).toBe(2)
    })

    it('test minAbsIndex', () => {
        let list = [9,5,1,8,1];
        expect(minAbsIndex(list)).toBe(2)
    })
})