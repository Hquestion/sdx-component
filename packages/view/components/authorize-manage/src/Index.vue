<template>
    <div class="sdxv-authorize-manage">
        <div class="sdxv-authorize-manage__header">
            <div class="sdxv-authorize-manage__title">
                授权管理
            </div>
            <div class="sdxv-authorize-manage__handle">
                <SdxuInput
                    v-model="value"
                    :searchable="true"
                    size="small"
                />
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
            </div>
        </div>
        <div class="sdxv-role-manage__table">
            <SdxuTable
                :data="tableData"  
            >
                <el-table-column
                    prop="date"
                    label="日期"
                />
                <el-table-column
                    prop="name"
                    label="姓名"
                />
                <el-table-column
                    prop="address"
                    label="地址"
                />
                <el-table-column type="expand">
                    <template slot-scope="props">
                        <span>{{ props.row.desc }}</span>
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
            @confirm="dialogConfirm"
            @cancel="dialogCancel"
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
                            size="small"
                            placeholder="请选择"
                        />
                    </el-form-item>
                    <el-form-item
                        label="权限设置"
                    >
                        <SdxuTransfer />
                    </el-form-item>
                </el-form>
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
import SdxuTransfer from '@sdx/ui/components/transfer';
import {Form, FormItem, Select} from 'element-ui';
import {getPermissionsList} from '@sdx/utils/src/api/manage';
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
    },
    data() {
        return {
            value: '',
            tableData: [],
            current: 1,
            pageSize: 10,
            total: 0,
            dialogVisible: false
        };
    },
    props: {
       
    },
    created() {
        getPermissionsList()
            .then(data => {
                this.tableData = data.permissions;
                this.total = data.total;
                console.log(data, 88);
            });
    },
    methods: {
        currentChange() {
            console.log(123);
        },
        addAuthorize() {
            console.log(123);
            this.dialogVisible = true;
        },
        dialogConfirm() {

        },
        dialogCancel() {

        }
    }
};
</script>
