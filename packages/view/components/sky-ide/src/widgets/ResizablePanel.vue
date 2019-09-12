<template>
    <div class="resizable-panel" :style="rect">
        <slot></slot>
    </div>
</template>

<script>
import emitter from '@sdx/utils/src/mixins/emitter';
import interact from 'interactjs';
import throttle from '@sdx/utils/src/helper/throttle';
export default {
    name: 'ResizablePanel',
    componentName: 'ResizablePanel',
    mixins: [emitter],
    props: {
        childDirection: {
            type: String,
            default: 'vertical'
        },
        weight: {
            type: Number,
            default: 1
        },
        initWidth: {
            type: Number,
            default: -1
        },
        initHeight: {
            type: Number,
            default: -1
        },
        minWidth: {
            type: Number,
            default: 20
        },
        minHeight: {
            type: Number,
            default: 20
        },
        fixed: {
            type: Boolean,
            default: false
        },
        collapse: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            ready: new Promise(resolve => {
                this.resolve = resolve;
            }),
            width: 0,
            height: 0,
            left: 0,
            top: 0,
            childrenRatio: [],
            isRootReady: false,
            order: 0
        };
    },
    inject: {
        app: {
            default: null
        }
    },
    computed: {
        rect() {
            return {
                width: `${this.width}px`,
                height: `${this.height}px`,
                left: `${this.left}px`,
                top: `${this.top}px`,
                display: this.collapse ? 'none' : 'block'
            };
        }
    },
    methods: {
        init() {
            // step1. 获取父节点宽度高度，设置父容器定位
            // step2. 获取所有子panel， 根据ratio和initWidth分配宽度
            const parentBox = this.$el.parentNode.getBoundingClientRect();
            this.width = parentBox.width;
            this.height = parentBox.height;
        },
        async updateChildren(force) {
            if (!this.isRootPanel()) {
                await this.$parent.ready;
            }
            const children = this.$children;
            if (children.length >= 1 && children[0].$options.componentName === 'ResizablePanel') {
                const initWidths = children.map(child => !child.collapse ? child.initWidth : 0);
                const initHeights = children.map(child => !child.collapse ? child.initHeight : 0);
                let assignedWidth = 0, assignedHeight = 0;
                initWidths.forEach(w => {
                    assignedWidth = (w > -1) ? (assignedWidth + w) : assignedWidth;
                });
                initHeights.forEach(h => {
                    assignedHeight = (h > -1) ? (assignedHeight + h) : assignedHeight;
                });
                let assigned = 0;
                if (this.childDirection === 'vertical') {
                    children.forEach((child, index) => {
                        child.order = index;
                        let total = 0, canAssignedHeight = (this.height - assignedHeight) > 0 ? (this.height - assignedHeight) : 0;
                        let toAssignedChildren = children.filter(item => item.initHeight < 0 && !item.collapse).map(item => item.weight);
                        toAssignedChildren.forEach(item => total = total + item);

                        child.width = this.width;
                        if (!child.assigned || !!force) {
                            if (child.collapse) {
                                child.height = 0;
                            } else {
                                child.height = Math.max(child.minHeight, child.initHeight > -1 ? child.initHeight : canAssignedHeight * child.weight / total);
                            }
                        } else {
                            // 在首次分配过之后，后面的panel缩放将按比例重新分配，不再根据initHieght和weight分配
                            let hToAssign = this.height;
                            children.forEach(item => {
                                hToAssign -= item.fixed ? item.height : 0;
                            });
                            if (child.fixed) {
                                child.height = this.childrenRatio[index].ratio;
                            } else {
                                child.height = Math.max(child.minHeight, this.childrenRatio[index].ratio * hToAssign);
                            }
                        }
                        child.top = assigned;
                        child.left = 0;
                        child.assigned = true;
                        assigned += child.collapse ? 0 : child.height;
                        interact(child.$el)
                            .resizable({
                                edges: {
                                    top: false,
                                    left: false,
                                    bottom: false,
                                    right: false
                                }
                            });
                        if (!child.collapse && index < children.length - 1) {
                            let nextChild = children[index+1];
                            if (!nextChild.collapse) {
                                child.$el.style.borderBottom = '1px solid #dedede';
                            } else {
                                child.$el.style.borderBottom = 'none';
                            }
                            const hasExpandChildAfter = () => {
                                let exist = false;
                                for (let i = index + 1; i < children.length; i++) {
                                    if (!children[i].collapse) {
                                        exist = true;
                                        break;
                                    }
                                }
                                return exist;
                            };
                            if (child.fixed || nextChild.fixed || !hasExpandChildAfter()) {
                                return;
                            }
                            const heightResizeDebounce = throttle((e, dist) => {
                                nextChild.height = nextChild.height - dist;
                                nextChild.top = nextChild.top + dist;

                                child.height = e.rect.height;
                            }, 200);
                            interact(child.$el)
                                .resizable({
                                    edges: {
                                        top: false,
                                        left: false,
                                        bottom: true,
                                        right: false
                                    }
                                })
                                .on('resizemove', (e) => {
                                    let dist = e.rect.height - child.height;
                                    let height = nextChild.height - dist;
                                    if (height > nextChild.getPanelRealMinHeight() && e.rect.height > this.getPanelRealMinHeight()) {
                                        nextChild.$el.style.height = `${nextChild.height - dist}px`;
                                        nextChild.$el.style.top = `${nextChild.top + dist}px`;
                                        child.$el.style.height = `${e.rect.height}px`;

                                        clearTimeout(this.resizeHeightTimer);
                                        this.resizeHeightTimer = setTimeout(() => {
                                            nextChild.height = nextChild.height - dist;
                                            nextChild.top = nextChild.top + dist;

                                            child.height = e.rect.height;
                                            // resize 之后重新计算分配比例
                                            this.calcChildrenRatio('height');
                                        }, 200);
                                    }
                                })
                                .on('resizeend', e => {
                                    if (this.app) {
                                        this.app.syncLayout();
                                    }
                                })
                            ;
                        }
                    });
                    // 计算children的分配比例，在调整时按照比例重新分配
                    if (this.childrenRatio.length === 0 || !!force) {
                        this.calcChildrenRatio('height');
                    }
                } else {
                    children.forEach((child, index) => {
                        child.order = index;
                        let total = 0, canAssignedWidth = (this.width - assignedWidth) || 0;
                        let toAssignedChildren = children.filter(item => item.initWidth < 0 && !item.collapse).map(item => item.weight);
                        toAssignedChildren.forEach(item => total = total + item);
                        if (!child.assigned || !!force) {
                            if (child.collapse) {
                                child.width = 0;
                            } else {
                                child.width = Math.max(child.minWidth, child.initWidth > -1 ? child.initWidth : canAssignedWidth * child.weight / total);
                            }
                        } else {
                            // 重新分配宽度
                            let wToAssign = this.width;
                            children.forEach(item => {
                                wToAssign -= item.fixed ? item.width : 0;
                            });
                            if (child.fixed) {
                                child.width = this.childrenRatio[index].ratio;
                            } else {
                                child.width = Math.max(child.minWidth, this.childrenRatio[index].ratio * wToAssign);
                            }
                        }
                        child.height = this.height;
                        child.left = assigned;
                        child.top = 0;
                        child.assigned = true;
                        assigned += child.collapse ? 0 : child.width;
                        if (index < children.length -1) {
                            let nextChild = children[index+1];
                            if (!nextChild.collapse) {
                                child.$el.style.borderRight = '1px solid #dedede';
                            } else {
                                child.$el.style.borderRight = 'none';
                            }
                            if (child.fixed || nextChild.fixed) {
                                return;
                            }
                            interact(child.$el)
                                .resizable({
                                    edges: {
                                        top: false,
                                        left: false,
                                        bottom: false,
                                        right: true
                                    }
                                })
                                .on('resizemove', (e) => {
                                    let dist = e.rect.width - child.width;
                                    let width = nextChild.width - dist;
                                    if (width > nextChild.minWidth && e.rect.width > this.minWidth) {
                                        nextChild.$el.style.width = `${nextChild.width - dist}px`;
                                        nextChild.$el.style.left = `${nextChild.left + dist}px`;
                                        child.$el.style.width = `${e.rect.width}px`;

                                        clearTimeout(this.resizeWidthTimer);
                                        this.resizeWidthTimer = setTimeout(() => {
                                            nextChild.width = nextChild.width - dist;
                                            nextChild.left = nextChild.left + dist;

                                            child.width = e.rect.width;

                                            // resize 之后重新计算分配比例
                                            this.calcChildrenRatio('width');
                                        }, 200);
                                    }
                                })
                                .on('resizeend', e => {
                                    if (this.app) {
                                        this.app.syncLayout();
                                    }
                                })
                            ;
                        }
                    });
                    if (this.childrenRatio.length === 0 || !!force) {
                        this.calcChildrenRatio('width');
                    }
                }
            }

            requestAnimationFrame(() => {
                this.resolve(true);
            });
        },
        handleResize() {
            clearTimeout(this.timer);
            this.timer = setTimeout(() => {
                if (this.isRootPanel()) {
                    this.init();
                    this.updateChildren();
                }
            }, 200);
        },
        isRootPanel() {
            return !this.$parent || this.$parent.$options.componentName !== 'ResizablePanel';
        },
        getPanelRealMinHeight() {
            if (this.$children.length > 0 && this.$children[0].$options.componentName === 'ResizablePanel') {
                let childrenMinHeight = 0;
                this.$children.forEach(item => {
                    if (item.$children.length > 0 && item.$children[0].$options.componentName === 'ResizablePanel') {
                        childrenMinHeight += item.getPanelRealMinHeight();
                    } else {
                        if (item.fixed) {
                            childrenMinHeight += item.height;
                        } else {
                            childrenMinHeight += item.minHeight;
                        }
                    }
                });
                return childrenMinHeight;
            } else {
                return this.fixed ? this.height : this.minHeight;
            }
        },
        calcChildrenRatio(prop = 'height') {
            this.childrenRatio = [];
            // 统计可分配高度和每个子panel高度，区分fixed panel
            let panelCanAssign = this[prop];
            let propList = [];
            this.$children.forEach(child => {
                if (child.fixed) {
                    panelCanAssign -= child[prop];
                    propList.push({
                        fixed: true,
                        [prop]: child[prop]
                    });
                } else {
                    propList.push({
                        fixed: false,
                        [prop]: child[prop]
                    });
                }
            });
            // 计算比例
            this.childrenRatio = propList.map(p => {
                return {
                    fixed: p.fixed,
                    ratio: p.fixed ? p[prop] : p[prop] / panelCanAssign
                };
            });
        }
    },
    updated() {
        this.updateChildren();
    },
    watch: {
        collapse() {
            if (this.$parent && this.$parent.$options.componentName === 'ResizablePanel') {
                this.$parent.updateChildren(true);
            }
        },
        weight() {
            if (this.$parent && this.$parent.$options.componentName === 'ResizablePanel') {
                this.$parent.updateChildren(true);
            }
        }
    },
    created() {
        this.$on('panel-added', comp => {
            clearTimeout(this.changeTimer);
            this.changeTimer = setTimeout(() => {
                this.updateChildren();
            }, 500);
        });
        this.$on('panel-minus', comp => {
            clearTimeout(this.changeTimer);
            this.changeTimer = setTimeout(() => {
                this.updateChildren();
            }, 500);
        });
    },
    mounted() {
        if (this.isRootPanel()) {
            this.init();
        }
        this.dispatch('ResizablePanel', 'panel-added', this);
        window.addEventListener('resize', this.handleResize);
    },
    beforeDestroy() {
        this.dispatch('ResizablePanel', 'panel-minus', this);
        window.removeEventListener('resize', this.handleResize);
    }
};
</script>

<style lang="scss" scoped>
    .resizable-panel {
        position: absolute;
        touch-action: none;
        overflow: hidden;
    }
</style>
