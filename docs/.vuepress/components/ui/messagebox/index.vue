<template>
    <div class="index">
        <p>
            <Sdxu-button @click="onclick">默认提示（confirm）</Sdxu-button>
            <Sdxu-button @click="onclick1">alert success</Sdxu-button>
        </p>
        <p>
            <Sdxu-button @click="onclick2">MessageBox.confirm调用</Sdxu-button>
            <Sdxu-button @click="onclick3">MessageBox.confirm.warning调用</Sdxu-button>
        </p>
    </div>
</template>

<script>
import Button from '@sdx/ui/components/button';
import MessageBox from '@sdx/ui/components/message-box';
import Vue from 'vue';
Vue.use(MessageBox);

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
        },
        onclick1() {
            MessageBox({
                title: '确定删除吗？',
                content: '删除后将不可恢复',
                type: 'alert',
                status: 'success'
            });
        },
        onclick2() {
            MessageBox.confirm({
                title: '确定删除吗？',
                content: '删除后将不可恢复'
            });
        },
        onclick3() {
            MessageBox.confirm.warning({
                title: '确定删除吗？',
                content: '删除后将不可恢复',
                type: 'alert'
            }).then(() => {
                alert('你点击了确定');
            }, () => {
                alert('你点击了取消');
            });
        },
    }
}
</script>

<style lang="scss" scoped>

</style>
