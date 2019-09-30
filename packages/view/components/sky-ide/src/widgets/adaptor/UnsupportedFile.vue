<template>
    <div class="unsupported-file">
        {{ t('view.file.NotSupported') }}
    </div>
</template>

<script>
import locale from '@sdx/utils/src/mixins/locale';
export default {
    name: 'UnsupportedFile',
    data() {
        return {};
    },
    components: {},
    mixins: [locale]
};
</script>

<style scoped lang="scss">
.unsupported-file {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    // margin: 20px 0;
    color: #fff;
}
</style>
