
<template>
    <SdxuContentPanel
        class="sdxv-project-task-form"
        :title="title"
        :fullscreen="true"
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
                width: 560px;
            }
            .sdxu-input {
                width: 560px;
            }
            .sdxw-file-select {
                width: 560px;
            }
            .el-form-item__content {
                position: relative;
                .icon {
                    color: #F56C6C;
                    position: absolute;
                    top: 2px;
                    left: -83px;
                }
            }
            .is-lang-en {
                .el-select {
                    width: 730px;
                }
                .sdxu-input {
                    width: 730px;
                }
                .sdxw-file-select {
                    width: 730px;
                }
                .el-form-item__content {
                    .icon {
                        left: -158px;
                    }
                }
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
