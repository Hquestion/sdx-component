import { isUndefined, isNaN } from '../helper/tool';

export function minIndex(list) {
    let min, minIndex;
    list.forEach((item, index) => {
        if (isUndefined(min) && !isUndefined(item) && !isNaN(item)) {
            min = item;
            minIndex = index;
        } else if (!isUndefined(min)) {
            if (min > item) {
                min = item;
                minIndex = index;
            }
        }
    });
    return minIndex;
}

export function minAbsIndex(list) {
    let min, minIndex;
    list.forEach((item, index) => {
        if (isUndefined(min) && !isUndefined(item) && !isNaN(item)) {
            min = Math.abs(item);
            minIndex = index;
        } else if (!isUndefined(min)) {
            if (min > Math.abs(item)) {
                min = Math.abs(item);
                minIndex = index;
            }
        }
    });
    return minIndex;
}
