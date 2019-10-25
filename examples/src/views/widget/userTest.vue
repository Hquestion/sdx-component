<template>
    <div class="userManage">
        <UserManage />
        <UserPicker v-model="data"></UserPicker>
    </div>
</template>

<script>
import UserManage from '@sdx/view/components/user-manage/src/Home';
import UserPicker from '@sdx/widget/components/user-picker';
export default {
    data () {
        return {
            data: {}
        };
    },
    components: {
        UserManage,
        UserPicker
    }
}
</script>
<style lang='scss' scoped>
.userManage{
    margin: 0 auto;
    width: 1180px;
    height:calc(100vh - 184px);
    box-shadow: 0 0 22px 0 rgba(206,213,221,0.27);
}

</style>
