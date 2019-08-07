<template>
    <div
        class="sdxw-search-item"
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
        label: {
            type: String,
            default: ''
        }
    }
};
</script>
