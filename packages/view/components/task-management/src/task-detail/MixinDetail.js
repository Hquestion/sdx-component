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
import { byteToGB, parseMilli } from '@sdx/utils/src/helper/transform';

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
            return this.task && this.task.state === STATE_TYPE.RUNNING && (Array.isArray(this.task.pods) && this.task.pods.length > 0);
        },
        hasLog() {
            return this.task && ![STATE_TYPE.LAUNCH_ABNORMAL, STATE_TYPE.CREATED, STATE_TYPE.LAUNCHING].includes(this.task.state) && this.task.pods.length > 0;
        },
        hasDataInfo() {
            return this.task && ((this.task.datasources && this.task.datasources.length > 0) || (this.task.datasets && this.task.datasets.length > 0));
        },
        isModelTask() {
            return this.task && [TASK_TYPE.TENSORFLOW_SERVING, TASK_TYPE.SPARK_SERVING, TASK_TYPE.PMML_SERVING].includes(this.task.type);
        },
        isSPARK() {
            return this.task && this.task === TASK_TYPE.SPARK;
        },
        isPYTHON() {
            return this.task && this.task === TASK_TYPE.PYTHON;
        },
        isJUPYTER() {
            return this.task && this.task === TASK_TYPE.JUPYTER;
        },
        isTENSORBOARD() {
            return this.task && this.task === TASK_TYPE.TENSORBOARD;
        },
        isTENSORFLOW() {
            return this.task && this.task === TASK_TYPE.TENSORFLOW;
        },
        isTENSORFLOW_DIST() {
            return this.task && this.task === TASK_TYPE.TENSORFLOW_DIST;
        },
        isTENSORFLOW_AUTO_DIST() {
            return this.task && this.task === TASK_TYPE.TENSORFLOW_AUTO_DIST;
        },
        isCONTAINERDEV() {
            return this.task && this.task === TASK_TYPE.CONTAINERDEV;
        },
        isDATASET_SERVICE() {
            return this.task && this.task === TASK_TYPE.DATASET_SERVICE;
        }
    },
    methods: {
        getTaskAttr(attr, prefix = '', suffix = '') {
            if (attr === 'run_time') {
                if (this.task.stoppedAt && this.task.runningAt) {
                    return this.dealTime(this.task.runningAt, this.task.stoppedAt);
                } else if (!this.task.stoppedAt && this.task.runningAt) {
                    return this.dealTime(this.task.runningAt, new Date());
                }
            } else if (Array.isArray(attr)){
                let ret = this.task;
                attr.forEach(item => {
                    ret = ret[item];
                });
                return prefix + (ret !== undefined ? ret : '') + suffix;
            } else {
                return prefix + (this.task[attr] ? this.task[attr] : '') + suffix;
            }
        },
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
            if (days > 0) {
                time = `${days}天${hours}时${minutes}分${second}秒`;
            } else if (days === 0 && hours > 0) {
                time = `${hours}时${minutes}分${second}秒`;
            } else if (days === 0 && hours === 0 && minutes > 0) {
                time = `${minutes}分${second}秒`;
            } else {
                time = `${second}秒`;
            }
            return time;
        },
        byteToGb(byte) {
            return byteToGB(byte); 
        },
        milliCoreToCore(millicore) {
            return parseMilli(millicore);
        }
    }
};