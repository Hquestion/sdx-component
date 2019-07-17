<template>
    <el-select
        class="env-select"
        popper-class="env-select__popper"
        v-model="__value"
        filterable
        multiple
        :placeholder="t('view.task.form.Please_select_the_data_source')"
    >
        <el-option
            v-for="option in options"
            :key="option.value"
            :value="option.value"
            :label="option.label"
        >
            <span
                class="label"
                v-text="option.label"
            />
            <ul class="detail">
                <li
                    v-for="item in option.conf"
                    :key="item.key"
                >
                    <span
                        class="detail__key"
                        v-text="option.tag+'_'+item.key"
                    />
                    <span
                        class="detail__value"
                        v-text="item.value"
                    />
                </li>
            </ul>
        </el-option>
    </el-select>
</template>

<script>

import { getTaskDataSource} from '@sdx/utils/src/api/project';
import locale from '@sdx/utils/src/mixins/locale';
export default {
    name: 'DataSourceSelect',
    mixins: [locale],
    props: {
        value: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {
            options: []
        };
    },
    created() {
        this.initOption();
    },
    computed: {
        __value: {
            get() {
                return this.value;
            },
            set(nval) {
                this.$emit('input', nval);
            }
        }
    },
    methods: {
        initOption() {
            getTaskDataSource()
                .then(data => {
                    this.options = data.data.options;
                });
        }
    }
};
</script>

<style lang="scss">
.env-select__popper {
    .el-select-dropdown__item {
        height: auto;
        border-bottom: 1px solid #e6eaf2;
        &:nth-last-child(1) {
            border-bottom: none;
        }
    }
    .detail {
        list-style: none;
        padding: 0;
        border-top: 1px dashed #e6eaf2;
        padding-bottom: 5px;
        li {
            padding: 0 40px;
            &:nth-child(2n) {
                background-color: rgba(#e6eaf2, 0.5);
            }
            span {
                display: inline-block;
            }
            .detail__key {
                color: #b8c3d9;
            }
            .detail__value {
                float: right;
                color: #b8c3d9;
            }
        }
    }
}
</style>
