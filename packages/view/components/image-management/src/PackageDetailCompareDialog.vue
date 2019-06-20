<template>
    <sdxu-dialog
        title="包详情比较"
        :visible.sync="dialogVisible"
        :no-footer="true"
    >
        <div class="sdxv-package-compare">
            <SdxuScroll>
                <div class="sdxv-package-compare__item">
                    <span class="sdxv-package-compare__item--title">{{ title }}</span>
                    <sdxv-package-list
                        v-if="imageId"
                        :image-id="imageId"
                        :operatable="false"
                    />
                </div>
                <div class="sdxv-package-compare__item">
                    <span class="sdxv-package-compare__item--title">变更详情</span>
                    <sdxv-modified-package-list
                        :install-packages="imageBuilder.installPackages"
                        :uninstall-packages="imageBuilder.uninstallPackages"
                        :upgrade-packages="imageBuilder.upgradePackages"
                        :operatable="false"
                    />
                </div>
            </SdxuScroll>
        </div>
    </sdxu-dialog>
</template>

<script>
import SdxuDialog from '@sdx/ui/components/dialog';
import SdxvPackageList from './PackageList';
import SdxvModifiedPackageList from './ModifiedPackageList';
import SdxuScroll from '@sdx/ui/components/scroll';

export default {
    name: 'SdxvPackageDetailCompareDialog',
    components: {
        SdxuDialog,
        SdxvPackageList,
        SdxvModifiedPackageList,
        SdxuScroll
    },
    props: {
        visible: {
            type: Boolean,
            default: false
        },
        imageBuilder: {
            type: Object,
            default: () => ({})
        }
    },
    computed: {
        dialogVisible: {
            get() {
                return this.visible;
            },
            set(nval) {
                this.$emit('update:visible', nval);
            }
        },
        title() {
            return `基础镜像${this.basicImageName}包详情`;
        },
        imageId() {
            return this.imageBuilder.baseImage && this.imageBuilder.baseImage.uuid || '';
        },
        basicImageName() {
            return this.imageBuilder.baseImage && this.imageBuilder.baseImage.name || '';
        }
    }
};
</script>

<style lang="scss">
    .sdxv-package-compare{
        height: 60vh;
        .sdxv-package-compare__item {
            .sdxv-package-compare__item--title {
                display: block;
                font-size:14px;
                color:rgba(48,49,51,1);
                line-height:20px;
                margin-bottom: 20px;
                &:before {
                    content: ' ';
                    display: inline-block;
                    width: 3px;
                    height: 14px;
                    background: #4781F8;
                    vertical-align: middle;
                    margin-right: 12px;
                }
            }
        }
    }
</style>
