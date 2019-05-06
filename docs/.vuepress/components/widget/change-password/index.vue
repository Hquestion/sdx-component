<template>
   <div class="breadcrumb-container">
       <button @click="changePwd">
            修改密码
        </button>
        <sdxw-change-password
            :visible.sync="dialogVisible"
        />
   </div>
</template>

<script>
import SdxwChangePassword from '@sdx/widget/components/changePassword';
export default {
  name: '',
    data() {
        return {
            dialogVisible: false
        };
    },
    components: {
        SdxwChangePassword
    },
    methods: {
        changePwd() {
            this.dialogVisible = true;
        }
    }
}
</script>

<style lang="scss">
.breadcrumb-container {

}
</style>
