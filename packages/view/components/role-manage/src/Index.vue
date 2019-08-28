<template>
    <SdxuContentPanel
        :title="t('widget.userInfo.noColonRole')"
        :fullscreen="true"
    >
        <div
            v-auth.user.button="'ROLE:READ'"
            class="sdxv-role-manage"
        >
            <div
                class="sdxv-role-manage__header"
            >
                <div class="sdxv-role-manage__handle">
                    <SdxwSearchLayout
                        @search="searchName"
                        :block="false"
                        align="right"
                    >
                        <SdxwSearchItem>
                            <SdxuInput
                                v-model="searchRoles.name"
                                type="search"
                                size="small"
                                :searchable="false"
                                :placeholder="t('view.authorizeManage.please_enter_the_role_name')"
                            />
                        </SdxwSearchItem>
                    </SdxwSearchLayout>
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
                        {{ t('view.authorizeManage.new_roles') }}
                    </sdxubutton>
                </div>
            </div>
            <div
                class="sdxv-role-manage__table"
                v-loading="roleLoading"
            >
                <SdxuTable
                    :data="tableData"
                    :default-sort="{prop: 'createdAt', order: 'descending'}"
                    @sort-change="handleSortChange"
                >
                    <el-table-column
                        prop="name"
                        :label="t('view.authorizeManage.role_name')"
                    />
                    <el-table-column
                        prop="description"
                        :label="t('view.authorizeManage.role_description')"
                    >
                        <template slot-scope="scope">
                            <SdxuTextTooltip
                                :content="scope.row.description"
                                content-key="description"
                            />
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="createdAt"
                        :label="t('view.image.Columns.createdAt')"
                        sortable
                    >
                        <template slot-scope="scope">
                            {{ dateFormatter(scope.row.createdAt) }}
                        </template>
                    </el-table-column>
                    <el-table-column
                        style="width: 15%"
                        :label="t('sdxCommon.Operation')"
                        v-auth.user.button="'ROLE:WRITE'"
                    >
                        <template
                            slot-scope="scope"
                            class="icon"
                        >
                            <SdxuIconButton
                                icon="sdx-icon sdx-icon-edit"
                                @click="editRole(scope.row.uuid)"
                                :title="t('sdxCommon.Edit')"
                                v-auth.user.button="'ROLE:WRITE'"
                                :disable="scope.row.initial"
                            />
                            <SdxuIconButton
                                icon="sdx-icon sdx-icon-delete"
                                v-auth.user.button="'ROLE:WRITE'"
                                @click="removeRole(scope.row.uuid, scope.row.name)"
                                :title="t('sdxCommon.Delete')"
                                :disable="scope.row.initial"
                            />
                        </template>
                    </el-table-column>
                </SdxuTable>
            </div>
        </div>
        <div
            class="sdxv-role-manage__pagination"
            slot="footer"
        >
            <sdxu-pagination
                v-if="total"
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
                {{ id ? t('view.authorizeManage.editorial_role') : t('view.authorizeManage.new_roles') }}
            </div>
            <div>
                <el-form
                    :label-width="lang$ === 'en' ? '140px' : '90px'"
                    :model="roleObj"
                    ref="currentRole"
                    :rules="rules"
                    @submit.native.prevent
                >
                    <el-form-item
                        :label="`${t('view.authorizeManage.role_name')}:`"
                        prop="name"
                    >
                        <SdxuInput
                            v-model="roleObj.name"
                            size="small"
                            :placeholder="t('view.authorizeManage.please_enter_the_role_name')"
                        />
                    </el-form-item>
                    <el-form-item
                        :label="`${t('view.authorizeManage.role_description')}:`"
                        prop="description"
                    >
                        <SdxuInput
                            type="textarea"
                            :placeholder="t('view.authorizeManage.please_enter_a_role_description')"
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
                    {{ t('sdxCommon.Cancel') }}
                </sdxubutton>
                <SdxuButton
                    type="primary"
                    size="small"
                    @click="dialogConfirm"
                >
                    {{ t('sdxCommon.Confirm') }}
                </sdxubutton>
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
import SdxuTextTooltip from '@sdx/ui/components/text-tooltip';
import locale from '@sdx/utils/src/mixins/locale';
import SdxuIconButton from '@sdx/ui/components/icon-button';
export default {
    name: 'SdxvRoleManage',
    mixins: [locale],
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
        SdxuTextTooltip,
        SdxuIconButton
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
                        message: this.t('view.authorizeManage.please_enter_the_role_name'),
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
                        message: this.t('view.authorizeManage.please_enter_a_role_description'),
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
            saveRoleObj: {},
            roleLoading: false
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
            this.roleLoading = true;
            getRolesList(this.searchRoles)
                .then(data =>{
                    this.tableData = data.roles;
                    this.total = data.total;
                    this.roleLoading = false;
                }, () => {
                    this.roleLoading = false;
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
                title: `${this.t('view.authorizeManage.determine_the_deletion_role')} ${name}?`,
                content: this.t('view.authorizeManage.this_action_deletes_the_authorization_items'),
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
