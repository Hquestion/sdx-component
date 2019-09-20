<template>
    <div
        class="sidebar-item"
        :class="{'is-label': !!label, 'is-open': !!opened, 'is-terminal': name === 'SIDEBAR_TERMINAL'}"
        @click="handleSidebarClick"
    >
        <i :class="[icon, 'sdx-icon']" />
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
        padding: 0 20px;
        cursor: default;
        height: 100%;
        i {
            font-size: 18px;
            transform: rotate(-90deg);
            color: rgb(171,181,206);
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
            background: #536694;
            i {
                color:rgb(191,203,235) ;
            }
        }
        &.is-open.is-terminal {
            background: none;
            i::before {
                color:rgb(74,128,245) ;
            }
        }
        &.is-terminal {
            padding-right: 40px;
            i:before {
                color: #000;
                background: #fff;
                border-radius: 2px;
            }
        }
    }
</style>
