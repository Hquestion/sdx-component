<template>
    <div class="sdxv-operation-bar">
        <div class="sdxv-operation-bar__operations">
            <SdxuButton
                class="sdxv-operation-bar__operation-mkdir"
                icon="sdx-icon sdx-icon-plus"
                @click="createFolder"
                v-if="canMkdir()"
            >
                {{ t('view.file.NewFolder') }}
            </SdxuButton>
            <SdxwFileSelect
                class="sdxv-operation-bar__operation-upload"
                ref="fileUploader"
                source="local"
                :inline="true"
                :limit="-1"
                dropdown-width="138px"
                dropdown-placement="right"
                :local-file-label="t('view.file.UploadFile')"
                :local-folder-label="t('view.file.UploadFolder')"
                :upload-params="makeUploadParams()"
                :on-progress="handleProgress"
                :on-success="removeUpload"
                style="margin-left: 20px;margin-right: 20px;"
                v-if="canUpload()"
                :on-exceed-max-size="onExceedMaxSize"
                :on-exceed-max-size-dir="onExceedMaxSizeDir"
            >
                {{ t('view.file.Upload') }}
            </SdxwFileSelect>
            <SdxuButton
                class="sdxv-operation-bar__operation-download"
                v-if="canDownload()"
                @click="handleDownload"
                :loading="fileManager.$refs.fileTable.btnStatus.batchDownloading.length > 0"
            >
                {{ t('view.file.Download') }}
            </SdxuButton>
            <SdxuButton
                class="sdxv-operation-bar__operation-share"
                v-if="canShare()"
                @click="handleShare"
            >
                {{ t('view.file.Share') }}
            </SdxuButton>
            <SdxuButton
                class="sdxv-operation-bar__operation-cshare"
                v-if="canCancelShare()"
                @click="handleCancelShare"
            >
                {{ t('view.file.CancelShare') }}
            </SdxuButton>
            <SdxuButton
                class="sdxv-operation-bar__operation-copy"
                type="default"
                v-if="canCopy()"
                @click="handleCopy"
            >
                {{ t('view.file.Copy') }}
            </SdxuButton>
            <SdxuButton
                class="sdxv-operation-bar__operation-move"
                type="default"
                v-if="canMove()"
                @click="handleMove"
            >
                {{ t('view.file.MoveOrCopy') }}
            </SdxuButton>
            <SdxuButton
                class="sdxv-operation-bar__operation-del"
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
import MessageBox from '@sdx/ui/components/message-box';
import { systemType } from '@sdx/utils/src/helper/tool';
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
        },
        onExceedMaxSize() {
            let [that,url]  = [this,this.getSystemUrl()];   
            MessageBox.custom.warning({
                title: this.t('view.file.upload_or_download_operation_files_are_large'),
                content(h){
                    return (
                        <div class="fileClient">
                            <a target="_blank" href={url}>{that.t('view.file.Download_Now')}</a>
                            <div class={that.lang$ === 'en' ? 'english' : 'chinese'}>
                                <span>{that.t('view.file.And_install_SkyDiscovery_File_Management_Client')}</span>
                                <a href='sdx-file-management://'>{that.t('view.file.Open_it_immediately')}</a>
                            </div>
                        </div>
                    );
                }
            });
            
            
        },
        onExceedMaxSizeDir() {
            this.onExceedMaxSize();
        },
        //判断系统类型获取url
        getSystemUrl(){
            let url = '';
            let STATIC_PATH = '/';
            if (systemType() === 'Windows') {
                url = `${STATIC_PATH}static/filemanage-client/windows/sky-filemanager-client.exe`;
            } else if (systemType() === 'Mac'){
                url = `${STATIC_PATH}static/filemanage-client/mac/sky-filemanager-client.dmg`;
            } 
            // else if(systemType() === 'Linux'){
            //     url = `${STATIC_PATH}static/filemanage-client/linux/sky-filemanager-client.zip`;
            // }
            return url;
        }
    }
};
</script>

<style lang="scss">
.sdxv-operation-bar {
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-between;
}
.fileClient {
    display: flex;
    justify-content: center;
    flex-direction: column;
    &>a{
        margin-left: 140px;
        text-align: center;
        display: block;
        width: 150px;
        background: #4781F8;
        color: #fff;
        height: 30px;
        line-height: 30px;
    }
    .chinese {
        text-align: center;
        padding-top: 12px;
        padding-right: 70px;
    }
    .english {
        padding-top: 12px;
        text-align: left;
        padding-right: 0;
    }
}
</style>


