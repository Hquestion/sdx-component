
<template>
    <div class="sdxv-project-task-form">
        <SdxuContentPanel
            :title="title"
        >
            <!-- 图标插入 -->
            <div :style="`padding-left: ${labelWidth}px; padding-bottom: 20px` ">
                <i :class="['sdx-icon' ,icon]" />
            </div>
            <slot
                name="form"
            >
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
                    {{ t('sdxCommon.Cancel') }}
                </SdxuButton>
                <SdxuButton
                    type="primary"
                    size="small"
                    @click="handleCommit"
                >
                    {{ commitTitle }}
                </SdxuButton>
            </div>
        </SdxuContentPanel>
    </div>
</template>

<script>

import SdxuButton from '@sdx/ui/components/button';
import ContentPanel from '@sdx/ui/components/content-panel';
import locale from '@sdx/utils/src/mixins/locale';
import { t } from '@sdx/utils/src/locale';
export default {
    name: 'BaseForm',
    mixins: [locale],
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
        commitTitle: {
            type: String,
            default: () => t('sdxCommon.Confirm')
        }
    },
    data() {
        return {
        };
    },

    components: {
        SdxuButton,
        [ContentPanel.name]: ContentPanel,
    },
    methods: {
        handleCommit() {
            this.$emit('commit');
        },
        handleCancel() {
            this.$router.go(-1);
        },
        t
    },
    created() {

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
