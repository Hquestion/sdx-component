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
                            v-model="versionParams.uuid"
                            @change="changeVersion"
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
                            @click="createVersion"
                        >
                            {{ t('view.model.Create_a_new_version') }}
                        </SdxuButton>
                    </div>
                    <div>
                        <SdxuButton
                            type="default"
                            @click="createModelService"
                        >
                            {{ t('view.model.New_model_service') }}
                        </SdxuButton>
                        <SdxuButton
                            type="default"
                            @click="grayLevelRelease"
                            :disabled="!grayList.length"
                        >
                            {{ t('view.model.New_gray_level_release') }}
                        </SdxuButton>
                        <SdxuButton
                            type="default"
                            @click="releaseAI"
                            v-if="false"
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
                                    @click="removeVersion"
                                >
                                    {{ t('sdxCommon.Delete') }}
                                </SdxuButton>
                            </template>
                        </SdxuButton>
                    </div>
                </div>
                <div>
                    <span>{{ `${t('view.model.versionDetail.description')}：` }}</span>
                    <span>{{ versionParams.description ? versionParams.description : t('widget.projectCard.NoDescriptionAdded') }} </span>
                </div>
                <div>
                    <span>{{ `${t('view.model.ModelFile')}：` }}</span>
                    <span>{{ versionParams.modelPath }}</span>
                    <SdxuButton
                        size="regular"
                        type="link"
                        @click="downLoadModelFile(versionParams.modelPath, versionParams.creatorId)"
                    >
                        {{ t('view.file.Download') }}
                    </SdxuButton>
                </div>
                <div>
                    <span>{{ `${t('sdxCommon.CreatedTime')}：` }}</span>
                    <span>{{ dateFormatter(versionParams.createdAt) }}</span>
                </div>
                <div>
                    <span>{{ `${t('sdxCommon.UpdatedTime')}：` }}</span>
                    <span>{{ dateFormatter(versionParams.updatedAt) }}</span>
                </div>
            </sdxu-article-panel>
        </sdxu-section-panel>
        <ModelVersion
            :visible.sync="modelVersionVisible"
            :is-edit="modelVersionEdit"
            :info="modelVersionInfo"
            v-if="modelVersionVisible"
            @confirm="confirmPublish"
        />
        <create-model-service
            :visible.sync="createServiceVisible"
            :model-id="$route.params.modelId"
            :version-id="versionParams.uuid"
            :version-name="versionParams.name"
            v-if="createServiceVisible"
        />
        <PublishPlatform
            :visible.sync="releaseAIVisible"
            :is-model="true"
            v-if="releaseAIVisible"
            :is-edit="true"
            :info="modelInfo"
            @confirmPublish="confirmPublish"
        />
        <GrayscaleRelease
            :visible.sync="grayscaleReleaseVisible"
            :is-model-service="true"
            :info="versionParams"
            v-if="grayscaleReleaseVisible"
            @confirmGray="confirmGray"
            :select-options="grayList"
        />
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
import ModelVersion from '../service-dialog/ModelVersion';         
import CreateModelService from '../service-dialog/create-model-service/Index';
import { getModelInfo,removeVersion, getServiceList, removeModel } from '@sdx/utils/src/api/model';
import { getUserSimpleInfo } from '@sdx/utils/src/api/user';
import {download, pack} from '@sdx/utils/src/api/file';
import Message from 'element-ui/lib/message';
import MessageBox from '@sdx/ui/components/message-box';
import PublishPlatform from '../service-dialog/PublishPlatform';
import { MODEL_TYPES_ICON, DEFAULT_MODEL_TYPE_ICON } from '@sdx/utils/src/const/model';
import GrayscaleRelease from '../service-dialog/GrayscaleRelease';
export default {
    name: 'SdxvModelDetail',
    mixins: [locale],
    data() {
        return {
            cardInfo: {
                icon:'',
                title: '',
                type: '',
                creator: '',
                createdAt: '',
                description: '',
                labels: [],
                owner: {
                    uuid: ''
                },
                latestV: 0
            },
            versions: [],
            modelVersionVisible: false,
            createServiceVisible: false,
            releaseAIVisible: false,
            grayscaleReleaseVisible: false,
            versionInfo: [],
            // 版本信息
            versionParams: {
                name: '',
                uuid: '',
                modelPath: '',
                description: '',
                createdAt: '',
                updatedAt: '',
                creatorId: ''
            },
            modelInfo: null,
            modelVersionEdit: false,
            modelVersionInfo: null,
            // 模型服务列表
            serviceList: [],
            // 灰度列表
            grayList: []
        };
    },
    components: {
        SdxwModelDetailCard,
        [SdxuArticleTitle.name]: SdxuArticleTitle,
        [SdxuSectionTitle.name]: SdxuSectionTitle,
        [Select.name]: Select,
        [Option.name]: Option,
        [Button.name]: Button,
        ModelVersion,
        CreateModelService,
        PublishPlatform,
        GrayscaleRelease
    },
    created() {
        this.getModelDetail();
    },
    methods: {
        dateFormatter,
        async confirmGray() {
            await this.getModelDetail();
            this.getServices();
        },
        confirmPublish() {
            this.getModelDetail();
        },
        downLoadModelFile(modelPath, ownerId) {
            let path = modelPath.split(':')[1];
            let defer=null;
            defer = pack([path], ownerId);
            defer.then(res => {
                download(res, ownerId);
            });
        },
        // 获取模型列表
        getServices() {
            let params = {
                modelId: this.$route.params.modelId,
                state: 'Running'
            };
            getServiceList(params).then(res => {
                this.grayList = JSON.parse(JSON.stringify(res.items.filter(item => item.versionName !== this.versionParams.name)));
            });
        },
        // 新增灰度发布
        grayLevelRelease() {
            this.grayscaleReleaseVisible = true;
        },
        createVersion() {
            this.modelVersionVisible = true;
            this.modelVersionEdit = false;
            this.modelVersionInfo = {
                modelId: this.$route.params.modelId,
                name: this.cardInfo.title,
                latestV: this.cardInfo.latestV,
            };
        },
        editVersion() {
            this.modelVersionVisible = true;
            this.modelVersionEdit = true;
            this.modelVersionInfo = {
                modelId: this.$route.params.modelId,
                versionId: this.versionParams.uuid,
                name: this.cardInfo.title,
                version: this.versionParams.name,
                description: this.versionParams.description,
                modelPath: this.versionParams.modelPath,
            };
        },
        releaseAI(){
            this.releaseAIVisible = true;
        },
        removeVersion() {
            MessageBox({
                title: this.t('view.model.modelVersionDeletionPrompt'),
                content: this.versionInfo.length === 1 ? this.t('view.model.Deleting_this_version_will_delete_the_entire_model') : this.t('view.model.versionRemoveConfirm'),
                status: 'warning'
            }).then(() => {
                removeVersion(this.$route.params.modelId, this.versionParams.uuid).then(() => {
                    Message({
                        message: this.t('sdxCommon.RemoveSuccess'),
                        type: 'success'
                    });
                    if(this.versionInfo.length === 1) {
                        removeModel(this.$route.params.modelId).then(() => {
                            this.$router.push({
                                path: '/sdxv-model-manage-next/modelList',
                            });
                        });
                    } else {
                        this.getModelDetail();
                    }
                });
            });
        },
        createModelService() {
            this.createServiceVisible = true;
        },
        changeVersion(uuid) {
            let items = JSON.parse(JSON.stringify(this.versionInfo));
            let index = items.findIndex(item => item.uuid === uuid);
            this.versionParams = items[index];
            this.getServices();
        },
        // 获取模型详情
        getModelDetail() {
            getModelInfo(this.$route.params.modelId).then(res => {
                // 根据creatorId 得到用户信息 
                getUserSimpleInfo(res.creatorId).then((data) => {
                    // 根据模型类型 得到对应的icon，color
                    let iconColor = MODEL_TYPES_ICON.filter(item => item.name === res.modelType)[0];
                    iconColor = iconColor ? iconColor : {
                        icon: DEFAULT_MODEL_TYPE_ICON,
                        color: '#1144AB'
                    };
                    this.cardInfo = {
                        icon: iconColor.icon,
                        title: res.name,
                        type: res.modelType,
                        creator: data.fullName,
                        createdAt: res.createdAt,
                        description: res.description,
                        labels: res.labels,
                        owner: {
                            uuid: res.creatorId
                        },
                        labelColor: iconColor.color,
                        latestV: res.latestV
                    };
                });
                // 模型信息，弹框
                this.modelInfo = {
                    uuid: res.uuid,
                    name: res.name,
                    description: res.description,
                    modelType: res.modelType,
                    labels: res.labels
                };
                this.versionInfo = res.versions.items;
                let items = JSON.parse(JSON.stringify(this.versionInfo));
                // 获取最新的版本，展示出来
                let index = items.findIndex(item => item.name === res.versions.latest);
                let arr = [];
                for(let i = 0; i < items.length; i++) {
                    arr.push({
                        value: items[i].uuid,
                        label: items[i].name
                    });
                }
                this.versions = arr;
                requestAnimationFrame(() => {
                    this.versionParams = items[index];
                    this.getServices();
                });
            });
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
    }
    & /deep/ {
        .sdxu-button__dropdown--main {
            width: 100px !important;
        }
        .sdxu-article-panel__content {
            padding-bottom: 0;
        }
    }
}
</style>
