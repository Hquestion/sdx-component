<template>
    <SdxuTable
        :data="copyFileList"
        style="width: 100%"
        height="360"
        size="small"
        class="copy-file-list"
        :default-expand-all="true"
    >
        <el-table-column type="expand">
            <template slot-scope="scope">
                <div class="table-expand-line">
                    <div> {{ scope.row.currentCopy.sourcePath }} </div>
                    <div class="size-remain">
                        <span class="finished-size">
                            {{ scope.row.currentCopy.copiedBytes | byteFormatter }}
                        </span>
                        /{{ scope.row.currentCopy.totalBytes | byteFormatter }}
                    </div>
                    <div class="content">
                        <div class="progerss-warp">
                            <el-progress
                                :show-text="false"
                                :percentage="scope.row.currentCopy.progressInPerentage || 0"
                            />
                        </div>
                        <div class="progerss-info">
                            {{ scope.row.currentCopy.speedBytesPerSec | byteFormatter }}/s
                            <span class="time-remain">
                                剩余时间 {{ scope.row.currentCopy.remainingTimeInSec | seconds2HMS }}
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
            prop="currentCopy.sourcePath"
            show-overflow-tooltip
        />
        <el-table-column
            label="目标"
            min-width="90"
            prop="currentCopy.targetPath"
            header-align="left"
            align="left"
            show-overflow-tooltip
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
                    :label="copyTaskStatusMap[scope.row.status] && copyTaskStatusMap[scope.row.status].label"
                    :status="copyTaskStatusMap[scope.row.status] && copyTaskStatusMap[scope.row.status].status"
                    :type="copyTaskStatusMap[scope.row.status] && copyTaskStatusMap[scope.row.status].type"
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
                />
            </template>
        </el-table-column>
    </SdxuTable>
</template>

<script>
import { getCopyTaskList, cancelCopyTask } from '@sdx/utils/src/api/file';
import SdxuFoldLabel from '@sdx/widget/components/fold-label';
import SdxuTable from '@sdx/ui/components/table';
import SdxuIconButton from '@sdx/ui/components/icon-button';
import { copyTaskStatusMap } from '../helper/config';
import transformFilter from '@sdx/utils/src/mixins/transformFilter';

const PULL_TIME = 2 * 1000; // 查询间隔 2秒

export default {
    components: {
        SdxuTable,
        SdxuFoldLabel: SdxuFoldLabel.FoldLabel,
        SdxuIconButton
    },
    mixins: [transformFilter],
    data() {
        return {
            copyFileList: [
                {
                    jobId: '1',
                    ownerId: '1',
                    status: 'PROCESSING',
                    totalCount: 2,
                    finishCount: 1,
                    copyEntries: [
                        {sourcePath: '/dir/file1', targetPath: '/dir/file2'}
                    ],
                    currentCopy: {
                        index: 2,
                        sourcePath: '/dir/file1',
                        targetPath: '/dir/file2',
                        progressInPerentage: 50,
                        remainingTimeInSec: 20,
                        totalBytes: 20048,
                        copiedBytes: 1002,
                        speedBytesPerSec: 1024
                    }
                }
            ],
            total: 0,
            copyTaskStatusMap
        };
    },
    computed: {
        __needPull() {
            return this.copyFileList.some(item => item.state.need_pull);
        }
    },
    methods: {
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
                    this.copyFileList = data.items;
                });
        },
        // 停止拷贝任务
        handleStopTask(_id) {
            return cancelCopyTask(_id);
        },
        isListEmpty() {
            return !this.copyFileList.length;
        }
    },
    watch: {
        // 自动 开始/停止 列表拉取
        __needPull(nval) {
            if (nval) {
                this.startPullCopyTask();
                this.$emit('initShow', 'copy');
            } else {
                this.stopPullCopyTask();
            }
        },
        copyFileList(val) {
            if (val.length === 0) {
                this.$emit('copy-list-empty');
            }
        }
    },
    created() {
        // 先刷一下,看有没有拷贝任务
        this.fetchCopyTaskList();
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
                padding: 20px 0;
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding-left: 58px;
                background: #fff;
                .content {
                    display: block;
                    line-height: 25px;
                    width: 240px;
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
                        .finished-size {
                            color: $sdx-primary-color;
                        }
                        .time-remain {
                            float: right;
                        }
                    }
                }
            }
        }
    }
</style>

