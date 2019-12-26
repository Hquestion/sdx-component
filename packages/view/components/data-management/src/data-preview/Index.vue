<template>
    <div class="sdxv-data-preview">
        <SdxuButton
            type="primary"
            @click="toJupyter"
        >
            {{ t('view.dataManagement.Use_in_Jupyter') }}
        </SdxuButton>
        <el-row
            :gutter="24"
            class="file"
        >
            <el-col :span="12">
                <BasicInfo
                    :meta="cardInfo"
                />
            </el-col>
            <el-col :span="12">
                <div class="file-list">
                    <sdxu-section-panel>
                        <sdxu-article-panel
                            :title="t('view.dataManagement.FileList')"
                        >
                            <template #right>
                                <IconButton
                                    border
                                    icon="sdx-icon sdx-icon-delete"
                                    v-if="checkedValue.length"
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
                                        v-loading="isTreeLoading"
                                    />
                                </SdxuScroll>
                            </div>
                        </sdxu-article-panel>
                    </sdxu-section-panel>
                </div>
            </el-col>
        </el-row>
        <DetailedDesc
            :detail-info="advancedConfig"
            class="detail-desc"
        />
        <sdxu-section-panel
            :class="['file-preview',fullScreen ? 'full-screen' : '']"
            v-loading="previewLoading"
        >
            <sdxu-article-panel
                :title="t('view.dataManagement.FilePreview')"
            >
                <template #right>
                    <IconButton
                        border
                        icon="sdx-icon sdx-shaixuan-X"
                    />
                    <IconButton
                        border
                        icon="sdx-icon sdx-xiazaiX"
                        @click="downLoadFile(dataListPath)" 
                    />
                    <IconButton
                        border
                        :icon="fullScreen ? 'sdx-icon sdx-zuixiaohua1' : 'sdx-icon sdx-zuidahua1'"
                        @click="fullScreen = !fullScreen"
                    />
                </template>
                <DataListView
                    v-if="datalistHide"
                    :data-list-path="dataListPath"
                    @viewData="handleViewData"
                    @expandNode="expandNode"
                    ref="dataListView"
                />
                <DatasetPreview />
                <data-image
                    :image-url="imageUrl"
                    v-if="imageUrl"
                />
                <SdxuEmpty
                    v-if="emptyHide"
                    :empty-type="emptyType"
                    :empty-content="emptyContent"
                />
            </sdxu-article-panel>
        </sdxu-section-panel>
    </div>
</template>

