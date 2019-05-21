
<template>
    <div class="sdxv-project-task-form">
        <SdxuContentPanel
            :title="title"
        >
            <!-- 图标插入 -->
            <div :style="`padding-left: ${labelWidth}px; padding-bottom: 20px` ">
                <i :class="['sdx-icon' ,icon]" />
            </div>
            <slot name="form">
                <!-- 插入form -->
            </slot>
            <div
                class="task-from__btn-box"
                :style="`padding-left: ${labelWidth}px`"
            >
                <SdxuButton
                    size="small"
                    type="default"
                    @click="handleCancel"
                >
                    取消
                </SdxuButton>
                <SdxuButton
                    type="primary"
                    size="small"
                    @click="handleCommit"
                >
                    确认
                </SdxuButton>
            </div>
        </SdxuContentPanel>
    </div>
</template>

<script>

import SdxuButton from '@sdx/ui/components/button';
import ContentPanel from '@sdx/ui/components/content-panel';
export default {
    name: 'BaseForm',
    props: {
        title: {
            type: String,
            default: ''
        },
        labelWidth: {
            type: Number,
            default: 80
        },
        icon: {
            type: String,
            default: ''
        },
    },
    components: {
        SdxuButton,
        [ContentPanel.name]: ContentPanel,
    },
    methods: {
        handleCommit() {
            
        },
        handleCancel() {
            this.$router.go(-1);
        }
    }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
    .sdxv-project-task-form {
        .task-from__btn-box {
            padding-top: 16px;
        }
        & /deep/  {
            .el-select {
                width: 100%;
                max-width: 560px;
            }
            .sdxu-input {
                max-width: 560px;
            }
        }
        .sdx-icon {
            width: 40px;
            height: 40px;
            line-height: 40px;
            display: inline-block;
            text-align: center;
            border-radius: 2px;
            color: #fff;
            font-size: 30px;
        }
        .sdx-Jupter, .sdx-Apache_Spark_logo, .sdx-icon-tensorboard, .sdx-icon-tensorflow{
            background: #FF882B;
        }
        .sdx-icon-python {
            background:#3889C8;
        }
        .sdx-icon-docker {
            background:#359CEC;
        }
    }
</style>
