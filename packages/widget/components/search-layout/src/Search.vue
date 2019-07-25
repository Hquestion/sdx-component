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
        >
            <slot />
            <div class="sdxw-search-layout__btn">
                <SdxuButton
                    type="primary"
                    size="small"
                    @click="handleSearch"
                >
                    {{ t('sdxCommon.Search') }}
                </SdxuButton>
                <SdxuButton
                    size="small"
                    @click="handleReset"
                    type="primary"
                    :invert="true"
                    :plain="true"
                    v-if="$slots.default.length > 2"
                >
                    {{ t('sdxCommon.Reset') }}
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
                {{ singlerow ? t('sdxCommon.expand') : t('sdxCommon.retract') }}
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
import locale from '@sdx/utils/src/mixins/locale';
export default {
    name: 'SdxwSearchLayout',
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
            window.console.log('容器宽度:', this.elWidthValue);
            this.searchItemWidth = this.$slots.default[0].elm.offsetWidth;
            window.console.log('元素宽度:', this.searchItemWidth);
            this.minVisible = Math.floor((this.elWidthValue - 300) / this.searchItemWidth);
            window.console.log('最小显示个数:', this.minVisible);
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
