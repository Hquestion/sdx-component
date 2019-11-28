
import { STATE_TYPE, STATE_MAP_FOLD_LABEL_TYPE, STATE_TYPE_LABEL, TASK_TYPE } from '@sdx/utils/src/const/task';
import { byteToGB, parseMilli, dateFormatter, calculateDateDiffFormatter } from '@sdx/utils/src/helper/transform';

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
        this.STATE_TYPE = STATE_TYPE;
        return {};
    },
    computed: {
        hasRealMonitor() {
            return this.task && ![STATE_TYPE.Error, STATE_TYPE.Created, STATE_TYPE.Pending, STATE_TYPE.Scheduling].includes(this.task.state) && (Array.isArray(this.task.pods) && this.task.pods.length > 0);
        },
        hasLog() {
            return this.task && ![STATE_TYPE.Error, STATE_TYPE.Created, STATE_TYPE.Pending, STATE_TYPE.Scheduling].includes(this.task.state) && (Array.isArray(this.task.pods) && this.task.pods.length > 0);
        },
        hasDataInfo() {
            return this.task && ((this.task.datasources && this.task.datasources.length > 0) || (this.task.datasets && this.task.datasets.length > 0));
        },
        isRunning() {
            return this.task && [STATE_TYPE.Running, STATE_TYPE.Terminating].includes(this.task.state);
        },
        isJUPYTER() {
            return this.task && this.task.type === TASK_TYPE.JUPYTER;
        },
        isSKYIDE() {
            return this.task && this.task.type === TASK_TYPE.SKYIDE;
        },
        isCONTAINERDEV() {
            return this.task && this.task.type === TASK_TYPE.CONTAINER_DEV;
        },
        isSKYFLOW() {
            return this.task && this.task.type === TASK_TYPE.isSKYFLOW;
        },
        isMODELSERVICE() {
            return this.task && this.task.type === TASK_TYPE.MODELSERVICE;
        },
        showSaveAsImage() {
            return (this.isJUPYTER || this.isCONTAINERDEV) && this.task.state === STATE_TYPE.Running;
        },
        resourceConfig() {
            let obj = null;
            try {
                obj = JSON.parse(this.task.resourceConfig);
            } catch(err) {
                window.console.error(err);
            }
            return obj;
        },
        hasGpu() {
            return this.resourceConfig && this.resourceConfig.DEPLOY && this.resourceConfig.DEPLOY.requests && this.resourceConfig.DEPLOY.requests['nvidia.com/gpu'];
        },
        hasSaveImage() {
            return this.isJUPYTER || this.isSKYIDE || this.isCONTAINERDEV;
        },
        isDeployTask() {
            return this.isJUPYTER || this.isSKYIDE || this.isCONTAINERDEV;
        }
    },
    methods: {
        calculateDateDiffFormatter(startTime, endTime) {
            return calculateDateDiffFormatter(startTime, endTime);
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
