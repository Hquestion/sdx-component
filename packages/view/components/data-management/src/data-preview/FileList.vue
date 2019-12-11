<template>
    <sdxu-section-panel>
        <sdxu-article-panel
            title="文件列表"
        >
            <el-tree
                v-bind="__treeOption"
                ref="tree"
                @current-change="handleCheckChange"
            />
        </sdxu-article-panel>
    </sdxu-section-panel>
</template>

<script>
import locale from '@sdx/utils/src/mixins/locale';
import SdxuArticleTitle from '@sdx/ui/components/article-panel';
import SdxuSectionTitle from '@sdx/ui/components/section-panel';
import {Tree} from 'element-ui';
export default {
    name: 'SdxvDatasetFileList',
    mixins: [locale],
    components: {
        [SdxuArticleTitle.name]: SdxuArticleTitle,
        [SdxuSectionTitle.name]: SdxuSectionTitle,
        [Tree.name]: Tree,
    },
    data() {
        return { 
            // 文件列表
            treeData: [],
            expandedKey:[]
        };
    },
    computed: {
        __treeOption() {
            return {
                'render-content': this.renderContent, // 为文件夹加上图标
                'check-strictly': true,
                'show-checkbox': false, // 选中框
                'highlight-current': true,
                'empty-text': '没有文件',
                'node-key': 'path',
                'check-on-click-node': true,
                'default-expanded-keys': this.expandedKey,
                data: this.treeData || [],
                lazy: true,
                load: this.fetchFiles,
                props: {
                    label: 'name',
                    children: 'children',
                    isLeaf: data => !data.is_dir
                }
            };
        }
    },
    methods: {
        // 定制 tree 的渲染函数,为文件夹加上图标
        renderContent(h, { node, data }) {
            return (
                <span
                    class={{
                        is_folder: data.is_dir,
                        not_folder: !data.is_dir,
                        'caret-right': true
                    }}
                >
                    {data.name}
                </span>
            );
        },
        fetchFiles(node,resolve) {

        }
    }
};
</script>