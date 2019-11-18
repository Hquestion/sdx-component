<template>
    <div class="sdxv-api-detail">
        <SdxuSectionPanel class="sdxv-api-detail__panel">
            <el-form
                label-width="100px"
                size="medium"
            >
                <SdxuArticlePanel title="API信息">
                    <el-form-item label="版本服务URL:">
                        <SdxuCopyable
                            type="appender"
                            :content="meta.apiUrl"
                        >
                            <SdxuInput
                                autosize
                                disabled
                                v-model="meta.apiUrl"
                            />
                        </SdxuCopyable>
                    </el-form-item>
                    <el-form-item label="API Key:">
                        <SdxuCopyable
                            type="appender"
                            :content="meta.apiKey"
                        >
                            <SdxuInput
                                autosize
                                disabled
                                v-model="meta.apiKey"
                            />
                        </SdxuCopyable>
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
    </div>
</template>

<script>
import SdxuCopyable from '@sdx/ui/components/copyable';
import SdxuInput from '@sdx/ui/components/input';
import SdxuArticlePanel from '@sdx/ui/components/article-panel';
import SdxuSectionPanel from '@sdx/ui/components/section-panel';
import SdxuTable from '@sdx/ui/components/table';
import { getApiDetail } from '@sdx/utils/src/api/model';
import CodeExample from './CodeExample';

export default {
    name: 'ApiDetail',
    components: {
        CodeExample,
        SdxuCopyable,
        SdxuInput,
        SdxuArticlePanel,
        SdxuSectionPanel,
        SdxuTable
    },
    data() {
        return {
            content: '123',
            code: 'print(123)\nprint("helloworld") \n',
            json: JSON.stringify({
                a: 1,
                b:2,
                c3:3
            }, undefined, 4),
            model: {},
            meta: {}
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
