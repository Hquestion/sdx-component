export default {
    'name': 'pane',
    'props': {
        'size': {
            'type': [Number, String],
            'required': false,
            'default': undefined
        },
        'minSize': {
            'type': [Number, String],
            'required': false,
            'default': 0
        },
        'maxSize': {
            'type': [Number, String],
            'required': false,
            'default': 100
        },
        visible: {
            type: Boolean,
            default: true
        }
    },
    'data': () => ({
        'style': {}
    }),
    'computed': {
        sizeNumber() {
            return parseFloat(this.size);
        },
        minSizeNumber() {
            return parseFloat(this.minSize);
        },
        maxSizeNumber() {
            return parseFloat(this.maxSize);
        }
    },
    'watch': {
        sizeNumber(size) {
            if (this.visible && size) {
                this.$el.setAttribute('data-origin-size', size);
            }
            this.$parent.requestUpdate({
                'target': this,
                size
            });
        },
        minSizeNumber(min) {
            this.$parent.requestUpdate({
                'target': this,
                min
            });
        },
        maxSizeNumber(max) {
            this.$parent.requestUpdate({
                'target': this,
                max
            });
        },
        visible: {
            immediate: false,
            handler(visible) {
                this.$parent.requestUpdateVisible({
                    'target': this,
                    visible
                });
            }

        }
    },
    'methods': {
        update(style) {
            this.style = {...style, display: this.visible ? '' : 'none'};
        }
    },
    render(h) {
        return h(
            'div',
            {
                'class': ['splitpanes__pane'],
                'style': this.style
            },
            this.$slots.default
        );
    }
};
