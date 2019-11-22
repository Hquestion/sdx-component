import { isString } from './tool';
import dayjs from 'dayjs';
import { t } from '../locale';
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
    if (diffValue < 0) { result = t('utils.transform.just'); }
    let yearC = diffValue / year;
    let monthC = diffValue / month;
    let weekC = diffValue / (7 * day);
    let dayC = diffValue / day;
    let hourC = diffValue / hour;
    let minC = diffValue / minute;
    if (yearC >= 1) {
        result = `${parseInt(yearC)} ${parseInt(yearC) === 1 ? t('utils.transform.year_ago') : t('utils.transform.years_ago')}`;
    } else if (monthC >= 1) {
        result = `${parseInt(monthC)} ${parseInt(monthC) === 1 ? t('utils.transform.month_ago') : t('utils.transform.months_ago')}`;
    } else if (weekC >= 1) {
        result = `${parseInt(weekC)} ${parseInt(weekC) === 1 ? t('utils.transform.week_ago') : t('utils.transform.weeks_ago')}`;
    } else if (dayC >= 1) {
        result = `${parseInt(dayC)} ${parseInt(dayC) === 1 ? t('utils.transform.day_ago') : t('utils.transform.days_ago')}`;
    } else if (hourC >= 1) {
        result = `${parseInt(hourC)} ${parseInt(hourC) === 1 ? t('utils.transform.hour_ago') : t('utils.transform.hours_ago')}`;
    } else if (minC >= 1) {
        result = `${parseInt(minC)} ${parseInt(minC) === 1 ? t('utils.transform.minute_ago') : t('utils.transform.minutes_ago')}`;
    } else { result = t('utils.transform.just'); }
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

export function byteToGB(byte) {
    return Math.floor(byte / Math.pow(1024, 3));
}

export function byteToMB(byte) {
    return Math.floor(byte / Math.pow(1024, 2));
}

export function gbToByte(gb) {
    return gb * Math.pow(1024, 3);
}

export function parseMilli(milli) {
    return milli / 1000;
}

export function toMilli(num) {
    return num * 1000;
}

export function byteFormatter(byte) {
    if (byte === 0) return '0 B';
    if (!byte) return '';

    let k = 1024;
    let sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    let i = Math.floor(Math.log(byte) / Math.log(k));

    return Math.floor(byte / Math.pow(k, i)) + ' ' + sizes[i];
}

export function dateFormatter(date, fmt = 'YYYY-MM-DD HH:mm:ss') {
    if(!date) return '-';
    if (isString(date)) {
        return dayjs(date).format(fmt);
    } else if (date instanceof Date) {
        return dayjs(date).format(fmt);
    } else if (date instanceof dayjs) {
        return date.format(fmt);
    } else {
        return date;
    }
}

export function secToHour(seconds) {
    return seconds && Math.floor(seconds / (60 * 60)) || '';
}

export function hourToSec(hour) {
    return hour && hour * 60 * 60;
}

export function secToDay(seconds) {
    return seconds && Math.floor(seconds / (60 * 60 * 24));
}

export function dayToSec(day) {
    return day && day * 60 * 60 * 24;
}

export function cpuTplFriendly(config) {
    return config && `${parseMilli(config.cpu)}C ${byteToGB(config.memory)}GB` || '';
}

/* 
    计算2个时间差 '2019-10-17T08:49:14.195000Z',  '2019-10-17T08:59:15.195000Z',  => 10m1s
    接受2个参数，开始时间和结束时间

    如果一个参数的话就是时间差s
*/ 
export function timeDuration(firstTime, secondTime) {
    let dateDiff = 0;
    if(arguments.length === 1) {
        if(!firstTime) {
            return '-';
        }
        dateDiff = firstTime * 1000;
    } else {
        if(!secondTime) {
            return '-';
        }
        let dateBegin = new Date(dateFormatter(firstTime));
        let dateEnd = new Date(dateFormatter(secondTime));
        //时间差的毫秒数
        dateDiff = dateEnd.getTime() - dateBegin.getTime();
    }
    //计算出相差天数
    let dayDiff = Math.floor(dateDiff / (24 * 3600 * 1000));
    //计算天数后剩余的毫秒数
    let leave1=dateDiff%(24*3600*1000);  
    //计算出小时数 
    let hours=Math.floor(leave1/(3600*1000));
    //计算相差分钟数
    let leave2=leave1%(3600*1000);    //计算小时数后剩余的毫秒数
    let minutes=Math.floor(leave2/(60*1000));//计算相差分钟数
    //计算相差秒数
    let leave3=leave2%(60*1000);      //计算分钟数后剩余的毫秒数
    let seconds=Math.round(leave3/1000);
    let res = '-';
    if (dayDiff > 0){
        res = `${dayDiff}d${hours}h${minutes}m${seconds}s`;
    } else if(dayDiff <= 0 && hours > 0) {
        res = `${hours}h${minutes}m${seconds}s`;
    } else if (dayDiff <= 0 && hours <=0 && minutes > 0) {
        res = `${minutes}m${seconds}s`;
    } else if (dayDiff <= 0 && hours <=0 && minutes <=0) {
        res = `${seconds}s`;
    }
    return res;
}

/**
 * 日期差格式化
 * @param {number} dateDiff 
 */
export function dateDiffFormatter(dateDiff) {
    //计算出相差天数
    let days = Math.floor(dateDiff / (24 * 3600 * 1000));
    //计算天数后剩余的毫秒数
    let leave1=dateDiff%(24*3600*1000);  
    //计算出小时数 
    let hours=Math.floor(leave1/(3600*1000));
    //计算相差分钟数
    let leave2=leave1%(3600*1000);    //计算小时数后剩余的毫秒数
    let minutes=Math.floor(leave2/(60*1000));//计算相差分钟数
    //计算相差秒数
    let leave3=leave2%(60*1000);      //计算分钟数后剩余的毫秒数
    let seconds=Math.round(leave3/1000);
    let time = '';

    if (days > 0) {
        time += `${days}d`;
    }
    if (hours > 0) {
        time += `${hours}h`;
    }
    if (minutes > 0) {
        time += `${minutes}m`;
    }
    if (seconds > 0) {
        time += `${seconds}s`;
    }
    return time;
}

/**
 * 计算两个日期差并格式化
 * @param {Date} startTime 
 * @param {Date} stopTime 
 */
export function calculateDateDiffFormatter(startTime, stopTime) {
    if(!startTime || !stopTime) {
        return '';
    }
    let dateBegin = new Date(startTime);
    let dateEnd = new Date(stopTime);
    //时间差的毫秒数
    let dateDiff = dateEnd.getTime() - dateBegin.getTime();
    return dateDiffFormatter(dateDiff);
}
