<template>
    <div>
        <sdxu-dialog
            :visible.sync="groupVisible"
            @close="close"
        >
            <div slot="title">
                {{ t('view.userManage.JoinGroupSetting') }}
            </div>
            <div class="join-group">
                <p>{{ t('view.userManage.UserGroup') }}：</p>
                <SdxuTransfer
                    :data="data"
                    :tags.sync="tags"
                    :default-keys="defaultKeys"
                    tree-node-key="uuid"
                />
            </div>
            <div slot="footer">
                <sdxu-button
                    type="default"
                    @click="close"
                >
                    {{ t('Cancel') }}
                </sdxu-button>
                <sdxu-button
                    type="primary"
                    @click="confirm"
                >
                    {{ t('Confirm') }}
                </sdxu-button>
            </div>
        </sdxu-dialog>
    </div>
</template>

<script>
import SdxuTransfer from '@sdx/ui/components/transfer';
import { getGroups, updataUser } from '@sdx/utils/src/api/user';
import SdxuDialog from '@sdx/ui/components/dialog';
import SdxuButton from '@sdx/ui/components/button';
import locale from '@sdx/utils/src/mixins/locale';
export default {
    name:'JoinGroup',
    mixins: [locale],
    data () {
        return {
            groupVisible:true,
            data:[],
            tags: []
        };
    },
    props: {
        user: {
            required: true,
            type: Object,
            default: () => ({})
        }
    },
    computed: {
        defaultKeys() {
            return this.user.groups.map(item => item.uuid);
        }
    },
    methods:{
        _getGroups(){
            getGroups()
                .then(res=>{
                    this.data = res.groups.map(item => ({label: item.name, uuid: item.uuid}));
                });
        },
        close() {
            this.$emit('cancelJoinGroupDialog',false);
        },
        confirm(){
            updataUser(this.user.uuid, {
                groups: this.tags.map(item => item.uuid)
            }).then(()=>{
                this.$message({
                    message: this.t('view.userManage.UpdateSuccess'),
                    type: 'success'
                });
            });
            this.$emit('refresh');
            this.close();
        }

    },
    components: {
        SdxuTransfer,
        SdxuDialog,
        SdxuButton
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
    width: 100%;
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
