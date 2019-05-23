<template>
    <div class="index">
        <SdxwFoldLabelGroup :list="list"></SdxwFoldLabelGroup>
        <p>
            <SdxwFoldLabelGroup :list="list" mode="inline"></SdxwFoldLabelGroup>
        </p>
        <p>
            <SdxwFoldLabelGroup :list="list3" mode="inline"></SdxwFoldLabelGroup>
        </p>
        <p>
            <SdxwFoldLabelGroup :list="list" mode="inline" type="default"></SdxwFoldLabelGroup>
        </p>
        <p>
            <SdxwFoldLabelGroup mode="list">
                <SdxwFoldLabel :plain="true" type="create">创建</SdxwFoldLabel>
                <SdxwFoldLabel :plain="true" type="processing" status="loading">启动中</SdxwFoldLabel>
                <SdxwFoldLabel :plain="true" type="running" status="loading">运行中</SdxwFoldLabel>
                <SdxwFoldLabel :plain="true" type="finish">已完成</SdxwFoldLabel>
                <SdxwFoldLabel :plain="true" type="dying" status="loading">终止中</SdxwFoldLabel>
                <SdxwFoldLabel :plain="true" type="die">已终止</SdxwFoldLabel>
                <SdxwFoldLabel :plain="true" type="exception" status="warning">启动异常</SdxwFoldLabel>
                <SdxwFoldLabel :plain="true" type="error" status="warning">失败</SdxwFoldLabel>
            </SdxwFoldLabelGroup>
        </p>
        <SdxwFoldLabel :plain="true" type="exception" status="warning">启动异常</SdxwFoldLabel>
        <SdxwFoldLabel :plain="true" type="error" status="warning">失败</SdxwFoldLabel>
    </div>
</template>

<script>
import FoldLabel from '@sdx/widget/components/fold-label'
export default {
    name: 'index',
    data() {
        return {
            list: [
                '我是角色',
                '我是角色',
                '我是角色',
                '我是角色',
                '我是角色',
                '我是角色'
            ],
            list3: [
                '我是角色',
                '我是角色',
                '我是角色'
            ]
        };
    },
    components: {
        [FoldLabel.FoldLabel.name]: FoldLabel.FoldLabel,
        [FoldLabel.FoldLabelGroup.name]: FoldLabel.FoldLabelGroup,
    }
}
</script>

<style lang="scss" scoped>
    .index {
        width: 400px;
    }
</style>
