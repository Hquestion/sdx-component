<template>
    <div class="dialog-test">
        <button @click="showSkyflow">
            进入skyflow
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
        showSkyflow() {
            this.$router.push({
                name: 'SdxvSkyflow'
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
