<template>
    <SdxuTable
        :data="delFileList"
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
            prop="path"
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
                    :label="scope.row.state"
                    :show-loading="scope.row.state"
                    :type="scope.row.state"
                />
            </template>
        </el-table-column>
    </SdxuTable>
</template>

<script>
import { getDelTaskList } from '@sdx/utils/src/api/file';
import SdxuFoldLabel from '@sdx/widget/components/fold-label';
import SdxuTable from '@sdx/ui/components/table';
const PULL_TIME = 2 * 1000; // 查询间隔 2秒

export default {
    components: {
        SdxuTable,
        SdxuFoldLabel: SdxuFoldLabel.FoldLabel
    },
    data() {
        return {
            delFileList: []
        };
    },
    computed: {
        __needPull() {
            return this.delFileList.some(item => item.state.need_pull);
        }
    },
    methods: {
        startPullDelTask() {
            this.timeInterval = setInterval(() => {
                this.fetchDelTaskList();
            }, PULL_TIME);
        },
        stopPullDelTask() {
            clearInterval(this.timeInterval);
            this.timeInterval = null;
        },
        fetchDelTaskList() {
            return getDelTaskList()
                .then(data => {
                    this.delFileList = data;
                });
        },
        isEmpty() {
            return !this.delFileList.length;
        }
    },
    watch: {
        // 自动 开始/停止 列表拉取
        __needPull(nval) {
            if (nval) {
                this.startPullDelTask();
                this.$emit('initShow', 'del');
            } else {
                this.stopPullDelTask();
            }
        },
        delFileList(val) {
            if (val.length === 0) {
                this.$emit('del-list-empty');
            }
        }
    },
    created() {
        // 先刷一下,看有没有拷贝任务
        this.fetchDelTaskList();
    },
    beforeDestroy() {
        // 销毁前清理定时器
        this.stopPullDelTask();
    }
};
</script>

<style lang="scss">
    .del-file-list {
        .option-icon {
            &:hover {
                color: $c-danger-btn;
            }
        }
    }
</style>

