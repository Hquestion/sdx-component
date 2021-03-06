<template>
    <div
        class="sdxw-file-select"
        :class="{'is-inline': inline}"
    >
        <div class="sdxw-file-select__main">
            <SdxuButton
                type="default"
                trigger="click"
                :icon="icon"
                :keep-dropdown-open="true"
                ref="dropdownMain"
                :dropdown-width="dropdownWidth"
                :placement="dropdownPlacement"
                :disabled="disableCheck"
                @dropdown-hide="emitBlurOnFormItem"
            >
                <slot>{{ t('widget.fileSelect.SelectFile') }}</slot>
                <template slot="dropdown">
                    <SdxuButton
                        type="text"
                        v-if="localVisible"
                    >
                        <SdxuUpload
                            ref="fileSelect"
                            class="upload-type-item"
                            action="/gateway/file-manager/api/v1/files/upload"
                            :multiple="true"
                            name="files"
                            :directory="false"
                            :accept="accept"
                            :on-change="handlerFileChange"
                            :on-error="onFileError"
                            :on-progress="handleProgress"
                            :on-success="onSuccess"
                            :on-exceed="onExceed"
                            :data="rebuildUploadParams"
                            :limit="realLimit"
                            :show-file-list="false"
                            :before-upload="beforeUpload"
                            @click.native="$refs.fileSelectPop && $refs.fileSelectPop.close()"
                        >
                            <span>{{ localFileLabel }}</span>
                        </SdxuUpload>
                    </SdxuButton>
                    <SdxuButton
                        type="text"
                        v-if="localFolderVisible"
                    >
                        <SdxuUpload
                            ref="directorySelect"
                            class="upload-type-item"
                            action="/gateway/file-manager/api/v1/files/upload"
                            name="files"
                            :multiple="true"
                            :directory="true"
                            :accept="accept"
                            :max-size="maxSize"
                            :on-change="handlerDirectoryChange"
                            :on-error="onDirectoryError"
                            :on-exceed="onExceed"
                            :limit="localFolderRealLimit"
                            :data="rebuildUploadParams"
                            :show-file-list="false"
                            :on-progress="handleProgress"
                            :on-success="onSuccess"
                            :on-folder-change="handleFolderChange"
                            :before-upload="beforeUploadDir"
                            @click.native="$refs.fileSelectPop && $refs.fileSelectPop.close()"
                            @folder-max-size="handleFolderMaxSize"
                        >
                            <span>{{ localFolderLabel }}</span>
                        </SdxuUpload>
                    </SdxuButton>
                    <SdxuButton
                        type="text"
                        v-if="cephVisible"
                        @click="selectCeph"
                    >
                        <SdxwFileSelectPop
                            v-model="cephPaths"
                            ref="fileSelectPop"
                            :user-id="userId"
                            :root-path="rootPath"
                            :accept="accept"
                            :limit="realLimit"
                            :tree-options="treeOptions"
                            :checkable="checkable"
                            :check-type="checkType"
                            :project-enable="projectEnable"
                            :private-enable="privateEnable"
                            :share-enable="shareEnable"
                            @cancel="handleCancel"
                            @confirm="handleConfirm"
                        >
                            {{ platformFileLabel }}
                        </SdxwFileSelectPop>
                    </SdxuButton>
                </template>
            </SdxuButton>
            <span
                class="sdxw-file-select__accept-tip"
                v-show="accept"
            >
                {{ t('widget.fileSelect.PleaseSelect') }}{{ accept }}{{ t('widget.fileSelect.TypeFiles') }}
            </span>
        </div>
        <SdxuUploadList
            class="sdxw-file-select__files"
            v-if="showUploadList"
            :files="selectedFiles"
            :disabled="disabled"
            @remove="handleRemove"
        />
    </div>
</template>

<script>
import SdxuButton from '@sdx/ui/components/button';
import Upload from '@sdx/ui/components/upload';
import SdxwFileSelectPop from './FileSelectPop';
import emitter from '@sdx/utils/src/mixins/emitter';
import errorHandler from '@sdx/utils/src/error-handler';
import shareCenter from '@sdx/utils/src/helper/shareCenter';
import locale from '@sdx/utils/src/mixins/locale';
import { t } from '@sdx/utils/src/locale';

