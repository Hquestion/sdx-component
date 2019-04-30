<template>
    <div class="docs-table"> 
        <SdxuTable
            :data="tableData"
            :highlight-key="'12'"
            :params="params"
        >
            <el-table-column type="expand">
                <template slot-scope="props">
                    <span>{{ props.row.desc }}</span>
                </template>
            </el-table-column>
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
        </SdxuTable>
    </div>
</template>

<script>
import SdxuTable from '@sdx/ui/components/table';
import { TableColumn } from 'element-ui';
export default {
    data () {
        return {
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
            params: {
            }
        };
    },
    components: {
        SdxuTable,
        [TableColumn.name]: TableColumn
    },
   
};
</script>

<style lang="stylus">
.docs-table {
    table {
        margin: 0;
        width 700px;
        td, th {
            border: none;
        }
    }
}
</style>

