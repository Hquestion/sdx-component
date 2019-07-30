<template>
    <div class="sdxv-operation-bar">
        <div class="sdxv-operation-bar__operations">
            <SdxuButton
                icon="sdx-icon sdx-icon-plus"
                @click="createFolder"
                v-if="canMkdir()"
            >
                {{ t('view.file.NewFolder') }}
            </SdxuButton>
            <SdxwFileSelect
                ref="fileUploader"
                source="local"
                :inline="true"
                :limit="-1"
                dropdown-width="138px"
                :local-file-label="t('view.file.UploadFile')"
                :local-folder-label="t('view.file.UploadFolder')"
                :upload-params="makeUploadParams()"
                :on-progress="handleProgress"
                :on-success="removeUpload"
                style="margin-left: 20px;margin-right: 20px;"
                v-if="canUpload()"
            >
                {{ t('view.file.Upload') }}
            </SdxwFileSelect>
            <SdxuButton v-if="canDownload()" @click="handleDownload" :loading="fileManager.$refs.fileTable.btnStatus.batchDownloading.length > 0">
                {{ t('view.file.Download') }}
            </SdxuButton>
            <SdxuButton v-if="canShare()" @click="handleShare">
                {{ t('view.file.Share') }}
            </SdxuButton>
            <SdxuButton v-if="canCancelShare()" @click="handleCancelShare">
                {{ t('view.file.CancelShare') }}
            </SdxuButton>
            <SdxuButton
                type="default"
                v-if="canCopy()"
                @click="handleCopy"
            >
                {{ t('view.file.Copy') }}
            </SdxuButton>
            <SdxuButton
                type="default"
                v-if="canMove()"
                @click="handleMove"
            >
                {{ t('view.file.MoveOrCopy') }}
            </SdxuButton>
            <SdxuButton
                type="default"
                v-if="canDelete()"
                @click="handleDelete"
            >
                {{ t('sdxCommon.Delete') }}
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
                        :placeholder="t('view.file.PleaseInputFileName')"
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
import { rootKinds } from './helper/fileListTool';
import locale from '@sdx/utils/src/mixins/locale';

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
    mixins: [batchOperationAuthMixin, locale],
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
            if (this.$route.query.startPath) {
                query.startPath = this.$route.query.startPath;
                query.ownerId = this.$route.query.ownerId;
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
                ownerId: this.$route.query.ownerId || shareCenter.getUser().uuid,
                path: this.fileManager.rootKind === rootKinds.PROJECT_SHARE ? '/' + this.fileManager.currentPath.split('/').slice(3) : this.fileManager.currentPath,
                filesystem: 'cephfs',
                overwrite: 0
            };
        },
        handleProgress(e, file, files) {
            this.fileManager.uploadingFiles = files;
            this.fileManager.$refs.fileTask.checkTab('UPLOAD');
        },
        removeUpload(file) {
            // this.$refs.fileUploader.handleRemove(file);
            // 目前先保留上传记录，不处理
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
    flex-direction: row-reverse;
    justify-content: space-between;
}
</style>
