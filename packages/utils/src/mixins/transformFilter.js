import { byteFormatter, dateFormatter } from '../helper/transform';

const fillZero = (num) => {
    return num < 10 ? '0' + num : num;
};

export default {
    filters: {
        byteFormatter,
        dateFormatter,
        seconds2HMS(seconds) {
            if (seconds === 0) {
                return '00:00:00';
            }
            const hourStr = fillZero(Math.floor(seconds / 60 / 60));
            let leftSeconds = seconds % 3600;
            const minuteStr = fillZero(Math.floor(leftSeconds / 60));
            leftSeconds = seconds % 60;
            const secondStr = fillZero(leftSeconds);
            return `${hourStr}:${minuteStr}:${secondStr}`;
        }
    }
};
