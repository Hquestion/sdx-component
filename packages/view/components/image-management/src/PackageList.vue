<template>
    <div class="sdxv-package-list">
        <div class="sdxv-package-list__bar">
            <sdxu-input
                class="sdxv-package-list__bar--search"
                type="search"
                @input="emitResultCount=false"
                placeholder="请输入包名称搜索"
                v-model="packageName"
                size="small"
            />
            <div class="sdxv-package-list__bar--source">
                <span>源类型: </span>
                <el-select
                    v-model="sourceType" 
                    size="medium"
                >
                    <el-option
                        v-for="(v, k) in SOURCE_TYPE"
                        :key="k"
                        :label="k"
                        :value="v"
                    />
                </el-select>
            </div>
            <sdxu-button
                class="sdxv-package-list__bar--button"
                @click="handleSearch"
                type="primary"
                size="small"
            >
                搜索
            </sdxu-button>
        </div>
        <div class="sdxv-package-list__table">
            <sdxu-table :data="packageList">
                <el-table-column
                    prop="name"
                    label="包名称"
                />
                <el-table-column
                    prop="sourceType"
                    label="源类型"
                />
                <el-table-column
                    prop="version"
                    label="版本"
                />
                <el-table-column
                    v-if="operatable"
                    label="操作"
                >
                    <template #default="{ row }">
                        <sdxu-icon-button
                            icon="sdx-icon sdx-shengji"
                            @click="handleUpgrade(row)"
                            title="升级"
                        />
                        <sdxu-icon-button
                            icon="sdx-icon sdx-icon-delete"
                            @click="handleDelete(row)"
                            title="删除"
                        />
                    </template>
                </el-table-column>
            </sdxu-table>
        </div>
        <div class="sdxv-package-list__pagination">
            <sdxu-pagination
                :total="total"
                :current-page.sync="page"
                :page-size="pageSize"
                @current-change="handleChangePage"
            />
        </div>
        <package-upgrade-dialog
            :visible.sync="upgradeDialog"
            :current-package="currentPackage"
            @confirm="handleCommitUpdate"
        />
    </div>
</template>

<script>
import SdxuInput from '@sdx/ui/components/input';
import SdxuButton from '@sdx/ui/components/button';
import SdxuIconButton from '@sdx/ui/components/icon-button';
import SdxuTable from '@sdx/ui/components/table';
import SdxuPagination from '@sdx/ui/components/pagination';
import { Select, Option, TableColumn } from 'element-ui';
import PackageUpgradeDialog from './PackageUpgradeDialog';

import { SOURCE_TYPE, VERSION_TYPE, SOURCE_URL_TYPE } from '@sdx/utils/src/const/image';
import { getPackagesByUuid } from '@sdx/utils/src/api/image';

export default {
    name: 'SdxvPackageList',
    components: {
        SdxuInput,
        SdxuButton,
        SdxuIconButton,
        SdxuTable,
        SdxuPagination,
        [Select.name]: Select,
        [Option.name]: Option,
        [TableColumn.name]: TableColumn,
        PackageUpgradeDialog
    },
    props: {
        imageId: {
            type: String,
            required: true
        },
        search: {
            type: String,
            default: ''
        },
        operatable: {
            type: Boolean,
            default: true
        }
    },
    data() {
        this.SOURCE_TYPE = Object.assign({'全部': ''}, SOURCE_TYPE);
        this.VERSION_TYPE = VERSION_TYPE;
        this.SOURCE_URL_TYPE = SOURCE_URL_TYPE;
        return {
            total: 0,
            page: 1,
            pageSize: 5,
            packageList: [],
            packageName: '',
            sourceType: '',
            upgradeDialog: false,
            emitResultCount: false,
            currentPackage: null
        };
    },
    computed: {
        querys() {
            const params = {
                name: this.packageName.trim(),
                sourceType: this.sourceType,
                start: (this.page - 1) * this.pageSize + 1,
                count: this.pageSize,
                orderBy: 'name',
                order: 'asc'
            };
            Object.keys(params).forEach(item => {
                if (params[item] === '') {
                    delete params[item];
                }
            });
            return params;
        }
    },
    methods: {
        fetchData() {
            getPackagesByUuid(this.imageId, this.querys).then(data => {
                this.packageList = data.data;
                this.total = data.total;
                if (this.emitResultCount) {
                    this.$emit('queryCount', data.total);
                }
            }).catch(() => {
                this.packageList = [];
                this.total = 0;
            });
        },
        handleChangePage(page) {
            this.page = page;
            this.fetchData();
        },
        handleUpgrade(row) {
            this.upgradeDialog = true;
            this.currentPackage = {
                ...row,
                versionType: VERSION_TYPE.LATEST,
                sourceUrlType: SOURCE_URL_TYPE.DEFAULT
            };
        },
        handleCommitUpdate(updatedPackage) {
            this.$emit('upgradePackage', updatedPackage);
        },
        handleDelete(row) {
            this.$emit('deletePackage', row);
        },
        handleSearch() {
            this.page = 1;
            this.fetchData();
        },
        handleReset() {
            this.emitResultCount = false;
            this.packageName = '';
            this.sourceType = '';
            this.page = 1;
            this.fetchData();
        }
    },
    watch: {
        search(nval) {
            this.packageName = nval;
            this.sourceType = '';
            this.page = 1;
            this.emitResultCount = true;
            this.fetchData();
        },
        imageId() {
            this.handleReset();
        }
    },
    created() {
        this.fetchData();
    }
};
</script>

<style>

</style>
