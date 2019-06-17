<template>
    <SdxuContentPanel
        class="list"
        title="资源模板"
    >
        <div slot="right">
            <SdxuButton
                type="primary"
                size="small"
                dropdown-width="150px"
                placement="right"
                v-auth.resource.button="'TEMPLATE:WRITE'"
            >
                新建模板
                <template slot="dropdown">
                    <SdxuButton
                        type="text"
                        @click="createCPUTplVisible=true"
                    >
                        CPU/内存模板
                    </SdxuButton>
                    <SdxuButton
                        type="text"
                        @click="createGPUTplVisible=true"
                    >
                        GPU模板
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

export default {
    name: 'List',
    data() {
        return {
            templateList: [],
            createGPUTplVisible: false,
            createCPUTplVisible: false
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