const uploadDefaults = {
    path: '/',
    filesystem: 'cephfs',
    overwrite: 1
};
export default {
    name: 'SdxwFileSelect',
    mixins: [emitter, locale],
    components: {
        SdxwFileSelectPop,
        SdxuButton,
        [Upload.name]: Upload,
        [Upload.UploadList.name]: Upload.UploadList
    },
    data() {
        return {
            baseAPI: '',
            cephPaths: [],
            fileSelectModel: []
        };
    },
    props: {
        value: {
            type: [Array, String],
            default: () => []
        },
        // 控制value为数组时，是否只返回path字符串数组，默认返回文件Object数组
        stringModel: {
            type: Boolean,
            default: false
        },
        inline: {
            type: Boolean,
            default: false
        },
        source: {
            type: String,
            default: 'all' // local: 本地 ceph: ceph系统 all: 所有
        },
        checkType: {
            type: String,
            default: 'all' // 'file', 'folder'
        },
        limit: {
            type: Number,
            default: 1
        },
        accept: {
            type: String,
            default: ''
        },
        userId: {
            type: String,
            default: ''
        },
        rootPath: {
            type: String,
            default: '/'
        },
        treeOptions: {
            type: Object,
            default: null
        },
        checkable: {
            type: Boolean,
            default: true
        },
        showUploadList: {
            type: Boolean,
            default: true
        },
        // 文件大小限制：最大，单位byte,默认200M
        maxSize: {
            type: Number,
            default: 200 * 1024 * 1024
        },
        onExceedMaxSize: {
            type: Function,
            default: undefined
        },
        onExceedMaxSizeDir: {
            type: Function,
            default: undefined
        },
        onProgress: {
            type: Function,
            default: undefined
        },
        onSuccess: {
            type: Function,
            default: undefined
        },
        onError: {
            type: Function,
            default: undefined
        },
        uploadParams: {
            type: Object,
            default: () => (Object.assign({}, uploadDefaults, {
                ownerId: shareCenter.getUser() && shareCenter.getUser().uuid || ''
            }))
        },
        localFileLabel: {
            type: String,
            default: () => t('widget.fileSelect.LocaleFile')
        },
        localFolderLabel: {
            type: String,
            default: () => t('widget.fileSelect.LocaleFolder')
        },
        platformFileLabel: {
            type: String,
            default: () => t('widget.fileSelect.PlatformFile')
        },
        icon: {
            type: String,
            default: ''
        },
        dropdownWidth: {
            type: String,
            default: '100%'
        },
        dropdownPlacement: {
            type: String,
            default: 'left'
        },
        disabled: {
            type: Boolean,
            default: false
        },
        useFolderPath: {
            type: Boolean,
            default: false
        },
        prefixOwner: {
            type: Boolean,
            default: true
        },
        projectEnable: {
            type: Boolean,
            default: false
        },
        privateEnable: {
            type: Boolean,
            default: true
        },
        shareEnable: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        realLimit() {
            return +this.limit === -1 ? Infinity : +this.limit;
        },
        localFolderRealLimit() {
            if (this.checkType === 'folder' && this.useFolderPath) {
                return Infinity;
            } else {
                return this.realLimit;
            }
        },
        localVisible() {
            return ['all', 'local'].includes(this.source) && ['all', 'file'].includes(this.checkType);
        },
        cephVisible() {
            return ['all', 'ceph'].includes(this.source);
        },
        localFolderVisible() {
            return (this.localVisible && this.realLimit > 1) || (this.useFolderPath && this.checkType === 'folder');
        },
        selectedFiles() {
            if (typeof this.value === 'string') {
                return (this.value && this.value.split(',') || []).map(item => ({
                    name: this.parsePathStr(item).path,
                    cephName: this.parsePathStr(item).path,
                    status: 'success',
                    percentage: 100,
                    uid: Math.ceil(Math.random() * 1000000000),
                    from: 'unknown',
                    isFile: true,
                    ownerId: this.parsePathStr(item).ownerId
                }));
            } else {
                return this.value.map(item => {
                    if (typeof item === 'string') {
                        return {
                            name: this.parsePathStr(item).path,
                            cephName: this.parsePathStr(item).path,
                            status: 'success',
                            percentage: 100,
                            uid: Math.ceil(Math.random() * 1000000000),
                            from: 'unknown',
                            isFile: true,
                            ownerId: this.parsePathStr(item).ownerId
                        };
                    } else {
                        return item;
                    }
                });
            }
        },
        disableCheck() {
            return this.disabled || this.selectedFiles.length >= this.realLimit;
        },
        rebuildUploadParams() {
            return Object.assign({}, uploadDefaults, this.uploadParams);
        }
    },
    methods: {
        selectCeph() {
            this.$refs.fileSelectPop && this.$refs.fileSelectPop.open();
        },
        handleCancel() {
            this.$refs.fileSelectPop && this.$refs.fileSelectPop.close();
        },
        handleConfirm() {
            // todo confirm时保存选中的文件到model上
            this.$refs.fileSelectPop && this.$refs.fileSelectPop.close();
            this.$refs.dropdownMain.hideDropdown();
        },
        beforeUpload(file) {
            return new Promise((resolve, reject) => {
                const extension = file.name.split('.').pop();
                if (this.accept && this.accept.indexOf(extension) < 0) {
                    this.$notify.error({
                        title: this.t('widget.fileSelect.FileTypeError'),
                        message: this.t('widget.fileSelect.PleaseSelectRightFile')
                    });
                    this.$refs.fileSelect.clearInputValue();
                    this.handleRemove(file);
                    reject(file);
                    return;
                }
                if (file.size > this.maxSize) {
                    this.$emit('exceed-max-size', file);
                    if (this.onExceedMaxSize && typeof this.onExceedMaxSize === 'function') {
                        this.onExceedMaxSize(file);
                    } else {
                        this.$notify.error({
                            title: this.t('widget.fileSelect.ExistLargeFiles'),
                            message: this.t('widget.fileSelect.LargeFileNotUpload')
                        });
                    }
                    this.$refs.fileSelect.clearInputValue();
                    this.handleRemove(file);
                    reject(file);
                } else {
                    resolve(file);
                }
            });
        },
        beforeUploadDir(file) {
            return new Promise((resolve, reject) => {
                if (file.size > this.maxSize) {
                    this.$emit('exceed-max-size-dir', file);
                    if (this.onExceedMaxSizeDir && typeof this.onExceedMaxSizeDir === 'function') {
                        this.onExceedMaxSizeDir(file);
                    } else {
                        this.$notify.error({
                            title: this.t('widget.fileSelect.ExistLargeFiles'),
                            message: this.t('widget.fileSelect.LargeFileNotUpload')
                        });
                    }
                    // this.handleRemove(file);
                    reject(file);
                } else {
                    resolve(file);
                }
            });
        },
        handleFolderMaxSize(files) {
            this.$emit('exceed-max-size-dir', files);
            if (this.onExceedMaxSizeDir && typeof this.onExceedMaxSizeDir === 'function') {
                this.onExceedMaxSizeDir(files);
            } else {
                this.$notify.error({
                    title: this.t('widget.fileSelect.ExistLargeFiles'),
                    message: this.t('widget.fileSelect.LargeFileNotUpload')
                });
            }
        },
        handleProgress(...rest) {
            this.makeFileList(true);
            this.onProgress && this.onProgress(...rest);
        },
        handlerFileChange() {
            this.makeFileList();
        },
        handlerDirectoryChange() {
            this.makeFileList();
        },
        onExceed() {
            this.$notify.error({
                title: this.t('widget.fileSelect.TooManyFiles'),
                message: `${this.t('widget.fileSelect.SelectMax')}${this.realLimit}${this.t('widget.fileSelect.Files')}`
            });
        },
        onFileError(err, file, fileList) {
            this.onError && this.onError(err, file, fileList);
            this.handleRemove(file);
            errorHandler(err);
        },
        onDirectoryError(err, file) {
            this.onError && this.onError(err, file);
            this.handleRemove(file);
            errorHandler(err);
        },
        handleRemove(file, rawFile) {
            if (file.from === 'ceph') {
                if (typeof this.cephPaths === 'string') {
                    this.cephPaths = '';
                } else if (typeof this.cephPaths === 'object' && !Array.isArray(this.cephPaths)) {
                    this.cephPaths = '';
                } else {
                    let index = this.cephPaths.findIndex(item => item.path === file.cephName);
                    this.cephPaths.splice(index, 1);
                }
                this.makeFileList();
            } else if (file.from === 'unknown') {
                if (typeof this.cephPaths === 'string' && this.cephPaths === file.cephName) {
                    this.cephPaths = '';
                } else if (typeof this.cephPaths === 'object' && !Array.isArray(this.cephPaths)
                    && this.cephPaths.path === file.cephName) {
                    this.cephPaths = '';
                } else {
                    let index = this.cephPaths.findIndex(item => item.path === file.cephName);
                    if (index >= 0) {
                        this.cephPaths.splice(index, 1);
                    }
                }
                this.$refs.fileSelect && this.$refs.fileSelect.handleRemove(file, rawFile);
                this.$refs.directorySelect && this.$refs.directorySelect.handleRemove(file, rawFile);
                this.makeFileList();
            } else {
                this.$refs.fileSelect && this.$refs.fileSelect.handleRemove(file, rawFile);
                this.$refs.directorySelect && this.$refs.directorySelect.handleRemove(file, rawFile);
                this.makeFileList();
            }
        },
        makeFileList(isUploading) {
            let cephPaths = this.cephPaths;
            let fileUploadFiles = this.$refs.fileSelect && this.$refs.fileSelect.uploadFiles || [];
            let dirUploadFiles = this.$refs.directorySelect && this.$refs.directorySelect.uploadFiles || [];
            if (typeof cephPaths === 'string') {
                if (cephPaths !== '') {
                    cephPaths = [{
                        fullpath: cephPaths,
                        path: cephPaths,
                        isFile: false
                    }];
                } else {
                    cephPaths = [];
                }
            } else if (typeof cephPaths === 'object' && !Array.isArray(cephPaths)) {
                cephPaths = [cephPaths];
            }
            const cephPathsMap = cephPaths.map(item => ({
                name: item.path,
                cephName: item.path,
                status: 'success',
                percentage: 100,
                uid: Math.ceil(Math.random() * 1000000000),
                from: 'ceph',
                isDir: !item.isFile,
                ownerId: item.ownerId || this.userId || shareCenter.getUser() && shareCenter.getUser().uuid
            }));
            let temp = [...fileUploadFiles, ...dirUploadFiles, ...cephPathsMap];
            if (isUploading && (fileUploadFiles.some(item => item.status === 'uploading') || dirUploadFiles.some(item => item.status === 'uploading'))) {
                this.$emit('input', temp);
            } else {
                this.$emit('input',
                    typeof this.value === 'string'
                        ? temp.map(item => this.getPathFlag(item)).join(',')
                        : (this.stringModel ? temp.map(item => this.getPathFlag(item)) : temp));
            }
        },
        emitBlurOnFormItem() {
            this.dispatch('ElFormItem', 'el.form.blur');
            this.$emit('blur');
        },
        clearFileList() {
            this.$refs.fileSelect && this.$refs.fileSelect.clearFiles();
            this.$refs.directorySelect && this.$refs.directorySelect.clearFiles();
            this.makeFileList();
        },
        getUploadFiles() {
            let fileUploadFiles = this.$refs.fileSelect && this.$refs.fileSelect.uploadFiles || [];
            let dirUploadFiles = this.$refs.directorySelect && this.$refs.directorySelect.uploadFiles || [];
            return [...fileUploadFiles, ...dirUploadFiles];
        },
        handleFolderChange(val) {
            if (this.useFolderPath && this.checkType === 'folder') {
                this.$refs.directorySelect && this.$refs.directorySelect.clearFiles();
                this.$refs.directorySelect && (this.$refs.directorySelect.uploadFiles = [val]);
                this.makeFileList();
            }
            this.$notify.success({
                title: this.t('widget.fileSelect.FolderUploadSuccess')
            });
        },
        parsePathStr(path) {
            let ownerId = this.userId || shareCenter.getUser() && shareCenter.getUser().uuid,
                realPath;
            if (path.startsWith('/')) {
                realPath = path;
            } else {
                let arr = path.split(':');
                ownerId = arr[0];
                realPath = arr[1];
            }
            return {
                ownerId,
                path: realPath
            };
        },
        getPathFlag(file) {
            let ownerId = this.userId || shareCenter.getUser() && shareCenter.getUser().uuid;
            let path = file;
            if (typeof file !== 'string') {
                ownerId = file.ownerId || ownerId;
                path = file.cephName || file.name;
            }
            if (this.prefixOwner) {
                return `${ownerId}:${path}`;
            } else {
                return path;
            }
        }
    },
    mounted() {
        this.$nextTick(() => {
            let fileList = this.value;
            let cephModel;
            if (typeof fileList === 'string') {
                fileList = fileList && fileList.split(',') || [];
                cephModel = fileList.map(item => {
                    return {
                        path: this.parsePathStr(item).path,
                        isFile: true,
                        ownerId: this.parsePathStr(item).ownerId
                    };
                });
            } else {
                cephModel = fileList.map(item => {
                    if (typeof item === 'string') {
                        return {
                            path: this.parsePathStr(item).path,
                            isFile: true,
                            ownerId: this.parsePathStr(item).ownerId
                        };
                    } else {
                        return {
                            path: item.cephName,
                            isFile: !item.isDir,
                            ownerId: item.ownerId || this.userId || shareCenter.getUser() && shareCenter.getUser().uuid
                        };
                    }
                });
            }
            this.cephPaths = cephModel;
            // console.log(getUser());
        });
    },
    watch: {
        value: {
            deep: true,
            handler(val, oldval) {
                if (typeof val === 'string') {
                    if (val !== oldval) {
                        this.$refs.dropdownMain.hideDropdown();
                    }
                } else {
                    this.$refs.dropdownMain.hideDropdown();
                }
            }
        },
        cephPaths() {
            this.makeFileList();
        }
    }
};
</script>

<style lang="scss" scoped>

</style>
