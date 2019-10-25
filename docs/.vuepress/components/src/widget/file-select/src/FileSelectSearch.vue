<template>
    <div class="sdxw-file-select-search">
        <div class="sdxw-file-select-search__list">
            <div
                class="sdxw-file-select-search__item"
                v-for="item in renderData"
                :key="item.path"
            >
                <el-checkbox
                    class="sdxw-file-select-search__item-checkbox"
                    :value="isChecked(item)"
                    @change="(checked) => handleCheckChange(item, checked)"
                >
                </el-checkbox>
                <svg
                    class="sdxw-file-select-search__item-icon"
                    aria-hidden="true"
                >
                    <use :xlink:href="'#' + getPathIcon(item)" />
                </svg>
                <span class="sdxw-file-select-search__item-name">{{ item.name }}</span>
            </div>
        </div>
    </div>
</template>

<script>
import { searchFiles } from '@sdx/utils/src/api/file';
import { getPathIcon } from './utils';
import{ Checkbox } from 'element-ui';

export default {
    name: 'SdxwFileSelectSearch',
    data() {
        return {
            renderData: [],
            pageIndex: 1,
            pageSize: 50,
            total: 0
        };
    },
    components: {
        [Checkbox.name]: Checkbox
    },
    props: {
        value: {
            type: Array,
            default: () => []
        },
        querystring: {
            type: String,
            default: ''
        },
        limit: {
            type: Number,
            default: 1
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
        checkType: {
            type: String,
            default: 'all' // 'file', 'folder'
        }
    },
    computed: {
        checkedNodes: {
            get() {
                return this.value;
            },
            set(val) {
                this.$emit('input', val);
            }
        }
    },
    methods: {
        refresh(reInit) {
            // todo 性能优化
            if (reInit) {
                this.pageIndex = 1;
            }
            searchFiles({key: this.key}).then(res => {
                this.renderData = this.renderData.concat(res);
            });
        },
        isChecked(pathInfo) {
            return this.checkedNodes.some(item => typeof item === 'string' ? item === pathInfo.path : item.path === pathInfo.path);
        },
        getPathIcon,
        handleCheckChange(item, checked) {
            if (checked) {
                if (this.limit >= 1) {
                    this.checkedNodes.push(item);
                    this.checkedNodes = this.checkedNodes.slice(-1 * this.limit);
                } else {
                    this.checkedNodes.push(item);
                }
            } else {
                let index = this.checkedNodes.findIndex(node => typeof node === 'string' ? node === item.path : node.path === item.path);
                if (index > -1) {
                    this.checkedNodes.splice(index, 1);
                }
            }
        }
    },
    mounted() {
        this.refresh();
    }
};
</script>

<style lang="scss" scoped>

</style>
