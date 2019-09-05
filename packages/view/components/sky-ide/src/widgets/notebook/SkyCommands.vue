<template>
    <div class="sky-commands">
        <SdxuInput
            size="small"
            v-model="command"
        />
    </div>
</template>

<script>
import SdxuInput from '@sdx/ui/components/input';
export default {
    name: 'SkyCommands',
    components: {
        SdxuInput
    },
    data() {
        return {
            command: ''
        };
    }
};
</script>