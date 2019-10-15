<template>
    <div class="create-image-base-file_tips">
        <div>
            {{ t('view.image.in_a_non_networked_environmen') }}
        </div>
        <div>
            <div>{{ t('view.image.ImageKind.Basic') }}</div>
            <div>skyintelligent/container_dev_py2.7_gpu_cuda8.0_cudnn6</div>
            <div>skyintelligent/container_dev_py2.7_gpu_cuda9.2_cudnn7</div>
            <div>skyintelligent/container_dev_py3.6_gpu_cuda8.0_cudnn6</div>
            <div>skyintelligent/container_dev_py3.6_gpu_cuda9.2_cudnn7</div>
        </div>
        <div>
            <div>{{ t('view.image.CorePackage') }}</div>
            <div>python2.7/tensorflow1.8.0/pytorch1.0/conda/R/jupyter-lab/tensorboard {{ t('view.image.etc') }}</div>
            <div>python2.7/tensorflow1.12.0/pytorch1.0/conda/R/jupyter-lab/tensorboard {{ t('view.image.etc') }}</div>
            <div>python3.6/tensorflow1.8.0/pytorch1.0/conda/R/jupyter-lab/tensorboard {{ t('view.image.etc') }}</div>
            <div>python3.6/tensorflow1.12.0/pytorch1.0/conda/R/jupyter-lab/tensorboard {{ t('view.image.etc') }}</div>
        </div>
    </div>
</template>
<script>
import locale from '@sdx/utils/src/mixins/locale';
export default {
    name: 'Iconifon',
    mixins: [locale],
};
</script>

<style lang="scss" scoped>
.create-image-base-file_tips {
    padding-left: 6px;
    padding-bottom: 6px;
	& > div:first-child {
        font-weight:500;
        color:rgba(48,49,51,1);
        margin-bottom: 20px;
        margin-bottom: 12px;
        line-height: 26px;
    }
    & > div:last-child {
        padding-top: 20px;
    }
    div {
        color: #606266;
        font-size: 12px;
    }
}
</style>
