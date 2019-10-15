<template>
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
        :data="rebuildUploadParams"
        :limit="realLimit"
        :show-file-list="false"
        :before-upload="beforeUpload"
        @click.native="$refs.fileSelectPop && $refs.fileSelectPop.close()"
    >
        <SdxuButton
            icon="sdx-icon sdx-shangchuanwenjian"
            icon-only
            plain
            :title="t('view.file.UploadFile')"
        />
    </SdxuUpload>
</template>

<script>
import SdxuButton from '@sdx/ui/components/button';
import Upload from '@sdx/ui/components/upload';
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
        SdxuButton,
        [Upload.name]: Upload
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
        rebuildUploadParams() {
            return Object.assign({}, uploadDefaults, this.uploadParams);
        }
    },
    methods: {
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
        handlerFileChange() {
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
            this.$emit('input',
                typeof this.value === 'string'
                    ? temp.map(item => this.getPathFlag(item)).join(',')
                    : (this.stringModel ? temp.map(item => this.getPathFlag(item)) : temp));
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
