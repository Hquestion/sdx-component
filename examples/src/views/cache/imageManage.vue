<template>
    <div class="table">
        <ImageManage />
    </div>
</template>

<script>
// import { RoleManage } from '@sdx/view';
import ImageManage from '@sdx/view/components/image-management';
export default {
    data () {
        return {
           
        };
    },
    components: {
        'ImageManage': ImageManage.ImageManagement
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
