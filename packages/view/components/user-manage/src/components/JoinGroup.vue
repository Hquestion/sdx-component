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
                <el-form
                    label-position="right"
                    :label-width="lang$ === 'en' ? '100px' : '70px'"
                    @submit.native.prevent
                >
                    <el-form-item
                        :label="t('view.userManage.UserGroup_colon')"
                    >
                        <SdxuTransfer
                            :data="data"
                            :tags.sync="tags"
                            :default-keys.sync="defaultKeys"
                            tree-node-key="uuid"
                        />
                    </el-form-item>
                </el-form>
            </div>
            <div slot="footer">
                <sdxu-button
                    type="default"
                    @click="close"
                >
                    {{ t('sdxCommon.Cancel') }}
                </sdxu-button>
                <sdxu-button
                    type="primary"
                    @click="confirm"
                >
                    {{ t('sdxCommon.Confirm') }}
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
import Form from 'element-ui/lib/form';
import FormItem from 'element-ui/lib/form-item';
export default {
    name:'JoinGroup',
    mixins: [locale],
    data () {
        return {
            groupVisible:true,
            data:[],
            tags: [],
            defaultKeys: []
        };
    },
    props: {
        user: {
            required: true,
            type: Object,
            default: () => ({})
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
        SdxuButton,
        [Form.name]: Form,
        [FormItem.name]: FormItem,
    },
    mounted() {
        this._getGroups();
    },
    created() {
        this.defaultKeys = this.user.groups.map(item => item.uuid);
    },
    
};
</script>

<style lang='scss' scoped>
.join-group{
    width: 100%;
    /deep/ .sdxu-transfer__moveicon{
        width: 40px;
        text-align: center;
    }
}
</style>
