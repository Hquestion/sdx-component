<template>
    <div class="sdxv-role-manage">
        <div class="sdxv-role-manage__header">
            <div class="sdxv-role-manage__title">
                <span>角色</span>
            </div>
            <div class="sdxv-role-manage__handle">
                <SdxuInput
                    v-model="searchRoles.name"
                    :searchable="true"
                    size="small"
                />
                <SdxuButton
                    type="primary"
                    size="small"
                    placement="right"
                    @click="addRole"
                >
                    <i
                        class="sdx-icon iconicon-plus"
                    />
                    新建角色
                </sdxubutton>
            </div>
        </div>
        <div class="sdxv-role-manage__table">
            <SdxuTable
                :data="tableData"  
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
                    prop="domain"
                    label="系统类别"
                />
                <el-table-column
                    prop="createdAt"
                    label="创建时间"
                />
                <el-table-column
                    style="width: 15%"
                    label="操作"
                >
                    <template
                        slot-scope="scope"
                        class="icon"
                    >
                        <i
                            class="sdx-icon iconicon-edit1 icon"
                            @click="editRole(scope.row.uuid)"
                        />
                        <i
                            class="sdx-icon iconicon-delete1 icon"
                            @click="removeRole(scope.row.uuid)"
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
            <sdxu-pagination
                :current-page.sync="current"
                :page-size="pageSize"
                :total="total"
                @current-change="currentChange"
            />
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
                        <el-input v-model="roleObj.name" />
                    </el-form-item>
                    <el-form-item
                        label="角色说明:"
                        prop="description"
                    >
                        <el-input
                            type="textarea"
                            v-model="roleObj.description"
                        />
                    </el-form-item>
                    <el-form-item
                        label="系统类别:"
                        prop="domain"
                    >
                        <el-input
                            v-model="roleObj.domain"
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
    </div>
</template>

<script>
import SdxuInput from '@sdx/ui/components/input';
import SdxuButton from '@sdx/ui/components/button';
import SdxuTable from '@sdx/ui/components/table';
import SdxuPagination from '@sdx/ui/components/pagination';
import SdxuDialog from '@sdx/ui/components/dialog';
import {Form, FormItem}  from 'element-ui';
import {getRolesList, createRoles, updateRoles, getRolesDetail, removeRoles} from '@sdx/utils/src/api/rolemange';
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
                domain: '',
                description: ''
            },
            searchRoles: {
                name: '',
                start: 1,
                count: 10,
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
                    }
                ],
                description: [
                    {
                        required: true,
                        message: '请输入角色说明',
                        trigger: 'blur',
                        transform(value) {
                            return value && ('' + value).trim();
                        }
                    }
                ],
                domain: [
                    {
                        required: true,
                        trigger: 'blur',
                    }
                ],
            },
            id: ''
        };
    },
    props: {
     
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
                    this.total = 123; //data.total
                });
        },
        addRole() {
            this.id = '';
            this.roleObj={ 
                name: '',
                permissions: [],
                domain: '',
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
                // 根据是否有id来判断是更新还是新建
                (this.id ? updateRoles(this.id, this.roleObj) : createRoles( this.roleObj))
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
                        domain: data.domain,
                        description: data.description
                    };
                    this.dialogVisible = true;
                });
        },
        removeRole(id) {
            removeRoles(id)
                .then(() => {
                    this.roleList();
                });
        }
    }
};
</script>
