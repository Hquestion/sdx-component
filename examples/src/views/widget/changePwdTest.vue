<template>
    <div class="dialog-test">
        <button @click="changePwd">
            修改密码
        </button>
        <sdxw-change-password
            :visible.sync="dialogVisible"
        />
    </div>
</template>

<script>
export default {
    name: '',
    data() {
        return {
            dialogVisible: false
        };
    },
    components: {},
    methods: {
        changePwd() {
            this.dialogVisible = true;
        }
    }
};
</script>

<style scoped lang="scss">
.dialog-test {
    height: 400px;
    width: 100%;
    border: 1px solid red;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
