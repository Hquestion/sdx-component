<template>
    <div class="sdxv-model-detail">
        <div class="title">
            {{ t('view.model.ModelDetail') }}
        </div>
        <SdxwModelDetailCard :meta="cardInfo" />
        <sdxu-section-panel>
            <sdxu-article-panel
                :title="t('view.model.VersionInformation')"
            >
                <div>
                    <span>{{ `${t('view.model.SelectedVersion')}：` }}</span>
                    <el-select
                        size="large"
                        :placeholder="t('sdxCommon.PleaseSelect')"
                        v-model="version"
                    >
                        <el-option
                            v-for="item in versions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        />
                    </el-select>
                </div>
                <div>
                    <span>{{ `${t('view.model.versionDetail.description')}：` }}</span>
                    <span>的事发生贾凯里尼爱上曾经阿森纳成绩啊上传说你是首次举办的时间长当时的此刻就是错的事潮男夹克衫不错不错就是差 </span>
                </div>
                <div>
                    <span>{{ `${t('view.model.ModelFile')}：` }}</span>
                    <span>是错的事潮男夹克衫不错不错就是差 </span>
                </div>
            </sdxu-article-panel>
        </sdxu-section-panel>
    </div>
</template>

<script>
import locale from '@sdx/utils/src/mixins/locale';
import SdxwModelDetailCard from '@sdx/widget/components/model-detail-card';
import SdxuArticleTitle from '@sdx/ui/components/article-panel';
import SdxuSectionTitle from '@sdx/ui/components/section-panel';
import { Select, Option } from 'element-ui';
import Button from '@sdx/ui/components/button';
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
            },
            versions: [],
            version: ''
        };
    },
    mixins: [locale],
    components: {
        SdxwModelDetailCard,
        [SdxuArticleTitle.name]: SdxuArticleTitle,
        [SdxuSectionTitle.name]: SdxuSectionTitle,
        [Select.name]: Select,
        [Option.name]: Option,
        [Button.name]: Button,
    }
};
</script>

<style lang="scss" scoped>
.sdxv-model-detail {
    .sdxu-section-panel {
        margin-top: 24px;
    }
    .sdxu-article-panel__content {
        div {
            display: flex;
            span:first-child {
                width: 70px;
                height: 40px;
                line-height: 40px;
                color: #6E7C94;
            }
            .el-select {
                width: 280px;
            }
        }
    }
}
</style>