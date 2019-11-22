<template>
    <div class="sdxv-model-detail">
        <div class="title">
            模型详情
        </div>
        <SdxwModelDetailCard :meta="cardInfo" />
        <sdxu-section-panel>
            <sdxu-article-panel
                :title="'版本信息'"
            />
        </sdxu-section-panel>
    </div>
</template>

<script>
import locale from '@sdx/utils/src/mixins/locale';
import SdxwModelDetailCard from '@sdx/widget/components/model-detail-card';
import SdxuArticleTitle from '@sdx/ui/components/article-panel';
import SdxuSectionTitle from '@sdx/ui/components/section-panel';
export default {
    name: 'SdxvModelDetail',
    data() {
        return {
            cardInfo: {
                icon:'sdx-mobanxiangmu',
                title: 'skyide',
                type: '自然语言处理',
                creator: '吴晓飞',
                createdAt: '2018/09/11',
                description: '啊上传即可拿手机萨达扫地阿斯顿安大道爱上大手大脚卡爱上拿手机啊啥的呢，啊时间放假啊飞啊的收纳啊大室家阿多尼斯扩大阿达舒服就啊啊上传呢卡德纳斯就卡阿大 啊是卡德纳斯看贾夫纳市就分手',
                labels: [
                    '标签A', '标签S', '标签F',
                ],
                owner: {
                    uuid: 'asfbadasijo899'
                }
            }
        };
    },
    mixins: [locale],
    components: {
        SdxwModelDetailCard,
        [SdxuArticleTitle.name]: SdxuArticleTitle,
        [SdxuSectionTitle.name]: SdxuSectionTitle,
    }
};
</script>

<style lang="scss" scoped>
.sdxv-model-detail {
    .sdxu-section-panel {
        margin-top: 24px;
    }
}
</style>