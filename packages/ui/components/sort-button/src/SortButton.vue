<template>
    <div class="sdxu-sort-button">
        <sdxu-button
            type="default"
            @click="sortChange"
        >
            {{ buttonTitle }}
            <i :class="['sdx-icon', 'sdx-Paixu1', _order === 'desc' ? 'is-active' : 'is-normal']" />
            <i :class="['sdx-icon' ,'sdx-Paixu', _order === 'asc' ? 'is-active' : 'is-normal']" />
        </sdxu-button>
    </div>
</template>

<script>
import Button from '@sdx/ui/components/button';
import locale from '@sdx/utils/src/mixins/locale';
import {t} from '@sdx/utils/src/locale';
export default {
    name: 'SdxuSortButton',
    props: {
        title: {
            type: String,
            default: ''
        },
        sortName: {
            type: String,
            default: () => t('ui.sortButton.createTime')
        },
        order: {
            type: String,
            default: ''
        }
    },
    mixins: [locale],
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
        },
        buttonTitle() {
            return this._order === 'desc' ? `${t('ui.sortButton.sortBy')}${this.sortName}${t('ui.sortButton.desc')}` : `${t('ui.sortButton.sortBy')}${this.sortName}${t('ui.sortButton.asc')}`;
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


