<template>
    <div
        class="sdxv-expand-collapse-toggler"
        :class="{'is-reverse': reverse}"
        @click="toggle"
    >
        <span>{{ label }}</span>
        <div class="sdxv-expand-collapse-toggler__icon">
            <i class="sdx-icon sdx-icon-arrow-down" />
        </div>
    </div>
</template>

<script>
export default {
    name: 'SdxvExpandCollapseToggler',
    data() {
        return {};
    },
    props: {
        expanded: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        label() {
            return this.expanded ? '收起': '展开';
        },
        reverse() {
            return this.expanded;
        }
    },
    methods: {
        toggle() {
            this.$emit('update:expanded', !this.expanded);
        }
    }
};
</script>

<style lang="scss" scoped>
    .sdxv-expand-collapse-toggler {
        display: inline-block;
        font-size: 12px;
        color: #fff;
        cursor: pointer;
        &:after {
            content: '\20';
            display: table;
        }
        &.is-reverse {
          .sdxv-expand-collapse-toggler__icon {
              transform: rotate(180deg);
          }
        }
        .sdxv-expand-collapse-toggler__icon {
            display: inline-block;
            margin-left: 6px;
            transition: transform ease-in .3s;
            i {
                font-size: 12px;
            }
        }
    }
</style>
