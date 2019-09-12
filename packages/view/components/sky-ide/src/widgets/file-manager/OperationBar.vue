<template>
    <div class="skyide-operation-bar">
        <div class="skyide-operation-bar__operations">
            <SdxuButton
                class="skyide-operation-bar__operation-mkdir"
                icon="sdx-icon sdx-icon-plus"
                @click="createFolder"
                v-if="canMkdir()"
            >
                {{ t('view.file.NewFolder') }}
            </SdxuButton>
            <SdxwFileSelect
                class="skyide-operation-bar__operation-upload"
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
        </div>
    </div>
</template>

<script>
import SdxuButton from '@sdx/ui/components/button';
import SdxwFileSelect from '@sdx/widget/components/file-select';
import batchOperationAuthMixin from './helper/batchOperationAuthMixin';
import shareCenter from '@sdx/utils/src/helper/shareCenter';
import { rootKinds } from './helper/fileListTool';
import locale from '@sdx/utils/src/mixins/locale';
import MessageBox from '@sdx/ui/components/message-box';
export default {
    name: 'OperationBar',
    components: {
        SdxuButton,
        [SdxwFileSelect.FileSelectMix.name]: SdxwFileSelect.FileSelectMix
    },
    inject: ['fileManager'],
    mixins: [batchOperationAuthMixin, locale],
    methods: {
        createFolder() {
            this.fileManager.$refs.fileTable.mkdir();
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
            // this.fileManager.uploadingFiles = files;
            // this.fileManager.$refs.fileTask.checkTab('UPLOAD');
        },
        removeUpload() {
            // this.$refs.fileUploader.handleRemove(file);
            // 目前先保留上传记录，不处理
            this.fileManager.enterDirectory(this.fileManager.currentPath);
        },
        onExceedMaxSize() {
            let that = this;
            let url = this.getSystemUrl();
            MessageBox.custom.warning({
                title: this.t('view.file.upload_or_download_operation_files_are_large'),
                content() {
                    return (
                        <div class="fileClient">
                            <a href={url} target="blank">{that.t('view.file.Download_Now')}</a>
                            <span>{that.t('view.file.And_install_SkyDiscovery_File_Management_Client')}</span>
                        </div>
                    );
                }
            });
        },
        onExceedMaxSizeDir() {
            this.onExceedMaxSize();
        },
        // 判断系统类型获取url
        getSystemUrl() {
            let url = '';
            let STATIC_PATH = process.env.VUE_APP_STATIC_PATH;
            const isWindows = /windows|win32/i.test(navigator.userAgent);
            const isMac = /macintosh|mac os x/i.test(navigator.userAgent);
            const isLinux = (String(navigator.platform).indexOf('Linux') > -1);
            if (isWindows) {
                url = `${STATIC_PATH}static/filemanage-client/windows/sky-filemanager-client.exe`;
            } else if (isMac) {
                url = `${STATIC_PATH}static/filemanage-client/mac/sky-filemanager-client.zip`;
            } else if (isLinux) {
                url = `${STATIC_PATH}static/filemanage-client/linux/sky-filemanager-client.zip`;
            }
            return url;
        }
    }
};
</script>

<style lang="scss">
.skyide-operation-bar {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 15px;
}
.fileClient {
    a {
        padding-right: 4px;
        color:#5C89FF;
    }
}
</style>


