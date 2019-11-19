<template>
    <div class="sdxv-dev-platform">
        <div
            class="sdxv-dev-platform__create-task"
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
        <div class="sdxv-dev-platform__search-filter">
            <div class="sdxv-dev-platform__search-filter--search">
                <sdxw-search-layout
                    @search="searchTask"
                    style="width: 100%"
                    :block="false"
                >
                    <sdxw-search-item>
                        <sdxu-input
                            v-model="searchName"
                            type="search"
                            :placeholder="t('view.project.enterTaskName')"
                        />
                    </sdxw-search-item>
                </sdxw-search-layout>
            </div>

            <div class="sdxv-dev-platform__search-filter--sort">
                <SdxuSortButton
                    :title="t('view.project.sortByCreateTime')"
                    @sortChange="searchTask"
                    :order.sync="order"
                />
            </div>
        </div>
        <SdxwGeneralTaskList
            :name="searchName"
            ref="taskList"
            :order="order"
            :order-by="orderBy"
        />
    </div>
</template>

<script>
import Input from '@sdx/ui/components/input';
import Button from '@sdx/ui/components/button';
import SortButton from '@sdx/ui/components/sort-button';
import auth from '@sdx/widget/components/auth';
import locale from '@sdx/utils/src/mixins/locale';
import SearchLayout from  '@sdx/widget/components/search-layout';
import SdxwGeneralTaskList from '@sdx/widget/components/general-task-list';
import { getProjectDetail } from '@sdx/utils/src/api/project';
import CreateTaskCard from '@sdx/widget/components/create-task-card';
export default {
    name: 'SdxvDevPlatform',
    mixins: [locale],
    data() {
        return {
            searchName: '',
            order: 'desc',
            orderBy: 'createdAt',
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
                }
            ],
            clientWidth: 1500,
            title: ''
        };
    },
    directives: {
        auth
    },
    created() {
        getProjectDetail(this.$route.params.id, true).then(res => {
            this.title = res.name;
        });
    },
    components: {
        [Input.name]: Input,
        [Button.name]: Button,
        [SortButton.name]: SortButton,
        [CreateTaskCard.name]: CreateTaskCard,
        SdxwGeneralTaskList,
        [SearchLayout.SearchLayout.name]: SearchLayout.SearchLayout,
        [SearchLayout.SearchItem.name]: SearchLayout.SearchItem
    },
    methods: {
        searchTask() {
            this.$nextTick(() => {
                this.$refs.taskList.initList();
            });
        },
        createTask(task) {
            this.$router.push(
                {
                    name: 'CreateTaskNext',
                    params: {
                        type: task.type
                    },
                    query: {
                        from: 'devPlatform'
                    }
                }
            );
        },
        sortChange() {
        }
    }
};
</script>
