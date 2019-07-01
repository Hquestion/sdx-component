<template>
    <SdxuTable
        :data="copyFileList"
        style="width: 560px"
        height="420"
        size="small"
        class="copy-file-list"
        :default-expand-all="true"
    >
        <el-table-column type="expand">
            <template slot-scope="scope">
                <div class="table-expand-line">
                    <div class="size-remain">
                        <span class="finished-size">
                            {{ scope.row.extra.copiedBytes | byteFormatter }}
                        </span>
                        /{{ scope.row.extra.totalBytes | byteFormatter }}
                    </div>
                    <div class="content">
                        <div class="progerss-warp">
                            <el-progress
                                :show-text="false"
                                :percentage="scope.row.extra.progressInPercentage || 0"
                            />
                        </div>
                        <div class="progerss-info">
                            <span class="speed">{{ scope.row.extra.speedPerSecInBytes | byteFormatter }}/s</span>
                            <span class="time-remain">
                                剩余时间 {{ scope.row.extra.remainingTimeInSec | seconds2HMS }}
                            </span>
                        </div>
                    </div>
                </div>
            </template>
        </el-table-column>
        <el-table-column
            label="源"
            min-width="90"
            header-align="left"
            align="left"
            prop="args.path"
            show-overflow-tooltip
        />
        <el-table-column
            label="目标"
            min-width="90"
            prop="args.targetPath"
            header-align="left"
            align="left"
            :show-overflow-tooltip="true"
        />
        <el-table-column
            label="状态"
            min-width="80"
            header-align="left"
            align="left"
        >
            <template slot-scope="scope">
                <SdxuFoldLabel
                    :plain="true"
                    :label="copyTaskStatusMap[scope.row.state] && copyTaskStatusMap[scope.row.state].label"
                    :status="copyTaskStatusMap[scope.row.state] && copyTaskStatusMap[scope.row.state].status"
                    :type="copyTaskStatusMap[scope.row.state] && copyTaskStatusMap[scope.row.state].type"
                />
            </template>
        </el-table-column>
        <el-table-column
            label="操作"
            min-width="40"
            header-align="left"
            align="left"
        >
            <template slot-scope="scope">
                <SdxuIconButton
                    icon="sdx-icon sdx-tingzhi"
                    @click="handleStopTask(scope.row.jobId)"
                    v-show="isProcessing(scope.row)"
                />
                <SdxuIconButton
                    icon="sdx-icon sdx-icon-delete"
                    @click="handleDeleteTask(scope.row.jobId)"
                    v-show="!isProcessing(scope.row)"
                />
            </template>
        </el-table-column>
    </SdxuTable>
</template>

<script>
import {getCopyTaskList, cancelTask, deleteTask, deleteTaskType} from '@sdx/utils/src/api/file';
import SdxuFoldLabel from '@sdx/widget/components/fold-label';
import SdxuTable from '@sdx/ui/components/table';
import SdxuIconButton from '@sdx/ui/components/icon-button';
import { copyTaskStatusMap } from '../helper/config';
import transformFilter from '@sdx/utils/src/mixins/transformFilter';
import { asyncJobStatus } from '@sdx/utils/src/const/file';

const PULL_TIME = 2 * 1000; // 查询间隔 2秒

export default {
    components: {
        SdxuTable,
        SdxuFoldLabel: SdxuFoldLabel.FoldLabel,
        SdxuIconButton
    },
    mixins: [transformFilter],
    inject: ['taskPop'],
    data() {
        return {
            copyFileList: [],
            total: 0,
            copyTaskStatusMap
        };
    },
    computed: {
        __needPull() {
            return !this.isEmpty();
        }
    },
    methods: {
        init() {
            this.fetchCopyTaskList();
        },
        checkNeedToShow() {},
        startPullCopyTask() {
            this.timeInterval = setInterval(() => {
                this.fetchCopyTaskList();
            }, PULL_TIME);
        },
        stopPullCopyTask() {
            clearInterval(this.timeInterval);
            this.timeInterval = null;
        },
        fetchCopyTaskList() {
            return getCopyTaskList()
                .then(data => {
                    this.copyFileList = data.jobs || [];
                });
        },
        // 停止拷贝任务
        handleStopTask(_id) {
            return cancelTask(_id).then(() => {
                this.stopPullCopyTask();
                this.fetchCopyTaskList();
            });
        },
        handleDeleteTask(_id) {
            // todo 删除task
            return deleteTask(_id).then(() => {
                this.stopPullCopyTask();
                this.fetchCopyTaskList();
            });
        },
        isEmpty() {
            return this.copyFileList.length === 0
                || !this.copyFileList.some(item => [asyncJobStatus.PROCESSING, asyncJobStatus.PENDING].includes(item.state));
        },
        isProcessing(row) {
            return [asyncJobStatus.PROCESSING, asyncJobStatus.PENDING].includes(row.state);
        },
        deleteAllTasks() {
            if (this.copyFileList.length === 0) return Promise.resolve();
            return deleteTaskType('COPY').then(res => {
                this.copyFileList = [];
            });
        }
    },
    watch: {
        // 自动 开始/停止 列表拉取
        __needPull(nval) {
            if (nval) {
                this.startPullCopyTask();
                this.$emit('initShow', 'COPY');
            } else {
                this.stopPullCopyTask();
            }
        },
        copyFileList() {
            if (this.isEmpty()) {
                this.$emit('empty');
            }
        }
    },
    mounted() {
        // 先刷一下,看有没有拷贝任务
        this.init();
    },
    beforeDestroy() {
        // 销毁前清理定时器
        this.stopPullCopyTask();
    }
};
</script>

<style lang="scss" scoped>
    @import "~@sdx/utils/src/theme-common/var";
    .copy-file-list {
        & /deep/ .el-table__expanded-cell {
            padding: 0 !important;
            height: 64px;
            border-top: 1px solid #dedede !important;
            .table-expand-line {
                position: relative;
                padding: 15px 20px 10px 58px;
                display: flex;
                justify-content: flex-start;
                align-items: center;
                background: #fff;
                .size-remain {
                    width: 100px;
                }
                .content {
                    display: block;
                    line-height: 25px;
                    width: 240px;
                    margin-left: 50px;
                    .progerss-warp {
                        line-height: 25px;
                        .el-progress {
                            line-height: 25px;
                            font-size: 12px;
                        }
                    }
                    .progerss-info {
                        width: 100%;
                        height: 25px;
                        line-height: 25px;
                        .speed {
                            color: $sdx-primary-color;
                        }
                        .time-remain {
                            margin-left: 10px;
                        }
                    }
                }
            }
        }
    }
</style>

