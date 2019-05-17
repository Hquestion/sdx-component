<template>
    <sdxu-dialog
        :title="title"
        :visible.sync="dialogVisible"
        :no-footer="true"
    >
        <sdxv-package-list
            v-if="imageId"
            :image-id="imageId"
            :operatable="false"
        />
    </sdxu-dialog>
</template>

<script>
import SdxuDialog from '@sdx/ui/components/dialog';
import SdxvPackageList from './PackageList';

export default {
    name: 'SdxvPackageDetailDialog',
    components: {
        SdxuDialog,
        SdxvPackageList
    },
    props: {
        visible: {
            type: Boolean,
            default: false
        },
        basicImageName: {
            type: String,
            default: ''
        },
        imageId: {
            type: String,
            default: ''
        }
    },
    computed: {
        title() {
            return `基础镜像${this.basicImageName}包详情`;
        },
        dialogVisible: {
            get() {
                return this.visible;
            },
            set(nval) {
                this.$emit('update:visible', nval);
            }
        }
    }
};
</script>

<style>

</style>
