import SdxvDetailContainer from './common/DetailContainer';
import SdxvLogList from './common/LogList';
import SdxvBaseInfoItem from './common/BaseInfoItem';
import SdxvSaveAsDialog from './common/SaveAsDialog';
import SdxvDataInfo from './common/DataInfo';
import SdxvHasNothing from './common/HasNothing';
import SdxvMonitorInfo from './common/MonitorInfo';
import SdxwFoldLabel from '@sdx/widget/components/fold-label';
import SdxuButton from '@sdx/ui/components/button';
import { STATE_TYPE, STATE_MAP_FOLD_LABEL_TYPE } from '@sdx/utils/src/const/task';

export default {
    props: {
        projectId: {
            type: String,
            default: ''
        },
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
        SdxvHasNothing,
        SdxvMonitorInfo,
        [SdxwFoldLabel.FoldLabel.name]: SdxwFoldLabel.FoldLabel
    },
    data() {
        this.STATE_TYPE = STATE_TYPE;
        this.STATE_MAP_FOLD_LABEL_TYPE = STATE_MAP_FOLD_LABEL_TYPE;
        return {};
    },
    computed: {
        stateIcon() {
            let icon = '';
            if ([STATE_TYPE.LAUNCHING, STATE_TYPE.RUNNING, STATE_TYPE.KILLING].includes(this.task.state.name)) {
                icon = 'loading';
            } else if (STATE_TYPE.FAILED === this.task.state.name) {
                icon = 'warning';
            }
            return icon;
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
            let t1 = startTime; // this.task.running_at
            let t2 = endTime; // this.task.stopped_at
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
            return byte / (1024 * 1024 * 1024); 
        },
        milliCoreToCore(millicore) {
            return millicore / 1000;
        }
    }
};