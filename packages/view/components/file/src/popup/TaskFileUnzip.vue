<template>
    <SdxuTable
        :data="unzipFileList"
        style="width: 560px"
        height="420"
        size="small"
        class="del-file-list"
    >
        <el-table-column
            label="文件名"
            min-width="150"
            header-align="left"
            align="left"
            prop="args.path"
            show-overflow-tooltip
        />
        <el-table-column
            label="状态"
            min-width="150"
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
    </SdxuTable>
</template>

<script>
import { getUnzipTaskList } from '@sdx/utils/src/api/file';
import SdxuFoldLabel from '@sdx/widget/components/fold-label';
import SdxuTable from '@sdx/ui/components/table';
import { copyTaskStatusMap } from '../helper/config';
import { asyncJobStatus } from '@sdx/utils/src/const/file';
import { deleteTaskType } from '@sdx/utils/src/api/file';

const PULL_TIME = 2 * 1000; // 查询间隔 2秒

export default {
    components: {
        SdxuTable,
        SdxuFoldLabel: SdxuFoldLabel.FoldLabel
    },
    data() {
        return {
            unzipFileList: [],
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
            this.fetchUnzipTaskList();
        },
        startPullUnzipTask() {
            this.timeInterval = setInterval(() => {
                this.fetchUnzipTaskList();
            }, PULL_TIME);
        },
        stopPullUnzipTask() {
            clearInterval(this.timeInterval);
            this.timeInterval = null;
        },
        fetchUnzipTaskList() {
            return getUnzipTaskList()
                .then(data => {
                    this.unzipFileList = data.jobs;
                });
        },
        isEmpty() {
            return this.unzipFileList.length === 0
                || !this.unzipFileList.some(item => [asyncJobStatus.PROCESSING, asyncJobStatus.PENDING].includes(item.state));
        },
        deleteAllTasks() {
            return deleteTaskType('UNZIP').then(res => {
                this.unzipFileList = [];
            });
        }
    },
    watch: {
        // 自动 开始/停止 列表拉取
        __needPull(nval) {
            if (nval) {
                this.startPullUnzipTask();
                this.$emit('initShow', 'UNZIP');
            } else {
                this.stopPullUnzipTask();
            }
        },
        unzipFileList() {
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
        this.stopPullUnzipTask();
    }
};
</script>

<style lang="scss">

</style>

