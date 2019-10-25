import transformFilter from '../../src/mixins/transformFilter';

describe('transformFilter', () => {
    it('test seconds2HMS', () => {
        let seconds = 0.1
        expect(transformFilter.filters.seconds2HMS(seconds)).toBe('00:00:01')
        seconds = 80
        expect(transformFilter.filters.seconds2HMS(seconds)).toBe('00:01:20')
        seconds = 3601
        expect(transformFilter.filters.seconds2HMS(seconds)).toBe('01:00:01')
    })
})