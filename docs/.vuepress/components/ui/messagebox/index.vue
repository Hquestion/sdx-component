<template>
    <div class="index">
        <Sdxu-button @click="onclick">弹出提示</Sdxu-button>
    </div>
</template>

<script>
import Button from '@sdx/ui/components/button';
import MessageBox from '@sdx/ui/components/message-box';
export default {
    name: 'index',
    data() {
        return {};
    },
    components: {
        [Button.name]: Button
    },
    methods: {
        onclick() {
            MessageBox({
                title: '确定删除吗？',
                content: '删除后将不可恢复'
            });
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
