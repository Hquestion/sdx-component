
import { STATE_TYPE_VALUE, STATE_MAP_FOLD_LABEL_TYPE, STATE_TYPE_LABEL, TASK_TYPE_VALUE } from '@sdx/utils/src/const/task';
import { byteToGB, parseMilli, dateFormatter } from '@sdx/utils/src/helper/transform';
import { t } from '@sdx/utils/src/locale';

export default {
    props: {
        task: {
            type: Object,
            default: null
        }
    },
    data() {
        this.STATE_TYPE_LABEL = STATE_TYPE_LABEL;
        this.STATE_MAP_FOLD_LABEL_TYPE = STATE_MAP_FOLD_LABEL_TYPE;
        this.STATE_TYPE_VALUE = STATE_TYPE_VALUE;
        return {};
    },
    // todo:
    computed: {
        stateIcon() {
            let icon = '';
            if (!this.task) {
                icon = '';
            } else if ([STATE_TYPE_VALUE.Pending, STATE_TYPE_VALUE.Running, STATE_TYPE_VALUE.Terminating].includes(this.task.state)) {
                icon = 'loading';
            } else if ([STATE_TYPE_VALUE.Failed, STATE_TYPE_VALUE.Error].includes(this.task.state)) {
                icon = 'warning';
            }
            return icon;
        },
        hasRealMonitor() {
            return this.task && ![STATE_TYPE_VALUE.Error, STATE_TYPE_VALUE.Created, STATE_TYPE_VALUE.Pending, STATE_TYPE_VALUE.Scheduling].includes(this.task.state) && (Array.isArray(this.task.pods) && this.task.pods.length > 0);
        },
        hasLog() {
            return this.task && ![STATE_TYPE_VALUE.Error, STATE_TYPE_VALUE.Created, STATE_TYPE_VALUE.Pending, STATE_TYPE_VALUE.Scheduling].includes(this.task.state) && (Array.isArray(this.task.pods) && this.task.pods.length > 0);
        },
        hasDataInfo() {
            return this.task && ((this.task.datasources && this.task.datasources.length > 0) || (this.task.datasets && this.task.datasets.length > 0));
        },
        isRunning() {
            return this.task && [STATE_TYPE_VALUE.Running, STATE_TYPE_VALUE.Terminating].includes(this.task.state);
        },
        isJUPYTER() {
            return this.task && this.task.type === TASK_TYPE_VALUE.JUPYTER;
        },
        isSKYIDE() {
            return this.task && this.task.type === TASK_TYPE_VALUE.SKYIDE;
        },
        isCONTAINERDEV() {
            return this.task && this.task.type === TASK_TYPE_VALUE.CONTAINER_DEV;
        },
        isSKYFLOW() {
            return this.task && this.task.type === TASK_TYPE_VALUE.isSKYFLOW;
        },
        isMODELSERVICE() {
            return this.task && this.task.type === TASK_TYPE_VALUE.MODELSERVICE;
        },
        showSaveAsImage() {
            return (this.isJUPYTER || this.isCONTAINERDEV) && this.task.state === STATE_TYPE_VALUE.Running;
        },
        hasGpu() {
            let has = false;
            if (this.task && this.task.resourceConfig) {
                has = Object.keys(this.task.resourceConfig).some(item => {
                    return item.includes('GPUS') && this.task.resourceConfig[item] > 0;
                });
            }
            return has;
        },
    

        // isSPARK() {
        //     return this.task && this.task.type === TASK_TYPE.SPARK;
        // },
        // isPYTHON() {
        //     return this.task && this.task.type === TASK_TYPE.PYTHON;
        // },
        // isTENSORBOARD() {
        //     return this.task && this.task.type === TASK_TYPE.TENSORBOARD;
        // },
        // isTENSORFLOW() {
        //     return this.task && this.task.type === TASK_TYPE.TENSORFLOW;
        // },
        // isTENSORFLOW_DIST() {
        //     return this.task && this.task.type === TASK_TYPE.TENSORFLOW_DIST;
        // },
        // isTENSORFLOW_AUTO_DIST() {
        //     return this.task && this.task.type === TASK_TYPE.TENSORFLOW_AUTO_DIST;
        // },
        // isDATA_SERVICE() {
        //     return this.task && this.task.type === TASK_TYPE.DATA_SERVICE;
        // },

    },
    methods: {
        dealTime(startTime, endTime) {
            if (!startTime) {
                return '';
            }
            let t1 = startTime; // this.task.running_at
            let t2 = endTime || new Date(); // this.task.stopped_at
            let usedTime = (new Date(t2)).valueOf() - (new Date(t1)).valueOf(); // 两个时间戳相差的毫秒数
            usedTime = usedTime < 0 ? 0 : usedTime;
            let days = Math.floor(usedTime / (24 * 3600 * 1000));
            // 计算出小时数
            let leave1 = usedTime % (24 * 3600 * 1000); // 计算天数后剩余的毫秒数
            let hours = Math.floor(leave1 / (3600 * 1000));
            // 计算相差分钟数
            let leave2 = leave1 % (3600 * 1000); // 计算小时数后剩余的毫秒数
            let minutes = Math.floor(leave2 / (60 * 1000));
            // 计算相差秒
            let leave3 = leave2 % (60 * 1000);
            let second = Math.floor(leave3 / 1000);
            let time = '';

            if (days > 1) {
                time += `${days}${t('sdxCommon.Days')}`;
            } else if (days === 1) {
                time += `${days}${t('sdxCommon.Day')}`;
            }
            if (hours > 1) {
                time += `${hours}${t('sdxCommon.Hours')}`;
            } else if (hours === 1) {
                time += `${hours}${t('sdxCommon.Hour')}`;
            }
            if (minutes > 1) {
                time += `${minutes}${t('sdxCommon.Minutes')}`;
            } else if (minutes === 1) {
                time += `${minutes}${t('sdxCommon.Minute')}`;
            }
            if (second > 1) {
                time += `${second}${t('sdxCommon.Seconds')}`;
            } else if (second === 1) {
                time += `${second}${t('sdxCommon.Second')}`;
            }

            return time;
        },
        byteToGb(byte) {
            return byteToGB(byte);
        },
        milliCoreToCore(millicore) {
            return parseMilli(millicore);
        },
        dateFormatter(date) {
            return dateFormatter(date);
        }
    }
};
