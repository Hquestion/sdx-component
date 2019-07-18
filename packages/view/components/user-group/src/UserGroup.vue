<template>
    <sdxu-panel :title="t('view.userManage.UserGroup')">
        <div
            class="sdxv-user-group"
            v-auth.user.button="'GROUP:READ'"
        >
            <div class="sdxv-user-group__bar">
                <sdxu-button
                    icon="sdx-icon sdx-icon-plus"
                    size="small"
                    @click="createGroup"
                    v-auth.user.button="'GROUP:WRITE'"
                >
                    {{ t('view.userManage.NewGroup') }}
                </sdxu-button>
                <SdxwSearchLayout
                    @search="handleSearch"
                    :block="false"
                    align="right"
                    style="flex: 1"
                >
                    <SdxwSearchItem>
                        <sdxu-input
                            class="sdxv-user-group__bar--input"
                            type="search"
                            :searchable="true"
                            :placeholder="t('view.userManage.PleaseInputGroupName')"
                            size="small"
                            v-model="name"
                        />
                    </SdxwSearchItem>
                </SdxwSearchLayout>
            </div>
            <sdxu-table
                :data="groups"
                class="sdxv-user-group__table"
                :default-sort="{prop: 'createdAt', order: 'descending'}"
                v-loading="loading"
                @sort-change="handleSortChange"
            >
                <el-table-column
                    :label="t('view.userManage.UserGroupName')"
                    prop="name"
                />
                <el-table-column
                    :label="t('view.userManage.Role')"
                >
                    <template #default="{ row }">
                        <SdxuTextTooltip
                            :content="row.roles"
                            content-key="name"
                            tip-type="inline-block"
                        />
                    </template>
                </el-table-column>
                <el-table-column
                    prop="createdAt"
                    :label="t('view.userManage.CreatedAt')"
                    sortable
                >
                    <template #default="{row}">
                        {{ row.createdAt | dateFormatter }}
                    </template>
                </el-table-column>
                <el-table-column
                    :label="t('sdxCommon.Operation')"
                >
                    <template #default="{ row }">
                        <div class="sdxv-user-group__table--operation">
                            <SdxuIconButton
                                icon="sdx-icon sdx-icon-edit"
                                @click="handleEdit(row)"
                                :title="t('sdxCommon.Edit')"
                                v-auth.user.button="'GROUP:WRITE'"
                            />
                            <SdxuIconButton
                                icon="sdx-icon sdx-icon-delete"
                                v-auth.user.button="'GROUP:WRITE'"
                                @click="handleDelete(row)"
                                :title="t('sdxCommon.Delete')"
                            />
                        </div>
                    </template>
                </el-table-column>
                <el-table-column type="expand">
                    <template #default="{ row }">
                        <div class="sdxv-user-group__table--expand">
                            <span class="sdxv-user-group__table--expand-label">{{ t('view.userManage.GroupMembers') }}:</span>
                            <sdxw-fold-label-group
                                v-if="row.users && row.users.length > 0"
                                :list="row.users.map(item => item.fullName)"
                                type="default"
                            />
                            <span v-else>{{ t('view.userManage.NoMembers') }}</span>
                        </div>
                    </template>
                </el-table-column>
            </sdxu-table>
            <div class="sdxv-user-group__pagination">
                <sdxu-pagination
                    v-if="total"
                    :current-page.sync="page"
                    :page-size="pageSize"
                    :total="total"
                    @current-change="handleChangePage"
                />
            </div>
        </div>
        <CreateUserGroup
            :visible.sync="createVisible"
            :meta="groupMeta"
            @refresh="handleRefresh"
        />
    </sdxu-panel>
</template>

<script>
import SdxuPanel from '@sdx/ui/components/content-panel';
import SdxuTable from '@sdx/ui/components/table';
import SdxuButton from '@sdx/ui/components/button';
import SdxuPagination from '@sdx/ui/components/pagination';
import SdxuMessageBox from '@sdx/ui/components/message-box';
import SdxuInput from '@sdx/ui/components/input';
import FoldLabel from '@sdx/widget/components/fold-label';
import SdxuIconButton from '@sdx/ui/components/icon-button';
import SearchLayout from '@sdx/widget/components/search-layout';
import SdxuTextTooltip from '@sdx/ui/components/text-tooltip';

import { getGroups, deleteGroup } from '@sdx/utils/src/api/user';
import CreateUserGroup from './CreateUserGroup';
import transformFilter from '@sdx/utils/src/mixins/transformFilter';
import auth from '@sdx/widget/components/auth';
import locale from '@sdx/utils/src/mixins/locale';

export default {
    name: 'SdxvUserGroup',
    mixins: [transformFilter, locale],
    components: {
        CreateUserGroup,
        SdxuPanel,
        SdxuTable,
        SdxuButton,
        SdxuPagination,
        SdxuInput,
        [FoldLabel.FoldLabel.name]: FoldLabel.FoldLabel,
        [FoldLabel.FoldLabelGroup.name]: FoldLabel.FoldLabelGroup,
        SdxuIconButton,
        [SearchLayout.SearchLayout.name]: SearchLayout.SearchLayout,
        [SearchLayout.SearchItem.name]: SearchLayout.SearchItem,
        SdxuTextTooltip
    },
    directives: {
        auth
    },
    data() {
        return {
            pageSize: 10,
            page: 1,
            total: 0,
            groups: [],
            name: '',
            createVisible: false,
            editVisible: false,
            deleteVisible: false,
            groupMeta: undefined,
            loading: false,
            order: 'desc',
            orderBy: 'createdAt'
        };
    },
    computed: {
        querys() {
            let info = {
                start: (this.page - 1) * this.pageSize + 1,
                count: this.pageSize,
                name: this.name,
                order: this.order,
                orderBy: this.orderBy
            };
            return info;
        }
    },
    methods: {
        handleSortChange({order}) {
            if (!order) {
                return;
            }
            this.order =
                    order === 'descending' ? 'desc' : 'asc';
            this.fetchData();
        },
        fetchData(currentPage) {
            this.loading = true;
            currentPage && (this.page = currentPage);
            getGroups(this.querys).then(data => {
                this.groups = data.groups;
                this.total = data.total;
            }).finally(() => {
                this.loading = false;
            });
        },
        handleSearch() {
            this.fetchData(1);
        },
        handleChangePage(page) {
            this.fetchData(page);
        },
        createGroup() {
            this.groupMeta = undefined;
            this.createVisible = true;
        },
        handleEdit(row) {
            this.groupMeta = row;
            this.createVisible = true;
        },
        handleDelete(row) {
            SdxuMessageBox.confirm({
                title: `${this.t('view.userManage.ConfirmToDelete')}${row.name}${this.t('view.userManage.UserGroup')}${this.t('view.userManage.ConfirmHelper')}`,
                content: this.t('view.file.CantRecoveryAfterDel')
            }).then(() => {
                // todo: 请求接口
                deleteGroup(row.uuid).then(() => {
                    if (this.groups.length === 1) {
                        this.fetchData(this.page - 1);
                    } else {
                        this.fetchData();
                    }
                });
            });
        },
        handleRefresh() {
            this.fetchData();
        }
    },
    created() {
        this.fetchData();
    }
};
</script>

<style lang="scss">

</style>
