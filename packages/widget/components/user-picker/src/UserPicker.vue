<template>
    <el-select
        popper-class="sdxw-user-picker"
        v-model="data"
        filterable
        remote
        :placeholder="placeholder"
        :remote-method="guessUser"
        :loading="loading"
        @change="handleSelect"
        @blur="onBlur"
        @focus="handleFocus"
    >
        <el-option
            v-for="item in options"
            :key="item.uuid"
            :label="item.name"
            :value="item">
            <div class="sdxw-user-picker__user-tpl">
                <div
                    class="sdxw-user-picker__name"
                    v-text="item.name"
                />
                <div class="sdxw-user-picker__type">
                    {{ typeNameMap[item.gtype] }}
                </div>
            </div>
        </el-option>
    </el-select>
</template>

<script>
import { getUserRoleGroupByName } from '@sdx/utils/src/api/user';
import locale from '@sdx/utils/src/mixins/locale';

export default {
    name: 'SdxwUserPicker',
    mixins: [locale],
    data() {
        return {
            typeNameMap: {
                user: this.t('widget.userPicker.User'),
                role: this.t('widget.userPicker.Role'),
                group: this.t('widget.userPicker.Group')
            },
            options: [],
            loading: false
        };
    },
    components: {},
    props: {
        type: {
            type: String,
            default: 'all' // user, role, group,all
        },
        value: {
            type: Object,
            default: undefined
        }
    },
    computed: {
        data: {
            get() {
                return this.value && this.value.name;
            },
            set(val) {
                if (val === undefined) {
                    this.$emit('input', undefined);
                    return;
                }
                if (typeof val === 'string') {
                    this.$emit('input', {name: val});
                } else {
                    this.$emit('input', {name: val.name, uuid: val.uuid});
                }
            }
        },
        placeholder() {
            const textMap = {
                user: '用户名',
                group: '用户组名',
                role: '角色名',
                all: '用户/用户组/角色名称'
            };
            return `请输入${textMap[this.type]}`;
        }
    },
    methods: {
        guessUser(name) {
            this.loading = true;
            getUserRoleGroupByName(name, this.type).then(res => {
                this.options = res;
                this.loading = false;
            }, () => {
                this.options = [];
                this.loading = false;
            });
        },
        handleSelect(item) {
            this.data = item;
        },
        onBlur() {
            if (!this.value || !this.value.uuid) {
                this.$emit('input', undefined);
            }
        },
        handleFocus() {
            this.options = [];
        }
    }
};
</script>
