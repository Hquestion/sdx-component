
<template>
    <div class="sdxv-project-task-form">
        <div class="sdxv-project-task-form__title">
            {{ title }}
        </div>
        <SdxuContentPanel
            class="sdxv-project-task-form__panel"
            :fullscreen="true"
        >
            <el-form
                label-position="right"
                :label-width="`${labelWidth}px`"
                @submit.native.prevent
                class="sdxv-project-task-form__panel--form"
            >
                <el-form-item
                    :label="`${t('view.task.taskType')}:`"
                >
                    <div class="sdxv-project-task-form__task-type">
                        <!-- 图标插入 -->
                        <div style="width:40px;height:40px">
                            <svg
                                aria-hidden="true"
                                style="width:40px;height:40px"
                            >
                                <use :xlink:href="`#${icon}`" />
                            </svg>
                        </div>
                        <span style="margin-left: 16px;">
                            {{ type }}
                        </span>
                    </div>
                </el-form-item>
            </el-form>

            <div class="sdxv-project-task-form__panel--content">
                <slot
                    name="form"
                >
                    <!-- 插入form -->
                </slot>
            </div>
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
        <sdxv-create-project
            :visible.sync="createProjectVisible"
            v-if="createProjectVisible"
            @close="createProjectClose(arguments)"
        />
    </div>
</template>

<script>

import SdxuButton from '@sdx/ui/components/button';
import ContentPanel from '@sdx/ui/components/content-panel';
import Form from 'element-ui/lib/form';
import FormItem from 'element-ui/lib/form-item';
import locale from '@sdx/utils/src/mixins/locale';
import { t } from '@sdx/utils/src/locale';
import CreateProject from '../CreateProject';
export default {
    name: 'BaseForm',
    mixins: [locale],
    props: {
        title: {
            type: String,
            default: ''
        },
        type: {
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
        },
        showCreateProject: {
            type: Boolean,
            default: false
        }
    },
    watch: {
        showCreateProject(nVal) {
            this.createProjectVisible = nVal;
        }
    },
    data() {
        return {
            createProjectVisible: false
        };
    },
    components: {
        SdxuButton,
        [ContentPanel.name]: ContentPanel,
        [Form.name]: Form,
        [FormItem.name]: FormItem,
        [CreateProject.name]: CreateProject
    },
    methods: {
        handleCommit() {
            this.$emit('commit');
        },
        handleCancel() {
            this.$router.go(-1);
        },
        t,
        createProjectClose(args) {
            this.$emit('create-project-close', args);
        },
    },
    created() {

    }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
    .sdxv-project-task-form {
        height: 95%;
        .sdxv-project-task-form__title {
            font-size: 24px;
            color: #13264D;
            margin-bottom: 18px;
        }
        .sdxv-project-task-form__panel {
            .sdxv-project-task-form__task-type {
                padding: 10px 18px;
                border: 1px solid #D8DEEA;
                display: flex;
                align-items: center;
            }
            .task-from__btn-box {
                padding-top: 16px;
            }
            & /deep/  {
                .sdxv-project-task-form__panel--form {
                    .el-form-item {
                        display: flex;
                        align-items: center;
                        .el-form-item__content {
                            margin-left: 0!important;
                        }
                    }
                }
                .sdxv-project-task-form__panel--content {
                    .el-form-item {
                        .el-form-item__content {
                            width: 560px!important;
                        }
                    }
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
                .form-tip {
                    font-size: 12px;
                    color: #6B778C;
                    line-height: 28px;
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
                .create-project-button {
                    width: 130px;
                    border: 1px solid #D8DEEA;
                    border-radius: 2px;
                    height: 36px;
                    color: #13264D;
                    &:hover {
                        background: none;
                        border: 1px solid #4781F8;
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
    }
</style>
