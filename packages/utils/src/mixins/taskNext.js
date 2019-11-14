import { OPERATION_INFO, STATE_TYPE_OPERATION, MONITOR_ALLOW_OPERATION, TASK_TYPE, STATE_TYPE, NON_OWNER_TASK_OPERATION, SPECIAL_TASK_TYPE } from '../const/task';
import { startTask, stopTask, removeTask } from '../api/task';
import SdxwTaskStartDialog from '@sdx/widget/lib/task-start-dialog';
import SdxwTaskStopDialog from '@sdx/widget/lib/task-stop-dialog';
import SdxuMessageBox from '@sdx/ui/lib/message-box';
import { getUser } from '../helper/shareCenter';
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
        getOperationList(row, isMonitor = false, hideDetail = false) {
            const currentUser = getUser();
            const ownerId = row.owner && row.owner.uuid || '';
            let isOwnerTask = currentUser && currentUser.userId === ownerId;
            let list = STATE_TYPE_OPERATION[row.state] || [];
            let isSkyflowExec = row.type === TASK_TYPE.SKYFLOW_EXEC;
            let isSecialTask = SPECIAL_TASK_TYPE.includes(row.type) && list.indexOf('edit') !== -1;
            if (isMonitor) {
                list = list.filter(item => {
                    return MONITOR_ALLOW_OPERATION.includes(item);
                });
            } else if (!isOwnerTask) {
                list = list.filter(item => {
                    return NON_OWNER_TASK_OPERATION.includes(item);
                });
            }

            list = list.filter(item => {
                return (isSkyflowExec ? item !== 'detail' : item !== 'entry')
                && (isSecialTask ? item !== 'edit' : true)
                && (hideDetail ? item !== 'detail' : true);
            });

            return list.map(item => {
                return OPERATION_INFO[item];
            });
        },
        handleOperation(operation, row, projectId) {
            switch(operation) {
                case 'start':
                    this.handleStart(row);
                    break;
                case 'kill':
                    this.handleKill(row);
                    break;
                case 'detail':
                    this.handleDetail(row);
                    break;
                case 'edit':
                    this.handleEdit(row, projectId);
                    break;
                case 'remove':
                    this.handleDelete(row);
                    break;
                case 'entry':
                    this.handleEntry(row);
                    break;
            }
        },
        async handleStart(row) {
            let isSelectAutoImage = false;
            try {
                // 任务类型为jupyter或container_dev且状态不为新建则弹出框
                if ([TASK_TYPE.JUPYTER, TASK_TYPE.CONTAINERDEV].includes(row.type) && row.state !== STATE_TYPE.CREATED) {
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
                if ([TASK_TYPE.JUPYTER, TASK_TYPE.CONTAINERDEV].includes(row.type) && row.state === STATE_TYPE.RUNNING) {
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
        handleEdit(row, projectId) {
            if (this.$$handleEdit) {
                this.$$handleEdit(row);
            } else {
                this.$router.push(`/sdxv-project-manage-next/modifyTask/${row.type}/${row.uuid}/${projectId}`);
            }
        },
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
        }
    }
};
