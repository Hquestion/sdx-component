
<template>
    <div class="sdxv-project-task-form">
        <SdxuContentPanel
            :title="title"
        >
            <!-- 图标插入 -->
            <div>
                <i class="sdx-icon sdx-icon-jiantou" />
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
        }
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
    }
</style>
