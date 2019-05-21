<template>
    <div class="sdxv-modified-list">
        <div class="sdxv-modified-list__table">
            <sdxu-table :data="dataList">
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
                <el-table-column label="变更类型">
                    <template #default="{ row }">
                        <span>{{ row.modify.desc }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    v-if="operatable"
                    label="操作"
                >
                    <template #default="{ row }">
                        <sdxu-icon-button
                            icon="sdx-icon sdx-quxiao"
                            @click="handleRevert(row)"
                            title="撤销"
                        />
                    </template>
                </el-table-column>
            </sdxu-table>
        </div>
        <div class="sdxv-modified-list__pagination">
            <sdxu-pagination
                :total="modifyPackageList.length"
                :current-page.sync="page"
                :page-size="pageSize"
                @current-change="handleChangePage"
            />
        </div>
    </div>
</template>

<script>
import SdxuIconButton from '@sdx/ui/components/icon-button';
import SdxuTable from '@sdx/ui/components/table';
import SdxuPagination from '@sdx/ui/components/pagination';
import { TableColumn } from 'element-ui';
import { VERSION_TYPE, SOURCE_URL_TYPE } from '@sdx/utils/src/const/image';

export default {
    name: 'SdxvModifiedPackageList',
    components: {
        SdxuIconButton,
        SdxuTable,
        SdxuPagination,
        [TableColumn.name]: TableColumn
    },
    props: {
        installPackages: {
            type: Array,
            default: () => []
        },
        uninstallPackages: {
            type: Array,
            default: () => []
        },
        upgradePackages: {
            type: Array,
            default: () => []
        },
        operatable: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            page: 1,
            pageSize: 5,
            sourceList: [],
            packageName: '',
            sourceType: ''
        };
    },
    computed: {
        modifyPackageList() {
            const iList = this.installPackages.map((item, index) => {
                let ret = { ...item };
                ret.version =
                    item.versionType === VERSION_TYPE.LATEST
                        ? 'latest'
                        : item.version;
                ret.sourceUrl =
                    item.sourceUrlType === SOURCE_URL_TYPE.DEFAULT
                        ? '默认'
                        : item.sourceUrl;
                ret.modify = {
                    type: 'installPackages',
                    index,
                    desc: '新增'
                };
                return ret;
            });
            const rList = this.uninstallPackages.map((item, index) => {
                let ret = { ...item };
                ret.modify = {
                    type: 'uninstallPackages',
                    index,
                    desc: '删除'
                };
                return ret;
            });
            const upList = this.upgradePackages.map((item, index) => {
                let ret = { ...item };
                ret.version =
                    item.versionType === VERSION_TYPE.LATEST
                        ? 'latest'
                        : item.version;
                ret.modify = {
                    type: 'upgradePackages',
                    index,
                    desc: '升级'
                };
                return ret;
            });
            return [...iList, ...rList, ...upList].sort(
                (a, b) => b.createdAt - a.createdAt
            );
        },
        dataList() {
            return this.modifyPackageList.filter(
                (item, i) =>
                    i >= (this.page - 1) * this.pageSize &&
					i < this.page * this.pageSize
            );
        }
    },
    methods: {
        handleChangePage(page) {
            this.page = page;
        },
        handleRevert(row) {
            this.$emit('cancelModifyPackage', row);
        }
    }
};
</script>

<style>

</style>
