<template>
    <div class="sdxw-task-start-dialog">
        <SdxuButton @click="handleClick">运行</SdxuButton>
    </div>
</template>

<script>
import SdxuButton from '@sdx/ui/components/button';
import SdxwTaskStartDialog from '@sdx/widget/components/task-start-dialog';

export default {
    name: 'TaskStartDialogDemo',
    components: {
        SdxuButton
    },
    methods: {
        handleClick() {
            SdxwTaskStartDialog({ visible: true, autoImage: {image_update_time: '2019-06-06 14:00:00'}, image: {image_name: 'tensorflow1.12.0_py3.6_cpu_dsad'} }).then(data => {
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
