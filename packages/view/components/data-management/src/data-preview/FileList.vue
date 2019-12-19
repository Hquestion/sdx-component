<template>
    <div class="sdxv-data-file-list">
        <sdxu-section-panel>
            <sdxu-article-panel
                :title="t('view.dataManagement.FileList')"
            >
                <template #right>
                    <IconButton
                        border
                        icon="sdx-icon sdx-icon-delete"
                        v-if="value.length"
                        @click="deleteFiles"
                    />
                </template>
                <div
                    style="height: 220px"
                >
                    <SdxuScroll>
                        <el-tree
                            v-bind="__treeOption"
                            ref="fileTree"
                            @check-change="handleCheckChange"
                            @current-change="handleCurrentkChange"
                        />
                    </SdxuScroll>
                </div>
            </sdxu-article-panel>
        </sdxu-section-panel>
    </div>
</template>

<script>
import locale from '@sdx/utils/src/mixins/locale';
import SdxuArticleTitle from '@sdx/ui/components/article-panel';
import SdxuSectionTitle from '@sdx/ui/components/section-panel';
import {Tree} from 'element-ui';
import {getNativeFilesList, deletePath} from '@sdx/utils/src/api/file';
import Scroll from '@sdx/ui/components/scroll';
import IconButton from '@sdx/ui/components/icon-button';
import { getPathIcon } from './utils';
import Upload from '@sdx/ui/components/upload';
import { getUser } from '@sdx/utils/src/helper/shareCenter';
import MessageBox from '@sdx/ui/components/message-box';
export default {
    name: 'SdxvDatasetFileList',
    mixins: [locale],
    components: {
        [SdxuArticleTitle.name]: SdxuArticleTitle,
        [SdxuSectionTitle.name]: SdxuSectionTitle,
        [Tree.name]: Tree,
        [Scroll.name]: Scroll,
        IconButton,
        [Upload.name]: Upload,
    },
    data() {
        return { 
            // 文件列表
            treeData:[],
            // 展开的key
            expandedKey:[],
            previewData: {
                data_rows: Object.freeze([]),
                sky_schema: Object.freeze([]),
                path: '',
                shape: '',
                ownerId: ''
            },
            value: [],
            uploadParams: {
                ownerId: getUser().userId || '',
                path: '',
                overwrite: 1,
            },
        };
    },
    props: {
      
    },
    computed: {
        tree() {
            return this.$refs.fileTree;
        },
        __treeOption() {
            return {
                'render-content': this.renderContent,
                'check-strictly': true,
                'show-checkbox': true,
                'highlight-current': true,
                'node-key': 'path',
                'empty-text': this.t('widget.fileSelect.NoFile'),
                accordion: true,
                lazy: true,
                load: this.fetchFiles,
                'default-expanded-keys': this.expandedKey,
                data: this.treeData || [],
                props: {
                    label: 'name',
                    children: 'children',
                    isLeaf: (data, node) => {
                        return !!data.isFile;
                    }
                },
            };
        },
    },
    methods: {
        // 删除文件
        deleteFiles() {
            let paths = [];
            this.value.forEach(item => {
                paths.push(item.path);
            });
            MessageBox.confirm.error({
                title: this.t('view.dataManagement.Are_you_sure_you_want_to_delete_the_selected_file'),
                content: this.t('view.file.CantRecoveryAfterDel')
            }).then(() => {
                deletePath(paths).then(() => {
                    // 删除之后刷新页面
                    this.tree.root.loaded = false;
                    this.tree.root.loadData();
                });
            });
        },
        renderContent(h, { node, data }) {
            return this.renderFileNode(h, node, data);
        },
        renderFileNode(h, node, data) {
            return (
                <span
                    class={{
                        'is-folder': !data.isFile,
                        'is-file': !!data.isFile,
                        'sdxw-file-select-tree__node': true,
                    }}
                >
                    <svg
                        class="sdxw-file-select-tree__node-icon"
                        aria-hidden="true"
                    >
                        <use xlinkHref={'#' + getPathIcon(data)}/>
                    </svg>
                    {node.label}
                    {!data.isFile ?     
                        <SdxuUpload
                            action="/file-manager/api/v1/files/upload"
                            show-file-list={false}
                            data={this.uploadParams}
                            name="files"
                            propsOnSuccess={this.uploadSuccess.bind(this, node, data)}
                        >
                            <IconButton
                                icon="sdx-icon sdx-icon-upload"
                                onClick={this.uploadFile.bind(this, data)}
                            />
                        </SdxuUpload>
                        :
                        ''
                    }
                </span>
            );
        },
        uploadFile(data) {
            this.uploadParams = Object.assign({}, this.uploadParams, {path: data.path});
        },
        uploadSuccess() {
            this.tree.root.loaded = false;
            this.tree.root.loadData();
        },
        fetchFiles(node,resolve) {
            this.isTreeLoading = true;
            let path;
            if (node.level === 0) {
                path = '/';
            } else {
                path = node.data.path;
            }
            return getNativeFilesList({ path, count: 100 })
                .then(data => {
                    if (resolve) {
                        if (data.children) {
                            for (let i = 0; i < data.children.length; i++) {
                                data.children[i].is_dir = !data.children[i].isFile;
                                data.children[i].fullpath = data.children[i].path;
                                data.children[i].ext = data.children[i].fileExtension;
                            }
                        }
                        data.paths = data.children;
                        resolve(data.paths);
                    }
                    this.isTreeLoading = false;
                })
                .catch(() => {
                    this.isTreeLoading = false;
                });
        },
        // 单文件选中
        handleCurrentkChange(data,checked) {
            if (checked) {
                // console.log(data, '单文件选中');
                this.data_file = data.fullpath;
                this.previewData.ownerId = data.ownerId;
                this.previewData.path = data.path;

                // 调用预览接口
                let params = {
                    dataset: this.id,
                    data_file: data.fullpath
                };
                // 预览文件
                if (data.name.includes('.csv') || data.name.includes('.txt') || data.name.includes('.orc') || data.name.includes('.parquet')) {
                    this.datalistHide = false;
                    this.isPreview = false;
                    this.getPreview(params);
                    this.imageUrl = '';

                    this.previewData.path = data.path;
                } else if (data.is_dir) {
                    this.isPreview = false;
                    // 一直张开
                    this.expandedKey.push(data.path);

                    this.datalistHide = true;
                    this.dataListPath = data.path;

                    this.imageUrl = '';
                } else if (data.mimeType.indexOf('image/') === 0) {
                    this.imageUrl = `${location.origin}/file-manager/api/v1/files/download?ownerId=${data.ownerId}&path=${data.path}&filesystem=cephfs`;
                    this.isPreview = false;
                    this.datalistHide = false;
                } else {
                    this.isPreview = true;
                    this.datalistHide = false;
                    this.imageUrl = '';
                }
            }
        },
        // 处理"文件选择"问题
        handleCheckChange() {
            const checkedNodes = this.tree.getCheckedNodes();
            this.value = checkedNodes;
        },
    },
    watch: {
       
    }
};
</script>

<style lang="scss" scoped>
.sdxv-data-file-list {
    &/deep/ {
            .sdxu-article-panel__content {
                padding: 24px 0px 0px 0px;
            }
            .sdxu-section-panel {
                height: 312px;
            }
            .is-folder {
                width: 100%;
                & > div{
                    float: right;
                    margin-right: 20px;
                }
            }
        }
    }
  
</style>