<template>
    <div class="dialog-test">
        <button @click="showDialog">
            打开对话框
        </button>
        <sdxu-dialog
            :visible.sync="dialogVisible"
            @close="dialogClose"
            @closed="dialogClosed"
            @open="dialogOpen"
            @opened="dialogOpened"
        >
            <div slot="title">
                我是标题
            </div>
            <div>我是内容1111我是内容1111我是内容1111我是内容1111我是内容1111我是内容1111我是内容1111我是内容1111我是内容1111我是内容1111我是内容1111我是内容1111我是内容1111</div>
            <div slot="footer">
                我是footer
            </div>
        </sdxu-dialog>
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
        showDialog() {
            this.dialogVisible = true;
        },
        dialogClose() {
            console.log('dialogClose');
        },
        dialogClosed() {
            console.log('dialogClosed');
        },
        dialogOpen() {
            console.log('dialogOpen');
        },
        dialogOpened() {
            console.log('dialogOpened');
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
