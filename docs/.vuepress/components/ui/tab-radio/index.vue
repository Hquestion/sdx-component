<template>
    <div class="tab-radio-demo">
        <SdxuTabRadioGroup v-model="activeTab1">
            <SdxuTabRadioItem name="1">你好中国</SdxuTabRadioItem>
            <SdxuTabRadioItem name="2">你好美国</SdxuTabRadioItem>
        </SdxuTabRadioGroup>
        <SdxuTabRadioGroup v-model="activeTab2">
            <SdxuTabRadioItem name="1" size="small">你好中国</SdxuTabRadioItem>
            <SdxuTabRadioItem name="2" size="small">你好美国</SdxuTabRadioItem>
            <SdxuTabRadioItem name="3" size="small">你好巴基斯坦</SdxuTabRadioItem>
        </SdxuTabRadioGroup>
    </div>
</template>

<script>
import SdxuTabRadioItem from '@sdx/ui/components/tab-radio/src/TabRadio';
import SdxuTabRadioGroup from '@sdx/ui/components/tab-radio/src/TabRadioGroup';
export default {
    name: 'index',
    data() {
        return {
            activeTab1: '1',
            activeTab2: '2'
        };
    },
    components: {
        SdxuTabRadioGroup,
        SdxuTabRadioItem
    }
}
</script>

<style lang="scss" scoped>

</style>
