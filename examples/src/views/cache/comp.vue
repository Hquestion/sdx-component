<template>
    <div>
        <Transfer
            :data="data"
            :tags.sync="tags"
            :default-keys.sync="defaultKeys"
            :tree-node-key="treeNodeKey"
        />
    </div>
</template>

<script>
import Transfer from '@sdx/ui/components/transfer';
export default {
    data () {
        return {
            data:[{
                unid: 1,
                label: '一级 1',
                children: [{
                    unid: 4,
                    label: '二级 1-1',
                }]
            }, {
                unid: 2,
                label: '一级 2',
                children: [{
                    unid: 5,
                    label: '二级 2-1'
                }, {
                    unid: 6,
                    label: '二级 2-2'
                }]
            }, {
                unid: 3,
                label: '一级 3',
                children: [{
                    unid: 7,
                    label: '二级 3-1'
                }, {
                    unid: 8,
                    label: '二级 3-2'
                }]
            }, {
                unid: 41,
                label: '一级 4',
                children: [{
                    unid: 92,
                    label: '二级 4-1'
                }, {
                    unid: 14,
                    label: '二级 4-2'
                }]
            }], 
            tags: [],
            defaultKeys: [14],
            treeNodeKey: 'unid'
        };
    },
    components:{
        Transfer
    }
};
</script>

<style>

</style>
