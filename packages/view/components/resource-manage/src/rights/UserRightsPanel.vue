<template>
    <SdxuContentPanel
        class="user-rights-panel"
        title="用户特权"
    >
        <SdxuButton
            icon="iconicon-plus"
            size="small"
            slot="right"
            v-if="userRightsList.length > 0"
            @click="addRights"
        >
            新建特权
        </SdxuButton>
        <div class="user-rights-list">
            <template v-if="userRightsList.length > 0">
                <SdxuTable :data="userRightsList">
                    <el-table-column
                        label="用户名"
                        prop="userName"
                    />
                    <el-table-column
                        label="授权时间"
                        prop="createTime"
                    />
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <SdxuIconButton
                                icon="sdx-icon iconicon-eye-open"
                                @click="view(scope)"
                            />
                            <SdxuIconButton
                                icon="sdx-icon iconicon-edit1"
                                @click="edit(scope)"
                            />
                            <SdxuIconButton
                                icon="sdx-icon iconicon-delete1"
                                @click="del(scope)"
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
                    <span>如有需要，您可以选择添加用户特权哦</span>
                    <div class="add-btn-block">
                        <SdxuButton
                            type="default"
                            icon="iconicon-plus"
                            size="small"
                            @click="addRights"
                        >
                            新建特权
                        </SdxuButton>
                    </div>
                </SdxuEmpty>
            </template>
        </div>
        <EditUserRule
            :visible.sync="editVisible"
            :meta="userRightsDetail"
            :readonly="isView"
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

import { getResourceConfigs } from '@sdx/utils/src/api/resource';
import EditUserRule from './EditUserRule';

export default {
    name: 'UserRightsPanel',
    data() {
        return {
            userRightsList: [],
            pageIndex: 1,
            pageSize: 10,
            total: 0,
            editVisible: false,
            userRightsDetail: undefined,
            isView: false
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
                title: '确定要删除次用户特权吗？',
                content: '删除后不可恢复'
            }).then(() => {
                // todo
            });
        },
        init() {
            this.getList(this.pageIndex);
        },
        getList(pageIndex) {
            const start = (pageIndex - 1) * this.pageSize;
            return getResourceConfigs((start - 1) * this.pageSize, this.pageSize).then(res => {
                // eslint-disable-next-line
                console.log(res);
                this.userRightsList = res.items || [];
                this.total = res.total || 0;
            }, () => {
                this.userRightsList = [];
                this.total = 0;
            });
        },
        currentChange(val) {
            this.getList(val);
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
