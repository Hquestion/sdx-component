
<template>
    <div class="data-set-preview">
        <div
            class="table table-loadmore"
            v-loadmore="loadMore"
        >
            <SdxuTable
                class="preview-table"
                :data="lazyShowData"
                :fit="true"
                :style="{width: '100%', height: height}"
                :height="height"
                ref="table"
                :dynamic="true"
                :dynamic-top-height="topHeight"
                :dynamic-bottom-height="bottomHeight"
                :border="false"
            >
                <el-table-column
                    prop="__fe__order"
                    :fixed="columns.length > 0"
                    label="序号"
                    :width="columns.length > 0 ? '80px' : undefined"
                >
                    <el-table-column
                        v-if="readonly && hasAnalysis"
                        prop="__fe__order"
                        :width="columns.length > 0 ? '80px' : '100%'"
                    />
                </el-table-column>
                <!--fix bug: 使用v-if导致列位置错乱，改成最小1px，不影响展示，保证列位置-->
                <el-table-column
                    v-if="(viewPortMaxCount + 2) < columns.length"
                    min-width="1"
                    :width="leftWidth"
                    label=""
                    class-name="placeholder-column"
                >
                    <el-table-column
                        v-if="readonly && hasAnalysis"
                        :width="leftWidth"
                        class-name="placeholder-column"
                    />
                </el-table-column>
                <el-table-column
                    :prop="item['fieldName']"
                    :label="item.fieldName"
                    :key="index"
                    v-for="(item, index) in visibleColumns"
                    :width="(viewPortMaxCount + 2) < columns.length ? columnWidth : 'auto'"
                    :show-overflow-tooltip="true"
                    :render-header="handleRenderHeader"
                    min-width="250px"
                >
                    <el-table-column
                        v-if="readonly && hasAnalysis"
                        :render-header="renderSubHeader"
                        :prop="item['fieldName']"
                        :label="item.fieldName"
                        :width="(viewPortMaxCount + 2) < columns.length ? columnWidth : 'auto'"
                    />
                </el-table-column>
                <el-table-column
                    v-if="(viewPortMaxCount + 2) < columns.length"
                    min-width="1"
                    :width="rightWidth"
                    label=""
                    class-name="placeholder-column"
                >
                    <el-table-column
                        v-if="readonly && hasAnalysis"
                        :width="rightWidth"
                        class-name="placeholder-column"
                    />
                </el-table-column>
            </SdxuTable>
        </div>
        <div
            ref="reference"
            class="cascader-box"
            v-clickoutside="hideCascaderMenu"
        />
    </div>
