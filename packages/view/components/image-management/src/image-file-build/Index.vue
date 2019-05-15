<template>
    <div class="sdxv-image-file">
        <SdxuContentPanel
            title="基于文件构建"
        >
            <el-radio-group v-model="radio">
                <el-radio :label="3">
                    基于tar文件构建
                </el-radio>
                <el-radio :label="6">
                    基于DockerFile文件构建
                </el-radio>
            </el-radio-group>
            <el-form
                ref="form"
                :model="params"
                label-width="140px"
                label-position="right"
            >
                <el-form-item
                    label="镜像名称:"
                    prop="name"
                    required
                >
                    <SdxuInput
                        placeholder="请输入组名"
                        v-model="params.name"
                    />
                </el-form-item>
                <el-form-item
                    label="镜像版本号:"
                    prop="roles"
                    required
                >
                    <el-select
                        v-model="params.roles"
                        multiple
                        placeholder="请选择角色"
                        style="width: 100%"
                    />
                </el-form-item>
            </el-form>
        </SdxuContentPanel>
    </div>
</template>

<script>
import ContentPanel from '@sdx/ui/components/content-panel';
import {RadioGroup, Radio}  from 'element-ui';
export default {
    name: '',
    data() {
        return {
            radio: 3,
            params: {
                name: '',
                version: '',
                imageType: '',
                filePath: ''
            }
        };
    },
    components: {
        [ContentPanel.name]: ContentPanel,
        [RadioGroup.name]: RadioGroup,
        [Radio.name]: Radio,
    },
    methods: {
       
    },
    created() {
      
    }
};
</script>

<style scoped lang="scss">
</style>
