<template>
    <div class="index">
        <SdxwFileSelect></SdxwFileSelect>
    </div>
</template>

<script>
import FileSelect from '../../src/widget/file-select';
export default {
    name: 'index',
    data() {
        return {};
    },
    components: {
        [FileSelect.FileSelectMix.name]: FileSelect.FileSelectMix
    }
}
</script>

<style lang="scss" scoped>

</style>
