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
import SdxwChangePassword from '../../src/widget/change-password';
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
