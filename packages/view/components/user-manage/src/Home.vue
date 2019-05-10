<template>
    <div class="sdxv-user-manage">
        <div class="sdxv-user-manage__title">
            <span class="sdxv-user-manage__title--head">角色</span>
            <div class="sdxv-user-manage__title--operate">
                <SdxuButton
                    @click="handleAddUser"
                    type="primary"
                >
                    <i class="sdx-icon iconicon-plus" />
                    新建角色
                </SdxuButton>
                <SdxuInput
                    @search="search(this.searchKey)"
                    class="sdxv-user-manage__title--search"
                    v-model="searchKey"
                    :searchable="true"
                    size="small"
                    type="search"
                    placeholder="请输入用户名"
                />
            </div>
        </div>
        <sdxu-table
            class="sdxv-user-manage__table"
            borer
            :data="tableData"
            :highlight-key="key"
            :params="params"
        >
            <el-table-column
                prop="username"
                label="用户名"
            >
                <template slot-scope="scope">
                    <span
                        class="sdxv-user-manage__table--username"
                        @click="openDetails(scope.row)"
                    >
                        {{ scope.row.username }}
                    </span>
                </template>
            </el-table-column>
            <el-table-column
                prop="fullName"
                label="显示名"
            />
            <el-table-column
                prop="roles"
                label="角色"
            >
                <template slot-scope="scope">
                    <SdxwFoldLabelGroup
                        :list="scope.row.roles"
                        mode="inline"
                        type="default"
                    />
                </template>
            </el-table-column>
            <el-table-column
                prop="createdAt"
                label="创建时间"
            />
            <el-table-column
                label="操作"
            >
                <template slot-scope="scope">
                    <sdxu-icon-button
                        @click="handleJoinGroup(scope.row)"
                        class="sdx-icon iconicon-zu2"
                    />
                    <sdxu-icon-button
                        @click="handleEditUser(scope.row)"
                        class="sdx-icon iconicon-edit1"
                    />
                    <sdxu-icon-button
                        @click="handleDeleteUser(scope.row)"
                        class="sdx-icon iconicon-delete"
                    />
                </template>
            </el-table-column>
        </sdxu-table>

        <!-- 分页 -->
        <sdxu-pagination
            v-if="total!=0"
            class="sdxv-user-manage__pagination"
            :current-page.sync="current"
            :page-size="pageSize"
            :total="total"
            @current-change="currentChange"
        />
        <!-- 用户详情 -->


        <UserDetail
            @cancelUserDetailDialog="cancelUserDetailDialog"
            v-if="userDetailVisible"
        />
        <AddUser
            @cancelAddUserDialog="cancelAddUserDialog"
            v-if="addUserVisible"
        />
        <EditUser
            @cancelEditUserDialog="cancelEditUserDialog"
            v-if="editUserVisible"
        />
        <JoinGroup
            @cancelJoinGroupDialog="cancelJoinGroupDialog"
            v-if="JoinGroupVisible"
        />
    </div>
</template>

<script>
import {
    getUserList,
    deleteUser,
    getUserDetail
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
export default {
    name:'SdxvUserManage',
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
            key:'',
            params:{},
            current:1,
            pageSize:10,
            total:50
        };
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
            this.$router.push({query:{uuid:row.uuid}});
            this.userDetailVisible = true;
        },
        //搜索
        search(searchKey) {
            this.getUsers(searchKey);
        },
        //切换分页
        currentChange(index){
            this.current = index;
        },
        //删除
        handleDeleteUser(user) {
            MessageBox.confirm({
                title: `确定要删除 ${user.fullName} 吗`,
                content: '用户确定删除后不可恢复哦',
            }).then(() => {
                deleteUser(user.uuid).then( (res) => {
                    this.$message({
                        message: '删除成功',
                        type: 'success'
                    });
                }).catch(() => {
                    this.$emit('on-error');
                });
            }, () => {

            });
        },
        getUsers(){
            getUserList()
                .then(( res ) => {
                    res.users.forEach((item)=>{
                        this.total = 40;
                        this.tableData.push({
                            username:item.username,
                            fullName:item.fullName,
                            uuid:item.uuid,
                            roles:[],
                            createdAt:item.createdAt
                        });
                    });
                    res.users.forEach((item,index)=>{
                        getUserDetail(item.uuid)
                            .then( res => {
                                this.tableData[index].roles = res.roleNames;
                            });
                    });
                }).catch(() => {
                    this.$emit('on-error');
                });
        },
        //显示用户组
        handleJoinGroup(row) {
            this.$router.push({query:{uuid:row.uuid}});
            this.JoinGroupVisible = true;
        },
        //编辑
        handleEditUser(row) {
            this.editUserVisible = true;
        },
    },
    watch: {

    },
    mounted(){
        this.getUsers();
    },
    components: {
        [FoldLabel.FoldLabelGroup.name]: FoldLabel.FoldLabelGroup,
        [FoldLabel.FoldLabel.name]: FoldLabel.FoldLabel,
        SdxuInput,
        SdxuTable,
        MessageBox,
        AddUser,
        EditUser,
        JoinGroup,
        UserDetail,
        SdxuIconButton
    }
};
</script>
<style lang='scss' scoped>


</style>
