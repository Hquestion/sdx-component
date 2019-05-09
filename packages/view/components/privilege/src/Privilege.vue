<template>
    <div class="sdxv-privilege">
        <!-- <div class="sdxv-privilege__title">
            <span class="sdxv-privilege__title--text">
                权限
            </span>
        </div> -->
        <div class="sdxv-privilege__container">
            <!-- <div class="sdxv-privilege__container--bar">
                <sdxu-tab-radio-group v-model="activeTab">
                    <sdxu-tab-radio-item name="system">
                        系统基础权限
                    </sdxu-tab-radio-item>
                    <sdxu-tab-radio-item name="custom">
                        自定义权限
                    </sdxu-tab-radio-item>
                </sdxu-tab-radio-group>
            </div> -->
            <div class="sdxv-privilege__container--table">
                <transition name="fade">
                    <privilege-system v-if="activeTab === 'system'" />
                    <privilege-custom v-else />
                </transition>
            </div>
        </div>
    </div>
</template>

<script>
// import { TabRadioItem as SdxuTabRadioItem, TabRadioGroup as SdxuTabRadioGroup } from '@sdx/ui/components/tab-radio';
// import SdxuTabRadioItem from '@sdx/ui/components/tab-radio/src/TabRadio';
// import SdxuTabRadioGroup from '@sdx/ui/components/tab-radio/src/TabRadioGroup';
import PrivilegeCustom from './PrivilegeCustom';
import PrivilegeSystem from './PrivilegeSystem';


export default {
    name: 'SdxvPrivilege',
    components: {
        // SdxuTabRadioItem,
        // SdxuTabRadioGroup,
        PrivilegeCustom,
        PrivilegeSystem
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
