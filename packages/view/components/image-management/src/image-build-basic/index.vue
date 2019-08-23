<template>
    <sdxu-content-panel
        :title="t('view.image.BuildBaseThis')"
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
                :label="t('view.image.ImageName') + ':'"
                prop="name"
            >
                <div class="sdxv-image-build-basic__name">
                    <span class="sdxv-image-build-basic__name--prefix">{{ name_prefix }}</span>
                    <sdxu-input
                        v-model="imageInfo.name"
                        :placeholder="t('view.image.ImageNameInputPlaceholder')"
                        size="small"
                        class="sdxv-image-build-basic__name--input"
                    />
                </div>
            </el-form-item>
            <el-form-item
                :label="t('view.image.ImageVersion') + ':'"
                prop="version"
            >
                <sdxu-input
                    v-model="imageInfo.version"
                    :placeholder="t('view.image.ImageVersionInputPlaceholder')"
                    size="small"
                />
            </el-form-item>
            <el-form-item :label="t('view.image.PackageChange') + ':'">
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
                            {{ t('view.image.AddNewPackage') }}
                        </sdxu-button>
                        <div class="sdxv-image-build-basic__add-package--icon">
                            <span>{{ showAddPackageForm ? t('sdxCommon.retract') : t('sdxCommon.expand') }}</span>
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
            <el-form-item :label="t('view.image.PackageChangeDetail') + ':'">
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
                    {{ t('sdxCommon.Cancel') }}
                </sdxu-button>
                <sdxu-button
                    @click="handleSaveAndBuild"
                    size="small"
                    :disabled="!hasChangedPackages"
                >
                    {{ t('view.image.SaveAndBuild') }}
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
import locale from '@sdx/utils/src/mixins/locale';

export default {
    name: 'SdxvImageBuildBasic',
    mixins: [locale],
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
                    message: this.t('view.image.ImageNameNotBeNull'),
                    trigger: 'blur'
                },
                {
                    validator: imageNameValidate,
                    trigger: 'blur'
                }],
                version: [{
                    required: true,
                    message: this.t('view.image.ImageVersionNotBeNull'),
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
        },
        hasChangedPackages() {
            return !!(this.imageInfo.installPackages.length || this.imageInfo.uninstallPackages.length || this.imageInfo.upgradePackages.length);
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
                    let params = Object.assign({}, this.imageInfo, { name: this.name_prefix + this.imageInfo.name });
                    buildImageBasic(params).then(() => {
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
