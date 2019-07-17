<template>
    <div class="sdxv-modified-list">
        <div class="sdxv-modified-list__table">
            <sdxu-table
                :data="dataList"
                :empty-text="t('sdxCommon.NoData')"
            >
                <el-table-column
                    prop="name"
                    :label="t('view.image.PackageName')"
                />
                <el-table-column
                    prop="sourceType"
                    :label="t('view.image.SourceType')"
                />
                <el-table-column
                    prop="version"
                    :label="t('view.image.Version')"
                />
                <el-table-column :label="t('view.image.ChangeType')">
                    <template #default="{ row }">
                        <span>{{ row.modify.desc }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    v-if="operatable"
                    :label="t('sdxCommon.Operation')"
                >
                    <template #default="{ row }">
                        <sdxu-icon-button
                            icon="sdx-icon sdx-quxiao"
                            @click="handleRevert(row)"
                            :title="t('sdxCommon.Revert')"
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
import locale from '@sdx/utils/src/mixins/locale';

export default {
    name: 'SdxvModifiedPackageList',
    mixins: [locale],
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
                        ? this.t('view.image.Default')
                        : item.sourceUrl;
                ret.modify = {
                    type: 'installPackages',
                    index,
                    desc: this.t('view.image.NewlyAdded')
                };
                return ret;
            });
            const rList = this.uninstallPackages.map((item, index) => {
                let ret = { ...item };
                ret.modify = {
                    type: 'uninstallPackages',
                    index,
                    desc: this.t('sdxCommon.Delete')
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
                    desc: this.t('sdxCommon.Upgrade')
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
