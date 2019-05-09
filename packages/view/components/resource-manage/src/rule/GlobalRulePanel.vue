<template>
    <SdxuContentPanel
        class="global-rule-panel"
        title="全局规则设置"
        subtitle="规则使用对象为单个用户"
    >
        <div
            class="edit-icon"
            slot="right"
        >
            <sdxu-icon-button
                class="iconfont iconicon-edit"
                :active="!isReadonly"
                @click="handleEdit"
            />
        </div>
        <div class="global-rule-panel__body">
            <RuleForm :readonly="isReadonly" ref="ruleForm"/>
            <div class="global-rule-panel__footer" v-show="!isReadonly">
                <SdxuButton
                    type="default"
                    @click="cancel"
                >
                    取消
                </SdxuButton>
                <SdxuButton
                    type="default"
                    v-show="false"
                >
                    重置默认
                </SdxuButton>
                <SdxuButton @click="save">
                    保存修改
                </SdxuButton>
            </div>
        </div>
    </SdxuContentPanel>
</template>

<script>
import ContentPanel from '@sdx/ui/components/content-panel';
import Button from '@sdx/ui/components/button';
import IconButton from '@sdx/ui/components/icon-button';
import RuleForm from './RuleForm';
export default {
    name: 'GlobalRulePanel',
    data() {
        return {
            mode: 'read'
        };
    },
    components: {
        [ContentPanel.name]: ContentPanel,
        [Button.name]: Button,
        [IconButton.name]: IconButton,
        RuleForm
    },
    computed: {
        isReadonly() {
            return this.mode === 'read';
        }
    },
    methods: {
        handleEdit() {
            this.mode = 'edit';
        },
        save() {
            this.$refs.ruleForm.save();
            this.mode = 'read';
        },
        cancel() {
            this.$refs.ruleForm.cancel();
            this.mode = 'read';
        }
    }
};
</script>

<style lang="scss" scoped>
    .global-rule-panel {
        .global-rule-panel__body {
            padding-left: 40px;
            .global-rule-panel__footer {
                text-align: center;
                margin-top: 20px;
            }
        }
    }
</style>
