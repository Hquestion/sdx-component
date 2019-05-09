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
            >
                新建模板
                <template slot="dropdown">
                    <SdxuButton type="text">
                        CPU/内存模板
                    </SdxuButton>
                    <SdxuButton type="text">
                        GPU模板
                    </SdxuButton>
                </template>
            </SdxuButton>
        </div>
        <div class="template-list">
            <ResourceCard
                v-for="(item, index) in templateList"
                :key="index"
                :type="item.type"
                :count="item.count"
            />
        </div>
    </SdxuContentPanel>
</template>

<script>
import ContentPanel from '@sdx/ui/components/content-panel';
import Button from '@sdx/ui/components/button';
import ResourceCard from "./ResourceCard";

import { getResourceTmplList } from "@sdx/utils/src/api/resource";

export default {
    name: 'List',
    data() {
        return {
            templateList: []
        };
    },
    components: {
        ResourceCard,
        [ContentPanel.name]: ContentPanel,
        [Button.name]: Button
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
                        count = [item.cpu, item.memory];
                    }
                    return {
                        type: item.templateType,
                        count: count
                    };
                });
            });
        }
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
