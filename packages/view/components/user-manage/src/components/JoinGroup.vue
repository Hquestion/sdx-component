<template>
    <div>
        <sdxu-dialog
            :visible.sync="groupVisible"
            @close="close"
        >
            <div slot="title">
                加入组设置
            </div>
            <div class="join-group">
                <p>用户组：</p>
                <SdxuTransfer
                    :data="data"
                    :tags.sync="tags"
                    :default-keys.sync="defaultKeys"
                    :tree-node-key="treeNodeKey"
                />
            </div>
            <div slot="footer">
                <sdxu-button
                    type="default"
                    @click="close"
                >
                    取 消
                </sdxu-button>
                <sdxu-button
                    type="primary"
                    @click="confirm"
                >
                    确定
                </sdxu-button>
            </div>
        </sdxu-dialog>
    </div>
</template>

<script>
import SdxuTransfer from '@sdx/ui/components/transfer';
import { getGroups ,updataGroups } from '@sdx/utils/src/api/user';
export default {
    name:'JoinGroup',
    data () {
        return {
            groupVisible:true,
            data:[],
            tags: [],
            defaultKeys: [14],
            treeNodeKey: 'unid'
        };
    },
    methods:{
        _getGroups(){
            getGroups()
                .then(res=>{
                    res.groups.forEach((item,index)=>{
                        this.data.push({
                            unid:parseInt(index+1),
                            label:item.name
                        });
                    });
                });
        },
        close() {
            this.$emit('cancelJoinGroupDialog',false);
        },
        confirm(){
            updataGroups(this.$route.query.uuid)
                .then(res=>{
                    this.$message({
                        message: '修改成功',
                        type: 'success'
                    });
                });
            this.close();
        }

    },
    components: {
        SdxuTransfer
    },
    watch :{
        groupVisible(nVal) {

        }
    },
    mounted() {
        this._getGroups();
    }
};
</script>

<style lang='scss' scoped>
.join-group{
    width: 460px;
    display: flex;
    /deep/ .sdxu-transfer__moveicon{
        width: 40px;
        text-align: center;
    }
    p{
        min-width: 70px;
    }

}
</style>
