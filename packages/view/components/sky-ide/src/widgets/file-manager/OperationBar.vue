<template>
    <div class="skyide-operation-bar">
        <SdxuButton
            icon="sdx-icon sdx-tianjiawenjian"
            icon-only
            plain
            @click="createFolder"
            v-if="canMkdir()"
            :title="t('view.file.CreateFolder')"
        />

        <UploadFile
            class="skyide-operation-bar__operation-upload"
            ref="fileUploader"
            source="local"
            :limit="-1"
            :upload-params="makeUploadParams()"
            :on-progress="handleProgress"
            :on-success="removeUpload"
            v-if="canUpload()"
            :on-exceed-max-size="onExceedMaxSize"
            :on-exceed-max-size-dir="onExceedMaxSizeDir"
        />
    </div>
</template>

<script>
import SdxuButton from '@sdx/ui/components/button';
import batchOperationAuthMixin from './helper/batchOperationAuthMixin';
import shareCenter from '@sdx/utils/src/helper/shareCenter';
import { rootKinds } from './helper/fileListTool';
import locale from '@sdx/utils/src/mixins/locale';
import MessageBox from '@sdx/ui/components/message-box';
import UploadFile from './UploadFile';
export default {
    name: 'OperationBar',
    components: {
        SdxuButton,
        UploadFile
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
        removeUpload(fileList) {
            // this.$refs.fileUploader.handleRemove(file);
            // 目前先保留上传记录，不处理
            this.fileManager.enterDirectory(this.fileManager.currentPath, true, fileList.files[0]);
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
                url = `${STATIC_PATH}static/filemanage-client/mac/sky-filemanager-client.dmg`;
            } else if (isLinux) {
                url = `${STATIC_PATH}static/filemanage-client/linux/sky-filemanager-client.AppImage`;
            }
            return url;
        }
    }
};
</script>

<style lang="scss">
.skyide-operation-bar {
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 56px;
    background: #1C253D;
    .sdxu-button--primary.is-plain {
        color: #DDE5FE;
        &:hover {
            color: #fff;
        }
        .sdxu-button__icon {
            font-size: 18px!important;
        }
    }
}
.fileClient {
    a {
        padding-right: 4px;
        color:#5C89FF;
    }
}
</style>


