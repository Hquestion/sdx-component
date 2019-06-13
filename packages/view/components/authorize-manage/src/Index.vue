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
                                @click="edit()"
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
import Select from 'element-ui/lib/select';
import Form from 'element-ui/lib/form';
import FormItem from 'element-ui/lib/form-item';
import {getUserProfilesList, getGroupProfilesList} from '@sdx/utils/src/api/manage';
import {updataUser} from '@sdx/utils/src/api/user';
import MessageBox from '@sdx/ui/components/message-box';
import ContentPanel from '@sdx/ui/components/content-panel';
import TabRadio from '@sdx/ui/components/tab-radio';
import FoldLabel from '@sdx/widget/components/fold-label';
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
    },
    data() {
        return {
            searchPermissions: {
                name: '',
                start: 1,
                count: 10,
                order: 'desc',
                orderBy: 'updatedAt'
            },
            objectType: 'user',
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
        this.userList();
    },
    methods: {
        userList() {
            getUserProfilesList(this.searchPermissions)
                .then(data => {
                    this.tableData = data.users;
                    this.total = data.total;

                });
        },
        groupList() {
            getGroupProfilesList(this.searchPermissions)
                .then(data => {
                    this.tableData = data.groups;
                    this.total = data.total;

                });
        },
        switchTab(name) {
            this.searchPermissions.name = '';
            if(name === 'user') {
                this.userList();
            } else if (name === 'group') {
                this.groupList();
            }
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
        edit() {

            this.dialogVisible = true;

        },
        remove(id, name) {
            MessageBox.confirm({
                title: `确定删除授权${name}吗？`,
                content: '删除后不可恢复哦',
                type: 'alert'
            }).then(() => {
                if(this.objectType === 'user') {
                    updataUser(id, {  permissions: []})
                        .then(()=> {
                            this.userList();
                        });
                }
            }, () => {

            });

        }
    }
};
</script>
