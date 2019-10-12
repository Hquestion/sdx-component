<template>
    <div class="sdxv-project-manage-list">
        <div class="condition"> 
            <SdxwSearchLayout
                @search="searchProject"
                :block="false"
                align="left"
            >
                <SdxwSearchItem>
                    <sdxu-input
                        v-model="searchName"
                        type="search"
                        size="small"
                        :placeholder="t('view.project.enterProjectName')"
                    />
                </SdxwSearchItem>
            </SdxwSearchLayout>
            <sdxu-button
                placement="right"
                size="small"
                trigger="click"
                style="margin-left: 20px;"
                v-auth.project.button="'PROJECT:CREATE'"
            >
                {{ t('view.project.createProject') }}
                <template slot="dropdown">
                    <SdxuButton
                        type="text"
                        size="regular"
                        block
                        @click="showCreateProject('empty')"
                    >
                        {{ t('view.project.emptyCreate') }}
                    </SdxuButton>
                    <SdxuButton
                        type="text"
                        size="regular"
                        block
                        @click="showCreateProject('template')"
                    >
                        {{ t('view.project.templateCreate') }}
                    </SdxuButton>
                    <SdxuButton
                        type="text"
                        size="regular"
                        block
                        @click="showCreateProject('project')"
                    >
                        {{ t('view.project.copyCreate') }}
                    </SdxuButton>
                </template>
            </sdxu-button>
        </div>
        <div class="search">
            <el-tabs
                v-model="tabName"
                @tab-click="tabClick(tabName)"
            >
                <el-tab-pane
                    v-for="item in projectTabs"
                    :key="item.name"
                    :label="item.label"
                    :name="item.name"
                >
                    <SubjectCard />
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
import locale from '@sdx/utils/src/mixins/locale';
import auth from '@sdx/widget/components/auth';
import SdxwSearchLayout from '@sdx/widget/components/search-layout';
import { Tabs, TabPane } from 'element-ui';
import SubjectCard from '@sdx/widget/components/subject-card';
export default {
    name: 'SdxvProjectList',
    data() {
        return {
            projectTabs: [
                {
                    label: '所有项目',
                    name: 'allProject'
                },
                {
                    label: '私有项目',
                    name: 'privateProject'
                },
                {
                    label: '协作项目',
                    name: 'cooperatedProject'
                },
                {
                    label: '模板项目',
                    name: 'templateProject'
                }
            ],
            tabName: 'allProject',
            searchName: ''
        };
    },
    directives: {
        auth
    },
    mixins: [locale],
    components: {
        [SdxwSearchLayout.SearchLayout.name]: SdxwSearchLayout.SearchLayout,
        [SdxwSearchLayout.SearchItem.name]: SdxwSearchLayout.SearchItem,
        [Tabs.name]: Tabs,
        [TabPane.name]: TabPane,
        SubjectCard
    },
    created() {
       
    },
    methods: {
        // tab切换
        tabClick(name) {
            console.log(name,'tab');
        },
        searchProject() {
            console.log(this.searchName, this.tabName);
        }
    }
};
</script>

<style lang="scss" scoped>
.sdxv-project-manage-list {
    .condition {
        display: flex;
    }
    .search {

    }
}
</style>
