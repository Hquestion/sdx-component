<template>
    <SdxuDialog
        class="sdxv-folder-select"
        :visible.sync="_visible"
        title="复制/移动"
        @close="$emit('cancel')"
    >
        <span slot="title">复制/移动</span>
        <div style="height: 50vh">
            <SdxuScroll>
                <SdxwFileSelectTree
                    ref="fileSelectTree"
                    :checkable="false"
                    check-type="folder"
                    :tree-options="{expandOnClickNode: false}"
                    @tree-shake="handleTreeShake"
                    @current-change="handleCurrentChange"
                    @cancel="handleCancel"
                    @save="handleSave"
                />
            </SdxuScroll>
        </div>
        <template slot="footer">
            <SdxuButton
                icon="sdx-icon-plus"
                type="primary"
                :invert="true"
                @click="newFolder"
                :disabled="!newable"
            >
                新建文件夹
            </SdxuButton>
            <SdxuButton
                @click="$emit('move', currentNode().node.data)"
                v-if="supportMove"
            >
                移动
            </SdxuButton>
            <SdxuButton @click="$emit('copy', currentNode().node.data)">
                复制
            </SdxuButton>
        </template>
    </SdxuDialog>
</template>

<script>
import SdxwFileSelect from '@sdx/widget/components/file-select';
import SdxuDialog from '@sdx/ui/components/dialog';
import SdxuButton from '@sdx/ui/components/button';
import { mkdir } from '@sdx/utils/src/api/file';

export default {
    name: 'SdxvFolderSelect',
    data() {
        return {
            newable: false
        };
    },
    components: {
        SdxuButton,
        SdxuDialog,
        SdxwFileSelectTree: SdxwFileSelect.FileSelectTree
    },
    props: {
        visible: {
            type: Boolean,
            default: false
        },
        supportMove: {
            type: Boolean,
            default: true
        }
    },
    computed: {
        _visible: {
            get() {
                return this.visible;
            },
            set(val) {
                this.$emit('update:visible', val);
            }
        }
    },
    methods: {
        newFolder() {
            let node = this.$refs.fileSelectTree.$refs.fileTree.currentNode;
            this.$refs.fileSelectTree.$refs.fileTree.append({
                path: '',
                name: '新建文件夹',
                isFile: false,
                parentPath: this.currentNode().node.data.path
            }, node.node);
        },
        currentNode() {
            return this.$refs.fileSelectTree && this.$refs.fileSelectTree.$refs.fileTree && this.$refs.fileSelectTree.$refs.fileTree.currentNode;
        },
        isCurrentNodeExpand() {
            return this.currentNode() && this.currentNode().expanded;
        },
        handleTreeShake() {
            this.newable = !this.isCurrentNodeExpand();
        },
        handleCurrentChange() {
            this.newable = this.isCurrentNodeExpand();
        },
        handleCancel() {
            this.$refs.fileSelectTree.$refs.fileTree.remove({path: ''});
        },
        handleSave(data) {
            if (data.name.trim() === '') {
                return;
            }
            mkdir(data.parentPath + '/' + data.name).then(res => {
                data.path =  data.parentPath + '/' + data.name;
            });
        }
    }
};
</script>

<style lang="scss" scoped>

</style>
