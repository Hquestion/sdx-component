<template>
    <sdxu-content-panel>
        <div class="sdxv-privilege">
            <!-- <div class="sdxv-privilege__--bar">
                <sdxu-tab-radio-group v-model="activeTab">
                    <sdxu-tab-radio-item name="system">
                        系统基础权限
                    </sdxu-tab-radio-item>
                    <sdxu-tab-radio-item name="custom">
                        自定义权限
                    </sdxu-tab-radio-item>
                </sdxu-tab-radio-group>
            </div> -->
            <transition name="fade">
                <privilege-system v-if="activeTab === 'system'" />
                <privilege-custom v-else />
            </transition>
        </div>
    </sdxu-content-panel>
</template>

<script>
// import TabRadio from '@sdx/ui/components/tab-radio';
import SdxuContentPanel from '@sdx/ui/components/content-panel';
import PrivilegeCustom from './PrivilegeCustom';
import PrivilegeSystem from './PrivilegeSystem';


export default {
    name: 'SdxvPrivilege',
    components: {
        // [TabRadio.TabRadioGroup.name]: TabRadio.TabRadioGroup,
        // [TabRadio.TabRadioItem.name]: TabRadio.TabRadioItem,
        PrivilegeCustom,
        PrivilegeSystem,
        SdxuContentPanel
    },
    data() {
        return {
            activeTab: 'system'
        };
    }
};
</script>

<style>

</style>
