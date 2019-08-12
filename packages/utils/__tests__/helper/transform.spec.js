import {getDateDiff, byteToGB, byteToMB,
    gbToByte, parseMilli, toMilli, byteFormatter, dateFormatter, secToHour, hourToSec, secToDay, dayToSec, cpuTplFriendly} 
from '@sdx/utils/src/helper/transform';
import { t } from '@sdx/utils/src/locale';

describe('tool', () => {
    it('test getDateDiff', () => {
        let now = new Date().getTime()
        let minute = 1000 * 60;
        let hour = minute * 60;
        let day = hour * 24;
        let month = day * 30;
        let year = month * 12;
        expect(getDateDiff(now)).toBe(t('utils.transform.just'));
        expect(getDateDiff(now - minute*3).includes(t('utils.transform.minutes_ago')));
        expect(getDateDiff(now - hour*1).includes(t('utils.transform.hour_ago')));
        expect(getDateDiff(now - day * 25).includes(t('utils.transform.week_ago')));
    });

    it('test byteToGB', () => {
        let byte = 10 * Math.pow(1024, 3)
        expect(byteToGB(byte)).toBe(10)
    });

    it('test byteToMB', () => {
        let byte = 10 * Math.pow(1024, 2)
        expect(byteToMB(byte)).toBe(10)
    });

    it('test gbToByte', () => {
        let gb = 2
        expect(gbToByte(gb)).toBe(2147483648)
    });

    it('test parseMilli', () => {
        let milli = 2000
        expect(parseMilli(milli)).toBe(2)
    });

    it('test toMilli', () => {
        let num = 2
        expect(toMilli(num)).toBe(2000)
    });

    it('test byteFormatter', () => {
        let byte = 2
        expect(byteFormatter(byte)).toBe('2 B')
        byte = 2100
        expect(byteFormatter(byte)).toBe('2 KB')
        byte = 2 * 1024 * 1024
        expect(byteFormatter(byte)).toBe('2 MB')
    });

    it('test dateFormatter', () => {
        let time = '2019-08-06T03:27:11.747000Z'
        expect(dateFormatter(time)).toBe('2019-08-06 11:27:11')
    });

    it('test secToHour', () => {
        let seconds = 3 * 60 * 60
        expect(secToHour(seconds)).toBe(3)
    });

    it('test hourToSec', () => {
        let hour = 3 
        expect(hourToSec(hour)).toBe(10800)
    });

    it('test secToDay', () => {
        let seconds = 3 * 60 * 60 * 24 
        expect(secToDay(seconds)).toBe(3)
    });

    it('test dayToSec', () => {
        let day = 3
        expect(dayToSec(day)).toBe(259200)
    });
})