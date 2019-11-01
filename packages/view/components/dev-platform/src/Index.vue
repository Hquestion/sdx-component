<template>
    <div class="sdxv-dev-platform">
        <div class="sdxv-dev-platform__title">
            任务列表
        </div>
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
                <sdxu-input
                    v-model="searchName"
                    type="search"
                    size="small"
                    :placeholder="t('view.project.enterTaskName')"
                    style="width: 300px;"
                />
                <sdxu-button
                    size="small"
                    @click="searchTask"
                    style="margin: 0 30px 0 20px;"
                >
                    {{ t('sdxCommon.Search') }}
                </sdxu-button>
            </div>

            <div class="sdxv-dev-platform__search-filter--sort">
                <SdxuSortButton
                    :title="t('view.project.sortByCreateTime')"
                    @sortChange="sortChange"
                    :order.sync="order"
                />
            </div>
        </div>
        <SdxwGeneralTaskList />
    </div>
</template>

<script>
import Input from '@sdx/ui/components/input';
import Button from '@sdx/ui/components/button';
import SortButton from '@sdx/ui/components/sort-button';
import auth from '@sdx/widget/components/auth';
import locale from '@sdx/utils/src/mixins/locale';
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
            type: 'dev',
            createTaskOptions: [
                {
                    createLabel: '添加Jupyter任务',
                    class: 'sdx-Jupyterrenwu',
                    type: 'JUPYTER',
                    taskType: '开发工具'
                },
                {
                    createLabel: '添加SkyIDE任务',
                    class: 'sdx-SkyIDErenwu',
                    type: 'SKYIDE',
                    taskType: '开发工具'
                },
                {
                    createLabel: '添加自定义容器任务',
                    class: 'sdx-zidingyirongqirenwu',
                    type: 'CONTAINERDEV',
                    taskType: '开发工具'
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
        SdxwGeneralTaskList
    },
    methods: {
        searchTask() {
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
