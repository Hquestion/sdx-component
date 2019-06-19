<template>
    <sdxu-content-panel
        title="基于此构建"
        class="sdxv-image-build-basic"
    >
        <el-form
            :model="imageInfo"
            label-width="100px"
            @submit.native.prevent
            :rules="imageInfoRules"
            ref="form"
            class="sdxv-image-build-basic__form"
        >
            <el-form-item
                label="镜像名称:"
                prop="name"
            >
                <div class="sdxv-image-build-basic__name">
                    <span class="sdxv-image-build-basic__name--prefix">{{ name_prefix }}</span>
                    <sdxu-input
                        v-model="imageInfo.name"
                        placeholder="请输入镜像名称"
                        size="small"
                        class="sdxv-image-build-basic__name--input"
                    />
                </div>
            </el-form-item>
            <el-form-item
                label="镜像版本号:"
                prop="version"
            >
                <sdxu-input
                    v-model="imageInfo.version"
                    placeholder="请输入镜像版本号"
                    size="small"
                />
            </el-form-item>
            <el-form-item label="包变更:">
                <sdxv-package-list
                    :image-id="imageId"
                    :search="search"
                    @queryCount="total => queryCount = total"
                    @deletePackage="handleDeletePackage"
                    @upgradePackage="handleUpgradePackage"
                />
            </el-form-item>
            <el-form-item>
                <div class="sdxv-image-build-basic__add-package">
                    <div
                        class="sdxv-image-build-basic__add-package--button"
                        @click="showAddPackageForm = !showAddPackageForm"
                    >
                        <sdxu-button
                            size="small"
                            @click.native.stop="showAddPackageForm = !showAddPackageForm"
                        >
                            新增包
                        </sdxu-button>
                        <div class="sdxv-image-build-basic__add-package--icon">
                            <span>{{ showAddPackageForm ? "收起" : "展开" }}</span>
                            <i
                                class="sdx-icon sdx-icon-arrow-down"
                                :class="{ 'is-reverse': showAddPackageForm }"
                            />
                        </div>
                    </div>
                    <transition name="slide">
                        <sdxv-add-package
                            v-if="showAddPackageForm"
                            :query-count="queryCount"
                            @addPackage="handleAddPackage"
                            @packageNameChange="handlePackageNameChange"
                        />
                    </transition>
                </div>
            </el-form-item>
            <el-form-item label="包变更详情:">
                <sdxv-modified-package-list
                    :install-packages="imageInfo.installPackages"
                    :uninstall-packages="imageInfo.uninstallPackages"
                    :upgrade-packages="imageInfo.upgradePackages"
                    @cancelModifyPackage="handleCancelModifyPackage"
                />
            </el-form-item>
            <el-form-item>
                <sdxu-button
                    type="default"
                    @click="handleCancel"
                    size="small"
                >
                    取消
                </sdxu-button>
                <sdxu-button
                    @click="handleSaveAndBuild" 
                    size="small"
                >
                    保存并构建
                </sdxu-button>
            </el-form-item>
        </el-form>
    </sdxu-content-panel>
</template>

<script>
import SdxuContentPanel from '@sdx/ui/components/content-panel';
import SdxuInput from '@sdx/ui/components/input';
import SdxuButton from '@sdx/ui/components/button';
import SdxvAddPackage from './AddPackage';
import SdxvModifiedPackageList from '../ModifiedPackageList';
import SdxvPackageList from '../PackageList';
import { Form, FormItem } from 'element-ui';

import { getImage, buildImageBasic } from '@sdx/utils/src/api/image';
import { imageNameValidate, imageVersionValidate } from '@sdx/utils/src/helper/validate';

export default {
    name: 'SdxvImageBuildBasic',
    components: {
        SdxuContentPanel,
        SdxuInput,
        SdxuButton,
        SdxvAddPackage,
        SdxvModifiedPackageList,
        SdxvPackageList,
        [Form.name]: Form,
        [FormItem.name]: FormItem
    },
    props: {
        imageId: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            baseInfo: {},
            imageInfo: {
                baseImage: this.imageId,
                name: '',
                version: '',
                installPackages: [],
                uninstallPackages: [],
                upgradePackages: [],
                imageType: ''
            },
            search: '', // 查询的包名
            queryCount: 0,
            showAddPackageForm: false,
            imageInfoRules: {
                name: [{
                    required: true,
                    message: '镜像名称不能为空',
                    trigger: 'blur'
                },
                {
                    validator: imageNameValidate,
                    trigger: 'blur'
                }],
                version: [{
                    required: true,
                    message: '镜像版本号不能为空',
                    trigger: 'blur'
                },
                {
                    validator: imageVersionValidate,
                    trigger: 'blur'
                }]
            }
        };
    },
    computed: {
        name_prefix() {
            return this.baseInfo.name + '_'; 
        }
    },
    methods: {
        fetchBaseImageInfo() {
            getImage(this.imageId).then(data => {
                this.baseInfo = data;
            });
        },
        handleDeletePackage(pack) {
            this.imageInfo.uninstallPackages.push({
                ...pack,
                createdAt: Math.floor(new Date() / 1000)
            });
        },
        handleUpgradePackage(pack) {
            this.imageInfo.upgradePackages.push({
                ...pack,
                createdAt: Math.floor(new Date() / 1000)
            });
        },
        handleAddPackage(pack) {
            this.imageInfo.installPackages.push({
                ...pack,
                createdAt: Math.floor(new Date() / 1000)
            });
        },
        handlePackageNameChange(val) {
            this.search = val;
        },
        handleCancelModifyPackage(pack) {
            this.imageInfo[pack.modify.type].splice(pack.modify.index, 1);
        },
        handleCancel() {
            this.$router.go(-1);
        },
        handleSaveAndBuild() {
            this.$refs.form.validate().then(valid => {
                if (valid) {
                    buildImageBasic(this.imageInfo).then(() => {
                        this.$router.go(-1);
                    });
                } else {
                    return false;
                }
            });
        }
    },
    created() {
        this.fetchBaseImageInfo();
    }
};
</script>

<style>

</style>
