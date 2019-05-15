<template>
    <div class="sdxv-image-file">
        <SdxuContentPanel
            title="基于文件构建"
        >
            <el-radio-group v-model="radio">
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
                    label="文件地址:"
                    prop="filePath"
                >
                    <SdxuInput
                        placeholder="请输入镜像版本号"
                        v-model="params.filePath"
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
import {RadioGroup, Radio}  from 'element-ui';
import SdxuInput from '@sdx/ui/components/input';
import {DOCKER_IMAGE_KIND_LIST} from '@sdx/utils/src/consts/relation';
import {buildTar,buildImagefile} from '@sdx/utils/src/api/image';
import SdxuButton from '@sdx/ui/components/button';
import {itemNameValidate100, tagNameValidate} from '@sdx/utils/src/validate/validate';
export default { 
    name: '',
    data() {
        return {
            radio: 'tar',
            params: {
                name: '',
                version: '',
                imageType: 'JUPYTER',
                filePath: ''
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
                        validator: itemNameValidate100,
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
                        validator: tagNameValidate,
                        trigger: 'blur'
                    }
                ],
                imageType: [
                    {required: true}
                ],
                filePath: [
                    {
                        required: true,
                        transform(value) {
                            return value && ('' + value).trim();
                        },
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
        SdxuInput,
        SdxuButton
    },
    methods: {
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
</style>
