<template>
    <div class="general">
        <a @click.prevent="showDialog">
            点击打开Dialog
        </a>
        <sdxu-dialog
            :visible.sync="dialogVisible"
        >
            <div slot="title">
                我是标题
            </div>
            <div>我是内容</div>
        </sdxu-dialog>
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
