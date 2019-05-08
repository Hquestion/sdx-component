<template>
    <div class="sdxv-project-management">
        <div class="sdxv-project-management__header">
            <div class="sdxv-project-management__header--left">
                项目列表
            </div>
            <div class="sdxv-project-management__header--right">
                <sdxu-input
                    v-model="searchName"
                    :searchable="true"
                    size="small"
                    placeholder="请输入项目名"
                    style="margin-right: 10px;"
                />
                <el-select
                    v-model="sort"
                    placeholder="请选择排序方式"
                    size="medium"
                    style="margin-right: 10px;"
                >
                    <el-option
                        label="按创建时间排序"
                        value="created_time"
                    />
                    <el-option
                        label="按创建人排序"
                        value="created_by"
                    />
                    <el-option
                        label="按项目类型排序"
                        value="project_type"
                    />
                </el-select>
                <sdxu-button
                    icon-only
                    placement="right"
                    dropdown-width="120px"
                    style="width: 120px;"
                >
                    <i class="sdx-icon iconicon-plus" />
                    新建项目
                    <template slot="dropdown">
                        <SdxuButton
                            type="text"
                            size="regular"
                            block
                            @click="showCreateProject('empty')"
                        >
                            空白创建
                        </SdxuButton>
                        <SdxuButton
                            type="text"
                            size="regular"
                            block
                            @click="showCreateProject('template')"
                        >
                            模板创建
                        </SdxuButton>
                        <SdxuButton
                            type="text"
                            size="regular"
                            block
                            @click="showCreateProject('project')"
                        >
                            复制创建
                        </SdxuButton>
                    </template>
                </sdxu-button>
            </div>
        </div>
        <div class="sdxv-project-management__content">
            content
        </div>
        <div class="sdxv-project-management__footer">
            <div />
            <sdxu-pagination
                :current-page.sync="current"
                :page-size="pageSize"
                :total="total"
                @current-change="currentChange"
            />
        </div>
        <sdxv-create-project
            :visible.sync="createProjectVisible"
            v-if="createProjectVisible"
            @close="createProjectClose"
        />
    </div>
</template>

<script>
import Input from "@sdx/ui/components/input";
import Button from "@sdx/ui/components/button";
import CreateProject from './CreateProject';
import Pagination from "@sdx/ui/components/pagination";
import { Select, Message } from "element-ui";
import { userApi } from "@sdx/utils/src/api";
export default {
    name: "SdxvProjectManagement",
    data() {
        return {
            searchName: "",
            sort: "created_time",
            current: 1,
            pageSize: 10,
            total: 100,
            createProjectVisible: false,
            createType: ''
        };
    },
    components: {
        [Select.name]: Select,
        [Button.name]: Button,
        [Input.name]: Input,
        [Pagination.name]: Pagination,
        [CreateProject.name]: CreateProject,
    },
    methods: {
        showCreateProject(type) {
            this.createType = type;
            this.createProjectVisible = true;
        },
        createProjectClose() {
            this.createType = '';
        },
        currentChange(current) {
            console.log('current', current);
        },
        dialogClose() {
            this.$emit("update:visible", false);
            this.$emit("close");
        },
        confirm() {
            this.$refs.changePwdForm.validate(valid => {
                if (!valid) {
                    Message.error("请输入必填信息");
                } else {
                    if (
                        this.changePwdForm.newPasswd !== this.changePwdForm.repeatNewPasswd
                    ) {
                        Message.error("请确保两次输入的密码一致。");
                        return;
                    }
                    const params = {
                        oldPasswd: this.changePwdForm.oldPasswd,
                        newPasswd: this.changePwdForm.newPasswd
                    };
                    if (this.handler) {
                        this.handler(params);
                    } else {
                        userApi
                            .changePassword(params)
                            .then(() => {
                                Message({
                                    message: "密码修改成功！",
                                    type: "success"
                                });
                                this.$emit("on-success");
                            })
                            .catch(() => {
                                this.$emit("on-error");
                            });
                    }
                }
            });
        }
    }
};
</script>
