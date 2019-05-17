<template>
    <div
        class="sdxw-search-layout"
        ref="searchlayout"
    >
        <!--搜索条件 -->
        <el-form
            :inline="true"
            :label-width="lableWidth"
        >
            <slot />
            <div class="sdxw-search-layout__btn">
                <SdxuButton
                    type="primary"
                    size="small"
                    @click="handleSearch"
                >
                    搜索
                </sdxubutton>
                <SdxuButton
                    size="small"
                    @click="handleReset"
                    type="primary"
                    :invert="true"
                    :plain="true"
                >
                    重置
                </sdxubutton>
            </div>
        </el-form>
        <div
            class="sdxw-search-layout__show"
            v-if="showbtn"
        >
            <SdxuButton
                type="primary"
                size="small"
                :plain="true"
                @click="showItem"
            >
                {{ singlerow ? "收起" : "展开" }}
                <i
                    :class="['sdx-icon',singlerow ? 'sdx-icon-arrow-up' : 'sdx-icon-arrow-down']"
                />
            </SdxuButton>
        </div>
    </div>
</template>

<script>
import SdxuButton from '@sdx/ui/components/button';

import { Form, FormItem } from 'element-ui';
export default {
    name: 'SdxwSearchLayout',
    data() {
        return {
            elWidthValue: 0,
            searchItemWidth: 0,
            singlerow: false,
            showbtn: false,
            active: {
                items: 0
            }
        };
    },
    provide() {
        return {
            active: this.active
        };
    },
    props: {
        lableWidth: {
            type: String,
            default: ''
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
                this.active.items = 100;
            } else {
                this.init();
            }
        },
        init() {
            this.elWidthValue = this.$refs.searchlayout && this.$refs.searchlayout.offsetWidth;
            this.searchItemWidth = this.$slots.default[0].elm.clientWidth;
            if(this.searchItemWidth * (this.$slots.default.length) > this.elWidthValue - 300) {
                this.showbtn = true;
            } else {
                this.showbtn = false;
            }
            this.active.items = Math.floor((this.elWidthValue - 300) / this.searchItemWidth);
        }
    },
    mounted(){
        this.init();
        window.addEventListener('resize', ()=> {
            this.init();
        });
        this.$nextTick(()=> {
            this.init();
        });
        this.$slots.default.forEach((item, index) => {
            item.componentInstance._data.itemIndex = index;
        });
        
    }
};
</script>
