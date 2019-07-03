import { OPERATION_INFO, STATE_TYPE_OPERATION, MONITOR_ALLOW_OPERATION, TASK_TYPE, STATE_TYPE, NON_OWNER_TASK_OPERATION } from '@sdx/utils/src/const/task';
import { startTask, stopTask, removeTask } from '@sdx/utils/src/api/project';
import SdxwTaskStartDialog from '@sdx/widget/components/task-start-dialog';
import SdxwTaskStopDialog from '@sdx/widget/components/task-stop-dialog';
import SdxuMessageBox from '@sdx/ui/components/message-box';
import { getUser } from '@sdx/utils/src/helper/shareCenter';

export default {
    data() {
        return {
            // note: 将请求列表的函数赋给该变量，用于执行操作后刷新列表用
            fetchDataMinxin: null
        };
    },
    methods: {
        getOperationList(row, isMonitor = false) {
            const currentUser = getUser();
            const ownerId = row.owner && row.owner.uuid || '';
            let isOwnerTask = currentUser && currentUser.userId === ownerId;
            let list = STATE_TYPE_OPERATION[row.state];
            if (isMonitor) {
                list = list.filter(item => {
                    return MONITOR_ALLOW_OPERATION.includes(item);
                });
            } else if (!isOwnerTask) {
                list = list.filter(item => {
                    return NON_OWNER_TASK_OPERATION.includes(item);
                });
            }

            return list.map(item => {
                return OPERATION_INFO[item];
            });
        },
        handleOperation(operation, row) {
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
                this.handleEdit(row);
                break;
            case 'remove':
                this.handleDelete(row);
                break;
            }
        },
        async handleStart(row) {
            let isSelectAutoImage = false;
            try {
                // 任务类型为jupyter或container_dev且状态不为新建则弹出框
                if ([TASK_TYPE.JUPYTER, TASK_TYPE.CONTAINERDEV].includes(row.type) && row.state !== STATE_TYPE.CREATED) {
                    isSelectAutoImage = await SdxwTaskStartDialog({ visible: true });
                }

                await startTask(row.uuid, { isAuto: isSelectAutoImage });
                this.fetchDataMinxin && this.fetchDataMinxin();
            } catch (e) {
                // cancel
                // todo:
            }
        },
        async handleKill(row) {
            let isSaveImage = false;
            try {
                // 任务类型为jupyter或container_dev且状态为运行中则弹出框
                if ([TASK_TYPE.JUPYTER, TASK_TYPE.CONTAINERDEV].includes(row.type) && row.state === STATE_TYPE.RUNNING) {
                    isSaveImage = await SdxwTaskStopDialog({
                        visible: true,
                        image: row.image,
                        autoImage: row.autoImage
                    });
                } else {
                    await SdxuMessageBox.warning({
                        title: '确定要终止选中的任务吗？',
                        content: ''
                    });
                }

                await stopTask(row.uuid, { needCommitContainer: isSaveImage });
                this.fetchDataMinxin && this.fetchDataMinxin();
            } catch(e) {
                // cancel
                // todo:
            }
        },
        handleDetail(row) {
            // todo:
            this.$router.push(`/sdxv-project-manage/taskInfo/${row.type}/${row.uuid}`);
        },
        handleEdit(row) {
            // todo:
            this.$router.push(`/sdxv-project-manage/modifyTask/${row.type}/${row.uuid}/${row.projectId}`);
        },
        async handleDelete(row) {
            try {
                await SdxuMessageBox.warning({
                    title: '此操作将会永久删除该任务，是否继续？',
                    content: ''
                });

                removeTask(row.uuid).then(() => {
                    this.fetchDataMinxin && this.fetchDataMinxin();
                });
            } catch (e) {
                // cancel
                // todo:
            }
        }
    }
};
