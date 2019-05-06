<template>
    <div>
        <Transfer
            :data="data"
            :tags.sync="tags"
            :default-keys.sync="defaultKeys"
        />
    </div>
</template>

<script>
import Transfer from '@sdx/ui/components/transfer';
export default {
    data () {
        return {
            data:[{
                id: 1,
                label: '一级 1',
                children: [{
                    id: 4,
                    label: '二级 1-1',
                }]
            }, {
                id: 2,
                label: '一级 2',
                children: [{
                    id: 5,
                    label: '二级 2-1'
                }, {
                    id: 6,
                    label: '二级 2-2'
                }]
            }, {
                id: 3,
                label: '一级 3',
                children: [{
                    id: 7,
                    label: '二级 3-1'
                }, {
                    id: 8,
                    label: '二级 3-2'
                }]
            }, {
                id: 41,
                label: '一级 4',
                children: [{
                    id: 92,
                    label: '二级 4-1'
                }, {
                    id: 14,
                    label: '二级 4-2'
                }]
            }], 
            tags: [],
            defaultKeys: [14]
        };
    },
    components:{
        Transfer
    }
};
</script>

<style>

</style>
