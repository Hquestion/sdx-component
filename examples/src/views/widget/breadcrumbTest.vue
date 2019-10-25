<template>
    <div class="dialog-test">
        <sdxw-breadcrumb />
        <a @click.prevent="goToB">
            B页面
        </a>
        <router-view />
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
        goToB() {
            this.$router.push({
                name: '活动列表'
            });
        }
    }
};
</script>

<style lang="scss">
.dialog-test {
    height: 400px;
    width: 100%;
    border: 1px solid red;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
</style>
