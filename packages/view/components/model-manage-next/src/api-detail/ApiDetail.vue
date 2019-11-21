<template>
    <div class="sdxv-api-detail">
        <SdxuSectionPanel class="sdxv-api-detail__panel">
            <el-form
                label-width="100px"
                size="medium"
            >
                <SdxuArticlePanel title="API信息">
                    <el-form-item label="版本服务URL:">
                        <SdxuAutosizeCopyable
                            v-model="meta.apiUrl"
                        />
                    </el-form-item>
                    <el-form-item label="API Key:">
                        <SdxuAutosizeCopyable
                            v-model="meta.apiKey"
                        />
                    </el-form-item>
                    <el-form-item lable="">
                        <SdxuButton type="primary" size="large" @click="testVisible = true">在线测试</SdxuButton>
                    </el-form-item>
                </SdxuArticlePanel>
                <SdxuArticlePanel title="参数说明">
                    <el-form-item label="输入参数:">
                        <SdxuTable
                            :data="meta.apiParams && meta.apiParams.input || []"
                            light
                        >
                            <el-table-column
                                label="参数名"
                                prop="name"
                            />
                            <el-table-column
                                label="参数类型"
                                prop="dtype"
                            />
                            <el-table-column
                                label="参数范围"
                                prop="range"
                            />
                            <el-table-column
                                label="默认值"
                                prop="default"
                            />
                            <el-table-column
                                label="参数说明"
                                prop="description"
                            />
                        </SdxuTable>
                    </el-form-item>
                    <el-form-item label="输出参数">
                        <SdxuTable
                            :data="meta.apiParams && meta.apiParams.output ||[]"
                            light
                        >
                            <el-table-column
                                label="参数名"
                                prop="name"
                            />
                            <el-table-column
                                label="参数类型"
                                prop="dtype"
                            />
                            <el-table-column
                                label="参数范围"
                                prop="range"
                            />
                            <el-table-column
                                label="默认值"
                                prop="default"
                            />
                            <el-table-column
                                label="参数说明"
                                prop="description"
                            />
                        </SdxuTable>
                    </el-form-item>
                </SdxuArticlePanel>
                <SdxuArticlePanel title="请求示例">
                    <CodeExample :example-codes="meta.apiExamples && meta.apiExamples.request || {}" />
                </SdxuArticlePanel>
                <SdxuArticlePanel title="返回示例">
                    <CodeExample :example-codes="meta.apiExamples && meta.apiExamples.response || {}" />
                </SdxuArticlePanel>
            </el-form>
        </SdxuSectionPanel>
        <SdxwApiTestPopper :visible.sync="testVisible" :service-id="serviceId" />
    </div>
</template>

<script>
import SdxuArticlePanel from '@sdx/ui/components/article-panel';
import SdxuSectionPanel from '@sdx/ui/components/section-panel';
import SdxuTable from '@sdx/ui/components/table';
import SdxuButton from '@sdx/ui/components/button';
import SdxuAutosizeCopyable from '@sdx/ui/components/autosize-copyable';
import { getApiDetail } from '@sdx/utils/src/api/model';
import CodeExample from './CodeExample';
import ApiTest from '@sdx/widget/components/api-test';

export default {
    name: 'ApiDetail',
    components: {
        CodeExample,
        SdxuArticlePanel,
        SdxuSectionPanel,
        SdxuTable,
        SdxuButton,
        SdxwApiTestPopper: ApiTest.ApiTestPopper,
        SdxuAutosizeCopyable
    },
    data() {
        return {
            meta: {},
            testVisible: false
        };
    },
    props: {
        serviceId: {
            type: String,
            default: ''
        }
    },
    methods: {
        init() {
            getApiDetail(this.serviceId).then(res => {
                this.meta = res;
            });
        }
    },
    mounted() {
        this.init();
    }
};
</script>

<style scoped>

</style>
