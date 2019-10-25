<template>
    <div>
        <sdxw-userInfoDialog
            @close="close"
            :visible.sync="userInfoVisible"
            theme="user"
            :user-info-data="userInfo"
        />
    </div>
</template>

<script>
import SdxwUserInfoDialog from '@sdx/widget/components/userinfo-dialog';
export default {
    name:'UserDetail',
    data () {
        return {
            userInfoVisible:true
        };
    },
    props: {
        user: {
            type: Object,
            default: () => ({})
        }
    },
    computed: {
        userInfo() {
            const roleNames = this.user.roles.map(item => item.name);
            const groupNames = this.user.groups.map(item => item.name);
            return Object.assign({}, this.user, {roleNames, groupNames});
        }
    },
    methods: {
        close() {
            this.$emit('cancelUserDetailDialog',false);
        }
    },
    components: {
        SdxwUserInfoDialog
    }
};
</script>

<style lang='scss' scoped>


</style>
