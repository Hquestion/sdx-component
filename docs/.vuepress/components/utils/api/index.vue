<template>
    <div class="api">
        <CommonApi :apiData="userApiData" title="userApi" type="method"/>
        <CommonApi :apiData="projectApiData" title="projectApi" type="method"/>
    </div>
</template>

<script>
    import CommonApi from '../../Common/BasicApi'
    export default {
        name: '',
        data() {
            return {
                userApiData: [
                    {
                        name: 'changePassword',
                        description: '修改用户密码',
                        params: 'params(必传), params.uuid: 用户id, params.oldPwd: 初始密码, params.newPwd: 新密码'
                    },
                    {
                        name: 'getUserInfo',
                        description: '获取用户信息',
                        params: 'params(必传), params.uuid: 用户id'
                    }
                ],
                projectApiData: [
                    {
                        name: 'getProjectList',
                        description: '获取用户项目列表',
                        params: 'params(选传), <a href="http://confluence.iluvatar.ai:8090/pages/viewpage.action?pageId=4464071">具体见接口文档</a>',
                    },
                    {
                        name: 'getProjectDetail',
                        description: '获取项目详情',
                        params: 'uuid(必传), 项目uuid',
                    },
                    {
                        name: 'createProject',
                        description: '创建项目',
                        params: 'params(必传), <a href="http://confluence.iluvatar.ai:8090/pages/viewpage.action?pageId=4464071">具体见接口文档</a>',
                    },
                    {
                        name: 'updateProject',
                        description: '更新项目详情',
                        params: 'uuid(必传), 项目uuid;<br>params(必传), 项目详情;<br><a href="http://confluence.iluvatar.ai:8090/pages/viewpage.action?pageId=4464071">具体见接口文档</a>',
                    },
                    {
                        name: 'removeProject',
                        description: '删除项目',
                        params: 'uuid(必传), 项目uuid',
                    }
                ]
            }
        },
        components: {
            CommonApi
        }
    }
</script>

<style lang="scss" scoped>

</style>
