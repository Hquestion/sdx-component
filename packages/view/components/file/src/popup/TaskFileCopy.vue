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
                    <span class="content">
                        <div class="progerss-warp">
                            <el-progress
                                :show-text="false"
                                :percentage="scope.row.extra.progressInPerentage || 0"
                            />
                        </div>
                        <div class="progerss-info">
                            <span class="size-remain">
                                <span class="finished-size">
                                    {{ scope.row.extra.copiedBytes }}
                                </span>
                                /{{ scope.row.extra.totalBytes }}
                            </span>
                            {{ scope.row.extra.speedBytesPerSec }}
                            <span class="time-remain">
                                剩余时间 {{ scope.row.extra.remainingTimeInSec }}
                            </span>
                        </div>
                    </span>
                </div>
            </template>
        </el-table-column>
        <el-table-column
            label="源"
            min-width="90"
            header-align="left"
            align="left"
            prop="args.sourcePath"
            show-overflow-tooltip
        />
        <el-table-column
            label="目标"
            min-width="90"
            prop="args.targetPath"
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
                    :label="copyTaskStatusMap[scope.row.state].label"
                    :status="copyTaskStatusMap[scope.row.state].status"
                    :type="copyTaskStatusMap[scope.row.state].type"
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
import { copyTaskStatusMap } from '../helper/config';

const PULL_TIME = 2 * 1000; // 查询间隔 2秒

export default {
    components: {
        SdxuTable,
        SdxuFoldLabel: SdxuFoldLabel.FoldLabel
    },
    data() {
        return {
            copyFileList: [],
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

<style lang="scss">
    .copy-file-list {
        .el-table__expanded-cell {
            padding: 0;
            height: 50px;
            .table-expand-line {
                position: relative;
                line-height: 50px;
                padding: 0;
                padding-left: 243px;
                .label {
                    position: absolute;
                    left: 0;
                    top: 0;
                    width: 243px;
                    text-align: left;
                    padding-left: 58px;
                    padding-right: 20px;
                    @include ellipsis;
                }
                .content {
                    display: block;
                    line-height: 25px;
                    .progerss-warp {
                        display: inline-block;
                        width: 360px;
                        line-height: 25px;
                        .el-progress {
                            line-height: 25px;
                            font-size: 12px;
                        }
                    }
                    .progerss-info {
                        display: inline-block;
                        width: 360px;
                        height: 25px;
                        line-height: 25px;
                        .finished-size {
                            color: $c-main;
                        }
                        .size-remain {
                            margin-right: 20px;
                        }
                        .time-remain {
                            float: right;
                        }
                    }
                }
            }
        }
        .option-icon {
            &:hover {
                color: $c-danger-btn;
            }
        }
    }
</style>

