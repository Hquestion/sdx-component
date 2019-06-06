import { isString } from '../helper/tool';
import moment from 'moment';

const fillZero = (num) => {
    return num < 10 ? '0' + num : num;
};

export default {
    filters: {
        byteFormatter(byte) {
            if (byte === 0) return '0 B';
            if (!byte) return '';

            let k = 1024;
            let sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
            let i = Math.floor(Math.log(byte) / Math.log(k));

            return Math.floor(byte / Math.pow(k, i)) + ' ' + sizes[i];
        },
        dateFormatter(date) {
            if(!date) return '';
            if (isString(date)) {
                return moment(date).format('YYYY-MM-DD HH:mm:ss');
            } else if (date instanceof Date) {
                return moment(date).format('YYYY-MM-DD HH:mm:ss');
            } else if (date instanceof moment) {
                return date.format('YYYY-MM-DD HH:mm:ss');
            } else {
                return date;
            }
        },
        seconds2HMS(seconds) {
            const hourStr = fillZero(Math.floor(seconds / 60 / 60));
            let leftSeconds = seconds % 3600;
            const minuteStr = fillZero(Math.floor(leftSeconds / 60));
            leftSeconds = seconds % 60;
            const secondStr = fillZero(leftSeconds);
            return `${hourStr}:${minuteStr}:${secondStr}`;
        }
    }
};
