<template>
    <div class="about">
        <h1>This is an about page</h1>
        <SdxuButton :loading="false" :plain="false" type="default" :invert="true" :shadow="true">你好</SdxuButton>
    </div>
</template>
<script>
import SdxuButton from '@sdx/ui/components/button';
export default {
    name: 'About',
    data() {
        return {};
    },
    components: {
        SdxuButton
    }
};
</script>
