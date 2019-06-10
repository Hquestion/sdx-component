<template>
    <SdxuDialog class="sdxw-code-editor" :confirm-handler="handleSave">
        <codemirror v-model="mirrorCode"></codemirror>
    </SdxuDialog>
</template>

<script>
import SdxuDialog from '@sdx/ui/components/dialog';
import { codemirror } from 'vue-codemirror-lite';
import { isFunction } from '@sdx/utils/src/helper/tool';

export default {
    name: 'SdxwCodeEditor',
    data() {
        return {
            mirrorCode: ''
        };
    },
    components: {
        SdxuDialog,
        codemirror
    },
    props: {
        visible: {
            type: Boolean,
            default: false
        },
        title: {
            type: String,
            default: ''
        },
        saveHandler: {
            type: Function,
            default: undefined
        },
        code: {
            type: [String, Function],
            default: ''
        }
    },
    computed: {
        _visible: {
            get() {
                return this.visible;
            },
            set(val) {
                this.$emit('update:visible', val);
            }
        }
    },
    watch: {
        code: {
            immediate: true,
            handler(val) {
                if (isFunction(val)) {
                    const result = val();
                    if (result && result.then) {
                        result.then(res => {
                            this.mirrorCode = res || '';
                        });
                    } else {
                        this.mirrorCode = result || '';
                    }
                } else {
                    this.mirrorCode = val || '';
                }
            }
        }
    }
};
</script>

<style lang="scss" scoped>

</style>
