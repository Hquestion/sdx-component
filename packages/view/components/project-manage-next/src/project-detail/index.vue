<template>
    <div class="sdxv-project-detail">
        <div
            class="sdxv-project-detail__create-task"
            v-auth.project.button="'TASK:CREATE'"
        >
            <sdxw-create-task-card
                v-for="(item,index) in createTaskOptions"
                :key="index"
                :icon-class="item.class"
                :create-label="item.createLabel"
                :task-type="item.taskType"
                @click.native="createTask(item)"
            />
        </div>
        <div class="sdxv-project-detail__search-filter">
            <div class="sdxv-project-detail__search-filter--search">
                <sdxw-search-layout
                    @search="searchTask"
                    :block="false"
                >
                    <sdxw-search-item>
                        <sdxu-input
                            v-model="searchName"
                            type="search"
                            :placeholder="t('view.project.searchTaskName')"
                        />
                    </sdxw-search-item>
                </sdxw-search-layout>
            </div>

            <div class="sdxv-project-detail__search-filter--sort">
                <SdxuTabRadioGroup
                    v-model="type"
                >
                    <SdxuTabRadioItem name="DEVELOP">
                        {{ t('view.project.devTask') }}
                    </SdxuTabRadioItem>
                    <SdxuTabRadioItem name="VISUAL">
                        {{ t('view.project.skyflowTask') }}
                    </SdxuTabRadioItem>
                </SdxuTabRadioGroup>
                <div class="sdxv-project-detail__search-filter--filter">
                    <SdxuSortButton
                        :title="t('view.project.sortByCreateTime')"
                        @sortChange="searchTask"
                        :order.sync="order"
                    />
                </div>
            </div>
        </div>
        <SdxwGeneralTaskList
            :project-id="projectId"
            ref="taskList"
            :task-category="type"
            :name="searchName"
            :order="order"
            :order-by="orderBy"
        />
    </div>
</template>

<script>
import Input from '@sdx/ui/components/input';
import Button from '@sdx/ui/components/button';
import SortButton from '@sdx/ui/components/sort-button';
import TabRadio from '@sdx/ui/components/tab-radio';
import auth from '@sdx/widget/components/auth';
import locale from '@sdx/utils/src/mixins/locale';
import CreateTaskCard from '@sdx/widget/components/create-task-card';
import SearchLayout from  '@sdx/widget/components/search-layout';
import SdxwGeneralTaskList from '@sdx/widget/components/general-task-list';
import { getProjectDetail } from '@sdx/utils/src/api/project';
export default {
    name: 'SdxvProjectDetail',
    mixins: [locale],
    data() {
        return {
            searchName: '',
            order: 'desc',
            orderBy: 'createdAt',
            type: 'DEVELOP',
            createTaskOptions: [
                {
                    createLabel: this.t('view.project.addJupyter'),
                    class: 'sdx-Jupyterrenwu',
                    type: 'JUPYTER',
                    taskType: this.t('view.project.devTool')
                },
                {
                    createLabel: this.t('view.project.addSkyIde'),
                    class: 'sdx-SkyIDErenwu',
                    type: 'SKYIDE',
                    taskType: this.t('view.project.devTool')
                },
                {
                    createLabel: this.t('view.project.addContainerDev'),
                    class: 'sdx-zidingyirongqirenwu',
                    type: 'CONTAINER_DEV',
                    taskType: this.t('view.project.devTool')
                },
                {
                    createLabel: this.t('view.project.addSkyflow'),
                    class: 'sdx-skyflowrenwu',
                    type: 'SKYFLOW',
                    taskType: this.t('view.project.skyflowType')
                }
            ],
            clientWidth: 1500,
            projectId: ''
        };
    },
    watch: {
        type(nVal) {
            if (nVal) {
                this.$nextTick(() => {
                    this.searchTask();
                });
            }
        }
    },
    directives: {
        auth
    },
    created() {
        this.projectId = this.$route.params.id;
        this.$route.meta.header = '';
        getProjectDetail(this.projectId).then(res => {
            this.$route.meta.header = res.data.name;
        });
    },
    components: {
        [Input.name]: Input,
        [Button.name]: Button,
        [SortButton.name]: SortButton,
        [CreateTaskCard.name]: CreateTaskCard,
        SdxwGeneralTaskList,
        [TabRadio.TabRadioGroup.name]: TabRadio.TabRadioGroup,
        [TabRadio.TabRadioItem.name]: TabRadio.TabRadioItem,
        [SearchLayout.SearchLayout.name]: SearchLayout.SearchLayout,
        [SearchLayout.SearchItem.name]: SearchLayout.SearchItem
    },
    methods: {
        searchTask() {
            this.$refs.taskList.initList();
        },
        createTask(task) {
            this.$router.push(
                {
                    name: 'CreateTaskNext',
                    params: {
                        type: task.type,
                        projectId: this.$route.params.id
                    },
                    query: {
                        from: 'projectManagement'
                    }
                }
            );
        }
    }
};
</script>
