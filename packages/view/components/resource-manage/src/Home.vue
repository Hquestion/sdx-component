<template>
    <div class="sdxv-source-manage-home">
        <ResourceTemplate />
        <PlaceholderBlock />
        <GlobalRulePanel />
    </div>
</template>

<script>
import ResourceTemplate from './template/List';
import GlobalRulePanel from './rule/GlobalRulePanel';
import PlaceholderBlock from '@sdx/ui/components/placeholder-block';
export default {
    name: 'SdxvSourceManageHome',
    data() {
        return {

        };
    },
    components: {
        ResourceTemplate,
        GlobalRulePanel,
        PlaceholderBlock
    }
};
</script>

<style lang="scss" scoped>

</style>
