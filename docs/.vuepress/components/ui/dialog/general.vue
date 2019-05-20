<template>
    <div class="general">
        <a @click.prevent="showDialog">
            点击打开Dialog
        </a>
        <ClientOnly>
            <SdxuDialog
                :visible.sync="dialogVisible"
            >
                <div slot="title">
                    我是标题
                </div>
                <div>我是内容</div>
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
