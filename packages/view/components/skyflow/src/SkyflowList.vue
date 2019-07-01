<template>
    <div class="sdxv-skyflow">
        <div class="sdxv-skyflow__header">
            工作流列表
        </div>
        <div class="sdxv-skyflow__tool">
            <div class="sdxv-skyflow__tool--left">
                <sdxu-button
                    placement="right"
                    size="small"
                    icon="sdx-icon-plus"
                    style="margin-right: 10px;"
                    v-auth.skyflow.button="'FLOW:CREATE'"
                >
                    新建工作流
                    <template slot="dropdown">
                        <SdxuButton
                            type="text"
                            size="regular"
                            block
                            @click="showCreateWorkflow('empty')"
                        >
                            空白创建
                        </SdxuButton>
                        <SdxuButton
                            type="text"
                            size="regular"
                            block
                            @click="showCreateWorkflow('template')"
                        >
                            模板创建
                        </SdxuButton>
                        <SdxuButton
                            type="text"
                            size="regular"
                            block
                            @click="showCreateWorkflow('workflow')"
                        >
                            复制创建
                        </SdxuButton>
                    </template>
                </sdxu-button>
                <SdxuSortButton
                    title="按创建时间排序"
                    @sortChange="sortChange"
                    :order="order"
                />
            </div>
            <div class="sdxv-skyflow__tool--right">
                <SdxwSearchLayout
                    @search="searchWorkflow"
                    :block="false"
                    align="right"
                >
                    <SdxwSearchItem>
                        <sdxu-input
                            v-model="searchName"
                            type="search"
                            size="small"
                            placeholder="请输入工作流名称"
                        />
                    </SdxwSearchItem>
                </SdxwSearchLayout>
            </div>
        </div>
        <sdxu-content-panel
            style="margin-bottom: 30px;"
            title="模板"
            v-loading="templatesLoading"
            v-auth.skyflow.button="'TEMPLATE_FLOW:READ'"
        >
            <div v-if="templatesList.length || !templatesLoaded">
                <SdxuTabRadioGroup
                    v-model="templateType"
                    style="margin-bottom: 10px;"
                    @switch="switchTemplateType"
                >
                    <SdxuTabRadioItem
                        v-for="(item, index) in templateOptions"
                        :key="index"
                        :name="item.name"
                    >
                        {{ item.name }}
                    </SdxuTabRadioItem>
                </SdxuTabRadioGroup>
                <SdxuScroll style="height: 230px;">
                    <sdxv-workflow-card-list
                        class="sdxv-skyflow__template-cards"
                    >
                        <sdxv-workflow-card
                            @operate="handleOperate"
                            v-for="(item, index) in templatesListWithType"
                            :key="index"
                            :meta="item"
                            :edit-able="item.editable"
                            :delete-able="item.removable"
                        />
                    </sdxv-workflow-card-list>
                </SdxuScroll>
            </div>
            <SdxuEmpty v-else />
        </sdxu-content-panel>
        <sdxu-content-panel
            title="私有与共享"
            v-auth.skyflow.button="'FLOW:READ'"
        >
            <div v-if="workflowList.length || !workflowsLoaded">
                <div>
                    <sdxv-workflow-card-list v-loading="workflowsLoading">
                        <sdxv-workflow-card
                            @operate="handleOperate"
                            v-for="(item, index) in workflowList"
                            :key="index"
                            :meta="item"
                            :edit-able="item.editable"
                            :delete-able="item.removable"
                        />
                    </sdxv-workflow-card-list>
                </div>
                <div class="sdxv-skyflow__panel-footer">
                    <div />
                    <sdxu-pagination
                        v-if="total"
                        :current-page.sync="current"
                        :page-size="pageSize"
                        :total="total"
                        @current-change="currentChange"
                    />
                </div>
            </div>
            <SdxuEmpty v-else />
        </sdxu-content-panel>
        <sdxv-create-workflow
            :visible.sync="createWorkflowVisible"
            v-if="createWorkflowVisible"
            @close="createWorkflowClose"
            :data="editingWorkflow"
            :create-type="createType"
        />
    </div>
</template>

