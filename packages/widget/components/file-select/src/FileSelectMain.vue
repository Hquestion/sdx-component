<template>
    <div class="sdxw-file-select-main">
        <SdxuInput
            placeholder="请输入文件名"
            type="search"
            v-model="key"
        />
        <div class="sdxw-file-select-main__tip">
            <i class="sdx-icon sdx-icon-info" />
            <span>没有找到？请使用搜索功能</span>
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
                取消
            </SdxuButton>
            <SdxuButton
                type="primary"
                size="small"
                @click="onConfirm"
            >
                确定
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
export default {
    name: 'SdxwFileSelectMain',
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
        }
    }
};
</script>

<style lang="scss" scoped>

</style>
