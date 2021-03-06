<template>
    <SdxuContentPanel
        class="list"
        :title="t('view.resourceManage.ResourceTemplate')"
    >
        <div slot="right">
            <SdxuButton
                type="primary"
                size="small"
                dropdown-width="150px"
                trigger="click"
                placement="right"
                v-auth.resource.button="'TEMPLATE:WRITE'"
            >
                {{ t('view.resourceManage.newTemplate') }}
                <template slot="dropdown">
                    <SdxuButton
                        type="text"
                        @click="createCPUTplVisible=true"
                    >
                        {{ t('view.resourceManage.CpuTemplate') }}
                    </SdxuButton>
                    <SdxuButton
                        type="text"
                        @click="createGPUTplVisible=true"
                    >
                        {{ t('view.resourceManage.GpuTemplate') }}
                    </SdxuButton>
                </template>
            </SdxuButton>
        </div>
        <div class="template-list" v-auth.resource.button="'TEMPLATE:READ'">
            <ResourceCard
                v-for="(item, index) in templateList"
                :key="index"
                :type="item.type"
                :count="item.count"
                @delete="handleDeleteTpl(item, index)"
                v-loading="loading"
            />
        </div>
        <CreateCpuTemplate
            :visible.sync="createCPUTplVisible"
            @refresh="init"
        />
        <CreateGpuTemplate
            :visible.sync="createGPUTplVisible"
            @refresh="init"
        />
    </SdxuContentPanel>
</template>

<script>
import ContentPanel from '@sdx/ui/components/content-panel';
import Button from '@sdx/ui/components/button';
import ResourceCard from './ResourceCard';
import CreateGpuTemplate from './CreateGpuTemplate';
import CreateCpuTemplate from './CreateCPUAndMemoryTemplate';
import { byteToGB, parseMilli } from '@sdx/utils/src/helper/transform';

import {deleteResourceTmpl, getResourceTmplList} from '@sdx/utils/src/api/resource';
import auth from '@sdx/widget/components/auth';
import locale from '@sdx/utils/src/mixins/locale';

export default {
    name: 'List',
    mixins: [locale],
    data() {
        return {
            templateList: [],
            createGPUTplVisible: false,
            createCPUTplVisible: false,
            loading: false
        };
    },
    components: {
        ResourceCard,
        [ContentPanel.name]: ContentPanel,
        [Button.name]: Button,
        CreateGpuTemplate,
        CreateCpuTemplate
    },
    methods: {
        init() {
            this.getTemplateList();
        },
        getTemplateList() {
            this.loading = true;
            getResourceTmplList().then(res => {
                this.templateList = res.items.map(item => {
                    let count = [];
                    if (item.templateType.toUpperCase() === 'GPU') {
                        count = [item.count, item.label];
                    } else if (item.templateType.toUpperCase() === 'CPU') {
                        count = [parseMilli(item.cpu), byteToGB(item.memory)];
                    }
                    return {
                        type: item.templateType,
                        count: count,
                        meta: item
                    };
                });
            }).finally(() => {
                this.loading = false;
            });
        },
        handleDeleteTpl(item, index) {
            deleteResourceTmpl(item.meta.uuid).then(() => {
                this.templateList.splice(index, 1);
            });
        }
    },
    directives: {
        auth
    },
    mounted() {
        this.init();
    }
};
</script>

<style lang="scss" scoped>
    @import '~@sdx/utils/src/theme-common/var';
    .list {
        .template-list {
            display: flex;
            justify-content: flex-start;
            transform: translate3d(-$sdx-margin, -$sdx-margin, 0);
            flex-wrap: wrap;
            .resource-card {
                margin-left: $sdx-margin;
                margin-top: $sdx-margin;
            }
        }
    }
</style>
