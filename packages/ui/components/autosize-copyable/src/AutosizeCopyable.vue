<template>
    <SdxuCopyable
        type="appender"
        :content="content"
        class="sdxu-autosize-copyable"
    >
        <SdxuInput
            size="regular"
            v-model="content"
            disabled
            autosize
            type="textarea"
            resize="none"
        />
    </SdxuCopyable>
</template>

<script>
import SdxuCopyable from '@sdx/ui/components/copyable';
import SdxuInput from '@sdx/ui/components/input';
export default {
    name: 'SdxuAutosizeCopyable',
    data() {
        return {};
    },
    components: {
        SdxuInput,
        SdxuCopyable
    },
    props: {
        value: {
            type: String,
            default: ''
        }
    },
    computed: {
        content: {
            get() {
                return this.value;
            },
            set(val) {
                this.$emit('input', val);
            }
        }
    }
};
</script>

<style lang="scss" scoped>
    .sdxu-autosize-copyable {
        & /deep/ {
            textarea {
                min-height: 40px !important;
                padding-top: 8px;
            }
        }
    }
</style>
