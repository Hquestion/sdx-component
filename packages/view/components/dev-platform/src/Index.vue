<template>
    <div class="sdxv-dev-platform">
        <div class="sdxv-dev-platform__title">
            任务列表
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
                <div
                    v-auth.project.button="'TASK:CREATE'"
                >
                    <sdxu-button
                        placement="right"
                        size="small"
                        trigger="click"
                        style="margin-right: 10px;"
                        v-auth.project.button="'PROJECT:CREATE'"
                    >
                        创建新任务
                        <template slot="dropdown">
                            <SdxuButton
                                type="text"
                                size="regular"
                                block
                                @click="createTask('JUPYTER')"
                            >
                                Jupyter任务
                            </SdxuButton>
                            <SdxuButton
                                type="text"
                                size="regular"
                                block
                                @click="createTask('SKYIDE')"
                            >
                                SkyIde任务
                            </SdxuButton>
                            <SdxuButton
                                type="text"
                                size="regular"
                                block
                                @click="createTask('CONTAINERDEV')"
                            >
                                自定义容器任务
                            </SdxuButton>
                        </template>
                    </sdxu-button>
                </div>
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
        SdxwGeneralTaskList
    },
    methods: {
        searchTask() {
        },
        createTask(type) {
            this.$router.push(
                {
                    name: 'CreateTaskNext',
                    params: {
                        type: type
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
