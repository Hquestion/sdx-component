<script>
export default {
    name: 'SdxuEllipseBreadcrumb',
    data() {
        return {};
    },
    props: {
        breadcrumb: {
            type: Array,
            default() {
                return [];
            }
        },
        maxVisible: {
            type: Number,
            default: 7
        }
    },
    render(createElement, context) {
        const { breadcrumb } = this;
        const handleClick = (item) => this.$emit('nav', item);
        const breadcrumbItem = (item, ignoreLastArrow) => {
            return (
                <div class="sdxu-ellipse-breadcrumb__item" vOn:click={() => !ignoreLastArrow && handleClick(item)}>
                    <div class={{'sdxu-ellipse-breadcrumb__name': true, 'is-last': !!ignoreLastArrow}}> { item.name } </div>
                    {!ignoreLastArrow  && (<div class="sdxu-ellipse-breadcrumb__split">/</div>) }
                </div>
            );
        };
        const make = () => {
            if (breadcrumb.length > this.maxVisible) {
                const leftList = breadcrumb.slice(0, Math.floor(this.maxVisible / 2));
                const rightList = breadcrumb.slice(breadcrumb.length - Math.floor(this.maxVisible / 2), breadcrumb.length);
                const middle = breadcrumb[Math.floor(breadcrumb.length / 2)];
                return (
                    <div class="sdxu-ellipse-breadcrumb">
                        {leftList.map(item => breadcrumbItem(item))}
                        ...
                        <div class="sdxu-ellipse-breadcrumb__split">/</div>
                        {breadcrumbItem(middle)}
                        ...
                        <div class="sdxu-ellipse-breadcrumb__split">/</div>
                        {rightList.map((item, index) => breadcrumbItem(item, index === rightList.length - 1))}
                    </div>
                );
            } else {
                return (
                    <div class="sdxu-ellipse-breadcrumb">
                        {
                            breadcrumb.map((item, index) => breadcrumbItem(item, index === breadcrumb.length - 1))
                        }
                    </div>
                );
            }
        };
        return (make());
    }
};
</script>

<style lang="scss" scoped>
    @import "~@sdx/utils/src/theme-common/var";
    .sdxu-ellipse-breadcrumb {
        font-size: 14px;
        .sdxu-ellipse-breadcrumb__item {
            display: inline-block;
            .sdxu-ellipse-breadcrumb__name {
                display: inline-block;
                cursor: pointer;
                color: $sdx-text-regular-color;
                font-weight: 400;
                &:hover {
                    color: $sdx-primary-color;
                }
                &.is-last {
                    color: $sdx-text-primary-color;
                    cursor: default;
                    font-weight: 600;
                    &:hover {
                        color: $sdx-text-primary-color;
                    }
                }
            }
            .sdxu-ellipse-breadcrumb__split {
                display: inline-block;
                margin: 0 5px;
            }
        }
        .sdxu-ellipse-breadcrumb__split {
            display: inline-block;
            margin: 0 5px;
        }
    }

</style>
