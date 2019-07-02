<template>
    <div
        class="sdxv-file-task"
        :class="{'is-expand': expanded}"
        v-show="_visible"
    >
        <div class="sdxv-file-task__header">
            <div class="sdxv-file-task__header-title">
                文件操作列表
            </div>
            <div class="sdxv-file-task__header-action">
                <SdxvExpandCollapseToggler :expanded.sync="expanded" />
                <i
                    class="sdx-icon sdx-icon-check delete-icon"
                    @click="handleHide"
                />
            </div>
        </div>
        <div class="sdxv-file-task__body">
            <el-tabs v-model="currentTab">
                <el-tab-pane
                    label="文件上传"
                    name="UPLOAD"
                >
                    <SdxvTaskFileUpload
                        ref="uploadTask"
                        @empty="handleUploadFinish"
                    />
                </el-tab-pane>
                <el-tab-pane
                    label="文件复制"
                    name="COPY"
                >
                    <TaskFileCopy
                        ref="copyTask"
                        @initShow="handleInitShow"
                        @empty="handleUploadFinish"
                    />
                </el-tab-pane>
                <el-tab-pane
                    label="文件删除"
                    name="DELETE"
                    ref="deleteTask"
                    v-if="false"
                />
                <el-tab-pane
                    label="解压缩"
                    name="UNZIP"
                >
                    <TaskFileUnzip
                        ref="unzipTask"
                        @initShow="handleInitShow"
                        @empty="handleUploadFinish"
                    />
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
import SdxvExpandCollapseToggler from './ExpandCollapseToggler';
import SdxvTaskFileUpload from './TaskFileUpload';
import MessageBox from '@sdx/ui/components/message-box';
import TaskFileCopy from './TaskFileCopy';
import TaskFileUnzip from './TaskFileUnzip';
const TAB_REF_MAP = {
    UPLOAD: 'uploadTask',
    COPY: 'copyTask',
    DELETE: 'deleteTask',
    UNZIP: 'unzipTask'
};
import { deleteTaskType } from '@sdx/utils/src/api/file';

export default {
    name: 'SdxvFileTask',
    components: {
        TaskFileCopy,
        TaskFileUnzip,
        SdxvTaskFileUpload,
        SdxvExpandCollapseToggler
    },
    inject: ['fileManager'],
    provide() {
        return {
            taskPop: this
        };
    },
    data() {
        return {
            expanded: false,
            currentTab: 'UPLOAD'
        };
    },
    props: {
        visible: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        _visible: {
            get() {
                return this.visible;
            },
            set(val) {
                this.$emit('update:visible', val);
            }
        }
    },
    methods: {
        handleHide() {
            let hasUnfinishTasks = ['uploadTask', 'copyTask', 'unzipTask'].some(item => {
                return this.$refs[item].isEmpty && !this.$refs[item].isEmpty() || false;
            });
            if(!hasUnfinishTasks) {
                this._visible = false;
                return;
            }
            MessageBox.confirm.warning({
                title: '您确定要删除所有任务吗？'
            }).then(() => {
                // todo 取消上传或者取消拷贝任务
                ['uploadTask', 'copyTask', 'unzipTask'].forEach(item => {
                    this.$refs[item].deleteAllTasks();
                });
                this._visible = false;
            });
        },
        handleUploadFinish() {
            if (!this.isInit) return;
            this.fileManager.enterDirectory(this.fileManager.currentPath);
            this.checkToClose();
        },
        checkToClose() {
            const refs = ['uploadTask', 'copyTask', 'unzipTask'];
            let isEmpty = true;
            refs.forEach(ref => {
                if (!this.$refs[ref].isEmpty()) {
                    isEmpty = false;
                }
            });
            // 暂时不关闭弹框
            isEmpty = false;
            isEmpty && (this._visible = false);
        },
        checkTab(tab) {
            this._visible = true;
            this.currentTab = tab;
            this.isInit = true;
            const vm = this.$refs[TAB_REF_MAP[tab]];
            vm.init && vm.init();
        },
        handleInitShow(tab) {
            if (!this.isInit) {
                this.isInit = true;
                this.checkTab(tab);
            }
        }
    },
    watch: {
        visible(val) {
            this.$nextTick(() => {
                this.expanded = val;
            });
        }
    }
};
</script>

<style lang="scss" scoped>
    @import "~@sdx/utils/src/theme-common/var";

    $sdx-file-task-radius: $sdx-border-radius * 2;

    .sdxv-file-task {
        width: 600px;
        height: 60px;
        border-radius: $sdx-file-task-radius $sdx-file-task-radius 0 0;
        position: fixed;
        bottom: 0;
        right: 0;
        background: #fff;
        z-index: 5;
        box-shadow: -2px -2px 8px 0px rgba(0,0,0,.1);
        overflow: hidden;
        transition: height ease-in .3s;
        &.is-expand {
            height: 580px;
        }
        .sdxv-file-task__header {
            border-radius: $sdx-file-task-radius $sdx-file-task-radius 0 0;
            width: 100%;
            height: 60px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            color: #fff;
            padding: 0 $sdx-padding;
            background: $sdx-primary-color;
            box-sizing: border-box;
            .sdxv-file-task__header-title {
                font-size: $sdx-h1-font-size;
            }
            .sdxv-file-task__header-action {
                .delete-icon {
                    font-size: 14px;
                    margin-left: $sdx-margin;
                    cursor: pointer;
                }
            }
        }
        .sdxv-file-task__body {
            padding: $sdx-padding;
            box-sizing: border-box;
            height: 520px;
        }
    }
</style>
