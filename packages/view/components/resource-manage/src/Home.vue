<template>
    <div class="sdxv-source-manage-home">
        <ResourceTemplate />
        <PlaceholderBlock />
        <GlobalRulePanel />
        <PlaceholderBlock />
        <UserRightsPanel />
    </div>
</template>

<script>
import ResourceTemplate from './template/List';
import GlobalRulePanel from './rule/GlobalRulePanel';
import UserRightsPanel from './rights/UserRightsPanel';
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
        UserRightsPanel,
        PlaceholderBlock
    }
};
</script>
