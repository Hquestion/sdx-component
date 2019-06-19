<template>
    <div class="sdxv-operation-bar">
        <div class="sdxv-operation-bar__operations">
            <SdxuButton
                icon="sdx-icon sdx-icon-plus"
                @click="createFolder"
                v-if="canMkdir()"
            >
                新建文件夹
            </SdxuButton>
            <SdxwFileSelect
                ref="fileUploader"
                source="local"
                :inline="true"
                :limit="-1"
                dropdown-width="138px"
                local-file-label="上传文件"
                local-folder-label="上传文件夹"
                :upload-params="makeUploadParams()"
                :on-progress="handleProgress"
                :on-success="removeUpload"
                style="margin-left: 20px;margin-right: 20px;"
                v-if="canUpload()"
            >
                上传
            </SdxwFileSelect>
            <SdxuButton v-if="canDownload()" @click="handleDownload">
                下载
            </SdxuButton>
            <SdxuButton v-if="canShare()" @click="handleShare">
                分享
            </SdxuButton>
            <SdxuButton v-if="canCancelShare()" @click="handleCancelShare">
                取消分享
            </SdxuButton>
            <SdxuButton
                type="default"
                v-if="canCopy()"
                @click="handleCopy"
            >
                复制
            </SdxuButton>
            <SdxuButton
                type="default"
                v-if="canMove()"
                @click="handleMove"
            >
                复制/移动
            </SdxuButton>
            <SdxuButton
                type="default"
                v-if="canDelete()"
                @click="handleDelete"
            >
                删除
            </SdxuButton>
        </div>
        <div class="sdxv-operation-bar__search">
            <SdxwSearchLayout
                @search="handleSearch"
                :block="false"
                align="right"
            >
                <SdxwSearchItem>
                    <SdxuInput
                        type="search"
                        size="small"
                        v-model="fileManager.searchKey"
                        placeholder="请输入文件名称"
                    />
                </SdxwSearchItem>
            </SdxwSearchLayout>
        </div>
    </div>
</template>

<script>
import SdxuButton from '@sdx/ui/components/button';
import SdxwFileSelect from '@sdx/widget/components/file-select';
import SdxwSearch from '@sdx/widget/components/search-layout';
import SdxuInput from '@sdx/ui/components/input';
import batchOperationAuthMixin from './helper/batchOperationAuthMixin';
import shareCenter from '@sdx/utils/src/helper/shareCenter';

export default {
    name: 'OperationBar',
    components: {
        SdxuInput,
        SdxuButton,
        [SdxwFileSelect.FileSelectMix.name]: SdxwFileSelect.FileSelectMix,
        [SdxwSearch.SearchLayout.name]: SdxwSearch.SearchLayout,
        [SdxwSearch.SearchItem.name]: SdxwSearch.SearchItem
    },
    inject: ['fileManager'],
    mixins: [batchOperationAuthMixin],
    data() {
        return {};
    },
    methods: {
        handleSearch() {
            if (this.fileManager.searchKey.trim() === '') return;
            let query = {
                search: this.fileManager.searchKey
            };
            if (this.fileManager.currentPath !== '/') {
                query.path = this.fileManager.currentPath;
            }
            this.$router.push({
                name: this.$route.name,
                query
            });
        },
        createFolder() {
            this.fileManager.$refs.fileTable.mkdir();
        },
        handleDownload() {
            this.fileManager.$refs.fileTable.download();
        },
        handleShare() {
            this.fileManager.$refs.fileTable.share();
        },
        handleCancelShare() {
            this.fileManager.$refs.fileTable.cancelShare();
        },
        handleCopy() {
            this.fileManager.$refs.fileTable.copy();
        },
        handleMove() {
            this.fileManager.$refs.fileTable.moveAndCopy();
        },
        handleDelete() {
            this.fileManager.$refs.fileTable.deleteRow();
        },
        makeUploadParams() {
            return {
                userId: shareCenter.getUser().uuid,
                path: this.fileManager.currentPath,
                filesystem: 'cephfs',
                overwrite: 0
            };
        },
        handleProgress(e, file, files) {
            this.fileManager.uploadingFiles = files;
            this.fileManager.taskVisible = true;
        },
        removeUpload(file) {
            this.$refs.fileUploader.handleRemove(file);
        }
    },
    mounted() {
        // eslint-disable-next-line
        console.log(this.fileManager);
    }
};
</script>

<style lang="scss" scoped>
.sdxv-operation-bar {
    display: flex;
    justify-content: space-between;
    .sdxv-operation-bar__search {
        flex: 1;
    }
}
</style>
