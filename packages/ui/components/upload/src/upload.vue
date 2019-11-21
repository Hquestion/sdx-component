<script>
import ajax from './ajax';
import UploadDragger from './upload-dragger.vue';

export default {
    inject: ['uploader'],
    components: {
        UploadDragger
    },
    props: {
        type: String,
        action: {
            type: String,
            required: true
        },
        name: {
            type: String,
            default: 'file'
        },
        data: {
            type: Object,
            default: () => {}
        },
        headers: Object,
        withCredentials: Boolean,
        multiple: Boolean,
        accept: String,
        onStart: Function,
        onProgress: Function,
        onSuccess: Function,
        onError: Function,
        beforeUpload: Function,
        drag: Boolean,
        onPreview: {
            type: Function,
            default: () => {
                // pass
            }
        },
        onRemove: {
            type: Function,
            default: () => {
                // pass
            }
        },
        fileList: Array,
        autoUpload: Boolean,
        listType: String,
        httpRequest: {
            type: Function,
            default: ajax
        },
        disabled: Boolean,
        limit: Number,
        onExceed: Function,
        directory: {
            type: Boolean,
            default: false
        },
        onFolderChange: {
            type: Function,
            default: () => {}
        }
    },

    data() {
        return {
            mouseover: false,
            reqs: {}
        };
    },

    methods: {
        isImage(str) {
            return str.indexOf('image') !== -1;
        },
        clearInputValue() {
            this.$refs.input.value = null;
        },
        handleChange(ev) {
            const files = ev.target.files;
            this.$emit('change', files);

            if (!files) return;
            this.uploadFiles(files);
        },
        uploadFiles(files) {
            if (this.limit && this.fileList.length + files.length > this.limit) {
                this.onExceed && this.onExceed(files, this.fileList);
                return;
            }

            let postFiles = Array.prototype.slice.call(files);
            if (!this.multiple) { postFiles = postFiles.slice(0, 1); }

            if (postFiles.length === 0) { return; }

            const promiseList = [];
            postFiles.forEach(rawFile => {
                this.onStart(rawFile);
                if (this.autoUpload) {
                    promiseList.push(this.upload(rawFile));
                }
            });
            Promise.all(promiseList).then(() => {
                if (this.directory) {
                    const uploadRelativePath = this.getFolderPath(postFiles[0]);
                    let folderPath = `${this.data.path || ''}${uploadRelativePath}`;
                    const cephObj = {
                        path: folderPath,
                        name: folderPath.split('/')[folderPath.split('/').length - 1],
                        ownerId: this.data.ownerId,
                        isFile: false,
                        cephName: folderPath
                    };
                    this.onFolderChange(cephObj);
                    this.$emit('folder-change', cephObj);
                }
            });
        },
        upload(rawFile) {
            this.$refs.input.value = null;

            if (!this.beforeUpload) {
                return this.post(rawFile);
            }
            const before = this.beforeUpload(rawFile);
            if (before && before.then) {
                return before.then(processedFile => {
                    const fileType = Object.prototype.toString.call(processedFile);

                    if (fileType === '[object File]' || fileType === '[object Blob]') {
                        if (fileType === '[object Blob]') {
                            processedFile = new File([processedFile], rawFile.name, {
                                type: rawFile.type
                            });
                        }
                        for (const p in rawFile) {
                            if (rawFile.hasOwnProperty(p)) {
                                processedFile[p] = rawFile[p];
                            }
                        }
                        return this.post(processedFile);
                    } else {
                        return this.post(rawFile);
                    }
                }, () => {
                    return this.onRemove(null, rawFile);
                });
            } else if (before !== false) {
                return this.post(rawFile);
            } else {
                return this.onRemove(null, rawFile);
            }
        },
        abort(file) {
            const { reqs } = this;
            if (file) {
                let uid = file;
                if (file.uid) uid = file.uid;
                if (reqs[uid]) {
                    reqs[uid].abort();
                }
            } else {
                Object.keys(reqs).forEach(uid => {
                    if (reqs[uid]) reqs[uid].abort();
                    delete reqs[uid];
                });
            }
        },
        post(rawFile) {
            let _resolve = () => {}, _reject = () => {};
            const { uid } = rawFile;
            let uploadRelativePath = this.getFolderPath(rawFile),
                action = this.action;
            const options = {
                headers: this.headers,
                withCredentials: this.withCredentials,
                file: rawFile,
                data: {...this.data, path: `${this.data && this.data.path || ''}${uploadRelativePath}`},
                filename: this.name,
                action: action,
                onProgress: e => {
                    this.onProgress(e, rawFile);
                },
                onSuccess: res => {
                    this.onSuccess(res, rawFile);
                    delete this.reqs[uid];
                    _resolve(rawFile);
                },
                onError: err => {
                    this.onError(err, rawFile);
                    delete this.reqs[uid];
                    _reject(rawFile);
                }
            };
            const req = this.httpRequest(options);
            this.reqs[uid] = req;
            if (req && req.then) {
                return req.then(options.onSuccess, options.onError);
            } else {
                return new Promise((resolve, reject) => {
                    _resolve = resolve;
                    _reject = reject;
                });
            }
        },
        handleClick() {
            if (!this.disabled) {
                this.$refs.input.value = null;
                this.$refs.input.click();
            }
        },
        handleKeydown(e) {
            if (e.target !== e.currentTarget) return;
            if (e.keyCode === 13 || e.keyCode === 32) {
                this.handleClick();
            }
        },
        getFolderPath(rawFile) {
            const { webkitRelativePath } = rawFile;
            let uploadRelativePath = '';
            if (webkitRelativePath) {
                const relativePathList = webkitRelativePath.split('/');
                if (relativePathList.length > 1) {
                    uploadRelativePath = relativePathList.slice(0, -1).join('/');
                    if (this.data.path[this.data.path.length - 1] !== '/') {
                        uploadRelativePath = `/${uploadRelativePath}`;
                    }
                }
            }
            return uploadRelativePath;
        }
    },

    render(h) {
        let {
            handleClick,
            drag,
            name,
            handleChange,
            multiple,
            accept,
            listType,
            uploadFiles,
            disabled,
            handleKeydown,
            directory
        } = this;
        const data = {
            class: {
                'el-upload': true
            },
            on: {
                click: handleClick,
                keydown: handleKeydown
            }
        };
        data.class[`el-upload--${listType}`] = true;
        return (
            <div {...data} tabindex="0" >
                {
                    drag
                        ? <upload-dragger disabled={disabled} on-file={uploadFiles}>{this.$slots.default}</upload-dragger>
                        : this.$slots.default
                }
                <input class="el-upload__input" type="file" ref="input" name={name} on-change={handleChange} multiple={multiple} accept={accept} webkitdirectory={directory}></input>
            </div>
        );
    }
};
</script>
