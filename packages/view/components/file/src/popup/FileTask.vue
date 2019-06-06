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
                <i class="sdx-icon sdx-icon-check delete-icon" @click="handleHide"/>
            </div>
        </div>
        <div class="sdxv-file-task__body">
            <el-tabs v-model="currentTab">
                <el-tab-pane
                    label="文件上传"
                    name="UPLOAD"
                >
                    <SdxvTaskFileUpload />
                </el-tab-pane>
                <el-tab-pane
                    label="文件复制"
                    name="COPY"
                >
                    <TaskFileCopy />
                </el-tab-pane>
                <el-tab-pane
                    label="文件删除"
                    name="DELETE"
                    v-if="false"
                />
            </el-tabs>
        </div>
    </div>
</template>

<script>
import SdxvExpandCollapseToggler from './ExpandCollapseToggler';
import SdxvTaskFileUpload from './TaskFileUpload';
import MessageBox from '@sdx/ui/components/message-box';
import TaskFileCopy from './TaskFileCopy';
export default {
    name: 'SdxvFileTask',
    components: {
        TaskFileCopy,
        SdxvTaskFileUpload,
        SdxvExpandCollapseToggler
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
            MessageBox.confirm.wrning({
                title: '您确定要取消所有未完成的任务吗？'
            }).then(() => {
                // todo 取消上传或者取消拷贝任务
                this._visible = false;
            });
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
