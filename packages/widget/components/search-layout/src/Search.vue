<template>
    <div
        class="sdxw-search-layout"
        :class="[
            block ? 'sdxw-search-layout--block': '',
            `sdxw-search-layout--align-${align}`
        ]"
        ref="searchlayout"
    >
        <!--搜索条件 -->
        <el-form
            :inline="true"
            :label-width="labelWidth"
        >
            <slot />
            <div class="sdxw-search-layout__btn">
                <SdxuButton
                    type="primary"
                    size="small"
                    @click="handleSearch"
                >
                    搜索
                </SdxuButton>
                <SdxuButton
                    size="small"
                    @click="handleReset"
                    type="primary"
                    :invert="true"
                    :plain="true"
                    v-if="$slots.default.length > 2"
                >
                    重置
                </SdxuButton>
            </div>
        </el-form>
        <div
            class="sdxw-search-layout__show"
            v-if="minVisible < $slots.default.length"
        >
            <SdxuButton
                type="primary"
                size="small"
                :plain="true"
                @click="showItem"
            >
                {{ singlerow ? "展开" : "收起" }}
                <i
                    :class="['sdx-icon',singlerow ? 'sdx-icon-arrow-down' : 'sdx-icon-arrow-up']"
                />
            </SdxuButton>
        </div>
    </div>
</template>

<script>
import SdxuButton from '@sdx/ui/components/button';

import Form from 'element-ui/lib/form';
import FormItem from 'element-ui/lib/form-item';
export default {
    name: 'SdxwSearchLayout',
    data() {
        return {
            elWidthValue: 0,
            searchItemWidth: 0,
            singlerow: true,
            showbtn: false,
            active: {
                items: 2
            },
            minVisible: 2
        };
    },
    provide() {
        return {
            active: this.active
        };
    },
    props: {
        labelWidth: {
            type: String,
            default: ''
        },
        block: {
            type: Boolean,
            default: true
        },
        align: {
            type: String,
            default: 'left'
        }
    },
    components: {
        SdxuButton,
        [Form.name]: Form,
        [FormItem.name]: FormItem
    },
    methods: {
        handleSearch() {
            this.$emit('search');
        },
        handleReset() {
            this.$emit('reset');
        },
        showItem() {
            this.singlerow = !this.singlerow;
            if(this.singlerow) {
                this.active.items = this.minVisible;
            } else {
                this.active.items = 100;
            }
        },
        init() {
            if (!this.block) {
                this.active.items = 100;
                return;
            }
            this.elWidthValue = this.$el.offsetWidth;
            this.searchItemWidth = this.$slots.default[0].elm.offsetWidth;
            this.minVisible = Math.floor((this.elWidthValue - 300) / this.searchItemWidth);
            if (this.singlerow) {
                this.active.items = this.minVisible;
            } else {
                this.active.items = 100;
            }
        }
    },
    mounted(){
        window.addEventListener('resize', this.init);
        this.$nextTick(()=> {
            this.init();
        });
        this.$slots.default.forEach((item, index) => {
            if(item.componentInstance && item.componentInstance) {
                item.componentInstance.itemIndex = index;
            }
        });
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.init);
    }
};
</script>
