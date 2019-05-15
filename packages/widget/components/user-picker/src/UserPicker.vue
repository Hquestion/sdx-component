<template>
    <SdxuAutoComplete
        popper-class="sdxw-user-picker"
        v-model="data"
        :fetch-suggestions="guessUser"
        :placeholder="placeholder"
        @select="handleSelect"
        :trigger-on-focus="false"
        :popper-append-to-body="false"
        @blur="onBlur"
    >
        <template slot-scope="{ item }">
            <div class="sdxw-user-picker__user-tpl">
                <div
                    class="sdxw-user-picker__name"
                    v-text="item.name"
                />
                <div class="sdxw-user-picker__type">
                    {{ typeNameMap[item.gtype] }}
                </div>
            </div>
        </template>
    </SdxuAutoComplete>
</template>

<script>
import AutoComplete from '@sdx/ui/components/autocomplete';
import { getUserRoleGroupByName } from '@sdx/utils/src/api/user';

export default {
    name: 'SdxwUserPicker',
    data() {
        return {
            typeNameMap: {
                user: '用户',
                role: '角色',
                group: '用户组'
            }
        };
    },
    components: {
        [AutoComplete.name]: AutoComplete
    },
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
        guessUser(name, cb) {
            getUserRoleGroupByName(name, this.type).then(res => {
                cb(res);
            });
        },
        handleSelect(item) {
            this.data = item;
        },
        onBlur() {
            if (!this.value || !this.value.uuid) {
                this.$emit('input', undefined);
            }
        }
    }
};
</script>
