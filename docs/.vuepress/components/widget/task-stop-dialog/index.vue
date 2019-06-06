<template>
    <div class="sdxw-task-stop-dialog">
        <SdxuButton @click="handleClick">停止</SdxuButton>
    </div>
</template>

<script>
import SdxuButton from '@sdx/ui/components/button';
import SdxwTaskStopDialog from '@sdx/widget/components/task-stop-dialog';

export default {
    name: 'TaskStopDialogDemo',
    components: {
        SdxuButton
    },
    methods: {
        handleClick() {
            SdxwTaskStopDialog({ visible: true }).then(data => {
                console.log(data);
            }).catch(err => {
                console.error(err);
            })
        }
    }
}
</script>

<style lang="scss">
</style>
