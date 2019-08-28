<template>
    <div
        class="sidebar-item"
        :class="{'is-label': !!label, 'is-open': !!opened}"
        @click="handleSidebarClick"
    >
        <i :class="[icon, 'sdx-icon']"></i>
        <span v-if="label">{{ label }}</span>
    </div>
</template>

<script>
export default {
    name: 'SidebarItem',
    props: {
        icon: {
            type: String,
            default: ''
        },
        label: {
            type: String,
            default: ''
        },
        name: {
            type: String,
            default: ''
        },
        active: {
            type: [String, Array],
            default: ''
        }
    },
    computed: {
        opened() {
            if (typeof this.active === 'string') {
                return this.active === this.name;
            } else {
                return this.active.includes(this.name);
            }
        }
    },
    methods: {
        handleSidebarClick() {
            this.$emit('toggle', this.name);
        }
    }
};
</script>

<style lang="scss" scoped>
    .sidebar-item {
        display: inline-flex;
        align-items: center;
        justify-content: flex-start;
        padding: 0 10px;
        cursor: default;
        height: 100%;
        i {
            font-size: 18px;
        }
        &.is-label {
            i {
                font-size: 12px;
            }
            span {
                cursor: default;
                margin-left: 5px;
                font-size: 12px;
            }
        }
        &.is-open {
            background: #dedede;
            color: #000;
        }
    }
</style>
