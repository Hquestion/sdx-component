<template>
    <div class="sdxw-file-select-pop">
        <el-popover
            ref="filePopover"
            placement="right"
            width="340"
            trigger="click"
            :visible-arrow="false"
            popper-class="sdxw-file-select-pop__overlay"
            @hide="handleHide"
        >
            <SdxwFileSelectMain
                :user-id="userId"
                :root-path="rootPath"
                :accept="accept"
                :limit="limit"
                :tree-options="treeOptions"
                :checkable="checkable"
                :check-type="checkType"
                :project-enable="projectEnable"
                :private-enable="privateEnable"
                :share-enable="shareEnable"
                v-model="checked"
                @cancel="handleCancel"
                @confirm="handleConfirm"
                ref="selectMain"
            />
            <div
                slot="reference"
                class="sdxw-file-select-pop__ref"
                v-if="!noRef"
            >
                <slot>
                    <SdxuButton size="small">
                        {{ t('widget.fileSelect.SelectFile') }}
                    </SdxuButton>
                </slot>
            </div>
        </el-popover>
    </div>
</template>

<script>
import SdxwFileSelectMain from './FileSelectMain';
import SdxuButton from '@sdx/ui/components/button';
import emitter from '@sdx/utils/src/mixins/emitter';
import Popover from 'element-ui/lib/popover';
import locale from '@sdx/utils/src/mixins/locale';
export default {
    name: 'SdxwFileSelectPop',
    mixins: [emitter, locale],
    components: {
        SdxuButton,
        SdxwFileSelectMain,
        [Popover.name]: Popover
    },
    data() {
        return {
            checked: []
        };
    },
    props: {
        value: {
            type: [String, Array],
            default: () => []
        },
        stringModel: {
            type: Boolean,
            default: false
        },
        noRef: {
            type: Boolean,
            default: false
        },
        preventHideEvent: {
            type: Boolean,
            default: false
        },
        userId: {
            type: String,
            default: ''
        },
        rootPath: {
            type: String,
            default: '/'
        },
        accept: {
            type: String,
            default: ''
        },
        limit: {
            type: Number,
            default: 1 // -1表示不限制
        },
        treeOptions: {
            type: Object,
            default: null
        },
        checkable: {
            type: Boolean,
            default: true
        },
        checkType: {
            type: String,
            default: 'all' // 'file', 'folder'
        },
        projectEnable: {
            type: Boolean,
            default: false
        },
        privateEnable: {
            type: Boolean,
            default: true
        },
        shareEnable: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        handleCancel() {
            this.close();
            this.$emit('cancel');
        },
        handleConfirm() {
            this.$emit('input', this.stringModel ? this.checked.map(item => typeof item ==='string'?item : item.path).join(',') : this.checked);
            this.close();
            this.$emit('confirm');
        },
        open() {
            this.$refs.filePopover.doShow();
        },
        close() {
            this.$refs.filePopover.doClose();
        },
        handleHide() {
            this.$refs.selectMain.reset();
            if (this.preventHideEvent) return;
            this.dispatch('ElFormItem', 'el.form.blur');
        }
    },
    watch: {
        value: {
            immediate: true,
            deep: true,
            handler(val) {
                if (typeof val === 'string') {
                    this.checked = val.split(',');
                } else {
                    this.checked = val;
                }
            }
        }
    },
    mounted() {

    }
};
</script>

<style lang="scss" scoped>

</style>
