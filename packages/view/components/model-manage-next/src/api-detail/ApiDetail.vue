<template>
    <div class="sdxv-api-detail">
        <SdxuSectionPanel class="sdxv-api-detail__panel">
            <el-form
                label-width="100px"
                size="medium"
            >
                <SdxuArticlePanel :title="t('view.model.apiInfo')">
                    <el-form-item :label="t('view.model.versionUrl')">
                        <SdxuAutosizeCopyable
                            v-model="meta.apiUrl"
                        />
                    </el-form-item>
                    <el-form-item label="API Key:">
                        <SdxuAutosizeCopyable
                            v-model="meta.apiKey"
                        />
                    </el-form-item>
                </SdxuArticlePanel>
                <SdxuArticlePanel :title="t('view.model.paramDesc')">
                    <el-form-item :label="t('view.model.inputParams') + '：'">
                        <SdxuTable
                            :data="meta.apiParams && meta.apiParams.input || []"
                            light
                        >
                            <el-table-column
                                :label="t('view.model.paramName')"
                                prop="name"
                            />
                            <el-table-column
                                :label="t('view.model.paramType')"
                                prop="dtype"
                            />
                            <el-table-column
                                :label="t('view.model.paramRange')"
                                prop="range"
                            />
                            <el-table-column
                                :label="t('view.model.defaultVal')"
                                prop="default"
                            />
                            <el-table-column
                                :label="t('view.model.paramDesc')"
                                prop="description"
                            />
                        </SdxuTable>
                    </el-form-item>
                    <el-form-item :label="t('view.model.outputParams') + '：'">
                        <SdxuTable
                            :data="meta.apiParams && meta.apiParams.output ||[]"
                            light
                        >
                            <el-table-column
                                :label="t('view.model.paramName')"
                                prop="name"
                            />
                            <el-table-column
                                :label="t('view.model.paramType')"
                                prop="dtype"
                            />
                            <el-table-column
                                :label="t('view.model.paramRange')"
                                prop="range"
                            />
                            <el-table-column
                                :label="t('view.model.defaultVal')"
                                prop="default"
                            />
                            <el-table-column
                                :label="t('view.model.paramDesc')"
                                prop="description"
                            />
                        </SdxuTable>
                    </el-form-item>
                </SdxuArticlePanel>
                <SdxuArticlePanel :title="t('view.model.requestExample')">
                    <CodeExample :example-codes="meta.apiExamples && meta.apiExamples.request || []" />
                </SdxuArticlePanel>
                <SdxuArticlePanel :title="t('view.model.respExample')">
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
import locale from '@sdx/utils/src/mixins/locale';
import CodeExample from './CodeExample';
import ApiTest from '@sdx/widget/components/api-test';

export default {
    name: 'ApiDetail',
    mixins: [locale],
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
