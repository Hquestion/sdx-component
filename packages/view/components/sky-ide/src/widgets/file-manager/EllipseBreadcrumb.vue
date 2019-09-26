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
                <div class={{ 'skyide-ellipse-breadcrumb__name': true, 'is-last': !!ignoreLastArrow }}> <i class={{ 'sdx-icon sdx-mianbaoxieshouye': item.showIcon }}></i>{ item.name } </div>
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
                color: #A0A5B8;
                font-weight: 400;
                &:hover {
                    color: #fff;
                }
                &.is-last {
                    color: #DDE5FE;
                    cursor: default;
                    font-weight: 600;
                    &:hover {
                        color: #fff;
                    }
                }
            }
            .skyide-ellipse-breadcrumb__split {
                display: inline-block;
                margin: 0 5px;
                color: #A0A5B8;
            }
        }
        .skyide-ellipse-breadcrumb__split {
            display: inline-block;
            margin: 0 5px;
            color: #A0A5B8;
        }
    }

</style>
