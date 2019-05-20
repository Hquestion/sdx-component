<template>
    <div class="index">
        <SdxuUserAvatar name="张三"></SdxuUserAvatar>
    </div>
</template>

<script>
import UserAvatar from '../../src/ui/UserAvatar';
import PlaceholderBlock from '@sdx/ui/components/placeholder-block';
export default {
    name: 'index',
    data() {
        return {};
    },
    components: {
        [UserAvatar.name]: UserAvatar,
        [PlaceholderBlock.name]: PlaceholderBlock
    }
}
</script>

<style lang="scss" scoped>
.index {
    flex: 1;
}
</style>
