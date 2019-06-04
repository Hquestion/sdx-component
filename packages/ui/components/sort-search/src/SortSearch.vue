<template>
    <div class="sdxu-sort-search">
        <sdxu-button
            size="small"
            type="default"
            @click="sortChange"
        >
            {{ title }}
            <i :class="['sdx-icon', 'sdx-Paixu1', order === 'desc' ? 'is-active' : 'is-normal']" />
            <i :class="['sdx-icon' ,'sdx-Paixu', order === 'asc' ? 'is-active' : 'is-normal']" />
        </sdxu-button>
    </div>
</template>

<script>
import Button from '@sdx/ui/components/button';
export default {
    name: 'SdxuSortSearch',
    props: {
        title: {
            type: String,
            default: ''
        },
        order: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
        };
    },
    components: {
        [Button.name]: Button,
    },
    methods: {
        sortChange() {
            this.order = this.order === 'desc' ? 'asc' : 'desc';
            this.$emit('sortChange', this.order);
        }
    },
};
</script>


