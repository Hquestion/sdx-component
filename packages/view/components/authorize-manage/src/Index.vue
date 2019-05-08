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
                    :icon-only="true"
                    placement="right"
                    @click="addAuthorize"
                >
                    <i
                        class="sdx-icon iconicon-plus"
                    />
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
import {manageApi} from '@sdx/utils/src/api/index';
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
            tableData: [{
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄',
                key: '11',      
                desc: ' 那 v 啊女啊 v 那 v 啊美女 v 女你说的 v 你是女 in 在 v 你是 v 好似 u 凤凰文化'
            }, {
                date: '2016-05-04',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1517 弄',
                key: '12',
                desc: ' 中均居本佛为国内外 i 我无关无关无关无关无关发刚拿上 v 女你说的 v 你是女 in 在 v 你是 v 好似 u 凤凰文化'
            }, {
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1519 弄',
                key: '14',
                desc: ' 关无关无高考文科贡嘎山的噶多少个民生凋敝民生凋敝没舍得不舍得把 v 说关无关无关发刚拿上 v 女你说的 v 你是女 in 在 v 你是 v 好似 u 凤凰文化'
            }, {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄',
                key: '15',
                desc: ' 中均居本佛为国内外 iv 你是女 in 在 v 你是 v 好似 u 凤凰文化'
            }],
            current: 1,
            pageSize: 10,
            total: 12,
            dialogVisible: false
        };
    },
    props: {
       
    },
    created() {
        manageApi.getPermissionsList()
            .then(data => {
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
