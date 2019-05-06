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
