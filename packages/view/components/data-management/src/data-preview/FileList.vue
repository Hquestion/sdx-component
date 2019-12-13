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
                    />
                </template>
                <div
                    style="height: 220px"
                >
                    <SdxuScroll>
                        <el-tree
                            v-bind="__treeOption"
                            ref="tree"
                            @current-change="handleCheckChange"
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
import {getFilesList} from '@sdx/utils/src/api/file';
import Scroll from '@sdx/ui/components/scroll';
import IconButton from '@sdx/ui/components/icon-button';
export default {
    name: 'SdxvDatasetFileList',
    mixins: [locale],
    components: {
        [SdxuArticleTitle.name]: SdxuArticleTitle,
        [SdxuSectionTitle.name]: SdxuSectionTitle,
        [Tree.name]: Tree,
        [Scroll.name]: Scroll,
        IconButton
    },
    data() {
        return { 
            // 文件列表
            treeData:[],
            expandedKey:[]
        };
    },
    computed: {
        __treeOption() {
            return {
                'render-content': this.renderContent, // 为文件夹加上图标
                'check-strictly': true,
                'show-checkbox': true, // 选中框
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
            let params ={};
            let promise = getFilesList(params).then(res => {
                return res.children;
            });
            return promise.then(res => {
                this.isTreeLoading = false;
                resolve(res);
            });
        },
        handleCheckChange(data, checked) {
            if(checked) {
              
            }
        }
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
        }
    }
  
</style>