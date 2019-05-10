<template>
    <div>
        <sdxw-userInfoDialog 
            @close="close"
            :visible.sync="userInfoVisible"
            :theme="theme"
            :id="id"
        />
    </div>
</template>

<script>
import { getUserDetail } from '@sdx/utils/src/api/user';
import SdxwUserInfoDialog from '@sdx/widget/components/userInfoDialog';
export default {
    name:'UserDetail',
    data () {
        return {
            userInfoVisible:true,
            theme:'user',
            id:''
        }
    },
    methods: {
        close() {
            this.$emit('cancelUserDetailDialog',false);
        },
        _getUserDetail() {
            getUserDetail(this.id)
                .then(( res ) => {
                    this.users = res; 
                    this.users.group = res.groupNames;
                    this.users.roles = res.roleNames;
                })
        }
    },
    mounted() {
        this.id = this.$route.query.uuid;
        this._getUserDetail();
    },
    components: {
        SdxwUserInfoDialog
    }
}
</script>

<style lang='scss' scoped>

 
</style>
