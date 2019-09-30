<template>
    <div class="skyide-bottom-bar">
        <SdxuButton
            @click="enterTensorBoard"
        >
            进入 TensorBoard
        </SdxuButton>
        <SdxuButton
            @click="modelAnalyze"
        >
            模型解析
        </SdxuButton>
    </div>
</template>

<script>
import SdxuButton from '@sdx/ui/components/button';
export default {
    name: 'BottomBar',
    components: {
        SdxuButton
    },
    inject: ['fileManager'],
    methods: {
        enterTensorBoard() {
            console.log('进入 TensorBoard');
        },
        modelAnalyze() {
            console.log('模型解析');
        }
    }
};
</script>

<style lang="scss" scoped>

</style>


