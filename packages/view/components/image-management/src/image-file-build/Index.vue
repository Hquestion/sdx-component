<template>
    <SdxuContentPanel
        class="sdxv-image-file"
        :fullscreen="true"
        :title="t('view.image.BuildBasedOnFile')"
    >
        <el-radio-group
            v-model="radio"
            @change="radioChange"
        >
            <el-radio
                label="tar"
                v-auth.image.button="'IMAGE_BUILDER:BUILD_TAR'"
            >
                {{ t('view.image.BuildTypes.Tar') }}
            </el-radio>
            <el-radio
                label="DockerFile"
                v-auth.image.button="'IMAGE_BUILDER:BUILD_IMAGE_FILE'"
            >
                {{ t('view.image.BuildTypes.Dockerfile') }}
            </el-radio>
        </el-radio-group>
        <el-form
            ref="form"
            :model="params"
            label-width="140px"
            label-position="right"
            :rules="rules"
        >
            <el-form-item
                :label="t('view.image.SearchImageName')"
                prop="name"
            >
                <SdxuInput
                    :placeholder="t('view.image.ImageNameInputPlaceholder')"
                    v-model="params.name"
                />
            </el-form-item>
            <el-form-item
                :label="t('view.image.MirrorVersion')"
                prop="version"
            >
                <SdxuInput
                    :placeholder="t('view.image.ImageVersionInputPlaceholder')"
                    v-model="params.version"
                />
            </el-form-item>
            <el-form-item
                :label="t('view.image.SearchImageKind')"
                prop="imageType"
            >
                <el-select
                    v-model="params.imageType"
                    style="width: 100%"
                >
                    <el-option
                        v-for="item in DOCKER_IMAGE_KIND_LIST"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    />
                </el-select>
            </el-form-item>
            <el-form-item
                :label="radio === 'DockerFile' ? t('view.image.FileAddress') :t('view.image.FileAddressColon') "
                prop="filePath"
                :class="radio === 'DockerFile' ? 'iconinfo' : ''"
            >
                <el-popover
                    placement="right"
                    width="540"
                    trigger="hover"
                    v-if="radio === 'DockerFile'"
                >
                    <Iconinfo />
                    <i
                        class="sdx-icon sdx-icon-info"
                        slot="reference"
                    >
                        <span>：</span>
                    </i>
                </el-popover>
                <SdxwFileSelect
                    v-model="params.filePath"
                    :accept="radio === 'DockerFile' ? '': '.tar'"
                    check-type="file"
                    :string-model="true"
                    :source="radio === 'DockerFile' ? 'ceph': 'all'"
                    :project-enable="true"
                    :private-enable="true"
                    :share-enable="true"
                    :on-progress="() => uploaded = false"
                    :on-success="() => uploaded = true"
                    :on-error="() => uploaded = false"
                />
            </el-form-item>
        </el-form>
        <div class="foot">
            <SdxuButton
                type="default"
                @click="cancel"
                size="small"
            >
                {{ t('sdxCommon.Cancel') }}
            </sdxubutton>
            <SdxuButton
                type="primary"
                @click="savaBuild"
                size="small"
                :disabled="!uploaded"
            >
                {{ t('view.image.SaveAndBuild') }}
            </sdxubutton>
        </div>
    </SdxuContentPanel>
</template>

<script>
import ContentPanel from '@sdx/ui/components/content-panel';
import {RadioGroup, Radio, Popover}  from 'element-ui';
import SdxuInput from '@sdx/ui/components/input';
import {DOCKER_IMAGE_KIND_LIST} from '@sdx/utils/src/const/relation';
import {buildTar,buildImagefile} from '@sdx/utils/src/api/image';
import SdxuButton from '@sdx/ui/components/button';
import {nameStartWithLowerCaseValidator, commonNameValidator} from '@sdx/utils/src/helper/validate';
import FileSelect from '@sdx/widget/components/file-select';
import Iconinfo from './Iconinfo';
import auth from '@sdx/widget/components/auth';
import locale from '@sdx/utils/src/mixins/locale';
export default {
    name: '',
    mixins: [locale],
    data() {
        return {
            radio: auth.checkAuth('IMAGE-MANAGER:IMAGE_BUILDER:BUILD_TAR:""', 'button') ? 'tar' : 'DockerFile',
            params: {
                name: '',
                version: '',
                imageType: 'JUPYTER',
                filePath: ''
            },
            uploaded: false,
            DOCKER_IMAGE_KIND_LIST,
            rules: {
                name: [
                    {
                        required: true,
                        message: this.t('view.image.ImageNameInputPlaceholder'),
                        trigger: 'blur',
                        transform(value) {
                            return value && ('' + value).trim();
                        }
                    },
                    {
                        validator: nameStartWithLowerCaseValidator,
                        trigger: 'blur'
                    }
                ],
                version: [
                    {
                        required: true,
                        message: this.t('view.image.ImageVersionInputPlaceholder'),
                        trigger: 'blur',
                        transform(value) {
                            return value && ('' + value).trim();
                        }
                    },
                    {
                        validator: commonNameValidator,
                        trigger: 'blur'
                    }
                ],
                imageType: [
                    {required: true}
                ],
                filePath: [
                    {
                        required: true,
                        message: this.t('view.image.please_enter_the_file_address'),
                        trigger: 'blur'
                    }
                ]
            }
        };
    },
    components: {
        [ContentPanel.name]: ContentPanel,
        [RadioGroup.name]: RadioGroup,
        [Radio.name]: Radio,
        [Popover.name]: Popover,
        SdxuInput,
        SdxuButton,
        [FileSelect.FileSelectMix.name]: FileSelect.FileSelectMix,
        Iconinfo
    },
    directives: {
        auth
    },
    methods: {
        radioChange() {
            this.$refs.form.clearValidate();
            this.params.filePath = '';
        },
        // 基于 tar 文件新建镜像任务
        imageBuildTar(params) {
            buildTar(params)
                .then(() => {
                    this.$router.push({
                        name: 'imageList',
                        params: {
                            tab: 'taskTab'
                        }
                    });
                });
        },
        imageBuildImagefile(params) {
            buildImagefile(params)
                .then(() => {
                    this.$router.push({
                        name: 'imageList',
                        params: {
                            tab: 'taskTab'
                        }
                    });
                });
        },
        resetForm() {
            this.$refs.form && this.$refs.form.resetFields();
        },
        cancel(){
            this.$router.go(-1);
            this.resetForm();
            this.params = {
                name: '',
                version: '',
                imageType: '',
                filePath: ''
            };
        },
        savaBuild(){
            this.$refs.form.validate()
                .then(() => {
                    this.radio === 'tar'
                        ? this.imageBuildTar(this.params)
                        : this.imageBuildImagefile(this.params);
                });

        }
    },
    created() {

    }
};
</script>

<style scoped lang="scss">
.sdxv-image-file {
    .iconinfo {
        &/deep/ {
            .el-form-item__label {
                padding-right: 42px;
            }
            .el-form-item__content {
                position: relative;
            }
        }
        &/deep/ .sdx-icon-info {
            cursor: pointer;
            position: absolute;
            top: 0px;
            left: -36px;
            color: #C0C4CC;
            span {
                color: #606266;
                padding-left: 3px;
            }
        }
        &/deep/ .tartype {
                color: #606266;
                padding-left: 3px;
            }

    }
}
</style>
