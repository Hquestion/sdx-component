<template>
    <div class="table">
        <RoleManage />
    </div>
</template>

<script>
// import { RoleManage } from '@sdx/view';
import RoleManage from '@sdx/view/components/roleManage';
export default {
    data () {
        return {
           
        };
    },
    components: {
        'RoleManage': RoleManage.RoleManage
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
