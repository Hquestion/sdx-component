<template>
<div class="appender-main">
    <p>
        <SdxuAppender style="width: 500px;">
            <SdxuInput v-model="val" style="flex:1"></SdxuInput>
            <SdxuButton type="default" slot="postfix">创建项目</SdxuButton>
        </SdxuAppender>
    </p>
    <p>
        <SdxuAppender postfix="sdx-tiaofutishi" style="width: 500px">
            <SdxuInput v-model="val" style="flex:1"></SdxuInput>
        </SdxuAppender>
    </p>
    <p>
        <SdxuAppender prefix="sdx-tiaofutishi" style="width: 500px;">
            <SdxuInput v-model="val" style="flex: 1"></SdxuInput>
        </SdxuAppender>
    </p>
</div>
</template>

<script>
    import SdxuAppender from '@sdx/ui/components/appender';
    import SdxuInput from '@sdx/ui/components/input';
    import SdxuButton from '@sdx/ui/components/button';
    export default {
        name: 'index',
        components: {SdxuInput, SdxuAppender, SdxuButton},
        data() {
            return {
                val: ''
            }
        }
    };
</script>

<style scoped>

</style>
