<template>
    <div class="sdxv-role-manage">
        <SdxuContentPanel
            title="角色"
            v-auth.user.button="'ROLE:READ'"
        >
            <div class="sdxv-role-manage__header">
                <div class="sdxv-role-manage__handle">
                    <SdxuButton
                        type="primary"
                        size="small"
                        placement="right"
                        @click="addRole"
                        v-auth.user.button="'ROLE:WRITE'"
                    >
                        <i
                            class="sdx-icon sdx-icon-plus"
                        />
                        新建角色
                    </sdxubutton>
                    <SdxwSearchLayout
                        @search="searchName"
                        :block="false"
                        align="right"
                        style="flex: 1"
                    >
                        <SdxwSearchItem>
                            <SdxuInput
                                v-model="searchRoles.name"
                                type="search"
                                size="small"
                                :searchable="false"
                                placeholder="请输入角色名"
                            />
                        </SdxwSearchItem>
                    </SdxwSearchLayout>
                </div>
            </div>
            <div class="sdxv-role-manage__table">
                <SdxuTable
                    :data="tableData"
                    :default-sort="{prop: 'createdAt', order: 'descending'}"
                    @sort-change="handleSortChange"
                >
                    <el-table-column
                        prop="name"
                        label="角色名"
                    />
                    <el-table-column
                        prop="description"
                        label="角色说明"
                    />
                    <el-table-column
                        prop="createdAt"
                        label="创建时间"
                        sortable
                    >
                        <template slot-scope="scope">
                            {{ dateFormatter(scope.row.createdAt) }}
                        </template>
                    </el-table-column>
                    <el-table-column
                        style="width: 15%"
                        label="操作"
                        v-auth.user.button="'ROLE:WRITE'"
                    >
                        <template
                            slot-scope="scope"
                            class="icon"
                        >
                            <i
                                class="sdx-icon sdx-icon-edit icon"
                                @click="editRole(scope.row.uuid)"
                            />
                            <i
                                class="sdx-icon sdx-icon-delete icon"
                                @click="removeRole(scope.row.uuid, scope.row.name)"
                            />
                        </template>
                    </el-table-column>
                    <el-table-column
                        type="expand"
                    >
                        <template slot-scope="props">
                            <div class="expand">
                                <span>角色说明:</span>
                                <span>{{ props.row.description }}</span>
                            </div>
                        </template>
                    </el-table-column>
                </SdxuTable>
                <div class="sdxv-role-manage__pagination">
                    <sdxu-pagination
                        v-if="total"
                        :current-page.sync="current"
                        :page-size="pageSize"
                        :total="total"
                        @current-change="currentChange"
                    />
                </div>
            </div>
            <sdxu-dialog
                :visible.sync="dialogVisible"
                @open="resetForm()"
            >
                <div slot="title">
                    {{ id ? '编辑角色': '新建角色' }}
                </div>
                <div>
                    <el-form
                        label-width="100px"
                        :model="roleObj"
                        ref="currentRole"
                        :rules="rules"
                        @submit.native.prevent
                    >
                        <el-form-item
                            label="角色名:"
                            prop="name"
                        >
                            <SdxuInput
                                v-model="roleObj.name"
                                size="small"
                                placeholder="请输入角色名"
                            />
                        </el-form-item>
                        <el-form-item
                            label="角色说明:"
                            prop="description"
                        >
                            <SdxuInput
                                type="textarea"
                                placeholder="请输入角色说明"
                                v-model="roleObj.description"
                            />
                        </el-form-item>
                    </el-form>
                </div>
                <div slot="footer">
                    <SdxuButton
                        type="default"
                        size="small"
                        @click="dialogCancel"
                    >
                        取消
                    </sdxubutton>
                    <SdxuButton
                        type="primary"
                        size="small"
                        @click="dialogConfirm"
                    >
                        确定
                    </sdxubutton>
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
import MessageBox from '@sdx/ui/components/message-box';
import ContentPanel from '@sdx/ui/components/content-panel';
import Form from 'element-ui/lib/form';
import FormItem from 'element-ui/lib/form-item';
import {getRolesList, createRoles, updateRoles, getRolesDetail, removeRoles} from '@sdx/utils/src/api/rolemange';
import {dateFormatter} from '@sdx/utils/src/helper/transform';
import SearchLayout from '@sdx/widget/components/search-layout';
import auth from '@sdx/widget/components/auth';
import { nameWithChineseValidator,descValidator} from '@sdx/utils/src/helper/validate';
import { removeSameAttr } from '@sdx/utils/src/helper/tool';
export default {
    name: 'SdxvRoleManage',
    components: {
        SdxuInput,
        SdxuButton,
        SdxuTable,
        SdxuPagination,
        SdxuDialog,
        [Form.name]:Form,
        [FormItem.name]:FormItem,
        [ContentPanel.name]: ContentPanel,
        [SearchLayout.SearchLayout.name]: SearchLayout.SearchLayout,
        [SearchLayout.SearchItem.name]: SearchLayout.SearchItem,
    },
    data() {
        return {
            value: '',
            tableData: [],
            current: 1,
            pageSize: 10,
            total: 0,
            dialogVisible: false,
            roleObj: {
                name: '',
                permissions: [],
                description: ''
            },
            searchRoles: {
                name: '',
                start: 1,
                count: 10,
                order: 'desc',
                orderBy: 'createdAt'
            },
            rules: {
                name: [
                    {
                        required: true,
                        message: '请输入角色名',
                        trigger: 'blur',
                        transform(value) {
                            return value && ('' + value).trim();
                        }
                    },
                    { validator: nameWithChineseValidator, trigger: 'blur' }
                ],
                description: [
                    {
                        required: true,
                        message: '请输入角色说明',
                        trigger: 'blur',
                        transform(value) {
                            return value && ('' + value).trim();
                        }
                    },
                    { validator: descValidator, trigger: 'blur' }
                ]
            },
            id: '',
            options: [],
            saveRoleObj: {}
        };
    },
    directives: {
        auth
    },
    created() {
        this.roleList();
    },
    methods: {
        currentChange() {
            this.searchRoles = Object.assign({}, this.searchRoles, {
                start: (this.current - 1) * 10 + 1
            });
            this.roleList();
        },
        roleList() {
            getRolesList(this.searchRoles)
                .then(data =>{
                    this.tableData = data.roles;
                    this.total = data.total;
                });
        },
        addRole() {
            this.id = '';
            this.roleObj={
                name: '',
                permissions: [],
                description: ''
            };
            this.dialogVisible = true;
        },
        resetForm() {
            this.$refs.currentRole && this.$refs.currentRole.resetFields();
        },
        dialogConfirm() {
            this.$refs.currentRole.validate(valid => {
                if (!valid) {
                    this.dialogVisible = true;
                    return false;
                }
                // 传变化的值给后端
                let params = removeSameAttr(this.saveRoleObj, this.roleObj);
                // 根据是否有id来判断是更新还是新建
                (this.id ? updateRoles(this.id, params) : createRoles( this.roleObj))
                    .then((data) => {
                        this.dialogVisible = false;
                        this.resetForm();
                        if (data.uuid) {
                            this.roleList();
                        }
                    });
            });
        },
        dialogCancel() {
            this.resetForm();
            this.dialogVisible = false;
        },
        editRole(id) {
            getRolesDetail(id)
                .then(data => {
                    this.id = data.uuid;
                    this.roleObj = {
                        name: data.name,
                        permissions: [],
                        description: data.description
                    };
                    this.dialogVisible = true;

                    this.saveRoleObj = JSON.parse(JSON.stringify( this.roleObj));
                });
        },
        searchName() {
            this.searchRoles = Object.assign({}, this.searchRoles, {
                name: this.searchRoles.name,
                start:  1
            });
            this.roleList();
        },
        removeRole(id, name) {
            MessageBox.confirm({
                title: `确定删除角色${name}吗？`,
                content: '此操作会同时删除与此角色关联的授权项',
                type: 'alert'
            }).then(() => {
                removeRoles(id)
                    .then(() => {
                        this.roleList();
                    });
            }, () => {

            });

        },
        handleSortChange({order}) {
            if (!order) {
                return;
            }
            this.searchRoles.order =
                    order === 'descending' ? 'desc' : 'asc';
            this.roleList();
        },
        dateFormatter
    }
};
</script>
