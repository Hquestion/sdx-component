<template>
    <div class="">
        <el-input
            type="textarea"
            autosize
            v-model="content"
        />
    </div>
</template>

<script>
export default {
    name: 'TxtRender',
    data() {
        return {
            content: ''
        };
    },
    components: {},
    props: {
        code: {
            type: [String, Function],
            default: ''
        },
        docItem: {
            type: Object,
            default: null
        }
    },
    methods: {
    },
    watch: {
        code: {
            immediate: true,
            handler(val) {
                this.content = val || '';
            }
        },
        content(nVal) {
            this.$emit('update:code', nVal);
            if (this.docItem.isEditing) return;
            this.$emit('handleEditing', this.docItem);
        }
    }
};
</script>

<style scoped lang="scss">
</style>
