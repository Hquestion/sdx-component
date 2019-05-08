<template>
    <div class="sdxv-role-manage">
        <div class="sdxv-role-manage__header">
            <div class="sdxv-role-manage__title">
                <span>角色</span>
            </div>
            <div class="sdxv-role-manage__handle">
                <SdxuInput
                    v-model="value"
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
                <el-table-column type="expand">
                    <template slot-scope="props">
                        <span>{{ props.row.description }}</span>
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
                新建角色
            </div>
            <div>我是内容</div>
        </sdxu-dialog>
    </div>
</template>

<script>
import SdxuInput from '@sdx/ui/components/input';
import SdxuButton from '@sdx/ui/components/button';
import SdxuTable from '@sdx/ui/components/table';
import SdxuPagination from '@sdx/ui/components/pagination';
import SdxuDialog from '@sdx/ui/components/dialog';
import {getRolesList} from '@sdx/utils/src/api/rolemange';
export default {
    name: 'SdxvRoleManage',
    components: {
        SdxuInput,
        SdxuButton,
        SdxuTable,
        SdxuPagination,
        SdxuDialog
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
        getRolesList()
            .then(data =>{
                this.tableData = data.roles;
                this.total = data.total;
            });
           
       
    },
    methods: {
        currentChange() {
            console.log(123);
        },
        addRole() {
            this.dialogVisible = true;
        },
        dialogConfirm() {

        },
        dialogCancel() {

        }
    }
};
</script>
