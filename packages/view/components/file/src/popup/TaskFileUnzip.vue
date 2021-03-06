<template>
    <SdxuTable
        :data="unzipFileList"
        style="width: 560px"
        height="420"
        size="small"
        class="del-file-list"
    >
        <el-table-column
            :label="t('view.file.FileName')"
            min-width="150"
            header-align="left"
            align="left"
            prop="args.path"
            show-overflow-tooltip
        />
        <el-table-column
            :label="t('sdxCommon.Status')"
            min-width="150"
            header-align="left"
            align="left"
        >
            <template slot-scope="scope">
                <SdxuFoldLabel
                    :plain="true"
                    :label="unzipTaskStatusMap[scope.row.state] && unzipTaskStatusMap[scope.row.state].label"
                    :status="unzipTaskStatusMap[scope.row.state] && unzipTaskStatusMap[scope.row.state].status"
                    :type="unzipTaskStatusMap[scope.row.state] && unzipTaskStatusMap[scope.row.state].type"
                />
            </template>
        </el-table-column>
    </SdxuTable>
</template>

<script>
import { getUnzipTaskList } from '@sdx/utils/src/api/file';
import SdxuFoldLabel from '@sdx/widget/components/fold-label';
import SdxuTable from '@sdx/ui/components/table';
import { unzipTaskStatusMap } from '../helper/config';
import { asyncJobStatus } from '@sdx/utils/src/const/file';
import { deleteTaskType } from '@sdx/utils/src/api/file';
import locale from '@sdx/utils/src/mixins/locale';

const PULL_TIME = 2 * 1000; // 查询间隔 2秒

export default {
    components: {
        SdxuTable,
        SdxuFoldLabel: SdxuFoldLabel.FoldLabel
    },
    mixins: [locale],
    data() {
        return {
            unzipFileList: [],
            unzipTaskStatusMap
        };
    },
    computed: {
        __needPull() {
            return !this.isTaskEmpty();
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
        isTaskEmpty() {
            return this.unzipFileList.length === 0
                || !this.unzipFileList.some(item => [asyncJobStatus.PROCESSING, asyncJobStatus.PENDING].includes(item.state));
        },
        isListEmpty() {
            return this.unzipFileList.length === 0;
        },
        deleteAllTasks() {
            this.stopPullUnzipTask();
            if (this.unzipFileList.length === 0) return Promise.resolve();
            return deleteTaskType('UNPACK').then(res => {
                this.unzipFileList = [];
            });
        }
    },
    watch: {
        // 自动 开始/停止 列表拉取
        __needPull(nval) {
            window.console.log(nval);
            if (nval) {
                this.startPullUnzipTask();
                this.$emit('initShow', 'UNZIP');
            } else {
                this.stopPullUnzipTask();
            }
        },
        unzipFileList() {
            if (this.isTaskEmpty()) {
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

