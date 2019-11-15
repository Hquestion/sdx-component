<template>
    <SdxuContentPanel
        class="user-rights-panel"
        :title="t('view.resourceManage.UserRights')"
    >
        <SdxuButton
            icon="sdx-icon-plus"
            size="small"
            slot="right"
            v-if="userRightsList.length > 0"
            @click="addRights"
            v-auth.resource.button="'CONFIG:WRITE'"
        >
            {{ t('view.resourceManage.NewUserRights') }}
        </SdxuButton>
        <div class="user-rights-list" v-loading="loading">
            <template v-if="userRightsList.length > 0">
                <SdxuTable :data="userRightsList">
                    <el-table-column
                        :label="t('view.file.UserName')"
                        prop="user.fullName"
                    />
                    <el-table-column
                        :label="t('view.resourceManage.AuthAt')"
                        prop="createTime"
                    >
                        <template #default="{row}">
                            {{ row.createdAt | dateFormatter }}
                        </template>
                    </el-table-column>
                    <el-table-column :label="t('sdxCommon.Operation')">
                        <template slot-scope="scope">
                            <SdxuIconButton
                                icon="sdx-icon sdx-icon-yanjing"
                                @click="view(scope)"
                                :title="t('sdxCommon.Detail')"
                            />
                            <SdxuIconButton
                                v-auth.resource.button="'CONFIG:WRITE'"
                                icon="sdx-icon sdx-icon-edit"
                                @click="edit(scope)"
                                :title="t('sdxCommon.Edit')"
                            />
                            <SdxuIconButton
                                v-auth.resource.button="'CONFIG:WRITE'"
                                icon="sdx-icon sdx-icon-delete"
                                @click="del(scope)"
                                :title="t('sdxCommon.Delete')"
                            />
                        </template>
                    </el-table-column>
                </SdxuTable>
                <div class="pagination-block">
                    <SdxuPagination
                        :current-page.sync="pageIndex"
                        :page-size="pageSize"
                        :total="total"
                        @current-change="currentChange"
                    />
                </div>
            </template>
            <template v-else>
                <SdxuEmpty>
                    <span>{{ t('view.resourceManage.AddUserRightsTip') }}</span>
                    <div class="add-btn-block">
                        <SdxuButton
                            type="default"
                            icon="sdx-icon-plus"
                            size="small"
                            @click="addRights"
                            v-auth.resource.button="'CONFIG:WRITE'"
                        >
                            {{ t('view.resourceManage.NewRights') }}
                        </SdxuButton>
                    </div>
                </SdxuEmpty>
            </template>
        </div>
        <EditUserRule
            :visible.sync="editVisible"
            :meta="userRightsDetail"
            :readonly="isView"
            @refresh="handleRefresh"
        />
    </SdxuContentPanel>
</template>

<script>
import ContentPanel from '@sdx/ui/components/content-panel';
import Button from '@sdx/ui/components/button';
import IconButton from '@sdx/ui/components/icon-button';
import Table from '@sdx/ui/components/table';
import Pagination from '@sdx/ui/components/pagination';
import Empty from '@sdx/ui/components/empty';
import MessageBox from '@sdx/ui/components/message-box';

import { getResourceConfigs, deleteResourceConfig } from '@sdx/utils/src/api/resource';
import EditUserRule from './EditUserRule';
import transformFilter from '@sdx/utils/src/mixins/transformFilter';
import auth from '@sdx/widget/components/auth';
import locale from '@sdx/utils/src/mixins/locale';

export default {
    name: 'UserRightsPanel',
    mixins: [transformFilter, locale],
    directives: {auth},
    data() {
        return {
            userRightsList: [],
            pageIndex: 1,
            pageSize: 10,
            total: 0,
            editVisible: false,
            userRightsDetail: undefined,
            isView: false,
            loading: false
        };
    },
    components: {
        EditUserRule,
        [ContentPanel.name]: ContentPanel,
        [Button.name]: Button,
        [IconButton.name]: IconButton,
        [Table.name]: Table,
        [Pagination.name]: Pagination,
        [Empty.name]: Empty
    },
    methods: {
        view({row}) {
            this.userRightsDetail = row;
            this.editVisible = true;
            this.isView = true;
        },
        addRights() {
            this.userRightsDetail = undefined;
            this.editVisible = true;
            this.isView = false;
        },
        edit({row}) {
            this.userRightsDetail = row;
            this.editVisible = true;
            this.isView = false;
        },
        del({row}) {
            MessageBox.confirm.error({
                title: this.t('view.resourceManage.ConfirmDeleteUserRights'),
                content: this.t('view.file.CantRecoveryAfterDel')
            }).then(() => {
                deleteResourceConfig(row.user.uuid).then(() => {
                    this.init();
                });
            });
        },
        init() {
            this.getList(this.pageIndex);
        },
        getList(pageIndex) {
            this.loading = true;
            const start = (pageIndex - 1) * this.pageSize + 1;
            return getResourceConfigs(start, this.pageSize).then(res => {
                this.userRightsList = res.items || [];
                this.total = res.total || 0;
            }, () => {
                this.userRightsList = [];
                this.total = 0;
            }).finally(() => {
                this.loading = false;
            });
        },
        currentChange(val) {
            this.getList(val);
        },
        handleRefresh() {
            this.getList(this.pageIndex);
        }
    },
    mounted() {
        this.init();
    }
};
</script>

<style lang="scss" scoped>
    @import "~@sdx/utils/src/theme-common/var";
    .user-rights-panel {
        .pagination-block {
            margin-top: 20px;
            display: flex;
            justify-content: flex-end;
        }
        .add-btn-block {
            margin-top: $sdx-margin;
        }
    }
</style>
