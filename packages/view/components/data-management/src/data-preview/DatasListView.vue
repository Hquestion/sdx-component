<template>
    <div
        class="data-list-view"
        v-loading="listLoading"
    >
        <div
            v-for="(v, k) in list"
            :key="k"
        >
            <div
                @click="viewData(v.isFile, v.path, v.fileExtension,v.mimeType, v.ownerId)"
                :class="[viewDisabled(v) ?'disabledClick':'', 'card']"
            >
                <div class="icon">
                    <svg
                        class="alSvgIcon"
                        aria-hidden="true"
                        v-if="v.mimeType && v.mimeType.indexOf('image/')"
                    >
                        <use :xlink:href="getExt(v.name,v.isFile)" />
                    </svg>
                    <data-image
                        v-else
                        :image-url="getUrl(v.ownerId, v.path)"
                        :is-icon="true"
                        image-width="72px"
                    />
                </div>
                <div :class="[v.isFile ? 'content' : 'onlyName']">
                    <TextToolTip
                        :title="v.name"
                    >
                        <div class="name">
                            {{ v.name }}
                        </div>
                    </TextToolTip>
                    <div
                        class="size"
                        v-if="v.isFile"
                    >
                        {{ t('view.dataManagement.FileSize') }} {{ v.size | bytesToSize }}
                    </div>
                </div>
            </div>
        </div>
        <div
            class="holder"
            v-for="item in 10"
            :key="`holder${item}`"
        >
            &nbsp;
        </div>
        <div class="pagination">
            <sdxu-pagination
                v-if="total"
                :current-page.sync="current"
                :page-size="pageSize"
                :total="total"
                @current-change="currentChange"
            />
        </div>
    </div>
</template>
<script>
import { getNativeFilesList } from '@sdx/utils/lib/api/file';
import DataImage from './DataImage';
import Pagination from '@sdx/ui/lib/pagination';
import { paginate } from '@sdx/utils/lib/helper/tool';
import TextToolTip from '@sdx/ui/lib/text-tooltip';
import locale from '@sdx/utils/src/mixins/locale';
export default {
    name: 'DatasListView',
    mixins: [locale],
    data() {
        return {
            list: [],
            fullpath: '',
            total: 0,
            pageSize: 100,
            current: 1,
            savePath: '',
            saveOwnerId: '',
            listLoading: false
        };
    },
    components: {
        DataImage,
        [Pagination.name]: Pagination,
        TextToolTip
    },
    props: {
        dataListPath: {
            type: String,
            default: ''
        },
        datasource: {
            type: String,
            default: ''
        },
        ownerId: {
            type: String,
            default: ''
        }

    },
    filters: {
        bytesToSize(bytes) {
            if (typeof bytes === 'undefined') return '';
            // 字节单位转换
            if (bytes === 0) return '0 B';

            let k = 1024;
            let sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
            let i = Math.floor(Math.log(bytes) / Math.log(k));

            return Math.floor(bytes / Math.pow(k, i)) + ' ' + sizes[i];
        }
    },

    methods: {
        // icon
        getExt(name, isFile) {
            let [arr, ext] = [[], ''];
            if (name) {
                arr = name.split('.');
                ext = arr[arr.length - 1];
            }
            if (ext === 'csv') {
                ext = '#sdx-CSV';
            } else if (ext === 'txt') {
                ext = '#sdx-TXT';
            } else if (ext === 'orc') {
                ext = '#sdx-ORC';
            } else if (ext === 'parquet') {
                ext = '#sdx-Parquet-x';
            } else if (!isFile) {
                ext = '#sdx-wenjianjia';
            } else if (ext !== 'csv' && ext !== 'txt' && ext !== 'orc' && ext !== 'parquet' && isFile) {
                ext = '#iconwuyulan';
            }
            return ext;
        },
        // 文件列表
        getFlieList(path, ownerId, currentChange) {
            this.listLoading = true;
            if (!currentChange) {
                this.current = 1;
            }
            this.saveOwnerId = ownerId;
            this.savePath = path;
            let params = Object.assign({}, {
                path,
                ownerId,
                ...paginate(this.current, this.pageSize)
            });
            getNativeFilesList(params)
                .then(data => {
                    data.paths = data.children;
                    this.list = data.paths;
                    this.total = data.childrenCount;
                    this.listLoading = false;
                }).catch(() => {
                    this.listLoading = false;
                });
        },
        currentChange(val) {
            this.current = val;
            this.getFlieList(this.savePath, this.saveOwnerId, true);
        },
        // 查看数据
        viewData(isFile, path, type,mimeType, ownerId) {
            console.log(type, 'type');
            //  文件夹
            if (!isFile) {
                this.getFlieList(path, ownerId);
                this.$emit('expandNode', path);
            } else if (type === '.csv' || type === '.txt' || type === '.orc' || type === '.parquet') {
                this.$emit('viewData', path);
            } else if (mimeType.indexOf('image/') === 0) {
                this.$emit('viewData', path, 'image', ownerId);
            }
        },
        viewDisabled(v) {
            let res = true;
            if (v.name.includes('.csv') || v.name.includes('.txt') || v.name.includes('.orc') || v.name.includes('.parquet') || v.is_dir) {
                res = false;
            }
            return res;
        },
        getUrl(ownerId, path) {
            return `${location.origin}/file-manager/api/v1/files/download?ownerId=${ownerId}&path=${path}&filesystem=cephfs`;
        }
    },
    created() {
        // this.getFlieList(this.dataListPath, this.ownerId);
    },
    watch: {
        dataListPath() {
            this.getFlieList(this.dataListPath, this.ownerId);
        }

    }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>

.data-list-view {
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    font-size: 0;
    position: relative;

    .card {
        flex-grow: 0;
        box-sizing: border-box;
        display: block;
        height: 120px;
        width: 352px;
        border: 1px solid #D8DEEA;
        margin-top: 20px;
        padding-top: 6px;
        padding-bottom: 37px;
        position: relative;
        overflow: hidden;
        display: flex;
        cursor: pointer;
        border-radius: 4px;
        padding: 24px;
        box-sizing: border-box;
        .icon {
            width: 72px;
            text-align: center;
            font-size: 72px;
            margin-right: 24px;
            .alSvgIcon {
                width: 1em;
                height: 1em;
                fill: currentColor;
                overflow: hidden;
            }
        }
        .content {
            font-size: 14px;
            & > span {
                height: 30px;
                line-height: 30px;
                padding-top: 2px;
                display: inline-block;
            }
            .name {
                color: #172B4D;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                width: 188px;
            }
            .size {
                color: #6E7C94;
                height: 30px;
                line-height: 30px;
            }
        }
        .onlyName {
            font-size: 14px;
            line-height: 72px;
            color: #172B4D;
        }
    }
    .holder {
        flex-grow: 0;
        width: 352px;
        line-height: 0;
        display: inline-block;
    }
    .pagination {
        width: 100%;
        margin-top: 20px;
        .sdxu-pagination.el-pagination {
            float: right;
        }
    }
}

</style>
