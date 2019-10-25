<template>
    <div
        class="sidebar-item"
        :class="{'is-label': !!label, 'is-open': !!opened, 'is-terminal': name === 'SIDEBAR_TERMINAL'}"
        @click="handleSidebarClick"
    >
        <svg
            class="sdxu-dialog__sidebar"
            aria-hidden="true"
        >
            <use :xlink:href="`#${(icon === 'sdx-terminals-moren' && opened) ? 'sdx-terminals-xuanzhong' : icon}`" />
        </svg>
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
        padding: 0 12px;
        cursor: default;
        height: 100%;
        .sdxu-dialog__sidebar {
            width: 16px;
            height: 16px;
            transform: rotate(-90deg);
            color: rgb(171,181,206);
        }
        &.is-label {
            span {
                cursor: default;
                margin-left: 5px;
                font-size: 12px;
            }
        }
        &.is-open {
            background: #536694;
        }
        &.is-open.is-terminal {
            background: #394C7E;
            i::before {
                color:rgb(74,128,245) ;
            }
        }
        &.is-terminal {
            padding-right: 40px;
            .sdxu-dialog__sidebar {
                width: 72px;
                height: 72px;
            }
        }
    }
</style>
