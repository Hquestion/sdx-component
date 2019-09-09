<script>
export default {
    name: 'SkyideEllipseBreadcrumb',
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
            default: 3
        }
    },
    render() {
        const { breadcrumb } = this;
        const handleClick = item => this.$emit('nav', item);
        const breadcrumbItem = (item, ignoreLastArrow) => (
            <div class="skyide-ellipse-breadcrumb__item" vOn:click={() => !ignoreLastArrow && handleClick(item)}>
                <div class={{ 'skyide-ellipse-breadcrumb__name': true, 'is-last': !!ignoreLastArrow }}> { item.name } </div>
                {!ignoreLastArrow && (<div class="skyide-ellipse-breadcrumb__split">/</div>) }
            </div>
        );
        const make = () => {
            if (breadcrumb.length > this.maxVisible) {
                const leftList = breadcrumb.slice(0, Math.floor(this.maxVisible / 2));
                const rightList = breadcrumb.slice(-2);
                return (
                    <div class="skyide-ellipse-breadcrumb">
                        {leftList.map(item => breadcrumbItem(item))}
                        ...
                        <div class="skyide-ellipse-breadcrumb__split">/</div>
                        {rightList.map((item, index) => breadcrumbItem(item, index === rightList.length - 1))}
                    </div>
                );
            } else {
                return (
                    <div class="skyide-ellipse-breadcrumb">
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
    .skyide-ellipse-breadcrumb {
        font-size: 14px;
        .skyide-ellipse-breadcrumb__item {
            display: inline-block;
            .skyide-ellipse-breadcrumb__name {
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
            .skyide-ellipse-breadcrumb__split {
                display: inline-block;
                margin: 0 5px;
            }
        }
        .skyide-ellipse-breadcrumb__split {
            display: inline-block;
            margin: 0 5px;
        }
    }

</style>
