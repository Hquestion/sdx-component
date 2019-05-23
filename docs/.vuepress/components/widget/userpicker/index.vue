<template>
    <div class="index">
        <UserPicker v-model="data"></UserPicker>
    </div>
</template>

<script>
import UserPicker from '@sdx/widget/components/user-picker';
export default {
    name: 'index',
    data() {
        return {
            data: {}
        };
    },
    components: {
        UserPicker
    }
}
</script>

<style lang="scss" scoped>
    .index {
        width: 80%;
    }
</style>
