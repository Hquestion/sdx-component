import { TASK_CARD_STATE_TYPE_OPERATION, OPERATION_INFO, TASK_TYPE, STATE_TYPE, NON_OWNER_TASK_OPERATION } from '../const/task';
import { startTask, stopTask, removeTask } from '../api/task';
import SdxwTaskStartDialog from '@sdx/widget/lib/task-start-dialog';
import SdxwTaskStopDialog from '@sdx/widget/lib/task-stop-dialog';
import SdxuMessageBox from '@sdx/ui/lib/message-box';
import { t } from '../locale';
import { getImage } from '../api/image';
import { getUser } from '../helper/shareCenter';

export default {
    data() {
        return {
            // note: 将请求列表的函数赋给该变量，用于执行操作后刷新列表用
            fetchDataMinxin: null
        };
    },
    methods: {
        getOperationList(row) {
            const currentUser = getUser();
            const ownerId = row.owner && row.owner.uuid || '';
            let isOwnerTask = currentUser && currentUser.userId === ownerId;
            let list = TASK_CARD_STATE_TYPE_OPERATION[row.type] && TASK_CARD_STATE_TYPE_OPERATION[row.type][row.state] || [];
            if (!isOwnerTask) {
                list = list.filter(item => NON_OWNER_TASK_OPERATION.includes(item));
            }
            list = list.filter(item => {
                if (item === 'start') {
                    return this.$auth('TASK-MANAGER:TASK:EXCUTE', 'BUTTON');
                } else {
                    return true;
                }
            });
            return list.map(item => OPERATION_INFO[item]);
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
                        title: t.call(that, 'view.task.killTaskTitle'),
                        content: t.call(that, 'view.task.killTaskContent')
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
                    title: t.call(that, 'view.task.deleteTaskTitle'),
                    content: t.call(that, 'view.task.deleteTaskContent'),
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
