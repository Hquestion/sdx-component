<template>
    <div>
        <button @click="detailDialogVisible = true">
            详情
        </button>
        <button @click="compareDialogVisible = true">
            比较
        </button>
        <button @click="logDialogVisible = true">
            日志
        </button>
        <sdxv-image-build-basic image-id="300277f0-349c-4932-bae3-5f8278b9afef" />
        <SdxvPackageDetailCompareDialog
            :visible.sync="compareDialogVisible"
            :image-builder="imageBuilder"
        />
        <SdxvPackageDetailDialog
            :visible.sync="detailDialogVisible"
            image-id="300277f0-349c-4932-bae3-5f8278b9afef"
            basic-image-name="jupyter-notebook-lab_py2.7_cpu"
        />
        <SdxvBuildLogDialog
            :visible.sync="logDialogVisible"
            image-builder-id="300277f0-349c-4932-bae3-5f8278b9afef"
        />
    </div>
</template>

<script>
import SdxvImageBuildBasic from '@sdx/view/components/image-management/src/image-build-basic';
import SdxvPackageDetailCompareDialog from '@sdx/view/components/image-management/src/PackageDetailCompareDialog';
import SdxvPackageDetailDialog from '@sdx/view/components/image-management/src/image-list-table/PackageDetailDialog';
import SdxvBuildLogDialog from '@sdx/view/components/image-management/src/BuildLogDialog';

export default {
    name: 'ImageBuildBasicDemo',
    components: {
        SdxvImageBuildBasic,
        SdxvPackageDetailCompareDialog,
        SdxvPackageDetailDialog,
        SdxvBuildLogDialog
    },
    data() {
        return {
            detailDialogVisible: false,
            compareDialogVisible: false,
            logDialogVisible: false,
            imageBuilder: {
                baseImage: {
                    uuid: '300277f0-349c-4932-bae3-5f8278b9afef',
                    name: 'jupyter-notebook-lab_py2.7_cpu'
                },
            }
        };
    }
};
</script>

<style>

</style>
