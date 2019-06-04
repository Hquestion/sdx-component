import { isString } from '../helper/tool';
import moment from 'moment';

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
        }
    }
};
