<template>
    <div class="index">
        <SdxuEmpty></SdxuEmpty>
        <SdxuEmpty>自定义内容</SdxuEmpty>
    </div>
</template>

<script>
import Empty from '@sdx/ui/components/empty';
export default {
    name: 'index',
    data() {
        return {};
    },
    components: {
        [Empty.name]: Empty
    }
}
</script>

<style lang="scss" scoped>

</style>
