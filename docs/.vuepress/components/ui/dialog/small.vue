<template>
    <div class="general">
        <a @click.prevent="showDialog">
            点击打开small size并且自定义footer的Dialog
        </a>
        <ClientOnly>
        <SdxuDialog
            :visible.sync="dialogVisible"
            size='small'
        >
            <div slot="title">
                我是小尺寸对话框
            </div>
            <div>我是内容</div>
            <div slot="footer">
                我是footer
            </div>
        </SdxuDialog>
        </ClientOnly>
    </div>
</template>

<script>
import SdxuDialog from '../../src/ui/Dialog';
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
