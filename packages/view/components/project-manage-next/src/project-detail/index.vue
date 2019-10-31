<template>
    <div class="sdxv-project-detail">
        <div class="sdxv-project-detail__title">
            {{ title }}
        </div>
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

            <div class="sdxv-project-detail__search-filter--sort">
                <SdxuTabRadioGroup
                    v-model="type"
                >
                    <SdxuTabRadioItem name="dev">
                        开发任务
                    </SdxuTabRadioItem>
                    <SdxuTabRadioItem name="skyflow">
                        可视化数据分析与建模任务
                    </SdxuTabRadioItem>
                </SdxuTabRadioGroup>
                <div class="sdxv-project-detail__search-filter--filter">
                    <SdxuSortButton
                        :title="t('view.project.sortByCreateTime')"
                        @sortChange="sortChange"
                        :order.sync="order"
                    />
                </div>
            </div>
        </div>
        <SdxwGeneralTaskList />
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
                },
                {
                    createLabel: '添加SkyFlow任务',
                    class: 'sdx-skyflowrenwu',
                    type: 'SKYFLOW',
                    taskType: '可视化分析与建模'
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
        [TabRadio.TabRadioGroup.name]: TabRadio.TabRadioGroup,
        [TabRadio.TabRadioItem.name]: TabRadio.TabRadioItem,
    },
    methods: {
        searchTask() {
        },
        createTask(task) {
            this.$router.push(
                {
                    name: 'CreateTaskNext',
                    params: {
                        type: task.type,
                        projectId: this.$route.params.id
                    }
                }
            );
        },
        sortChange() {
        }
    }
};
</script>
