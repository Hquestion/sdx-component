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
                        <SdxuButton
                            icon="sdx-icon-plus"
                            type="primary"
                        >
                            {{ t('view.model.Create_a_new_version') }}
                        </SdxuButton>
                    </div>
                    <div>
                        <SdxuButton
                            type="default"
                        >
                            {{ t('view.model.New_model_service') }}
                        </SdxuButton>
                        <SdxuButton
                            type="default"
                        >
                            {{ t('view.model.New_gray_level_release') }}
                        </SdxuButton>
                        <SdxuButton
                            type="default"
                        >
                            {{ t('view.model.Release_to_AI_open_platform') }}
                        </SdxuButton>
                        <SdxuButton
                            type="default"
                            size="regular"
                            trigger="click"
                            dropdown-width="150px"
                        >
                            {{ t('sdxCommon.More') }}
                            <template slot="dropdown">
                                <SdxuButton
                                    type="default"
                                    size="regular"
                                    @click="editVersion()"
                                >
                                    {{ t('sdxCommon.Edit') }}
                                </SdxuButton>
                                <SdxuButton
                                    type="default"
                                    size="regular"
                                >
                                    {{ t('sdxCommon.Delete') }}
                                </SdxuButton>
                            </template>
                        </SdxuButton>
                    </div>
                </div>
                <div>
                    <span>{{ `${t('view.model.versionDetail.description')}：` }}</span>
                    <span>的事发生贾凯里尼爱上曾经阿森纳成的事发生贾凯里尼爱上曾经阿森纳成绩啊上传说你是首次举办的时间长当时的此刻就是错的事潮男夹克衫不错不错就是差的事发生贾凯里尼爱上曾经阿森纳成绩啊上传说你是首次举办的时间长当时的此刻就是错的事潮男夹克衫不错不错就是差绩啊上传说你是首次举办的时间长当时的此刻就是错的事潮男夹克衫不错不错就是差 </span>
                </div>
                <div>
                    <span>{{ `${t('view.model.ModelFile')}：` }}</span>
                    <span>是错的事潮男夹克衫不错不错就是差 </span>
                    <SdxuButton
                        size="regular"
                        type="link"
                        @click="download()"
                    >
                        {{ t('view.file.Download') }}
                    </SdxuButton>
                </div>
                <div>
                    <span>{{ `${t('sdxCommon.CreatedTime')}：` }}</span>
                    <span>2019/04/21 23:40 </span>
                </div>
                <div>
                    <span>{{ `${t('sdxCommon.UpdatedTime')}：` }}</span>
                    <span>2019/04/21 23:40 </span>
                </div>
            </sdxu-article-panel>
        </sdxu-section-panel>
        <EditVersion :visible.sync="editVersionVisible" />
    </div>
</template>

<script>
import locale from '@sdx/utils/src/mixins/locale';
import SdxwModelDetailCard from '@sdx/widget/components/model-detail-card';
import SdxuArticleTitle from '@sdx/ui/components/article-panel';
import SdxuSectionTitle from '@sdx/ui/components/section-panel';
import { Select, Option } from 'element-ui';
import Button from '@sdx/ui/components/button';
import {dateFormatter} from '@sdx/utils/src/helper/transform';
import EditVersion from '../model-list/CreateVersion';
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
                description: '啊上传即可拿就卡阿大间放假啊飞啊的收纳啊大室家阿多尼斯扩大阿达舒服就啊啊上传呢卡德纳斯就卡阿大 啊是卡德纳斯看贾夫纳市就分手',
                labels: [
                    '标签A', '标签S', '标签F',
                ],
                owner: {
                    uuid: 'asfbadasijo899'
                }
            },
            versions: [],
            version: '',
            editVersionVisible: false
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
        EditVersion
    },
    methods: {
        dateFormatter,
        download() {

        },
        editVersion() {
            this.editVersionVisible = true;
        }
    }
};
</script>

<style lang="scss" scoped>
.sdxv-model-detail {
    .title {
        font-size: 24px;
        color: #13264D;
        margin-bottom: 32px;
    }
    .sdxu-section-panel {
        margin-top: 24px;
    }
    .sdxu-article-panel__content {
        div {
            .sdxu-button--primary {
                margin-left: 24px;
            }
            display: flex;
            span {
                line-height: 40px;
                color: #13264D;
            }
            span:first-child {
                width: 70px;
                min-width: 70px;
                height: 40px;
                color: #6E7C94;
            }
            .el-select {
                width: 280px;
            }
        }
        div:first-child {
            display: flex;
            justify-content: space-between;
        }
        div:nth-child(3) {
            span:nth-child(2) {
                max-width: calc(100% - 158px);
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                word-break: break-all;
            }
            .sdxu-button--link {
                margin-left: 48px;
            }
        }
        .sdxu-button__dropdown--main {
            width: 100px !important;
            .sdxu-button {
                width: 100px;
            }
        }
    }
}
</style>