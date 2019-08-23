<template>
    <SdxuAutoComplete
        popper-class="sdxw-user-picker"
        v-model="data"
        :fetch-suggestions="guessUser"
        :placeholder="placeholder"
        @select="handleSelect"
        :trigger-on-focus="false"
        :popper-append-to-body="false"
        :popper-options="{forceAbsolute: true}"
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
                user: this.t('widget.userPicker.userName'),
                group: this.t('widget.userPicker.groupName'),
                role: this.t('widget.userPicker.roleName'),
                all: this.t('widget.userPicker.allRoleName'),
            };
            return `${this.t('widget.userPicker.plsEnter')}${textMap[this.type]}`;
        }
    },
    methods: {
        guessUser(name, cb) {
            getUserRoleGroupByName(name, this.type).then(res => {
                cb(res);
            }, () => {
                cb([]);
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