<script>
import Input from '@sdx/ui/components/input';
import Button from '@sdx/ui/components/button';
import CreateWorkflow from './CreateWorkflow';
import Pagination from '@sdx/ui/components/pagination';
import ContentPanel from '@sdx/ui/components/content-panel';
import TabRadio from '@sdx/ui/components/tab-radio';
import Empty from '@sdx/ui/components/empty';
import MessageBox from '@sdx/ui/components/message-box';
import SearchLayout from '@sdx/widget/components/search-layout';
import Message from 'element-ui/lib/message';
import { getSkyflowTemplates, getSkyflowList, removeWorkflow, getSkyflowListWithAuth } from '@sdx/utils/src/api/skyflow';
import { getUser } from '@sdx/utils/src/helper/shareCenter';
import { paginate } from '@sdx/utils/src/helper/tool';
import SortButton from '@sdx/ui/components/sort-button';
import Scroll from '@sdx/ui/components/scroll';
import WorkflowCard from './workflow-card/WorkflowCard';
import WorkflowCardList from './workflow-card/WorkflowCardList';
import auth from '@sdx/widget/components/auth';
export default {
    name: 'SdxvSkyflowList',
    data() {
        return {
            searchName: '',
            order: 'desc',
            current: 1,
            total: 0,
            pageSize: 10,
            createWorkflowVisible: false,
            createType: '',
            workflowList: [],
            templatesList: [],
            templatesListWithType: [],
            templatesLoading: false,
            templatesLoaded: false,
            workflowsLoaded: false,
            workflowsLoading: false,
            editingWorkflow: null,
            templateType: '',
            templateOptions: []
        };
    },
    components: {
        [Button.name]: Button,
        [Input.name]: Input,
        [Pagination.name]: Pagination,
        [CreateWorkflow.name]: CreateWorkflow,
        [ContentPanel.name]: ContentPanel,
        [SortButton.name]:SortButton,
        [SearchLayout.SearchLayout.name]: SearchLayout.SearchLayout,
        [SearchLayout.SearchItem.name]: SearchLayout.SearchItem,
        [TabRadio.TabRadioGroup.name]: TabRadio.TabRadioGroup,
        [TabRadio.TabRadioItem.name]: TabRadio.TabRadioItem,
        [Scroll.name]: Scroll,
        [WorkflowCard.name]: WorkflowCard,
        [WorkflowCardList.name]: WorkflowCardList,
        [Empty.name]: Empty,
    },
    created() {
        this.initList(true);
    },
    directives: {
        auth
    },
    methods: {
        switchTemplateType(tempalteType) {
            this.templatesListWithType = this.templatesList.filter(item => item.skyflowTemplate === tempalteType);
        },
        sortChange(order) {
            this.order =  order;
            this.initList();
        },
        searchWorkflow() {
            this.initList();
        },
        async initList(refreshTemplates) {
            this.initWorkflowsList();
            if (refreshTemplates)  await this.initTemplates();
            this.initTemplatesList();
        },
        initWorkflowsList() {
            this.workflowsLoading = true;
            this.workflowsLoaded = false;
            const params = {
                name: this.searchName,
                ...paginate(this.current, this.pageSize),
                order: this.order,
                orderBy: 'createdAt',
                isTemplate: false
            };
            getSkyflowList(params).then(res => {
                this.workflowList = res.items;
                this.workflowList.forEach(item => {
                    if (item.user === getUser().userId) {
                        item.editable = true;
                        item.removable = true;
                    }
                });
                this.total = res.total;
            }).finally(() => {
                this.workflowsLoading = false;
                this.workflowsLoaded = true;
            });
        },
        initTemplates() {
            return new Promise((resolve) => {
                getSkyflowTemplates().then(res => {
                    this.templateOptions = res.items;
                    if (this.templateOptions && this.templateOptions.length) {
                        this.templateType = this.templateOptions[0].name;
                    }
                    resolve();
                });
            });
        },
        initTemplatesList() {
            this.templatesLoading = true;
            this.templatesLoaded = false;
            const params = {
                name: this.searchName,
                start: 1,
                count: -1,
                order: this.order,
                orderBy: 'createdAt',
                isTemplate: true
            };
            getSkyflowListWithAuth(params).then(res => {
                this.templatesList = res.items;
                this.templatesList.forEach(item => {
                    if (item.user === getUser().userId) {
                        item.editable = true;
                        item.removable = true;
                    }
                });
                this.templatesListWithType = this.templatesList.filter(item => item.skyflowTemplate === this.templateType);
            }).finally(() => {
                this.templatesLoading = false;
                this.templatesLoaded = true;
            });
        },
        handleOperate(operation) {
            if (operation && operation.type) {
                switch(operation.type) {
                case 'delete':
                    MessageBox({
                        title: '确定要删除该工作流吗？',
                        content: '删除后将不可恢复'
                    }).then(() => {
                        removeWorkflow(operation.id).then(() => {
                            Message({
                                message: '删除成功',
                                type: 'success'
                            });
                            this.initList(true);
                        });
                    }).catch(() => {});
                    break;
                case 'edit':
                    this.editingWorkflow = { ...operation.item };
                    this.showCreateWorkflow('empty');
                    break;
                case 'detail':
                    this.$router.push({
                        name: 'SdxvRunningInfo',
                        params: {
                            id: operation.id
                        }
                    });
                    break;
                case 'canvas':
                    window.open(`${window.location.origin}/#/editor/${operation.id}`);
                    break;
                default:
                    break;
                }
            }
        },
        showCreateWorkflow(type) {
            this.createType = type;
            this.createWorkflowVisible = true;
        },
        createWorkflowClose(needRefresh) {
            if (needRefresh) this.initList(true);
            this.createType = '';
            this.editingWorkflow = null;
        },
        currentChange(val) {
            this.current = val;
            this.initWorkflowsList();
        }
    }
};
</script>
