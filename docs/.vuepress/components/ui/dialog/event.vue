<template>
    <div class="general">
        <a @click.prevent="showDialog">
            监听默认按钮点击
        </a>
        <SdxuDialog
            :visible.sync="dialogVisible"
            @confirm="confirmClicked"
            @cancel="cancelClicked"
        >
            <div slot="title">
                我是标题
            </div>
            <div>我是内容</div>
        </SdxuDialog>
    </div>
</template>

<script>
import SdxuDialog from '@sdx/ui/components/dialog';
export default {
    data() {
        return {
            dialogVisible: false
        };
    },
    components: {
        SdxuDialog
    },
    methods: {
        showDialog() {
            this.dialogVisible = true;
        },
        confirmClicked() {
            alert('你点击了确认按钮')
        },
        cancelClicked() {
            alert('你点击了取消按钮')
        }
    }
}
</script>

<style lang="scss" scoped>
.general {
    a:hover {
        cursor: pointer;
    }
}
</style>
