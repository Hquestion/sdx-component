<template>
    <div
        class="sdxw-search-item"
        :style="`display: ${itemIndex < active.items ? 'inline-block' : 'none'}`"
    >
        <el-form-item
            :label="lable"
            v-show="itemIndex < active.items"
        >
            <slot />
        </el-form-item>
    </div>
</template>

<script>
import { Form, FormItem } from 'element-ui';
export default {
    name: 'SdxwSearchItem',
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
        lable: {
            type: String,
            default: ''
        },
        index: {
            type: Number,
            default: 0
        }
    }
};
</script>
