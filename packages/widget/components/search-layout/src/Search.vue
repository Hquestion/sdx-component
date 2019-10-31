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
            @submit.native.prevent
            size="medium"
        >
            <slot />
            <div class="sdxw-search-layout__btn">
                <SdxuButton
                    type="primary"
                    @click="handleSearch"
                >
                    {{ t('sdxCommon.Search') }}
                </SdxuButton>
                <SdxuButton
                    @click="handleReset"
                    type="primary"
                    :invert="true"
                    :plain="true"
                    v-if="children.length > 2"
                >
                    {{ t('sdxCommon.Reset') }}
                </SdxuButton>
            </div>
        </el-form>
        <div
            class="sdxw-search-layout__show"
            v-if="minVisible < children.length"
        >
            <i :class="['sdx-icon', 'sdx-cebianlanzhankaiICON', singlerow ? '' : 'is-reverse']" @click="showItem"></i>
        </div>
    </div>
</template>

<script>
import SdxuButton from '@sdx/ui/components/button';

import Form from 'element-ui/lib/form';
import FormItem from 'element-ui/lib/form-item';
import locale from '@sdx/utils/src/mixins/locale';
export default {
    name: 'SdxwSearchLayout',
    componentName: 'SdxwSearchLayout',
    mixins: [locale],
    data() {
        return {
            elWidthValue: 0,
            searchItemWidth: 0,
            singlerow: true,
            showbtn: false,
            active: {
                items: 2
            },
            minVisible: 2,
            children: []
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
            this.searchItemWidth = this.$slots.default[0].elm.offsetWidth + 10;
            this.minVisible = Math.floor((this.elWidthValue - 280) / this.searchItemWidth);
            if (this.singlerow) {
                this.active.items = this.minVisible;
            } else {
                this.active.items = 100;
            }
        },
        orderChildren() {
            let children = this.$slots.default.filter(child => !!child.componentInstance && child.componentInstance.visible);
            this.children = children;
            children.forEach((item, index) => {
                if(item.componentInstance) {
                    item.componentInstance.itemIndex = index;
                }
            });
            if (children.length === 1) {
                children[0].componentInstance.$on('enter', () => {
                    this.$emit('search');
                });
            }
        }
    },
    mounted(){
        window.addEventListener('resize', this.init);
        this.$nextTick(()=> {
            this.init();
        });
        this.orderChildren();
    },
    created() {
        this.$on('add-item', this.orderChildren);
        this.$on('remove-item', this.orderChildren);
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.init);
    }
};
</script>
