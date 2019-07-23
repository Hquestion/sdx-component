<template>
    <div class="sdxw-file-select-main">
        <SdxuInput
            :placeholder="t('view.file.PleaseInputFileName')"
            type="search"
            v-model="key"
        />
        <div class="sdxw-file-select-main__tip">
            <i class="sdx-icon sdx-icon-info" />
            <span>{{ t('widget.fileSelect.UseSearchTip') }}</span>
        </div>
        <div class="sdxw-file-select-main__main">
            <SdxuScroll>
                <component
                    :is="activeComp"
                    v-model="checked"
                    :user-id="userId"
                    :root-path="rootPath"
                    :accept="accept"
                    :limit="limit"
                    :tree-options="treeOptions"
                    :checkable="checkable"
                    :check-type="checkType"
                    :querystring="key"
                    ref="fileComp"
                />
            </SdxuScroll>
        </div>
        <div
            class="sdxw-file-select-main__footer"
            @click="onCancel"
        >
            <SdxuButton
                type="default"
                size="small"
            >
                {{ t('sdxCommon.Cancel') }}
            </SdxuButton>
            <SdxuButton
                type="primary"
                size="small"
                @click="onConfirm"
            >
                {{ t('sdxCommon.Confirm') }}
            </SdxuButton>
        </div>
    </div>
</template>

<script>
import SdxuButton from '@sdx/ui/components/button';
import SdxuInput from '@sdx/ui/components/input';
import SdxuScroll from '@sdx/ui/components/scroll';
import FileSelectTree from './FileSelectTree';
import FileSelectSearch from './FileSelectSearch';
import debounce from '@sdx/utils/src/helper/debounce';
import locale from '@sdx/utils/src/mixins/locale';
export default {
    name: 'SdxwFileSelectMain',
    mixins: [locale],
    components: {
        SdxuButton,
        SdxuInput,
        SdxuScroll,
        FileSelectSearch,
        FileSelectTree
    },
    props: {
        value: {
            type: Array,
            default: () => []
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
        }
    },
    data() {
        return {
            key: '',
            checked: []
        };
    },
    computed: {
        activeComp() {
            return ['FileSelectTree', 'FileSelectSearch'][+!!this.key.trim()];
        }
    },
    methods: {
        onCancel() {
            this.$emit('cancel');
        },
        onConfirm() {
            this.$emit('input', this.checked);
            this.$emit('confirm');
        },
        reset() {
            this.key = '';
        }
    },
    watch: {
        key(val) {
            if (!val || !val.trim()) return;
            (debounce(() => {
                if (this.activeComp === 'FileSelectSearch') {
                    this.$refs.fileComp.refresh && this.$refs.fileComp.refresh(true);
                }
            }, 500))();
        }
    }
};
</script>

<style lang="scss" scoped>

</style>
