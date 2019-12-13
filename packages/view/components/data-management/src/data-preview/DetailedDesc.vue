<template>
    <div class="sdxv-detailed-desc">
        <sdxu-section-panel :class="show ? 'show-desc' : 'hidden-desc'">
            <sdxu-article-panel
                :title="t('view.dataManagement.Detailed_description')"
            >
                <template #right>
                    <IconButton
                        :icon="`${show ? 'sdx-icon-caret-top' : 'sdx-icon-caret-right'} sdx-icon`"
                        @click="changeDescStyle"
                    />
                </template>
                <div class="desc">
                    <span>{{ detailInfo }}</span> 
                </div>
            </sdxu-article-panel>
        </sdxu-section-panel>
    </div>
</template>

<script>
import locale from '@sdx/utils/src/mixins/locale';
import SdxuArticleTitle from '@sdx/ui/components/article-panel';
import SdxuSectionTitle from '@sdx/ui/components/section-panel';
import IconButton from '@sdx/ui/components/icon-button';
export default {
    name: 'SdxwModelDetailCard',
    mixins: [locale],
    components: {
        [SdxuArticleTitle.name]: SdxuArticleTitle,
        [SdxuSectionTitle.name]: SdxuSectionTitle,
        IconButton
    },
    props: {
        detailInfo: {
            type: String,
            default: ''
        },
    },
    data() {
        return {
            show: false
        };
    },
    methods: {
        changeDescStyle() {
            this.show = !this.show;
        }
    }
};
</script>

<style lang="scss" scoped>
.sdxv-detailed-desc {
    /deep/ {
        .show-desc {
            .sdxu-article-panel__content {
                padding: 24px 0px 0px 0px;
            }
            .desc {
                background: #EDEFF2;
                border-radius: 4px;
                padding: 32px 24px;
                span {
                    color: #13264D;
                }
            }
        }
        .hidden-desc {
            .sdxu-article-panel__content {
                padding: 0px;
            }
            .desc {
                display: none;
            }
        } 
    }
}
</style>