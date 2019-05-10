<template>
    <div class="sdxv-authorize-manage">
        <SdxuContentPanel
            title="授权管理"
        >
            <div class="sdxv-authorize-manage__header">
                <div class="sdxv-authorize-manage__handle">
                    <SdxuButton
                        type="primary"
                        placement="right"
                        @click="addAuthorize"
                        size="small"
                    >
                        <i
                            class="sdx-icon iconicon-plus"
                        />
                        新建授权
                    </sdxubutton>
                    <SdxuTabRadioGroup v-model="searchPermissions.objectType">
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
                    <SdxuInput
                        v-model="searchPermissions.name"
                        :searchable="true"
                        size="small"
                        type="search"
                        @search="searchName"
                        @keyup.native.enter="searchName"
                    />
                </div>
            </div>
            <div class="sdxv-role-manage__table">
                <SdxuTable
                    :data="tableData"  
                >
                    <el-table-column
                        prop="name"
                        label="授权对象"
                    />
                    <el-table-column
                        prop="description"
                        label="对象类别"
                    />
                    <el-table-column
                        prop="address"
                        label="权限"
                    />
                    <el-table-column
                        style="width: 15%"
                        label="操作"
                    >
                        <template
                            slot-scope=""
                            class="icon"
                        >
                            <i
                                class="sdx-icon iconicon-edit1 icon"
                                @click="editRole()"
                            />
                            <i
                                class="sdx-icon iconicon-delete1 icon"
                                @click="removeRole()"
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
            >
                <div slot="title">
                    新建授权
                </div>
                <div>
                    <el-form
                        label-position="right"
                        label-width="80px"
                        @submit.native.prevent
                        ref="user"
                    >
                        <el-form-item
                            prop="name"
                            label="授权对象"
                        >
                            <el-select
                                v-model="objValue"
                                multiple
                                filterable
                                remote
                                reserve-keyword
                                placeholder="请输入关键词"
                            >
                                <el-option
                                    v-for="optItem in options"
                                    :key="optItem.label"
                                    :label="optItem.label"
                                    :value="optItem.label"
                                >
                                    <span style="float: left;  color: #606266">
                                        {{ optItem.label }}
                                    </span>
                                    <span style="float: right; color: #4781F8; margin-right: 20px">
                                        {{ optItem.value }}
                                    </span>
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item
                            label="权限设置"
                        >
                            <SdxuTransfer 
                                :data="data"
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
import {Form, FormItem, Select} from 'element-ui';
import {getPermissionsList, createPermissions, updatePermissions,getPermissionsDetail ,removePermissions} from '@sdx/utils/src/api/manage';
import MessageBox from '@sdx/ui/components/message-box';
import ContentPanel from '@sdx/ui/components/content-panel';
import TabRadio from '@sdx/ui/components/tab-radio';

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
    },
    data() {
        return {
            searchPermissions: {
                name: '',
                start: 1,
                count: 10,
                objectType: 'user'
            },
            tableData: [],
            current: 1,
            pageSize: 10,
            total: 0,
            dialogVisible: false,
            data:[{
                unid: 1,
                label: '一级 1',
              
            }, {
                unid: 2,
                label: '一级 2',
                
            }, {
                unid: 3,
                label: '一级 3',
               
            }, {
                unid: 41,
                label: '一级 4',
               
            }], 
            tags: [],
            defaultKeys: [],
            treeNodeKey: 'unid',
            objValue: [],
            options: [
                {label: '角色1', value: 1},
                {label: '群组', value: 2},
                {label: '授权', value: 3}
            ]
        };
    },
    props: {
       
    },
    created() {
        this.authorizeList();
    },
    methods: {
        authorizeList() {
            getPermissionsList(this.searchPermissions)
                .then(data => {
                    this.tableData = data.permissions;
                    this.total = data.total;
                   
                });
        },
        currentChange() {
           
        },
        addAuthorize() {
           
            this.dialogVisible = true;
        },
        dialogConfirm() {

        },
        dialogCancel() {

        },
        searchName() {
            this.searchPermissions = Object.assign({}, this.searchPermissions, {
                name: this.searchPermissions.name,
                start:  1
            });
            this.roleList();
        },
        editRole() {
            
            this.dialogVisible = true;
                
        },
        removeRole() {
            MessageBox.confirm({
                title: `确定删除授权吗？`,
                content: '删除后不可恢复哦',
                type: 'alert'
            }).then(() => {
                // removeRoles(id)
                //     .then(() => {
                //         this.roleList();
                //     });
            }, () => {
                
            });
           
        }
    }
};
</script>


