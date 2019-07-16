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
                {{ $t('view.file.NewFolder') }}
            </SdxuButton>
            <SdxuButton
                @click="$emit('move', currentNode().node.data)"
                v-if="supportMove"
            >
                {{ $t('view.file.Move') }}
            </SdxuButton>
            <SdxuButton @click="$emit('copy', currentNode().node.data)">
                {{ $t('view.file.Copy') }}
            </SdxuButton>
        </template>
    </SdxuDialog>
</template>

<script>
import SdxwFileSelect from '@sdx/widget/components/file-select';
import SdxuDialog from '@sdx/ui/components/dialog';
import SdxuButton from '@sdx/ui/components/button';
import { mkdir } from '@sdx/utils/src/api/file';
import locale from '@sdx/utils/src/mixins/locale';

export default {
    name: 'SdxvFolderSelect',
    data() {
        return {
            newable: false
        };
    },
    mixins: [locale],
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
                name: this.t('view.file.NewFolder'),
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
