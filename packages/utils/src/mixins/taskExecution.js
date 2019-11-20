import { TASK_TYPE, STATE_TYPE, OPERATION_INFO } from '@sdx/utils/src/const/task';
import { startTask, stopTask, removeTask } from '../api/task';
import SdxwTaskStartDialog from '@sdx/widget/lib/task-start-dialog';
import SdxwTaskStopDialog from '@sdx/widget/lib/task-stop-dialog';
import SdxuMessageBox from '@sdx/ui/lib/message-box';
import { dateFormatter, timeDuration } from '@sdx/utils/src/helper/transform';
import { t } from '../locale';
import { getImage } from '../api/image';

export default {
    data() {
        return {
            // note: 将请求列表的函数赋给该变量，用于执行操作后刷新列表用
            fetchDataMinxin: null
        };
    },
    methods: {
        handleOperation(operation, row) {
            switch(operation) {
                case OPERATION_INFO.start.value:
                    this.handleStart(row);
                    break;
                case OPERATION_INFO.kill.value:
                    this.handleKill(row);
                    break;
                case OPERATION_INFO.detail.value:
                    this.handleDetail(row);
                    break;
                case OPERATION_INFO.remove.value:
                    this.handleDelete(row);
                    break;
                // todo:
                case OPERATION_INFO.entry.value:
                    this.handleEntry(row);
                    break;
            }
        },
        async handleStart(row) {
            let isSelectAutoImage = false;
            try {
                // 任务类型为jupyter或container_dev且状态不为新建则弹出框
                if ([TASK_TYPE.JUPYTER, TASK_TYPE.CONTAINER_DEV, TASK_TYPE.SKYIDE].includes(row.type) && row.state !== STATE_TYPE.Created) {
                    let image = null;
                    let autoImage = null;
                    if (row.autoImageId) {
                        [image, autoImage] = await Promise.all([getImage(row.imageId), getImage(row.autoImageId)]);
                    } else {
                        image = await getImage(row.imageId);
                    }
                    isSelectAutoImage = await SdxwTaskStartDialog({ visible: true, image, autoImage });
                }

                await startTask(row.uuid, { isAuto: isSelectAutoImage, type: row.type });
                this.fetchDataMinxin && this.fetchDataMinxin();
            } catch (e) {
                // cancel
                window.console.error(e);
            }
        },
        async handleKill(row) {
            let that = this;
            let isSaveImage = false;
            try {
                // 任务类型为jupyter或container_dev且状态为运行中则弹出框
                if ([TASK_TYPE.JUPYTER, TASK_TYPE.CONTAINER_DEV, TASK_TYPE.SKYIDE].includes(row.type) && row.state === STATE_TYPE.Running) {
                    isSaveImage = await SdxwTaskStopDialog({visible: true});
                } else {
                    await SdxuMessageBox.warning({
                        title: t.call(that, 'view.task.stopTask'),
                        content: ''
                    });
                }

                await stopTask(row.uuid, { needCommitContainer: isSaveImage, type: row.type });
                this.fetchDataMinxin && this.fetchDataMinxin();
            } catch(e) {
                // cancel
                window.console.error(e);
            }
        },
        handleDetail(row) {
            if (this.$$handleDetail) {
                this.$$handleDetail(row);
            } else {
                this.$router.push(`/sdxv-task-management/sdxv-task-detail/${row.uuid}`);
            }
        },
        // todo:
        handleEntry(row) {
            window.open(`/#/editor/${row.project.uuid}/${row.uuid}`);
        },
        async handleDelete(row) {
            let that = this;
            try {
                await SdxuMessageBox.warning({
                    title: t.call(that, 'view.task.deleteTask'),
                    content: ''
                });

                removeTask(row.uuid, { type: row.type }).then(() => {
                    this.fetchDataMinxin && this.fetchDataMinxin();
                });
            } catch (e) {
                // cancel
                window.console.error(e);
            }
        },
        dateFormatter(date) {
            return dateFormatter(date);
        },
        timeDuration(startTime, stopTime) {
            return timeDuration(startTime, stopTime);
        },
    }
};
