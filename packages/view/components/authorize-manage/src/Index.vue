<template>
    <SdxuContentPanel
        v-if="defaultName('READ')"
        :fullscreen="true"
    >
        <div class="sdxv-authorize-manage">
            <div class="sdxv-authorize-manage__handle">
                <SdxuTabRadioGroup
                    v-model="objectType"
                    @switch="switchTab"
                >
                    <SdxuTabRadioItem
                        name="user"
                        v-auth.user.button="'USER:READ'"
                    >
                        {{ t('view.authorizeManage.user_authorization_list') }}
                    </SdxuTabRadioItem>
                    <SdxuTabRadioItem
                        name="group"
                        v-auth.user.button="'GROUP:READ'"
                    >
                        {{ t('view.authorizeManage.user_group_authorization_list') }}
                    </SdxuTabRadioItem>
                    <SdxuTabRadioItem
                        name="role"
                        v-auth.user.button="'ROLE:READ'"
                    >
                        {{ t('view.authorizeManage.role_authorization_list') }}
                    </SdxuTabRadioItem>
                </SdxuTabRadioGroup>
                <SdxuButton
                    type="primary"
                    placement="right"
                    @click="addAuthorize"
                    size="small"
                    class="addAuth"
                    v-if="authtoWrite(objectType)"
                >
                    <i
                        class="sdx-icon sdx-icon-plus"
                    />
                    {{ t('view.authorizeManage.new_authorization') }}
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
                        :placeholder="tabName(true)"
                    />
                </SdxwSearchItem>
            </SdxwSearchLayout>
        </div>
        <div
            class="sdxv-authorize-manage__table"
            v-loading="permissionLoading"
        >
            <SdxuTable
                :data="tableData"
            >
                <el-table-column
                    :prop="objectType === 'user' ? 'fullName' : 'name'"
                    :label="tabName()"
                    width="300px"
                />
                <el-table-column
                    :label="t('view.authority.Authority')"
                >
                    <template slot-scope="scope">
                        <SdxuTextTooltip
                            :content="scope.row.permissions"
                            content-key="name"
                            tip-type="inline-block"
                        />
                    </template>
                </el-table-column>
                <el-table-column
                    width="220px"
                    :label="t('sdxCommon.Operation')"
                    v-if="authtoWrite(objectType)"
                >
                    <template
                        slot-scope="scope"
                        class="icon"
                    >
                        <SdxuIconButton
                            icon="sdx-icon sdx-icon-edit"
                            @click="edit(scope.row)"
                            :title="t('sdxCommon.Edit')"
                            :disable="scope.row.initial"
                        />
                        <SdxuIconButton
                            icon="sdx-icon sdx-icon-delete"
                            @click="remove(scope.row.uuid, objectType === 'user' ? scope.row.fullName : scope.row.name)"
                            :title="t('sdxCommon.Delete')"
                            :disable="scope.row.initial"
                        />
                    </template>
                </el-table-column>
            </SdxuTable>
        </div>
        <div
            class="sdxv-role-manage__pagination"
            slot="footer"
        >
            <sdxu-pagination
                :current-page.sync="current"
                :page-size="pageSize"
                :total="total"
                @current-change="currentChange"
            />
        </div>
        <sdxu-dialog
            :visible.sync="dialogVisible"
            class="sdxv-authorize-model"
            @closed="closedDialog"
            :title="is_update ? t('view.authorizeManage.editorial_authorization') : t('view.authorizeManage.new_authorization')"
            @open="openDialog"
        >
            <div>
                <el-form
                    label-position="right"
                    :label-width="lang$ === 'en' ? '150px' : '80px'"
                    @submit.native.prevent
                    ref="permissionForm"
                    :rules="is_update ? null : rules"
                    :model="dialogParams"
                    :validate-on-rule-change="false"
                >
                    <el-form-item
                        prop="objValue"
                        :label="t('view.authorizeManage.authorized_object')"
                    >
                        <SdxuUserAvatar
                            v-if="is_update"
                            :name="objName"
                        />
                        <SdxwUserPicker
                            v-model="dialogParams.objValue"
                            :type="objectType"
                            v-else
                        />
                    </el-form-item>
                    <el-form-item
                        :label="t('view.authorizeManage.permission_settings')"
                        prop="tags"
                    >
                        <SdxuTransfer
                            :data="permissionData"
                            :tags.sync="dialogParams.tags"
                            :default-keys.sync="defaultKeys"
                            :tree-node-key="treeNodeKey"
                            :need-show-tags="showTags"
                        />
                    </el-form-item>
                </el-form>
            </div>
            <div
                slot="footer"
            >
                <SdxuButton
                    type="default"
                    size="small"
                    @click="dialogCancel"
                >
                    {{ t('sdxCommon.Cancel') }}
                </SdxuButton>
                <SdxuButton
                    type="primary"
                    size="small"
                    @click="dialogConfirm"
                >
                    {{ t('sdxCommon.Confirm') }}
                </SdxuButton>
            </div>
        </sdxu-dialog>
    </SdxuContentPanel>
