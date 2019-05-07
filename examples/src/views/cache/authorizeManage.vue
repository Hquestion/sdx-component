<template>
    <div class="table">
        <AuthorizeManage />
    </div>
</template>

<script>
// import { RoleManage } from '@sdx/view';
import AuthorizeManage from '@sdx/view/components/authorizeManage';
export default {
    data () {
        return {
        };
    },
    components: {
        'AuthorizeManage': AuthorizeManage.AuthorizeManage
    },
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.table {
    background: #fafbfc;
    height: 100vh;
    width: 100%;
}
</style>
