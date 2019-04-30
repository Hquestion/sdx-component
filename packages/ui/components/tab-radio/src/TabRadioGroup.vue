<template>
    <div class="sdxu-tab-radio-group">
        <slot />
    </div>
</template>

<script>
export default {
    name: 'SdxuTabRadioGroup',
    data() {
        return {
            active: {
                name: ''
            }
        };
    },
    provide() {
        return {
            active: this.active
        };
    },
    props: {
        value: {
            type: String,
            default: ''
        }
    },
    methods: {
        init() {
            const children = this.$children;
            if (this.value !== '') {
                this.active.name = this.value;
            } else {
                this.active.name = children[0] && children[0].name;
            }
            let widthList = children.map(item => item.$el.offsetWidth);
            const maxWidth = Math.max(...widthList);
            children.forEach(item => {
                item.$el.style.width = `${maxWidth}px`;
            });
        }
    },
    mounted() {
        this.init();
    },
    watch: {
        'active.name'(val, oldval) {
            if (val !== oldval) {
                this.$emit('input', val);
                // 抛出switch事件，便于在切换时做一些操作
                this.$emit('switch', val);
            }
        }
    }
};
</script>
