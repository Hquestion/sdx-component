<template>
    <div class="sdxw-file-select" :class="{'is-inline': inline}">
        <div class="sdxw-file-select__main">
            <SdxuButton
                trigger="click"
                :keep-dropdown-open="true"
                ref="dropdownMain"
                @dropdown-hide="emitBlurOnFormItem"
            >
                选择文件
                <template slot="dropdown">
                    <SdxuButton
                        type="text"
                        v-if="localVisible"
                    >
                        <SdxuUpload
                            ref="fileSelect"
                            class="upload-type-item"
                            :action="'/v2/ceph/upload/admin/hxl'"
                            :multiple="true"
                            :directory="false"
                            :accept="accept"
                            :on-change="handlerFileChange"
                            :on-error="onFileError"
                            :on-progress="onProgress"
                            :on-success="onSuccess"
                            :on-exceed="onExceed"
                            :data="uploadParams"
                            :limit="limit"
                            :show-file-list="false"
                            :before-upload="beforeUpload"
                            @click.native="$refs.fileSelectPop && $refs.fileSelectPop.close()"
                        >
                            <span>本地文件</span>
                        </SdxuUpload>
                    </SdxuButton>
                    <SdxuButton
                        type="text"
                        v-if="localFolderVisible"
                    >
                        <SdxuUpload
                            ref="directorySelect"
                            class="upload-type-item"
                            :action="'/v2/ceph/upload/admin/hxl'"
                            :multiple="true"
                            :directory="true"
                            :accept="accept"
                            :on-change="handlerDirectoryChange"
                            :on-error="onDirectoryError"
                            :on-exceed="onExceed"
                            :limit="limit"
                            :data="uploadParams"
                            :show-file-list="false"
                            :on-progress="onProgress"
                            :on-success="onSuccess"
                            :before-upload="beforeUploadDir"
                            @click.native="$refs.fileSelectPop && $refs.fileSelectPop.close()"
                        >
                            <span>本地文件夹</span>
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
                            :limit="limit"
                            :tree-options="treeOptions"
                            :checkable="checkable"
                            :check-type="checkType"
                            @cancel="handleCancel"
                            @confirm="handleConfirm"
                        >
                            平台文件
                        </SdxwFileSelectPop>
                    </SdxuButton>
                </template>
            </SdxuButton>
            <span class="sdxw-file-select__accept-tip" v-show="accept">请选择{{accept}}类型的文件</span>
        </div>
        <SdxuUploadList
            class="sdxw-file-select__files"
            v-if="showUploadList"
            :files="selectedFiles"
            @remove="handleRemove"
        />
    </div>
</template>

<script>
import SdxuButton from '@sdx/ui/components/button';
import Upload from '@sdx/ui/components/upload';
import SdxwFileSelectPop from './FileSelectPop';
import emitter from '@sdx/utils/src/mixins/emitter';
import { getUser } from '@sdx/utils/src/helper/shareCenter';
export default {
    name: 'SdxwFileSelect',
    mixins: [emitter],
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
            type: Array,
            default: () => []
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
            default: ''
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
            default: undefined
        }
    },
    computed: {
        localVisible() {
            return ['all', 'local'].includes(this.source) && ['all', 'file'].includes(this.checkType);
        },
        cephVisible() {
            return ['all', 'ceph'].includes(this.source);
        },
        localFolderVisible() {
            return this.localVisible && (this.limit > 1 || this.limit === -1) && ['all', 'file'].includes(this.checkType);
        },
        selectedFiles() {
            return this.value;
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
                            title: '存在超大文件',
                            message: '超大文件(大于200MB)将不会上传'
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
                title: '文件过多',
                message: `最多选择${this.limit}个文件`
            });
        },
        onFileError(err, file, fileList) {
            this.onError && this.onError(err, file, fileList);
            this.$message.error(err.message);
            this.handleRemove(file);
        },
        onDirectoryError(err, file) {
            this.onError && this.onError(err, file);
            this.$message.error(err.message);
            this.handleRemove(file);
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
            this.$emit('input', temp);
        },
        emitBlurOnFormItem() {
            this.dispatch('ElFormItem', 'el.form.blur');
            this.$emit('blur');
        },
        clearFileList() {
            this.$refs.fileSelect && this.$refs.fileSelect.clearFiles();
            this.$refs.directorySelect && this.$refs.directorySelect.clearFiles();
            this.makeFileList();
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
