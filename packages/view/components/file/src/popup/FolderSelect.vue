<template>
    <SdxuDialog
        class="sdxv-folder-select"
        :visible.sync="_visible"
        :title="t('view.file.MoveOrCopy')"
        @close="$emit('cancel')"
    >
        <span slot="title">{{ t('view.file.MoveOrCopy') }}</span>
        <div style="height: 50vh">
            <SdxuScroll>
                <SdxwFileSelectTree
                    ref="fileSelectTree"
                    :checkable="false"
                    check-type="folder"
                    :project-enable="true"
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
                {{ t('view.file.NewFolder') }}
            </SdxuButton>
            <SdxuButton
                @click="$emit('move', currentNode().node.data)"
                v-if="supportMove"
                :disabled="!isFolderLegal"
            >
                {{ t('view.file.Move') }}
            </SdxuButton>
            <SdxuButton @click="$emit('copy', currentNode().node.data)" :disabled="!isFolderLegal">
                {{ t('view.file.Copy') }}
            </SdxuButton>
        </template>
    </SdxuDialog>
</template>

<script>
import SdxwFileSelect from '@sdx/widget/components/file-select';
import SdxuDialog from '@sdx/ui/components/dialog';
import SdxuButton from '@sdx/ui/components/button';
import SdxuScroll from '@sdx/ui/components/scroll';
import { mkdir } from '@sdx/utils/src/api/file';
import locale from '@sdx/utils/src/mixins/locale';

export default {
    name: 'SdxvFolderSelect',
    data() {
        return {
            newable: false,
            isFolderLegal: false
        };
    },
    mixins: [locale],
    components: {
        SdxuButton,
        SdxuDialog,
        SdxwFileSelectTree: SdxwFileSelect.FileSelectTree,
        SdxuScroll
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
                name: this.t('view.file.NewFolder'),
                isFile: false,
                parentPath: this.currentNode().node.data.path
            }, node.node);
        },
        currentNode() {
            let node = this.$refs.fileSelectTree && this.$refs.fileSelectTree.$refs.fileTree && this.$refs.fileSelectTree.$refs.fileTree.currentNode;
            if (node) {
                let rootNode = this.$refs.fileSelectTree.getRootNode(node.node);
                if (rootNode.data.isProjectFiles) {
                    if (node.node.level === 2) {
                        node.node.data.path = '/';
                    }
                }
            }
            return node;
        },
        isCurrentNodeExpand() {
            return this.currentNode() && this.currentNode().expanded && !this.currentNode().node.data.selectDisable;
        },
        handleTreeShake() {
            this.newable = this.isCurrentNodeExpand();
        },
        handleCurrentChange() {
            // 触发change事件的时候，currentNode还没有刷新，这时取currentNode会取到之前的，所以这里在$nextTick之后再来取
            this.$nextTick(() => {
                this.newable = this.isCurrentNodeExpand();
                const node = this.currentNode();
                if(!node) return false;
                this.isFolderLegal = !node.node.data.selectDisable;
            });
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
