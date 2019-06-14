<template>
    <div class="sdxv-authorize-manage">
        <SdxuContentPanel>
            <div class="sdxv-authorize-manage__header">
                <div class="sdxv-authorize-manage__handle">
                    <SdxuTabRadioGroup
                        v-model="objectType"
                        @switch="switchTab"
                    >
                        <SdxuTabRadioItem name="user">
                            用户授权列表
                        </SdxuTabRadioItem>
                        <SdxuTabRadioItem name="group">
                            用户组授权列表
                        </SdxuTabRadioItem>
                        <SdxuTabRadioItem name="role">
                            角色授权列表
                        </SdxuTabRadioItem>
                    </SdxuTabRadioGroup>
                    <SdxuButton
                        type="primary"
                        placement="right"
                        @click="addAuthorize"
                        size="small"
                        class="addAuth"
                    >
                        <i
                            class="sdx-icon sdx-icon-plus"
                        />
                        新建授权
                    </sdxubutton>
                </div>
                <SdxwSearchLayout
                    @search="searchName"
                    align="left"
                    style="flex: 1"
                >
                    <SdxwSearchItem>
                        <SdxuInput
                            v-model="searchPermissions.name"
                            :searchable="false"
                            size="small"
                            type="search"
                            placeholder="请输入角色名"
                        />
                    </SdxwSearchItem>
                </SdxwSearchLayout>
            </div>
            <div class="sdxv-authorize-manage__table">
                <SdxuTable
                    :data="tableData"
                >
                    <el-table-column
                        :prop="objectType === 'user' ? 'fullName' : 'name'"
                        label="授权对象"
                    />
                    <el-table-column
                        label="权限"
                    >
                        <template slot-scope="scope">
                            <SdxwFoldLabelGroup :list="scope.row.permissions.map(item => item.name)" />
                        </template>
                    </el-table-column>
                    <el-table-column
                        style="width: 15%"
                        label="操作"
                    >
                        <template
                            slot-scope="scope"
                            class="icon"
                        >
                            <i
                                class="sdx-icon sdx-icon-edit icon"
                                @click="edit(scope.row)"
                            />
                            <i
                                class="sdx-icon sdx-icon-delete icon"
                                @click="remove(scope.row.uuid, objectType === 'user' ? scope.row.fullName : scope.row.name)"
                            />
                        </template>
                    </el-table-column>
                </SdxuTable>
                <div class="sdxv-role-manage__pagination">
                    <sdxu-pagination
                        :current-page.sync="current"
                        :page-size="pageSize"
                        :total="total"
                        @current-change="currentChange"
                    />
                </div>
            </div>
            <sdxu-dialog
                :visible.sync="dialogVisible"
                @confirm="dialogConfirm"
                @cancel="dialogCancel"
                class="sdxv-authorize-model"
                @closed="closedDialog"
                :title="`${is_update ? '编辑' : '新建'}授权`"
                @open="openDialog"
            >
                <div>
                    <el-form
                        label-position="right"
                        label-width="80px"
                        @submit.native.prevent
                        ref="permissionForm"
                    >
                        <el-form-item
                            prop="name"
                            label="授权对象"
                        >
                            <SdxuUserAvatar
                                v-if="is_update"
                                :name="objName"
                            />
                            <SdxwUserPicker
                                v-model="objValue"
                                :type="objectType"
                                v-else
                            />
                        </el-form-item>
                        <el-form-item
                            label="权限设置"
                        >
                            <SdxuTransfer
                                :data="permissionData"
                                :tags.sync="tags"
                                :default-keys.sync="defaultKeys"
                                :tree-node-key="treeNodeKey"
                            />
                        </el-form-item>
                    </el-form>
                </div>
            </sdxu-dialog>
        </SdxuContentPanel>
    </div>
</template>

