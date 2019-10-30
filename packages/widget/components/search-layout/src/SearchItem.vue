<template>
    <div
        class="sdxw-search-item"
        v-show="visible"
    >
        <el-form-item
            :label="label"
            v-show="itemIndex < active.items"
        >
            <slot />
        </el-form-item>
    </div>
</template>

<script>
import Form from 'element-ui/lib/form';
import FormItem from 'element-ui/lib/form-item';
import emitter from '@sdx/utils/src/mixins/emitter';
export default {
    name: 'SdxwSearchItem',
    mixins: [emitter],
    inject: ['active'],
    data() {
        return {
            itemIndex: 0
        };
    },
    components: {
        [Form.name]: Form,
        [FormItem.name]: FormItem
    },
    props: {
        label: {
            type: String,
            default: ''
        },
        visible: {
            type: Boolean,
            default: true
        }
    },
    methods: {
        emitEnter(e) {
            if (e.keyCode  === 13) {
                this.$emit('enter');
            }
        }
    },
    watch: {
        visible: {
            immediate: true,
            handler(val) {
                if (val) {
                    this.dispatch('SdxwSearchLayout', 'add-item', this);
                } else {
                    this.dispatch('SdxwSearchLayout', 'remove-item', this);
                }
            }
        }
    },
    mounted() {
        this.$slots.default[0].elm.querySelector('input').addEventListener('keyup', this.emitEnter);
        this.dispatch('SdxwSearchLayout', 'add-item', this);
    },
    beforeDestroy() {
        this.$slots.default[0].elm.querySelector('input').removeEventListener('keyup', this.emitEnter);
        this.dispatch('SdxwSearchLayout', 'remove-item', this);
    }
};
</script>
