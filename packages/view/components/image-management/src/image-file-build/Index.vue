<template>
    <div class="sdxv-image-file">
        <SdxuContentPanel
            title="基于文件构建"
        >
            <el-radio-group
                v-model="radio"
                @change="radioChange"
            >
                <el-radio label="tar">
                    基于tar文件构建
                </el-radio>
                <el-radio label="DockerFile">
                    基于DockerFile文件构建
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
                    label="镜像名称:"
                    prop="name"
                >
                    <SdxuInput
                        placeholder="请输入镜像名称"
                        v-model="params.name"
                    />
                </el-form-item>
                <el-form-item
                    label="镜像版本号:"
                    prop="version"
                >
                    <SdxuInput
                        placeholder="请输入镜像版本号"
                        v-model="params.version"
                    />
                </el-form-item>
                <el-form-item
                    label="镜像种类:"
                    prop="imageType"
                >
                    <el-select
                        v-model="params.imageType"
                        placeholder="请选择"
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
                    :label="radio === 'DockerFile' ? '文件地址' :'文件地址:' "
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
                            <span>:</span>
                        </i>
                    </el-popover>
                    <SdxwFileSelect
                        v-model="params.filePath"
                        :accept="radio === 'DockerFile' ? '': '.tar'"
                        :check-type="radio === 'DockerFile' ? 'file' : 'all'"
                    />
                </el-form-item>
            </el-form>
            <div class="foot">
                <SdxuButton
                    type="default"
                    @click="cancel"
                    size="small"
                >
                    取消
                </sdxubutton>
                <SdxuButton
                    type="primary"
                    @click="savaBuild"
                    size="small"
                >
                    保存并构建
                </sdxubutton>
            </div>
        </SdxuContentPanel>
    </div>
</template>

<script>
import ContentPanel from '@sdx/ui/components/content-panel';
import {RadioGroup, Radio, Popover}  from 'element-ui';
import SdxuInput from '@sdx/ui/components/input';
import {DOCKER_IMAGE_KIND_LIST} from '@sdx/utils/src/const/relation';
import {buildTar,buildImagefile} from '@sdx/utils/src/api/image';
import SdxuButton from '@sdx/ui/components/button';
import {imageNameValidate, imageVersionValidate} from '@sdx/utils/src/helper/validate';
import FileSelect from '@sdx/widget/components/file-select';
import Iconinfo from './Iconinfo';
export default {
    name: '',
    data() {
        return {
            radio: 'tar',
            params: {
                name: '',
                version: '',
                imageType: 'JUPYTER',
                filePath: []
            },
            DOCKER_IMAGE_KIND_LIST,
            rules: {
                name: [
                    {
                        required: true,
                        message: '镜像名称不能为空',
                        trigger: 'blur',
                        transform(value) {
                            return value && ('' + value).trim();
                        }
                    },
                    {
                        validator: imageNameValidate,
                        trigger: 'blur'
                    }
                ],
                version: [
                    {
                        required: true,
                        message: '镜像版本号不能为空',
                        trigger: 'blur',
                        transform(value) {
                            return value && ('' + value).trim();
                        }
                    },
                    {
                        validator: imageVersionValidate,
                        trigger: 'blur'
                    }
                ],
                imageType: [
                    {required: true}
                ],
                filePath: [
                    {
                        required: true,
                        message: '文件地址不能为空',
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
    methods: {
        radioChange() {
            this.$refs.form.clearValidate();
        },
        // 基于 tar 文件新建镜像任务
        imageBuildTar(params) {
            buildTar(params)
                .then(() => {
                    this.$router.go(-1);
                });
        },
        imageBuildImagefile(params) {
            buildImagefile(params)
                .then(() => {
                    this.$router.go(-1);
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
