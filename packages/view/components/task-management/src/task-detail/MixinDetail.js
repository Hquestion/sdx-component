import SdxvDetailContainer from './common/DetailContainer';
import SdxvLogList from './common/LogList';
import SdxvBaseInfoItem from './common/BaseInfoItem';
import SdxvSaveAsDialog from './common/SaveAsDialog';
import SdxvDataInfo from './common/DataInfo';
import SdxvMonitorInfo from './common/MonitorInfo';
import SdxwFoldLabel from '@sdx/widget/components/fold-label';
import SdxuButton from '@sdx/ui/components/button';
import SdxuEmpty from '@sdx/ui/components/empty';
import { STATE_TYPE, STATE_MAP_FOLD_LABEL_TYPE, STATE_TYPE_LABEL, TASK_TYPE, TASK_TYPE_LABEL } from '@sdx/utils/src/const/task';
import { byteToGB, parseMilli, dateFormatter } from '@sdx/utils/src/helper/transform';
import { t } from '@sdx/utils/src/locale';

export default {
    props: {
        task: {
            type: Object,
            default: null
        }
    },
    components: {
        SdxvDetailContainer,
        SdxvLogList,
        SdxuButton,
        SdxvSaveAsDialog,
        SdxvBaseInfoItem,
        SdxvDataInfo,
        SdxvMonitorInfo,
        SdxuEmpty,
        [SdxwFoldLabel.FoldLabel.name]: SdxwFoldLabel.FoldLabel
    },
    data() {
        this.STATE_TYPE = STATE_TYPE;
        this.STATE_TYPE_LABEL = STATE_TYPE_LABEL;
        this.STATE_MAP_FOLD_LABEL_TYPE = STATE_MAP_FOLD_LABEL_TYPE;
        this.TASK_TYPE_LABEL = TASK_TYPE_LABEL;
        return {};
    },
    computed: {
        stateIcon() {
            let icon = '';
            if (!this.task) {
                icon = '';
            } else if ([STATE_TYPE.LAUNCHING, STATE_TYPE.RUNNING, STATE_TYPE.KILLING].includes(this.task.state)) {
                icon = 'loading';
            } else if ([STATE_TYPE.FAILED, STATE_TYPE.LAUNCH_ABNORMAL].includes(this.task.state)) {
                icon = 'warning';
            }
            return icon;
        },
        hasRealMonitor() {
            return this.task && ![STATE_TYPE.LAUNCH_ABNORMAL, STATE_TYPE.CREATED, STATE_TYPE.LAUNCHING].includes(this.task.state) && (Array.isArray(this.task.pods) && this.task.pods.length > 0);
        },
        hasLog() {
            return this.task && ![STATE_TYPE.LAUNCH_ABNORMAL, STATE_TYPE.CREATED, STATE_TYPE.LAUNCHING].includes(this.task.state) && (Array.isArray(this.task.pods) && this.task.pods.length > 0);
        },
        hasDataInfo() {
            return this.task && ((this.task.datasources && this.task.datasources.length > 0) || (this.task.datasets && this.task.datasets.length > 0));
        },
        isRunning() {
            return this.task && [STATE_TYPE.LAUNCHING, STATE_TYPE.RUNNING, STATE_TYPE.KILLING].includes(this.task.state);
        },
        isModelTask() {
            return this.task && [TASK_TYPE.TENSORFLOW_SERVING, TASK_TYPE.SPARK_SERVING, TASK_TYPE.PMML_SERVING].includes(this.task.type);
        },
        isSPARK() {
            return this.task && this.task.type === TASK_TYPE.SPARK;
        },
        isPYTHON() {
            return this.task && this.task.type === TASK_TYPE.PYTHON;
        },
        isJUPYTER() {
            return this.task && this.task.type === TASK_TYPE.JUPYTER;
        },
        isTENSORBOARD() {
            return this.task && this.task.type === TASK_TYPE.TENSORBOARD;
        },
        isTENSORFLOW() {
            return this.task && this.task.type === TASK_TYPE.TENSORFLOW;
        },
        isTENSORFLOW_DIST() {
            return this.task && this.task.type === TASK_TYPE.TENSORFLOW_DIST;
        },
        isTENSORFLOW_AUTO_DIST() {
            return this.task && this.task.type === TASK_TYPE.TENSORFLOW_AUTO_DIST;
        },
        isCONTAINERDEV() {
            return this.task && this.task.type === TASK_TYPE.CONTAINERDEV;
        },
        isDATA_SERVICE() {
            return this.task && this.task.type === TASK_TYPE.DATA_SERVICE;
        },
        showSaveAsImage() {
            return (this.isJUPYTER || this.isCONTAINERDEV) && this.task.state === STATE_TYPE.RUNNING;
        },
        hasGpu() {
            let has = false;
            if (this.task && this.task.resourceConfig) {
                has = Object.keys(this.task.resourceConfig).some(item => {
                    return item.includes('GPUS') && this.task.resourceConfig[item] > 0;
                });
            }
            return has;
        }
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