<script>
import SdxuInput from '@sdx/ui/components/input';
import SdxuButton from '@sdx/ui/components/button';
import SdxuTable from '@sdx/ui/components/table';
import SdxuPagination from '@sdx/ui/components/pagination';
import SdxuDialog from '@sdx/ui/components/dialog';
import SdxuTransfer from '@sdx/ui/components/transfer';
import SdxuUserAvatar from '@sdx/ui/components/user-avatar';
import Select from 'element-ui/lib/select';
import Form from 'element-ui/lib/form';
import FormItem from 'element-ui/lib/form-item';
import {getUserProfilesList, getGroupProfilesList, getRoleProfilesList} from '@sdx/utils/src/api/manage';
import {updataUser, updateGroups} from '@sdx/utils/src/api/user';
import {getPermissionList} from '@sdx/utils/src/api/permissions';
import {updateRoles} from '@sdx/utils/src/api/rolemange';
import MessageBox from '@sdx/ui/components/message-box';
import ContentPanel from '@sdx/ui/components/content-panel';
import TabRadio from '@sdx/ui/components/tab-radio';
import FoldLabel from '@sdx/widget/components/fold-label';
import {  paginate } from '@sdx/utils/src/helper/tool';
import SdxwUserPicker from '@sdx/widget/components/user-picker';
export default {
    name: 'SdxvAuthorizeManage',
    components: {
        SdxuInput,
        SdxuButton,
        SdxuTable,
        SdxuPagination,
        SdxuDialog,
        [Form.name]: Form,
        [FormItem.name]: FormItem,
        SdxuTransfer,
        [Select.name]: Select,
        [ContentPanel.name]: ContentPanel,
        [TabRadio.TabRadioGroup.name]: TabRadio.TabRadioGroup,
        [TabRadio.TabRadioItem.name]: TabRadio.TabRadioItem,
        [FoldLabel.FoldLabelGroup.name]: FoldLabel.FoldLabelGroup,
        SdxwUserPicker,
        SdxuUserAvatar
    },
    data() {
        return {
            searchPermissions: {
                name: '',
                start: 1,
                count: 10,
                order: 'desc',
                orderBy: 'createdAt'
            },
            objectType: 'user',
            tableData: [],
            current: 1,
            pageSize: 10,
            total: 0,
            dialogVisible: false,
            permissionData:[],
            savePermissionData: [],
            tags: [],
            defaultKeys: [],
            treeNodeKey: 'uuid',
            objValue: {},
            objName: '',
            is_update: false
        };
    },
    props: {

    },
    created() {
        this.userList();
        this.getPermissions();
    },
    methods: {
        // 何种类型是否重置页码
        changeObjectType(type,reset) {
            if(type === 'user') {
                this.userList(reset);
            } else if (type === 'group') {
                this.groupList(reset);
            } else if (type === 'role') {
                this.roleList(reset);
            }
        },
        // 何种类型更新权限
        updatePermissions(objectType, id, permissions, reset, orderBy) {
            if(objectType === 'user') {
                updataUser(id, {  permissions})
                    .then(()=> {
                        this.userList(reset, orderBy);
                    });
            } else if (objectType === 'group') {
                updateGroups(id, {  permissions })
                    .then(()=> {
                        this.groupList(reset, orderBy);
                    });
            } else if(objectType === 'role') {
                updateRoles(id, {  permissions })
                    .then(()=> {
                        this.roleList(reset, orderBy);
                    });
            }  
        },
        // 权限列表
        getPermissions() {
            let params = {
                start: 1,
                count: -1
            };
            getPermissionList(params)
                .then(res => {
                    this.permissionData  = res.permissions.map(item => ({
                        uuid: item.uuid,
                        label: item.name
                    }));

                    this.savePermissionData = JSON.parse(JSON.stringify(this.permissionData));
                });
        },
        userList(reset, orderBy) {
            if(orderBy) this.searchPermissions.orderBy = orderBy;
            if (reset) this.current = 1;
            let params={...this.searchPermissions, ...paginate(this.current, this.pageSize),
                fullName: this.searchPermissions.name, username: this.searchPermissions.name};
            delete  params.name;
            getUserProfilesList(params)
                .then(data => {
                    this.tableData = data.users;
                    this.total = data.total;

                });
        },
        groupList(reset,orderBy) {
            if(orderBy) this.searchPermissions.orderBy = orderBy;
            if (reset) this.current = 1;
            let params={...this.searchPermissions, ...paginate(this.current, this.pageSize)};
            getGroupProfilesList(params)
                .then(data => {
                    this.tableData = data.groups;
                    this.total = data.total;

                });
        },
        roleList(reset,orderBy) {
            if (reset) this.current = 1;
            if(orderBy) this.searchPermissions.orderBy = orderBy;
            let params={...this.searchPermissions, ...paginate(this.current, this.pageSize)};
            getRoleProfilesList(params)
                .then(data => {
                    this.tableData = data.roles;
                    this.total = data.total;

                });
        },
        // tab切换
        switchTab(name) {
            this.searchPermissions.name = '';
            this.changeObjectType(name, true);
        },
        // 页码变换
        currentChange(nVal) {
            this.current = nVal;
            this.changeObjectType(this.objectType, false);
        },
        addAuthorize() {
            this.is_update = false;
            this.dialogVisible = true;
            
        },
        dialogConfirm() {
            let permissions = [];
            permissions = this.tags.map(item => item.uuid);
            this.updatePermissions(this.objectType, this.objValue.uuid, permissions, true, 'updatedAt');
        },
        dialogCancel() {

        },
        openDialog() {
            this.permissionData = this.savePermissionData;
        },
        closedDialog() {
            this.permissionData = [];
            this.defaultKeys = [];
            this.tags = [];
            this.objValue = {};
        },
        // 搜索name
        searchName() {
            this.searchPermissions = Object.assign({}, this.searchPermissions, {
                name: this.searchPermissions.name,
                start:  1
            });
            this.changeObjectType(this.objectType, true);
        },
        edit(row) {
            if(this.objectType === 'user') {
                this.objName = row.fullName;
            } else {
                this.objName = row.name;
            }
            this.is_update = true;
            this.dialogVisible = true;
            this.defaultKeys = row && row.permissions.map(item => item.uuid);
            window.console.log(row,this.defaultKeys, 'res');
        },
        remove(id, name) {
            MessageBox.confirm({
                title: `确定删除授权${name}吗？`,
                content: '删除后不可恢复哦',
                type: 'alert'
            }).then(() => { 
                this.updatePermissions(this.objectType, id, []);
            }, () => {

            });

        }
    }
};
</script>
