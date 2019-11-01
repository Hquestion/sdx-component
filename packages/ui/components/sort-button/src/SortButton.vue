<template>
    <div class="sdxu-sort-button">
        <sdxu-button
            type="default"
            @click="sortChange"
        >
            {{ title }}
            <i :class="['sdx-icon', 'sdx-Paixu1', _order === 'desc' ? 'is-active' : 'is-normal']" />
            <i :class="['sdx-icon' ,'sdx-Paixu', _order === 'asc' ? 'is-active' : 'is-normal']" />
        </sdxu-button>
    </div>
</template>

<script>
import Button from '@sdx/ui/components/button';
export default {
    name: 'SdxuSortButton',
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
    computed: {
        _order: {
            get() {
                return this.order;
            },
            set(val) {
                this.$emit('update:order', val);
            }
        }
    },
    methods: {
        sortChange() {
            this._order = this._order === 'desc' ? 'asc' : 'desc';
            this.$emit('sortChange');
        }
    },
};
</script>


