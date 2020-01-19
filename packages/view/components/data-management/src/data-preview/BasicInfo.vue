<template>
    <div class="sdxv-data-basic-info">
        <sdxu-section-panel>
            <sdxu-article-panel
                :title="t('view.model.basicInfo')"
            >
                <template #right>
                    <IconButton
                        border
                        icon="sdx-icon sdx-xiazaiX"
                        @click="downLoadFile(meta.datasetPath)"
                        v-if="meta.datasetPath"
                    />
                </template>
                <div class="top">
                    <div>
                        <img
                            :src="meta.coverImg || defaultImgCover"
                        >
                        <div>
                            <div>{{ meta.name }}</div>
                            <div>
                                <span>
                                    {{ `${t('sdxCommon.Creator')}：` }}
                                </span>
                                <span>
                                    {{ creator }}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div 
                            v-for="(item,index) in meta.labels"
                            :key="index"
                        >
                            {{ item }}
                        </div>
                    </div>
                </div>
                <div class="center">
                    <div>
                        <span>{{ `${t('sdxCommon.CreatedTime')}：` }}</span>
                        <span>{{ dateFormatter(meta.createdAt) }}</span>
                    </div>
                    <div>
                        <span>{{ `${t('sdxCommon.UpdatedTime')}：` }}</span>
                        <span>{{ dateFormatter(meta.updatedAt) }}</span>
                    </div>
                    <div>
                        <span>{{ `${t('view.dataManagement.Target_path')}：` }}</span>
                        <span>{{ meta.datasetPath }}</span>
                    </div>
                </div>
                <div class="bottom">
                    {{ meta.description ? meta.description : t('widget.projectCard.NoDescriptionAdded') }}
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
import defaultImgCover from '@sdx/utils/src/theme-common/static/defaultImgCover.svg';
import {getUserSimpleInfo} from '@sdx/utils/src/api/user';
import {dateFormatter} from '@sdx/utils/src/helper/transform';
import { download, pack} from '@sdx/utils/src/api/file';
export default {
    name: 'SdxvBasicInfo',
    mixins: [locale],
    components: {
        [SdxuArticleTitle.name]: SdxuArticleTitle,
        [SdxuSectionTitle.name]: SdxuSectionTitle,
        IconButton
    },
    data() {
        return {
            creator: '',
            defaultImgCover
        };
    },
    props: {
        meta: {
            type: Object,
            default: () => {}
        },
    },
    watch: {
        meta(val) {
            getUserSimpleInfo(val.creatorId).then(res => {
                this.creator = res.fullName;
            });
        }
    },
    methods: {
        dateFormatter,
        // 下载文件
        downLoadFile(path){
            let defer=null;
            defer = pack([path]);
            defer.then(res => {
                download(res);
            });
        },
    }
};
</script>

<style lang="scss" scoped>
.sdxv-data-basic-info {
    &/deep/ {
        .sdxu-article-panel__content {
            padding: 24px 0px 0px 0px;
        }
        .sdxu-section-panel {
            height: 312px;
        }
    }
    .top {
        display: flex;
        justify-content: space-between;
        img {
            width: 64px;
            height: 64px;
            margin-right: 16px;
        }
        &>div:first-child {
            display: flex;
            justify-content: space-between;
            &>div {
                padding: 8px 0;
                div {
                    height: 26px;
                    line-height: 26px;
                    font-size: 14px;
                    color: #13264D;
                }
                div:first-child {
                    font-size: 18px;
                    color: #13264D;
                }
            }
        }
        &>div:last-child {
            display: flex;
            div {
                background: #EDEFF2;
                border-radius: 2px;
                height: 32px;
                line-height: 32px;
                padding: 0 8px;
                color: #253858;
                & + div {
                    margin-left: 16px;
                }
            }
            
        }
    }
    .center {
        margin: 24px 0 16px 0;
        div {
            margin-bottom: 8px;
            span {
                color: #13264D;
            }
            span:first-child {
                color: #6E7C94;
            }
        }
    }
    .bottom {
        color: #6E7C94;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
    }
}
</style>