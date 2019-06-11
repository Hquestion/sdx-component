import { isString } from './tool';
import dayjs from 'dayjs';

// 标准时间转换时间距离现在多久
export function  getDateDiff(dateTimeStamp) {
    let minute = 1000 * 60;
    let hour = minute * 60;
    let day = hour * 24;
    let month = day * 30;
    let year = month * 12;
    let now = new Date().getTime();
    let diffValue = now - new Date(dateTimeStamp);
    let result = '';
    // 处理后端给的数据有些许问题
    if (diffValue < 0) { result = '刚刚'; }
    let yearC = diffValue / year;
    let monthC = diffValue / month;
    let weekC = diffValue / (7 * day);
    let dayC = diffValue / day;
    let hourC = diffValue / hour;
    let minC = diffValue / minute;
    if (yearC >= 1) {
        result = `${parseInt(yearC)}年前`;
    } else if (monthC >= 1) {
        result = `${parseInt(monthC)}月前`;
    } else if (weekC >= 1) {
        result = `${parseInt(weekC)}周前`;
    } else if (dayC >= 1) {
        result = `${parseInt(dayC)}天前`;
    } else if (hourC >= 1) {
        result = `${parseInt(hourC)}小时前`;
    } else if (minC >= 1) {
        result = `${parseInt(minC)}分钟前`;
    } else { result = '刚刚'; }
    return result;
}


// 标准时间转换成想要的formatDate格式
function padLeftZero(str){
    return ('00'+str).substr(str.length);
}
export function formatDate(date,fmt){
    date = new Date(date);
    let o = {
        'M+' : date.getMonth() +1,                    //月份
        'd+' : date.getDate(),                        //日
        'h+' : date.getHours(),                       //小时
        'm+' : date.getMinutes(),                     //分
        's+' : date.getSeconds(),                     //秒
        'q+':  Math.floor((date.getMonth() + 3) / 3), //季度
        'S':   date.getMilliseconds()                 //毫秒
    };
    if(/(y+)/.test(fmt)){   //年份
        fmt = fmt.replace(RegExp.$1,(date.getFullYear()+'').substr(4-RegExp.$1.length));
    }
    for(let k in o){
        if (new RegExp('(' + k + ')').test(fmt)){
            let str = o[k] + '';
            fmt = fmt.replace(RegExp.$1,(RegExp.$1.length === 1) ? str:padLeftZero(str));
        }
    }
    return fmt;
}

export function  byteFormatter(byte) {
    if (byte === 0) return '0 B';
    if (!byte) return '';

    let k = 1024;
    let sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    let i = Math.floor(Math.log(byte) / Math.log(k));

    return Math.floor(byte / Math.pow(k, i)) + ' ' + sizes[i];
}

export function dateFormatter(date) {
    if(!date) return '';
    if (isString(date)) {
        return dayjs(date).format('YYYY-MM-DD HH:mm:ss');
    } else if (date instanceof Date) {
        return dayjs(date).format('YYYY-MM-DD HH:mm:ss');
    } else if (date instanceof dayjs) {
        return date.format('YYYY-MM-DD HH:mm:ss');
    } else {
        return date;
    }
}
