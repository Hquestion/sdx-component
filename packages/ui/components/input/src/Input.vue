<template>
    <div
        class="sdxu-input"
        :class="'sdxu-input--' + size"
    >
        <el-input
            v-bind="attrs"
            v-on="listeners"
            v-model="modelVaule"
            ref="input"
        >
            <template #prefix>
                <slot name="prefix" />
            </template>
            <template #suffix>
                <i
                    v-if="passwordVisibleness && !isDisabled"
                    class="sdx-icon sdxu-input__icon is-clickable"
                    :class="{'iconicon-eye-close': showPwd,
                             'iconicon-eye-open': showPwd}"
                    @click="showPwd = !showPwd"
                />
                <i
                    v-else-if="isSearchType"
                    class="sdx-icon sdxu-input__icon iconicon-search"
                    :class="{'is-clickable': searchable}"
                    @click="searchable ? $emit('search') : null"
                />
                <slot
                    v-else
                    name="suffix"
                />
            </template>
            <template #prepend>
                <slot name="prepend" />
            </template>
            <template #append>
                <slot name="append" />
            </template>
        </el-input>
        <div
            v-if="isPwdType && passwordStrength && pwdLevel"
            class="sdxu-input__pwd-strength"
        >
            <span
                class="sdxu-input__pwd-strength--bar"
                :class="levelClass(1)"
            />
            <span
                class="sdxu-input__pwd-strength--bar"
                :class="levelClass(2)"
            />
            <span
                class="sdxu-input__pwd-strength--bar"
                :class="levelClass(3)"
            />
        </div>
    </div>
</template>

<script>
export default {
    name: 'SdxuInput',
    inheritAttrs: false,
    props: {
        searchable: {
            type: Boolean,
            default: false
        },
        passwordVisibleness: {
            type: Boolean,
            default: false
        },
        passwordStrength: {
            type: Boolean,
            default: false
        },
        size: {
            type: String,
            default: 'regular',
            validator: function (value) {
                return ['regular', 'small'].includes(value);
            }
        }
    },
    data() {
        return {
            showPwd: false
        };
    },
    computed: {
        attrs() {
            // 处理$attrs
            const customAttr = {
                size: '', // 忽略element中size,
                'show-password': false // 忽略element中的show-password
            };
            if (this.$attrs.type === 'password') {
                customAttr['suffix-icon'] = '';
                customAttr['type'] = this.showPwd ? 'text' : 'password';
            } else if (this.$attrs.type === 'search') {
                customAttr['suffix-icon'] = '';
            }
            return Object.assign({}, this.$attrs, customAttr);
        },
        listeners() {
            // 处理$listeners
            const customListeners = {};

            return Object.assign({}, this.$listeners, customListeners);
        },
        isPwdType() {
            return this.$attrs.type === 'password';
        },
        isSearchType() {
            return this.$attrs.type === 'search';
        },
        modelVaule: {
            get() {
                return this.$attrs.value;
            },
            set(nval) {
                this.$emit('input', nval);
            }

        },
        pwdLevel() {
            let level = 0;
            const value = this.$attrs.value.trim();
            if (value.match(/[0-9]/g)) {
                level++;
            }
            if (value.match(/[A-z]/g)) {
                level++;
            }
            if (value.match(/[^0-9A-z\s]/g)) {
                level++;
            }
            if (value.length < 6 && value.length > 0) {
                level = 1;
            }
            return level;
        },
        isDisabled() {
            return this.$attrs.hasOwnProperty('disabled') && this.$attrs.disabled !== false;
        }
    },
    methods: {
        levelClass(n) {
            if (this.pwdLevel < n) {
                return 'is-none';
            } else if (this.pwdLevel === 1) {
                return 'is-weak';
            } else if (this.pwdLevel === 2) {
                return 'is-normal';
            } else if (this.pwdLevel === 3) {
                return 'is-strong';
            }
        }
    }
};
</script>

<style>

</style>
