<template>
    <div
        class="sdxw-file-select"
        :class="{'is-inline': inline}"
    >
        <div class="sdxw-file-select__main">
            <SdxuButton
                trigger="click"
                :icon="icon"
                :keep-dropdown-open="true"
                ref="dropdownMain"
                :dropdown-width="dropdownWidth"
                :disabled="disableCheck"
                @dropdown-hide="emitBlurOnFormItem"
            >
                <slot>{{ t('widget.file.SelectFile') }}</slot>
                <template slot="dropdown">
                    <SdxuButton
                        type="text"
                        v-if="localVisible"
                    >
                        <SdxuUpload
                            ref="fileSelect"
                            class="upload-type-item"
                            action="/file-manager/api/v1/files/upload"
                            :multiple="true"
                            name="files"
                            :directory="false"
                            :accept="accept"
                            :on-change="handlerFileChange"
                            :on-error="onFileError"
                            :on-progress="onProgress"
                            :on-success="onSuccess"
                            :on-exceed="onExceed"
                            :data="uploadParams"
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
                            action="/file-manager/api/v1/files/upload"
                            name="files"
                            :multiple="true"
                            :directory="true"
                            :accept="accept"
                            :on-change="handlerDirectoryChange"
                            :on-error="onDirectoryError"
                            :on-exceed="onExceed"
                            :limit="realLimit"
                            :data="uploadParams"
                            :show-file-list="false"
                            :on-progress="onProgress"
                            :on-success="onSuccess"
                            :before-upload="beforeUploadDir"
                            @click.native="$refs.fileSelectPop && $refs.fileSelectPop.close()"
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
                {{ t('widget.fileSelect.PleaseSelect') }}{{ accept }}{{ t('widget.file.TypeFiles') }}
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
            default: () => ({
                ownerId: shareCenter.getUser() && shareCenter.getUser().uuid || '',
                path: '/',
                filesystem: 'cephfs',
                overwrite: 1
            })
        },
        localFileLabel: {
            type: String,
            default: t('widget.file.LocaleFile')
        },
        localFolderLabel: {
            type: String,
            default: t('widget.file.LocaleFolder')
        },
        platformFileLabel: {
            type: String,
            default: t('widget.file.PlatformFile')
        },
        icon: {
            type: String,
            default: ''
        },
        dropdownWidth: {
            type: String,
            default: '100%'
        },
        disabled: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        realLimit() {
            return +this.limit === -1 ? Infinity : +this.limit;
        },
        localVisible() {
            return ['all', 'local'].includes(this.source) && ['all', 'file'].includes(this.checkType);
        },
        cephVisible() {
            return ['all', 'ceph'].includes(this.source);
        },
        localFolderVisible() {
            return this.localVisible && this.realLimit > 1 && ['all', 'file'].includes(this.checkType);
        },
        selectedFiles() {
            if (typeof this.value === 'string') {
                return (this.value && this.value.split(',') || []).map(item => ({
                    name: item,
                    cephName: item,
                    status: 'success',
                    percentage: 100,
                    uid: Math.ceil(Math.random() * 1000000000),
                    from: 'unknown',
                    isFile: true
                }));
            } else {
                return this.value.map(item => {
                    if (typeof item === 'string') {
                        return {
                            name: item,
                            cephName: item,
                            status: 'success',
                            percentage: 100,
                            uid: Math.ceil(Math.random() * 1000000000),
                            from: 'unknown',
                            isFile: true
                        };
                    } else {
                        return item;
                    }
                });
            }
        },
        disableCheck() {
            return this.disabled || this.selectedFiles.length >= this.realLimit;
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
                if (file.size > this.maxSize) {
                    this.$emit('exceed-max-size', file);
                    if (this.onExceedMaxSize && typeof this.onExceedMaxSize === 'function') {
                        this.onExceedMaxSize(file);
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
        makeFileList() {
            let cephPaths = this.cephPaths;
            let fileUploadFiles = this.$refs.fileSelect && this.$refs.fileSelect.uploadFiles || [];
            let dirUploadFiles = this.$refs.directorySelect && this.$refs.directorySelect.uploadFiles || [];
            if (typeof cephPaths === 'string') {
                if (cephPaths !== '') {
                    cephPaths = [{
                        fullpath: cephPaths,
                        path: cephPaths,
                        is_dir: false
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
                isDir: !item.isFile
            }));
            let temp = [...fileUploadFiles, ...dirUploadFiles, ...cephPathsMap];
            this.$emit('input',
                typeof this.value === 'string'
                    ? temp.map(item => item.cephName || item.name).join(',')
                    : (this.stringModel ? temp.map(item => item.cephName || item.name) : temp));
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
        }
    },
    mounted() {
        this.$nextTick(() => {
            let fileList = this.value;
            let cephModel;
            if (typeof fileList === 'string') {
                fileList = fileList && fileList.split(',') || [];
                cephModel = fileList.map(item => ({
                    path: item,
                    isFile: true
                }));
            } else {
                cephModel = fileList.map(item => ({
                    path: item.cephName,
                    isFile: !item.isDir || true
                }));
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
