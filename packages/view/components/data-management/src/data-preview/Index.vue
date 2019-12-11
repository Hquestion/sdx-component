<template>
    <div class="sdxv-data-preview">
        <SdxwDatasetDetailCard
            :meta="cardInfo"
            type="dataset"
        />
        <el-row
            :gutter="24"
            class="file"
        >
            <el-col :span="16">
                <file-list />
            </el-col>
            <el-col :span="8">
                <div class="grid-content bg-purple" />
            </el-col>
        </el-row>
    </div>
</template>

<script>
import locale from '@sdx/utils/src/mixins/locale';
import SdxwDatasetDetailCard from '@sdx/widget/components/model-detail-card';
import { Row, Col } from 'element-ui';
import FileList from './FileList';
export default {
    name:'DataPreview',
    mixins: [locale],
    components: {
        SdxwDatasetDetailCard,
        [Row.name]: Row,
        [Col.name]: Col,
        FileList
    },
    data() {
        return {
            cardInfo: {
                icon:'sdx-ziranyuyanchuli',
                title: '我是数据集',
                type: '',
                creator: '吴晓飞',
                createdAt: '2018/09/09',
                description: '安东尼奥尼接口论文飞机我那时非法是你附近的司法局四方集i 还是i u 粉丝就看你地上i u 的设计方式呢发的个 i 的悲剧  ',
                labels: ['asfna', 'bashf'],
                owner: {
                    uuid: 'ascfasdfa'
                }
            },
        };
    }
};
</script>

<style lang="scss" scoped>
.sdxv-data-preview {
    .file {
        margin-top: 24px;
    }
}
</style>