<template>
    <div class="sdxw-file-select-tree">
        <el-tree
            v-loading="isTreeLoading"
            v-bind="__treeOption"
            ref="fileTree"
            @check-change="handleCheckChange"
            @node-expand="treeShake"
            @node-collapse="treeShake"
            @current-change="handleCurrentChange"
            class="sdxw-file-select-tree__main"
        />
    </div>
</template>

<script>
import clickoutside from 'element-ui/lib/utils/clickoutside';
import Loading from 'element-ui/lib/loading';
import Vue from 'vue';
import {getFilesList, getProjectShare} from '@sdx/utils/src/api/file';
import '@sdx/utils/src/theme-common/iconfont/iconfont.js';
import { getPathIcon } from './utils';
import ElTree from 'element-ui/packages/tree';
import locale from '@sdx/utils/src/mixins/locale';

Vue.use(Loading);

const NODE_KEY = 'path';

export default {
    name: 'SdxwFileSelectTree',
    directives: {
        clickoutside
    },
    mixins: [locale],
    components: {
        ElTree
    },
    data() {
        return {
            isTreeLoading: false, // 文件树是否正在加载
            allow: null, // 通过type获取的文件类型过滤数组
            computedAllow: [], // 计算后的文件类型过滤数组,用于提示
            treeData: []
        };
    },
    props: {
        value: {
            type: Array,
            default: () => []
        },
        userId: {
            type: String,
            default: ''
        },
        rootPath: {
            type: String,
            default: '/'
        },
        accept: {
            type: String,
            default: ''
        },
        limit: {
            type: Number,
            default: 1 // -1表示不限制
        },
        treeOptions: {
            type: Object,
            default: null
        },
        checkable: {
            type: Boolean,
            default: true
        },
        checkType: {
            type: String,
            default: 'all' // 'file', 'folder'
        },
        loadFnWrap: {
            type: Function,
            default: undefined
        },
        projectEnable: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        // 已选节点(兼容单选和多选模式)
        selectedNodes() {
            return this.value.map(item => typeof item === 'object' ? item[NODE_KEY] : item);
        },
        // 合并外部Tree参数,通过 v-bind='__treeOption' 一次性将这些设置都配置到 el-tree上
        __treeOption() {
            return {
                'render-content': this.renderContent,
                'check-strictly': true,
                'show-checkbox': this.checkable,
                'highlight-current': true,
                'node-key': NODE_KEY,
                'empty-text': this.t('widget.fileSelect.NoFile'),
                accordion: true,
                lazy: true,
                load: this.fetchFiles,
                'default-checked-keys': this.selectedNodes,
                data: this.treeData || [],
                props: {
                    label: 'name',
                    children: 'children',
                    isLeaf: (data, node) => {
                        return !!data.isFile;
                    },
                    disabled: data => {
                        if (this.checkType === 'file') {
                            return !data.isFile || !!data.selectDisable;
                        }
                        if (this.checkType === 'folder') {
                            return !!data.isFile || !!data.selectDisable;
                        }
                        if (this.checkType === 'all') {
                            return !!data.selectDisable || false;
                        }
                    }
                },
                ...this.treeOptions,
            };
        },
        // 返回 tree 的 ref 引用,可以通过这引用调用 el-tree 的各种方法
        tree() {
            return this.$refs.fileTree;
        }
    },
    watch: {
        value: {
            immediate: true,
            deep: true,
            handler(val) {
                if (this.$refs.fileTree) {
                    this.$refs.fileTree.setCheckedKeys(val.map(item => typeof item === 'object' ? item[NODE_KEY] : item));
                }
            }
        },
        rootPath() {
            this.$refs.fileTree.root.loaded = false;
            this.$refs.fileTree.root.loadData();
        },
        checkType() {
            this.$refs.fileTree.root.loaded = false;
            this.$refs.fileTree.root.loadData();
        },
        accept() {
            this.$refs.fileTree.root.loaded = false;
            this.$refs.fileTree.root.loadData();
        }
    },
    methods: {
        // 获取文件列表
        fetchFiles(node, resolve) {
            this.isTreeLoading = true;
            let path = this.rootPath;
            // rootPath为根目录时，需要在第一层展示根目录
            if (path === '/' && node.level === 0) {
                this.isTreeLoading = false;
                const rootDirs = [
                    {
                        name: '/',
                        path: '/',
                        isFile: false,
                        ownerId: this.userId
                    }
                ];
                if (this.projectEnable) {
                    rootDirs.push({
                        name: this.t('view.file.CooperationProject'),
                        path: '/fixed-project-root',
                        isFile: false,
                        ownerId: this.userId,
                        isProjectFiles: true,
                        selectDisable: true
                    });
                }
                return resolve(rootDirs);
            }
            if (node.level > 0) {
                path = node.data.path;
            }
            let promise;
            if (this.loadFnWrap) {
                promise = this.loadFnWrap(this.rootPath, node.data.path, this.userId)();
            } else {
                let rootNode = this.getRootNode(node);
                if (rootNode.data.isProjectFiles) {
                    // 第一级获取项目列表，后面与获取文件一致
                    if (node.level === 1) {
                        promise = getProjectShare({
                            start: 1,
                            count: -1,
                            path: ''
                        }).then(res => {
                            return res.children;
                        });
                    } else {
                        const params = {
                            path: node.level === 2 ? '/' : path,
                            ownerId: node.data.ownerId,
                            fileExtension: this.accept,
                            onlyDirectory: this.checkType === 'folder',
                            onlyFile: this.checkType === 'file'
                        };
                        promise = getFilesList(params).then(res => {
                            return res.children;
                        });
                    }
                } else {
                    const params = {
                        path,
                        ownerId: this.userId,
                        fileExtension: this.accept,
                        onlyDirectory: this.checkType === 'folder',
                        onlyFile: this.checkType === 'file'
                    };
                    promise = getFilesList(params).then(res => {
                        return res.children;
                    });
                }
            }
            return promise.then(res => {
                this.isTreeLoading = false;
                resolve(res);
            });
        },
        // 处理"单文件选择"问题
        handleCheckChange(data, checked) {
            if (checked) {
                data.checkTimestamp = +new Date();
                if (this.limit >= 1) {
                    const checkedNodes = this.tree.getCheckedNodes();
                    const index = checkedNodes.findIndex(item => item[NODE_KEY] === data[NODE_KEY]);
                    checkedNodes.sort((a, b) => a.checkTimestamp - b.checkTimestamp);
                    if (this.checkType === 'folder') {
                        if (!data.isFile) {
                            this.tree.setCheckedNodes(checkedNodes.slice(-1 * this.limit));
                        } else {
                            if (index >= 0) {
                                checkedNodes.splice(index, 1);
                            }
                            this.tree.setCheckedNodes(checkedNodes);
                        }
                    } else if (this.checkType === 'file') {
                        if (!data.isFile) {
                            if (index >= 0) {
                                checkedNodes.splice(index, 1);
                            }
                            this.tree.setCheckedNodes(checkedNodes);
                        } else {
                            this.tree.setCheckedNodes(checkedNodes.slice(-1 * this.limit));
                        }
                    } else {
                        this.tree.setCheckedNodes(checkedNodes.slice(-1 * this.limit));
                    }
                }
            }
            this.$emit('input', this.tree.getCheckedNodes());
        },
        // 定制 tree 的渲染函数,为文件夹加上图标
        renderContent(h, { node, data }) {
            return this.renderFileNode(h, node, data);
        },
        treeShake() {
            this.$emit('tree-shake');
        },
        handleCurrentChange(data, node) {
            this.$emit('current-change', data, node);
        },
        // 暴露给外部使用
        setNodeChecked(key, checked, deep) {
            this.tree.setChecked(key, checked, deep);
        },
        // 暴露给外部使用
        getCheckedNodes() {
            return this.tree.getCheckedNodes();
        },
        renderFileNode(h, node, data) {
            const newFolder = () => {
                const save = () => {
                    this.$emit('save', data);
                };
                const cancel = () => {
                    this.$emit('cancel');
                };
                return (
                    <div class="sdxw-file-select-tree__new-folder">
                        <input vModel={data.name} />
                        <i class="sdx-icon sdx-icon-circle-outline accept-icon" onClick={save}/>
                        <i class="sdx-icon sdx-icon-remove-outline cancel-icon" onClick={cancel}/>
                    </div>
                );
            };
            return (
                <span
                    class={{
                        'is-folder': !data.isFile,
                        'is-file': !!data.isFile,
                        'sdxw-file-select-tree__node': true,
                        'sdxw-file-select-tree__new': !data.path
                    }}
                >
                    <svg
                        class="sdxw-file-select-tree__node-icon"
                        aria-hidden="true"
                    >
                        <use xlinkHref={'#' + getPathIcon(data)}/>
                    </svg>
                    {data.path ? node.label : newFolder()}
                </span>
            );
        },
        getRootNode(node) {
            if (node.level === 1 || !node.parent) {
                return node;
            }
            return this.getRootNode(node.parent);
        }
    }
};
</script>
