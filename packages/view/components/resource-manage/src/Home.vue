<template>
    <div class="sdxv-source-manage-home">
        <ResourceTemplate />
        <PlaceholderBlock />
        <GlobalRulePanel v-auth.resource.button="'GLOBAL_STATE:READ'" />
        <PlaceholderBlock v-auth.resource.button="'GLOBAL_STATE:READ'" />
        <UserRightsPanel v-auth.resource.button="'USER_STATE:READ'" />
    </div>
</template>

<script>
import ResourceTemplate from './template/List';
import GlobalRulePanel from './rule/GlobalRulePanel';
import UserRightsPanel from './rights/UserRightsPanel';
import PlaceholderBlock from '@sdx/ui/components/placeholder-block';
import auth from '@sdx/widget/components/auth';
export default {
    name: 'SdxvSourceManageHome',
    data() {
        return {

        };
    },
    directives: {
        auth
    },
    components: {
        ResourceTemplate,
        GlobalRulePanel,
        UserRightsPanel,
        PlaceholderBlock
    }
};
</script>
