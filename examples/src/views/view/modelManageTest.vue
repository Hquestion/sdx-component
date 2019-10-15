<template>
    <div class="dialog-test">
        <button @click="showModelManage">
            进入模型管理
        </button>
        <router-view />
    </div>
</template>

<script>
export default {
    name: '',
    data() {
        return {
        };
    },
    components: {},
    methods: {
        showModelManage() {
            this.$router.push({
                name: 'SdxvModelManage'
            });
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
