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
        },
        dialogClose() {
            // console.log('dialogClose');
        },
        dialogClosed() {
            // console.log('dialogClosed');
        },
        dialogOpen() {
            // console.log('dialogOpen');
        },
        dialogOpened() {
            // console.log('dialogOpened');
        },
        dialogConfirm() {
            console.log('dialogConfirm');
        },
        dialogCancel() {
            console.log('dialogCancel');
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