<script>
import locale from '@sdx/utils/src/mixins/locale';
import BasicInfo from './BasicInfo';
import { Row, Col,Tree } from 'element-ui';
import DetailedDesc from './DetailedDesc';
import SdxuArticleTitle from '@sdx/ui/components/article-panel';
import SdxuSectionTitle from '@sdx/ui/components/section-panel';
import {getNativeFilesList, deletePath, download, pack} from '@sdx/utils/src/api/file';
import Scroll from '@sdx/ui/components/scroll';
import IconButton from '@sdx/ui/components/icon-button';
import { getPathIcon } from './utils';
import Upload from '@sdx/ui/components/upload';
import { getUser } from '@sdx/utils/src/helper/shareCenter';
import MessageBox from '@sdx/ui/components/message-box';
import DataListView from './DatasListView';
import DataImage from './DataImage';
import Empty from '@sdx/ui/components/empty';
import SdxuButton from '@sdx/ui/components/button';
import {getDatasetDetail, datasetPreview} from '@sdx/utils/src/api/dataset';
import DatasetPreview from './preview/DataSetPreview';
export default {
    name:'DataPreview',
    mixins: [locale],
    components: {
        BasicInfo,
        [Row.name]: Row,
        [Col.name]: Col,
        DetailedDesc,
        [SdxuArticleTitle.name]: SdxuArticleTitle,
        [SdxuSectionTitle.name]: SdxuSectionTitle,
        [Tree.name]: Tree,
        [Scroll.name]: Scroll,
        IconButton,
        [Upload.name]: Upload,
        DataListView,
        DataImage,
        [Empty.name]: Empty,
        SdxuButton,
        DatasetPreview
    },
    data() {
        return {
            cardInfo: {
                coverImg:'',
                name: '',
                createdAt: '',
                updatedAt: '',
                description: '',
                labels: [],
                creatorId:'',
                // 文件列表路经
                datasetPath: '',
            },
            // 详细说明
            advancedConfig: '',
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
            checkedValue: [],
            uploadParams: {
                ownerId: getUser().userId || '',
                path: '',
                overwrite: 1,
            },
            //数据预览组件展示(小卡片)
            datalistHide: false,
            // 预览path
            dataListPath: '',
            // 图片
            imageUrl: '',
            // empty组件展示
            emptyHide: false,
            emptyType: '',
            emptyContent: '',
            // 是否全屏
            fullScreen: false,
            isTreeLoading: false,
            previewLoading: false
        };
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
    created() {
        this.getDatasetInfo();
    },
    methods: {
        // 数据集文件预览
        getDatasetPreview(params) {
            this.previewLoading = true;
            console.log(params, 'cs');
            datasetPreview(params).then(res => {
                this.previewLoading = false;
                console.log(res, 'view');
            });
        },
        // 获取数据集信息
        getDatasetInfo() {
            let uuid = this.$route.params.uuid;
            getDatasetDetail(uuid).then(res=> {
                this.cardInfo = res;
                this.advancedConfig = res.advancedConfig;
                this.getFileList(res.datasetPath);
            });
        },
        // 文件列表
        getFileList(path){
            this.isTreeLoading = true;
            this.datalistHide = false;
            this.emptyHide = false;
            this.previewLoading = true;
            getNativeFilesList({path}).then(res => {
                this.treeData = res.children;
                this.isTreeLoading = false;
                this.previewLoading = false;
                // 判断是否有文件
                if(res.children.length) {
                    this.$nextTick(() => {
                        this.tree.setCurrentKey(res.children[0].path);
                    });
                    if(!res.children[0].isFile) {
                        this.expandedKey = [res.children[0].path];
                        this.dataListPath = res.children[0].path;
                        this.datalistHide = true;
                        setTimeout(() => {
                            this.$refs.dataListView.getFlieList(this.dataListPath);
                        }, 1000);
                    } else {
                        if(res.children[0].mimeType.indexOf('image/') === 0) {
                            // 预览图片
                            this.imageUrl = `${location.origin}/file-manager/api/v1/files/download?ownerId=${res.children[0].ownerId}&path=${res.children[0].path}&filesystem=cephfs`;
                        } else {
                            let params = {
                                datasetId: this.$route.params.uuid,
                                fileUri:  res.children[0].path
                            };
                            this.getDatasetPreview(params);
                        }
                    }
                } else {
                    this.emptyHide = true;
                    this.emptyType = 'noData';
                }
            }).catch(()=> {
                this.treeData = [];
                this.isTreeLoading = false;
                this.emptyHide = false;
                this.previewLoading = false;
            });
        },
        // 跳转到jupyter
        toJupyter(){
            this.$router.push(
                {
                    name: 'CreateTaskNext',
                    params: {
                        type: 'JUPYTER'
                    },
                    query: {
                        from: 'dataManagement'
                    }
                }
            );
        },
        // 下载文件
        downLoadFile(path){
            let defer=null;
            defer = pack([path]);
            defer.then(res => {
                download(res);
            });
        },
        // 删除文件
        deleteFiles() {
            let paths = [];
            this.checkedValue.forEach(item => {
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
                    // 触发子组件更新
                    setTimeout(() => {
                        this.tree.setCurrentKey(this.dataListPath);
                        this.$refs.dataListView.getFlieList(this.dataListPath);
                    }, 1000);
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
                        'file-select-tree__node': true,
                    }}
                >
                    <svg
                        class="file-select-tree__node-icon"
                        aria-hidden="true"
                    >
                        <use xlinkHref={'#' + getPathIcon(data)}/>
                    </svg>
                    {node.label}
                    {!data.isFile ?  
                        <div  onClick={e => e.stopPropagation()}> 
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
                        </div>
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
            setTimeout(() => {
                this.tree.setCurrentKey(this.dataListPath);
                this.$refs.dataListView.getFlieList(this.dataListPath);
            }, 1000);
        },
        fetchFiles(node,resolve) {
            this.isTreeLoading = true;
            this.previewLoading = true;
            let path;
            if (node.level === 0) {
                if (!node.isInit) {
                    return;
                }
            } else {
                path = node.data.path;
            }
            return getNativeFilesList({ path })
                .then(data => {
                    if (resolve) {
                        data.paths = data.children;
                        resolve(data.paths);
                    }
                    this.isTreeLoading = false;
                    this.previewLoading = false;
                })
                .catch(() => {
                    this.isTreeLoading = false;
                    this.previewLoading = false;
                });
        },
        // 单文件选中
        handleCurrentkChange(data,checked) {
            if (checked) {
                console.log(data, '单文件选中');
                // this.dataListPath = data.path;
                // this.previewData.ownerId = data.ownerId;
                // this.previewData.path = data.path;
                this.imageUrl = '';
                this.datalistHide = false;
                this.emptyHide = false;
                if(!data.isFile) {
                    this.expandedKey = [data.path];
                    this.dataListPath = data.path;
                    this.datalistHide = true;
                    setTimeout(() => {
                        this.$refs.dataListView.getFlieList(data.path);
                    }, 1000);
                } else {
                    if(data.mimeType.indexOf('image/') === 0) {
                        // 预览图片
                        this.imageUrl = `${location.origin}/file-manager/api/v1/files/download?ownerId=${data.ownerId}&path=${data.path}&filesystem=cephfs`;
                    } else {
                        let params = {
                            datasetId: this.$route.params.uuid,
                            fileUri:  data.path
                        };
                        this.getDatasetPreview(params);
                    }
                }
            }
        },
        // 处理"文件选择"问题
        handleCheckChange() {
            const checkedNodes = this.tree.getCheckedNodes();
            this.checkedValue = checkedNodes;
        },
        expandNode(path) {
            let [arr, key] = [[], ''];
            arr = path.split('/');
            arr = arr.slice(0, arr.length);
            key = arr.join('/');
            if (this.firstExpand === true) {
                this.expandedKey.push(this.nodeId);
                this.firstExpand === false;
            }
            this.expandedKey.push(key);
            // 通过 key 设置某个节点的当前选中状态
            this.tree.setCurrentKey(path);
            this.dataListPath = path;
        },
        handleViewData(path, type, ownerId) {
            console.log(path, 'path');
            this.previewData.path = path;
            this.previewData.ownerId = ownerId;
            this.tree.setCurrentKey(path);
            this.datalistHide = false;
            if (type === 'image') {
                // 预览图片
                this.imageUrl = `${location.origin}/file-manager/api/v1/files/download?ownerId=${ownerId}&path=${path}&filesystem=cephfs`;
            } else {
                // 预览文件
                let params = {
                    datasetId: this.$route.params.uuid,
                    fileUri: path
                };
                this.getDatasetPreview(params);
            }
        },
    },
    watch: {
     
    }
};
</script>

<style lang="scss" scoped>
.sdxv-data-preview {
    position: relative;
    & > .sdxu-button {
        position: absolute;
        top: -72px;
        right: 0;
    }
    .detail-desc {
        margin-top: 24px;
    }
    .file-list {
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
                .file-select-tree__node {
                    font-size: 14px;
                }
                .file-select-tree__node-icon {
                    width: 14px;
                    height: 14px;
                    margin-right: 8px;
                }
            }
        }
    .file-preview {
        min-height: 200px;
        margin-top: 24px;
        &/deep/ {
            .sdxu-article-panel__content {
                padding:  0px;
            }
        }
    }
    .full-screen {
        position: fixed;
        left: 40px;
        right: 40px;
        top: 20px;
        bottom: 20px;
        z-index: 99;
        overflow: auto;
    }
}
</style>