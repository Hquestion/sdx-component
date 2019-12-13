<template>
    <div class="sdxv-data-preview">
        <el-row
            :gutter="24"
            class="file"
        >
            <el-col :span="12">
                <BasicInfo
                    :meta="cardInfo"
                />
            </el-col>
            <el-col :span="12">
                <file-list />
            </el-col>
        </el-row>
        <DetailedDesc
            :detail-info="detailInfo"
            class="detail-desc"
        />
    </div>
</template>

<script>
import locale from '@sdx/utils/src/mixins/locale';
import BasicInfo from './BasicInfo';
import { Row, Col } from 'element-ui';
import FileList from './FileList';
import DetailedDesc from './DetailedDesc';
export default {
    name:'DataPreview',
    mixins: [locale],
    components: {
        BasicInfo,
        [Row.name]: Row,
        [Col.name]: Col,
        FileList,
        DetailedDesc
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
            detailInfo: '是的成败得失肌肤是的成败得失肌肤是的成败得失肌肤是的成败得失肌肤是的成败得失肌肤是的成败得失肌肤是的成败得失肌肤死飞过俄污垢剋家发 i 哦额个给 i 哦时光i 哦的死哦古第哦是个iodgdiogjdigddgddgiod    是开裆裤 的你看着你从哪说大室家电话好多个ID是个 iu度过丢失韩国 iu 德国 i德国的但是风格但是风格但是风格都发生过g'
            
        };
    }
};
</script>

<style lang="scss" scoped>
.sdxv-data-preview {
    .detail-desc {
        margin-top: 24px;
    }
}
</style>