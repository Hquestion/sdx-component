<template>
    <div class="sdxw-file-select-tree">
        <el-tree
            v-loading="isTreeLoading"
            v-bind="__treeOption"
            ref="fileTree"
            @check-change="handleCheckChange"
            @node-expand="treeShake"
            @node-collapse="treeShake"
            class="sdxw-file-select-tree__main"
        />
    </div>
</template>

<script>
import clickoutside from 'element-ui/src/utils/clickoutside';
import { Loading } from 'element-ui';
import Vue from 'vue';
import { getFilesList } from '@sdx/utils/src/api/file';
import '@sdx/utils/src/theme-common/iconfont/iconfont.js';
import { renderFileNode } from './utils';

Vue.use(Loading);

const NODE_KEY = 'path';

export default {
    name: 'SdxwFileSelectTree',
    directives: {
        clickoutside
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
            default: ''
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
                'empty-text': '没有文件',
                accordion: true,
                lazy: true,
                load: this.fetchFiles,
                'default-checked-keys': this.selectedNodes,
                data: this.treeData || [],
                props: {
                    label: 'name',
                    children: 'children',
                    isLeaf: data => !!data.isFile,
                    disabled: data => {
                        if (this.checkType === 'file') {
                            return !data.isFile;
                        }
                        if (this.checkType === 'folder') {
                            return !!data.isFile;
                        }
                        if (this.checkType === 'all') {
                            return false;
                        }
                    }
                },
                ...this.treeOptions
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
        }
    },
    methods: {
        // 获取文件列表
        fetchFiles(node, resolve) {
            this.isTreeLoading = true;
            let path = '/';
            if (node.level > 0) {
                path = node.data.path;
            }
            return getFilesList({
                path,
                userId: this.userId
            }).then(res => {
                this.isTreeLoading = false;
                resolve(res.children);
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
            return renderFileNode(h, node, data);
        },
        treeShake() {
            this.$emit('tree-shake');
        },
        // 暴露给外部使用
        setNodeChecked(key, checked, deep) {
            this.tree.setChecked(key, checked, deep);
        },
        // 暴露给外部使用
        getCheckedNodes() {
            return this.tree.getCheckedNodes();
        }
    }
};
</script>
