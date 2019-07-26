<template>
    <SdxuContentPanel
        class="global-rule-panel"
        :title="t('view.resourceManage.GlobalRuleSetting')"
        :subtitle="t('view.resourceManage.RuleTip')"
    >
        <div
            class="edit-icon"
            slot="right"
        >
            <sdxu-icon-button
                v-auth.resource.button="'CONFIG:WRITE'"
                icon="sdx-icon sdx-icon-edit"
                :title="t('sdxCommon.Edit')"
                :active="!isReadonly"
                @click="handleEdit"
            />
        </div>
        <div class="global-rule-panel__body">
            <RuleForm
                :readonly="isReadonly"
                ref="ruleForm"
            />
            <div
                class="global-rule-panel__footer"
                v-show="!isReadonly"
            >
                <SdxuButton
                    type="default"
                    @click="cancel"
                >
                    {{ t('sdxCommon.Cancel') }}
                </SdxuButton>
                <SdxuButton
                    type="default"
                    v-show="false"
                >
                    {{ t('sdxCommon.Reset') }}
                </SdxuButton>
                <SdxuButton @click="save">
                    {{ t('view.resourceManage.Save') }}
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
import auth from '@sdx/widget/components/auth';
import locale from '@sdx/utils/src/mixins/locale';
export default {
    name: 'GlobalRulePanel',
    mixins: [locale],
    data() {
        return {
            mode: 'read'
        };
    },
    directives: {auth},
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