</template>

<script>
import SdxuInput from '@sdx/ui/components/input';
import SdxuButton from '@sdx/ui/components/button';
import SdxuTable from '@sdx/ui/components/table';
import SdxuPagination from '@sdx/ui/components/pagination';
import SdxuDialog from '@sdx/ui/components/dialog';
import SdxuTransfer from '@sdx/ui/components/transfer';
import SdxuUserAvatar from '@sdx/ui/components/user-avatar';
import SdxuTextTooltip from '@sdx/ui/components/text-tooltip';
import Select from 'element-ui/lib/select';
import Form from 'element-ui/lib/form';
import FormItem from 'element-ui/lib/form-item';
import {getUserProfilesList, getGroupProfilesList, getRoleProfilesList, getRolePermissions} from '@sdx/utils/src/api/manage';
import {updataUser, updateGroups} from '@sdx/utils/src/api/user';
import {getPermissionList} from '@sdx/utils/src/api/permissions';
import {updateRoles} from '@sdx/utils/src/api/rolemange';
import MessageBox from '@sdx/ui/components/message-box';
import ContentPanel from '@sdx/ui/components/content-panel';
import TabRadio from '@sdx/ui/components/tab-radio';
import FoldLabel from '@sdx/widget/components/fold-label';
import {  paginate } from '@sdx/utils/src/helper/tool';
import SdxwUserPicker from '@sdx/widget/components/user-picker';
import SearchLayout from '@sdx/widget/components/search-layout';
import auth from '@sdx/widget/components/auth';
import locale from '@sdx/utils/src/mixins/locale';
import SdxuIconButton from '@sdx/ui/components/icon-button';
export default {
    name: 'SdxvAuthorizeManage',
    mixins: [locale],
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
        SdxuUserAvatar,
        [SearchLayout.SearchLayout.name]: SearchLayout.SearchLayout,
        [SearchLayout.SearchItem.name]: SearchLayout.SearchItem,
        SdxuTextTooltip,
        SdxuIconButton
    },
    directives: {
        auth
    },
    data() {
        const objValueValidate = (rule, value, callback) => {
            if(!value) {
                callback(new Error(this.t('view.authorizeManage.please_enter_the_authorization_object')));
            } else {
                callback();
            }
        };
        return {
            searchPermissions: {
                name: '',
                start: 1,
                count: 10,
                order: 'desc',
                orderBy: 'createdAt'
            },
            objectType: this.defaultName('READ'), // 'user'
            tableData: [],
            current: 1,
            pageSize: 10,
            total: 0,
            dialogVisible: false,
            permissionData:[],
            savePermissionData: [],
            defaultKeys: [],
            treeNodeKey: 'uuid',
            objName: '',
            is_update: false,
            dialogParams: {
                objValue: null,
                tags: [],
            },
            updateUuid: '',
            rules:  {
                objValue: [
                    { required: true, message: this.t('view.authorizeManage.please_enter_the_authorization_object'), trigger: 'blue'},
                    { validator: objValueValidate, trigger: 'change' }
                ],
                tags: [
                    { required: true, message: this.t('view.authorizeManage.please_set_permission_settings'), trigger: 'blue' }
                ],

            },
            permissionLoading:false,
            showTags: false
        };
    },
    created() {
        if (this.defaultName('READ') === 'user') {
            this.userList();
        } else if (this.defaultName('READ') === 'group') {
            this.groupList();
        } else if (this.defaultName('READ') === 'role') {
            this.roleList();
        }
        this.getPermissions();
    },
    computed: {

    },
    methods: {
        tabName(holder) {
            let [name, holderContent] = ['', ''];
            if(this.objectType === 'user') {
                name = this.t('view.monitor.resourceStatistic.UserName');
                holderContent = this.t('view.monitor.resourceStatistic.userSearchInputPlaceholder');
            } else if(this.objectType === 'group') {
                name = this.t('view.userManage.UserGroupName');
                holderContent = this.t('view.authorizeManage.please_enter_the_user_group_name');
            } else if (this.objectType === 'role'){
                name = this.t('view.authorizeManage.role_name');
                holderContent = this.t('view.authorizeManage.please_enter_the_role_name');
            }
            name = holder ? holderContent : name;
            return name;
        },
        // 根据权限展示
        defaultName(type) {
            let name = '';
            if(auth.checkAuth(`USER-MANAGER:USER:${type}:""`, 'button')) {
                name = 'user';
            } else if(!auth.checkAuth(`USER-MANAGER:USER:${type}:""`, 'button') && auth.checkAuth(`USER-MANAGER:GROUP:${type}:""`, 'button')) {
                name = 'group';
            } else if(!auth.checkAuth(`USER-MANAGER:USER:${type}:""`, 'button') && !auth.checkAuth(`USER-MANAGER:GROUP:${type}:""`, 'button') && auth.checkAuth(`USER-MANAGER:ROLE:${type}:""`, 'button') ){
                name = 'role';
            } else {
                name = '';
            }
            return name;
        },
        // 根据权限展示操作
        authtoWrite(type) {
            let TYPE = type.toUpperCase();
            return auth.checkAuth(`USER-MANAGER:${TYPE}:WRITE:""`, 'button');
        },
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
            this.permissionLoading = true;
            getUserProfilesList(params)
                .then(data => {
                    this.tableData = data.users;
                    this.total = data.total;
                    this.permissionLoading = false;
                }, () => {
                    this.permissionLoading = false;
                });
        },
        groupList(reset,orderBy) {
            if(orderBy) this.searchPermissions.orderBy = orderBy;
            if (reset) this.current = 1;
            let params={...this.searchPermissions, ...paginate(this.current, this.pageSize)};
            this.permissionLoading = true;
            getGroupProfilesList(params)
                .then(data => {
                    this.tableData = data.groups;
                    this.total = data.total;
                    this.permissionLoading = false;
                }, () => {
                    this.permissionLoading = false;
                });
        },
        roleList(reset,orderBy) {
            if (reset) this.current = 1;
            if(orderBy) this.searchPermissions.orderBy = orderBy;
            let params={...this.searchPermissions, ...paginate(this.current, this.pageSize)};
            this.permissionLoading = true;
            getRoleProfilesList(params)
                .then(data => {
                    this.tableData = data.roles;
                    this.total = data.total;
                    this.permissionLoading = false;
                }, () => {
                    this.permissionLoading = false;
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
            this.searchPermissions.name = '';
            this.dialogVisible = true;
            let [permissions, uuid] = [[], ''];
            permissions = this.dialogParams.tags.map(item => item.uuid);
            this.$refs.permissionForm.validate().then(() => {
                if(this.is_update) {
                    uuid = this.updateUuid;
                    this.updatePermissions(this.objectType, uuid, permissions);
                } else {
                    uuid = this.dialogParams.objValue.uuid;
                    this.updatePermissions(this.objectType, uuid, permissions, true, 'updatedAt');
                }
                this.dialogVisible = false;
            });
        },
        dialogCancel() {
            this.dialogVisible = false;
        },
        openDialog() {
            this.permissionData = this.savePermissionData;
            this.$refs.permissionForm && this.$refs.permissionForm.clearValidate();
        },
        closedDialog() {
            this.permissionData = [];
            this.defaultKeys = [];
            this.dialogParams.tags = [];
            this.dialogParams.objValue = null;
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
            this.updateUuid = row.uuid;
            this.defaultKeys = row && row.permissions.map(item => item.uuid);
        },
        remove(id, name) {
            MessageBox.confirm({
                title: this.t('view.authorizeManage.Are_you_sure_delete_it'),
                content: this.t('view.authorizeManage.Can_not_be_restored_after_deletion'),
                type: 'alert'
            }).then(() => {
                this.updatePermissions(this.objectType, id, []);
            }, () => {

            });

        }
    },
    watch: {
        'dialogParams.objValue'(nval) {
            this.defaultKeys = [];
            this.showTags = false;
            this.dialogParams.tags = [];
            if(nval && nval.uuid) {
                // 拼接role ，查对应的接口
                let role = `${this.objectType}s`;
                getRolePermissions(role, nval.uuid)
                    .then(data => {
                        if(data.permissions.length) {
                            this.defaultKeys = data.permissions;
                            this.showTags = true;
                        } else {
                            this.defaultKeys = [];
                            this.showTags = false;
                            this.dialogParams.tags = [];
                        }
                    }, () => {
                        this.defaultKeys = [];
                        this.showTags = false;
                        this.dialogParams.tags = [];
                    });
            }
        }
    }
};
</script>