</template>
<script>
import Vue from 'vue';
import Popper from 'element-ui/src/utils/vue-popper';
import CascadeDropdown from './CascadeDropdown';
import DataSetPreviewActionsMixin from './DataSetPreviewActionsMixin';
import { isNumber, isString } from './util';
import SdxuTable from '@sdx/ui/components/table';
import BarEcharts from './BarEcharts';
import DataPopover from './DataPopover';
const popperMixin = {
    props: {
        placement: {
            type: String,
            default: 'bottom-end'
        },
        appendToBody: Popper.props.appendToBody,
        arrowOffset: Popper.props.arrowOffset,
        offset: Popper.props.offset,
        boundariesPadding: Popper.props.boundariesPadding,
        popperOptions: Popper.props.popperOptions
    },
    methods: Popper.methods,
    data: Popper.data,
    beforeDestroy: Popper.beforeDestroy
};
export default {
    value: 'DataSetPreview',
    components: {
        SdxuTable,
    },
    mixins: [popperMixin, DataSetPreviewActionsMixin],
    data() {
        return {
            menu: null,
            editingColumn: null,
            schemaActions: [],
            leftCount: 0,
            columnWidth: 240,
            visibleColumns: [],
            viewPortMaxCount: 0,
            viewPortMaxVerticalCount: 0,
            topCount: 0,
            rowHeight: 52,
            lazyShowData: []
        };
    },
    props: {
        data: {
            type: Array,
            default: () => []
        },
        columns: {
            type: Array,
            default: () => []
        },
        fullscreen: {
            type: Boolean,
            default: false
        },
        readonly: {
            type: Boolean,
            default: false
        },
        height: {
            type: String,
            default: '500px'
        },
        actionHistory: {
            type: Array,
            default: () => []
        },
        analysis: {
            type: Object,
            default: () => ({})
        },
        showDataTypeIcon: {
            type: Boolean,
            default: true
        },
        propId: {
            type: Array,
            default: () => []
        },
        valueCutChart: {
            type: Object,
            default: () => {}
        }
    },
    computed: {
        showData() {
            let arr = [];
            this.data.map((item,index) => {
                let obj={};
                for(let i =0; i< item.length; i++) {
                    obj[this.propId[i]]= item[i];
                    obj['__fe__order'] = index + 1;
                }
                arr.push(obj);
            });
            return arr;
        },
        hasAnalysis() {
            if (this.analysis == '' || this.analysis == null || typeof(this.analysis) == 'undefined' || JSON.stringify(this.analysis) == '{}') {
                return false;
            }else{
                return true;
            }
        },
        leftWidth() {
            return this.leftCount * this.columnWidth || 1;
        },
        rightWidth() {
            if (this.columns && this.visibleColumns) {
                return (
                    (this.columns.length -
                        this.visibleColumns.length -
                        this.leftCount || 0) * this.columnWidth || 1
                );
            } else {
                return 0 || 1;
            }
        },
        topHeight() {
            if (this.$el) {
                this.$nextTick(() => {
                    this.$el.querySelector(
                        '.el-table__body-wrapper'
                    ).scrollTop = this.$el.querySelector(
                        '.table-loadmore'
                    ).$$lastScrollTop;
                });
            }
            return this.topCount * this.rowHeight;
        },
        bottomHeight() {
            return (
                (this.showData.length -
                    this.lazyShowData.length -
                    this.topCount || 0) * this.rowHeight
            );
        }
    },
    model: {
        prop: 'actionHistory',
        event: 'actions-change'
    },
    methods: {
        initMenu() {
            this.menu = new Vue(CascadeDropdown).$mount();
            this.menu.options = this.menuDataNum;
            this.menu.visible = false;
            this.popperElm = this.menu.$el;
            // this.menu.$refs.menus[0].setAttribute('id', 'cascader-menu-updating');
            this.menu.$on('pick', this.handlePick);
            this.menu.$el.classList.add('cascader-menu-dataset');
            this.menu.$on('menuLeave', this.doDestroy);
            this.menu.$on('closeInside', this.hideCascaderMenu);
            this.menu.$on('activeItemChange', this.handleActiveItemChange);
        },
        handlePick(option) {
            // TODO: 暂时写死，需要优化
            if (option.length === 1 && option[0] === 'DESCRIBE') {
                // ’分析‘操作支持切换，有选中和未选中状态
                let isSelectIndex = this.schemaActions.findIndex(
                    item =>
                        item[0] === this.editingColumn.fieldName &&
                        item[1] === option[0]
                );
                if (isSelectIndex >= 0) {
                    this.schemaActions.splice(isSelectIndex, 1);
                } else {
                    // schema在操作之后可能会发生改变，需要记住操作时的schema
                    this.schemaActions.push([
                        this.editingColumn.fieldName,
                        ...option,
                        this.columns.find(
                            item =>
                                item.fieldName === this.editingColumn.fieldName
                        )
                    ]);
                }
            } else {
                this.schemaActions.push([
                    this.editingColumn.fieldName,
                    ...option,
                    this.columns.find(
                        item => item.fieldName === this.editingColumn.fieldName
                    )
                ]);
            }
            this.hideCascaderMenu();
            this.$emit('actions-change', this.schemaActions);
            this.$emit('action');
        },
        handleRenderHeader(h, { column, $index }) {
            let iconClass = '';
            let field = this.columns.find(
                item => item.fieldName === column.label
            );
            if (!field) return <span />;
            isNumber(field.fieldType) && (iconClass = 'sdx-N');
            isString(field.fieldType) && (iconClass = 'sdx-S');
            if (this.readonly) {
                return (
                    <span class="table-header_customize" title={column.label}>
                        {this.showDataTypeIcon && <i
                            class={['sdx-icon', iconClass]}
                            style="margin-right:5px"
                        />}
                        <span>{column.label}</span>
                    </span>
                );
            } else {
                const self = this;
                const event = {
                    on: {
                        click(e) {
                            e.stopPropagation();
                            if (!self.elPos) {
                                self.elPos = self.$el.getBoundingClientRect();
                            }
                            let targetRect = e.target.getBoundingClientRect();
                            let poperPosition = {
                                x: targetRect.left - self.elPos.left,
                                y: targetRect.top - self.elPos.top
                            };
                            self.$refs.reference.style.top =
                                poperPosition.y + 'px';
                            self.$refs.reference.style.left =
                                poperPosition.x + 'px';
                            self.editColumn(column, $index);
                        }
                    }
                };
                let operation = '';
                if (isNumber(field.fieldType) || isString(field.fieldType)) {
                    operation = (
                        <i
                            class="el-icon-caret-bottom arrow-bottom"
                            style="cursor:pointer;margin-left:5px;color:#C9D2E1;flex:1"
                            {...event}
                        />
                    );
                }
                return (
                    <span class="table-header_customize" title={column.label} style="display:flex;justify-content:flex-start;align-items:center">
                        <i
                            class={['iconfont', iconClass]}
                            style="margin-right:5px"
                        />
                        <span style="overflow:hidden;text-overflow:ellipsis">{column.label}</span>
                        {operation}
                    </span>
                );
            }
        },
        renderSubHeader(h, { column }) {
            let field = this.columns.find(
                item => item.fieldName === column.label
            );
            if (!field) return <span />;
            let analysisData = this.analysis[field.fieldName] || {};
            let barData = this.valueCutChart[field.fieldName];
            return (
                <div class="header-count">
                    <DataPopover width="260" info={analysisData}>
                        <div slot="ref"/>
                    </DataPopover>
                    <div class="echarts">
                        <DataPopover width="260" 
                            info={analysisData}
                            placement="right"
                        >
                            <span slot="ref"/>
                        </DataPopover>
                        {
                            barData ? 
                                <BarEcharts data={barData} key={column.label} width="100%"/>
                                :
                                <div class="unique">
                                    <div>Unique Value</div>
                                    <div>{analysisData.unique}</div>
                                </div>
                        }
                        <DataPopover width="260" 
                            info={analysisData}
                            placement="left"
                        >
                            <span slot="ref" />
                        </DataPopover>
                    </div>
                </div>
            );
        },
        loadMore(direction, scrollDistance, isReachBottom) {
            const self = this;
            if (direction === 'vertical') {
                if (isReachBottom) {
                    this.$emit('reach-bottom');
                }
                let topCount = Math.floor(scrollDistance / this.rowHeight);
                this.topCount = topCount - 5 > 0 ? topCount - 5 : 0;
            } else {
                // 截取部分column用于展示
                clearTimeout(this.updateLeftAf);
                this.updateLeftAf = setTimeout(() => {
                    let leftCount = Math.floor(scrollDistance / self.columnWidth);
                    self.leftCount = leftCount - 1 > 0 ? leftCount - 1 : 0;
                    // self.leftCount = leftCount;
                }, 250);
            }
        },
        editColumn(col) {
            this.editingColumn = this.columns.find(
                item => item.fieldName === col.label
            );
            this.showCascaderMenu();
        },
        showCascaderMenu() {
            if (!this.menu) {
                this.initMenu();
            }
            this.menu.value = [];
            if (isNumber(this.editingColumn.fieldType)) {
                this.menu.options = this.menuDataNum;
            } else {
                this.menu.options = this.menuDataString;
            }
            this.menu.visible = true;
            // actions记录里存储的第一位是列名，最后一位是操作时schema列表，中间的内容是用户的具体操作
            // 传递给级联下拉菜单时，需要截取到对应的操作内容
            this.menu.activeOptions =
                this.schemaActions
                    .filter(item => item[0] === this.editingColumn.fieldName)
                    .map(item => item.slice(1, item.length - 1)) || [];
            this.$nextTick(() => {
                this.updatePopper();
            });
        },
        hideCascaderMenu() {
            if (!this.menu) return;
            this.menu.visible = false;
            this.$nextTick(() => {
                this.updatePopper();
                this.$refs.reference.style.top = '0px';
                this.$refs.reference.style.left = '0px';
            });
        },
        handleActiveItemChange(value) {
            this.$nextTick(() => {
                this.updatePopper();
            });
            this.$emit('active-item-change', value);
        },
        scrollToTop() {
            this.$el.querySelector('.el-table__body-wrapper').scrollTop = 0;
        },
        calcViewPortMaxCount() {
            let $viewport = this.$el.querySelector(
                '.el-table__body-wrapper'
            );
            let viewportWidth = $viewport.offsetWidth;
            let visibleCount = Math.ceil(
                viewportWidth / this.columnWidth
            );
            this.viewPortMaxCount = visibleCount;
        },
        calcViewPortMaxVerticalCount() {
            let $viewport = this.$el.querySelector(
                '.el-table__body-wrapper'
            );
            let viewportHeight = $viewport.offsetHeight;
            let visibleCount = Math.ceil(
                viewportHeight / this.rowHeight
            );
            this.viewPortMaxVerticalCount = visibleCount;
        },
        /**
         * 改变容器大小时，需要手动调用此方法刷新数据
         */
        listenResize() {
            this.calcViewPortMaxVerticalCount();
            this.calcViewPortMaxCount();
            this.visibleColumns = this.columns.slice(
                this.leftCount,
                this.leftCount + this.viewPortMaxCount + 2
                // this.leftCount + this.viewPortMaxCount
            );
            this.lazyShowData = this.showData.slice(
                this.topCount,
                this.topCount + this.viewPortMaxVerticalCount + 5
            );
            this.$refs.table.$refs.elTable.doLayout();
        }
    },
    mounted() {
        this.schemaActions = this.actionHistory;
    },
    watch: {
        actionHistory(val) {
            this.schemaActions = val;
        },
        columns: {
            handler(val) {
                if (val && val.length > 0) {
                    this.$nextTick(() => {
                        this.calcViewPortMaxCount();
                        this.visibleColumns = val.slice(
                            this.leftCount,
                            this.leftCount + this.viewPortMaxCount + 2
                            // this.leftCount + this.viewPortMaxCount
                        );
                        this.$refs.table.$refs.elTable.doLayout();
                    });
                }
            },
            deep: true,
            immediate: true
        },
        leftCount() {
            if (this.columns && this.columns.length > 0) {
                this.$nextTick(() => {
                    this.calcViewPortMaxCount();
                    this.visibleColumns = this.columns.slice(
                        this.leftCount,
                        this.leftCount + this.viewPortMaxCount + 2
                        // this.leftCount + this.viewPortMaxCount
                    );
                    this.$refs.table.$refs.elTable.doLayout();
                });
            }
        },
        data: {
            handler() {
                if (this.data && this.data.length > 0) {
                    this.$nextTick(() => {
                        this.calcViewPortMaxVerticalCount();
                        this.lazyShowData = this.showData.slice(
                            this.topCount,
                            this.topCount + this.viewPortMaxVerticalCount + 5
                        );
                        this.$refs.table.$refs.elTable.doLayout();
                    });
                } else {
                    this.lazyShowData = [];
                }
            },
            deep: true,
            immediate: true
        },
        topCount() {
            if (this.data && this.data.length > 0) {
                this.$nextTick(() => {
                    this.calcViewPortMaxVerticalCount();
                    this.lazyShowData = this.showData.slice(
                        this.topCount,
                        this.topCount + this.viewPortMaxVerticalCount + 5
                    );
                    this.$refs.table.$refs.elTable.doLayout();
                });
            }
        }
    }
};
</script>

