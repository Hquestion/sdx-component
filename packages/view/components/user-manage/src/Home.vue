<template>
    <sdxu-content-panel :title="t('view.userManage.User')" :fullscreen="true">
        <div
            class="sdxv-user-manage"
            v-auth.user.button="'USER:READ'"
        >
            <div
                class="sdxv-user-manage__title"
            >
                <div class="sdxv-user-manage__title--operate">
                    <SdxwSearchLayout
                        @search="search"
                        :block="false"
                        align="right"
                    >
                        <SdxwSearchItem>
                            <SdxuInput
                                class="sdxv-user-manage__title--search"
                                v-model="searchKey"
                                :searchable="true"
                                size="small"
                                type="search"
                                :placeholder="t('view.userManage.PleaseInputUsername')"
                            />
                        </SdxwSearchItem>
                    </SdxwSearchLayout>
                    <SdxuButton
                        @click="handleAddUser"
                        type="primary"
                        icon="sdx-icon sdx-icon-plus"
                        size="small"
                        v-auth.user.button="'USER:WRITE'"
                    >
                        {{ t('view.userManage.NewUser') }}
                    </SdxuButton>
                </div>
            </div>
            <sdxu-table
                class="sdxv-user-manage__table"
                borer
                :data="tableData"
                @row-click="openDetails"
                v-loading="loading"
                :default-sort="{prop: 'createdAt', order: 'descending'}"
                @sort-change="handleSortChange"
            >
                <el-table-column
                    prop="username"
                    :label="t('view.userManage.Username')"
                />
                <el-table-column
                    prop="fullName"
                    :label="t('view.userManage.FullName')"
                />
                <el-table-column
                    prop="roles"
                    :label="t('view.userManage.Role')"
                >
                    <template slot-scope="scope">
                        <SdxuTextTooltip
                            :content="scope.row.roleNames"
                            tip-type="inline-block"
                        />
                    </template>
                </el-table-column>
                <el-table-column
                    :label="t('view.userManage.CreatedAt')"
                    prop="createdAt"
                    sortable
                >
                    <template #default="{row}">
                        {{ row.createdAt | dateFormatter }}
                    </template>
                </el-table-column>
                <el-table-column
                    :label="t('sdxCommon.Operation')"
                >
                    <template slot-scope="scope">
                        <sdxu-icon-button
                            @click.native.stop="handleJoinGroup(scope.row)"
                            icon="sdx-icon sdx-icon-zu2"
                            v-auth.user.button="'USER:WRITE'"
                            :title="t('view.userManage.JoinGroup')"
                        />
                        <sdxu-icon-button
                            @click.native.stop="handleEditUser(scope.row)"
                            icon="sdx-icon sdx-icon-edit"
                            v-auth.user.button="'USER:WRITE'"
                            :title="t('sdxCommon.Edit')"
                        />
                        <sdxu-icon-button
                            @click.native.stop="handleDeleteUser(scope.row)"
                            icon="sdx-icon sdx-icon-delete"
                            v-auth.user.button="'USER:WRITE'"
                            :title="t('sdxCommon.Delete')"
                        />
                    </template>
                </el-table-column>
            </sdxu-table>

            <!-- 分页 -->
            <!-- 用户详情 -->
            <UserDetail
                @cancelUserDetailDialog="cancelUserDetailDialog"
                :user="toViewUser"
                v-if="userDetailVisible"
            />
            <AddUser
                @cancelAddUserDialog="cancelAddUserDialog"
                @refresh="refreshUsers"
                v-if="addUserVisible"
            />
            <EditUser
                :meta="toEditUser"
                @cancelEditUserDialog="cancelEditUserDialog"
                @refresh="refreshUsers"
                v-if="editUserVisible"
            />
            <JoinGroup
                :user="toJoinUser"
                @cancelJoinGroupDialog="cancelJoinGroupDialog"
                v-if="JoinGroupVisible"
                @refresh="refreshUsers"
            />
        </div>
        <div
            class="sdxv-user-manage__pagination"
            slot="footer"
        >
            <sdxu-pagination
                v-if="total!=0"
                :current-page.sync="current"
                :page-size="pageSize"
                :total="total"
                @current-change="currentChange"
            />
        </div>
    </sdxu-content-panel>
</template>

