<template>
    <el-tabs
        v-bind="$attrs"
        v-on="$listeners"
        :class="['sdxu-tabs',
                 `sdxu-tabs--${tabStyle}`
        ]"
    >
        <slot />
    </el-tabs>
</template>
<script>
import ElTabs from 'element-ui/lib/tabs';
export default {
    name: 'SdxuTabs',
    components: {
        ElTabs
    },
    props: {
        tabStyle: {
            type: String,
            default: ''
        }
    }
};
</script>