<style lang="scss" scoped>
.data-set-preview {
    position: relative;
    height: 100%;
    .table {
        height: 100%;
    }
    .cascader-box {
        position: absolute;
        width: 14px;
        height: 14px;
    }
    & /deep/ .el-cascader-menu {
        height: auto;
    }
    & /deep/ .el-table th div {
        &.header-count {
            color: rgba(129, 130, 134, 1);
            padding: 0;
            width: 100%;
            display: flex;
            flex-direction: column;
            cursor: pointer;
            & > span{
                height:30px;
                width: 100%;
                div {
                    height: 30px;
                    width: 100%;
                }
            }
            .echarts {
                display: flex;
                width: 100%;
                justify-content: center;
                span {
                    span {
                        width: 25px;
                        display: inline-block;
                        height: 100%;
                        cursor: pointer;
                    }
                }
                .unique {
                    text-align: center;
                    display: flex;
                    flex-direction: column;
                    font-size: 12px;
                    color: #1144AB;
                    div {
                        height: 30px;
                    }
                    div:first-child {
                        color: #172B4D;
                    }
                }
            }
        }
    }
    & /deep/ .table-header_customize {
        i.icon-N {
            font-size: 12px;
            margin-right: 12px;
            color: #ff9001;
        }
        i.icon-S {
            font-size: 12px;
            margin-right: 12px;
            color: #02be86;
        }
    }
    & /deep/ .placeholder-column {
        opacity: 0.5;
    }
    & /deep/ .preview-table th div.cell {
        padding: 0 10px;
        white-space: nowrap;
    }
    & /deep/ .el-table--border,
    & /deep/ .el-table--group {
        border: none;
    }
    & /deep/ {
        .el-table thead.is-group th {
            background: #fff;
        }
        .el-table thead {
            tr:last-child th{
                padding: 0 !important;
                div {
                    padding: 0 !important;
                }
            }
        }
        .table-header_customize {
            .sdx-N {
                color: #FF9001;
            }
            .sdx-S {
                color: #02BE86;
            }
        }
    }
}
</style>