<script>
import {
    getUserList,
    deleteUser
} from '@sdx/utils/src/api/user';
import SdxuInput from '@sdx/ui/components/input';
import SdxuIconButton from '@sdx/ui/components/icon-button';
import SdxuTable from '@sdx/ui/components/table';
import MessageBox from '@sdx/ui/components/message-box';
import FoldLabel from '@sdx/widget/components/fold-label';
import AddUser from './components/AddUser';
import EditUser from './components/EditUser';
import JoinGroup from './components/JoinGroup';
import UserDetail from './components/UserDetail';
import SdxuContentPanel from '@sdx/ui/components/content-panel';
import SearchLayout from '@sdx/widget/components/search-layout';
import transformFilter from '@sdx/utils/src/mixins/transformFilter';
import auth from '@sdx/widget/components/auth';
import SdxuTextTooltip from '@sdx/ui/components/text-tooltip';
import locale from '@sdx/utils/src/mixins/locale';
export default {
    name:'SdxvUserManage',
    mixins: [transformFilter, locale],
    data () {
        return {
            id:'',
            theme:'user',
            userDetailVisible:false,
            JoinGroupVisible:false,
            userInfoVisible: false,
            addUserVisible:false,
            editUserVisible:false,
            userInfoData:{}, //用户详情
            searchKey:'',
            tableData:[],
            current:1,
            pageSize:10,
            total:0,
            toEditUser: {},
            toViewUser: {},
            toJoinUser: {},
            searched: false,
            loading: false,
            order: 'desc',
            orderBy: 'createdAt'
        };
    },
    directives: {
        auth
    },
    methods:{
        //关闭新建用户弹框
        cancelAddUserDialog(msg) {
            this.addUserVisible = false;
        },
        cancelJoinGroupDialog() {
            this.JoinGroupVisible = false;
        },
        cancelEditUserDialog() {
            this.editUserVisible = false;
        },
        cancelUserDetailDialog() {
            this.userDetailVisible = false;
        },
        //新增用户
        handleAddUser() {
            this.addUserVisible = true;
        },
        //查看用户详情
        openDetails(row) {
            this.toViewUser = row;
            this.userDetailVisible = true;
        },
        //搜索
        search() {
            this.searched = true;
            this.getUsers(1);
        },
        //切换分页
        currentChange(index){
            this.current = index;
            this.getUsers();
        },
        //删除
        handleDeleteUser(user) {
            MessageBox.confirm({
                title: `${this.t('view.userManage.ConfirmToDelete')}${user.fullName}${this.t('view.userManage.ConfirmHelper')}`,
                content: this.t('view.file.CantRecoveryAfterDel'),
            }).then(() => {
                deleteUser(user.uuid).then(() => {
                    this.$message({
                        message: this.t('view.userManage.DeleteSuccess'),
                        type: 'success'
                    });
                    if (this.tableData.length === 1) {
                        this.getUsers(this.current - 1);
                    } else {
                        this.getUsers();
                    }
                });
            });
        },
        getUsers(currentPage){
            this.loading = true;
            currentPage && (this.current = currentPage);
            let params = {
                start: (this.current - 1) * this.pageSize + 1,
                count: this.pageSize,
                order: this.order,
                orderBy: this.orderBy
            };
            if (this.searched) {
                params.username = this.searchKey;
                params.fullName = this.searchKey;
            }
            getUserList(params)
                .then(( res ) => {
                    this.total = res.total;
                    res.users.forEach(item => {
                        item.roleNames = item.roles.map(item => item.name);
                    });
                    this.tableData = res.users;
                }).finally(() => {
                    this.loading = false;
                });
        },
        //显示用户组
        handleJoinGroup(row) {
            this.toJoinUser = row;
            this.JoinGroupVisible = true;
        },
        //编辑
        handleEditUser(row) {
            this.editUserVisible = true;
            this.toEditUser = row;
        },
        refreshUsers(stayCurrentPage) {
            if (stayCurrentPage) {
                this.getUsers();
            } else {
                this.getUsers(1);
            }
        },
        handleSortChange({order}) {
            if (!order) {
                return;
            }
            this.order =
                    order === 'descending' ? 'desc' : 'asc';
            this.getUsers();
        },
    },
    mounted(){
        this.getUsers();
    },
    components: {
        [FoldLabel.FoldLabelGroup.name]: FoldLabel.FoldLabelGroup,
        [FoldLabel.FoldLabel.name]: FoldLabel.FoldLabel,
        SdxuInput,
        SdxuTable,
        SdxuContentPanel,
        AddUser,
        EditUser,
        JoinGroup,
        UserDetail,
        SdxuIconButton,
        SdxuTextTooltip,
        [SearchLayout.SearchLayout.name]: SearchLayout.SearchLayout,
        [SearchLayout.SearchItem.name]: SearchLayout.SearchItem,
    }
};
</script>
<style lang='scss' scoped>


</style>
