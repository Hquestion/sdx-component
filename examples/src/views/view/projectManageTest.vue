<template>
    <div class="dialog-test">
        <button @click="showProjectManage">
            进入项目管理
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
        showProjectManage() {
            this.$router.push({
                name: 'SdxvProjectManagement'
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
