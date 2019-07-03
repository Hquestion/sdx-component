<template>
    <div
        class="sdxv-components-state"
        v-auth.system.button="'POD_STATE:READ'"
    >
        <SdxuContentPanel>
            <SdxuTabRadioGroup
                v-model="type"
                class="sdxv-components-state__tab"
            >
                <SdxuTabRadioItem name="base">
                    基础组件
                </SdxuTabRadioItem>
                <SdxuTabRadioItem name="system">
                    微服务组件
                </SdxuTabRadioItem>
            </SdxuTabRadioGroup>
            <SdxvComponentStateList :type="type" />
        </SdxuContentPanel>
    </div>
</template>

<script>
import TabRadio from '@sdx/ui/components/tab-radio';
import SdxuContentPanel from '@sdx/ui/components/content-panel';

import SdxvComponentStateList from './ComponentStateList';
import auth from '@sdx/widget/components/auth';

export default {
    name: 'SdxvComponentsState',
    components: {
        [TabRadio.TabRadioGroup.name]: TabRadio.TabRadioGroup,
        [TabRadio.TabRadioItem.name]: TabRadio.TabRadioItem,
        SdxvComponentStateList,
        SdxuContentPanel
    },
    directives: {
        auth
    },
    data() {
        return {
            type: 'base'
        };
    }
};
</script>

<style>

</style>
