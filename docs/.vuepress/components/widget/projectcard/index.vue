<template>
    <div class="sdx-projectcard">
        <SdxwProjectCardList>
            <SdxwProjectCard @operate="handleOperate"  v-for="(meta, i) in list" :key="i" :meta="meta" :operateType="i === 3 ? 'project' : i === 4 ? 'template' : 'rud'"></SdxwProjectCard>
        </SdxwProjectCardList>
    </div>
</template>

<script>
import SdxwProjectCard from '@sdx/widget/components/projectcard/src/ProjectCard';
import SdxwProjectCardList from '@sdx/widget/components/projectcard/src/ProjectCardList';
export default {
    name: 'ProjectCardDemo',
    data() {
        return {
            list: [{
                id: 1,
                name: '我是标题',
                creator: '张三',
                createdAt: '2019-01-02 12:12:12',
                isTemplate: false,
                users: [],
                groups: [],
                decription: '我是详情我是详情我是详情我是详情我是详情我是详情我是详情我是详情我是详情我是详情'
            }, {
                id: 2,
                name: '我是标题我是标题我是标题我是标题我是标题我是标题',
                creator: '张三',
                createdAt: '2019-01-02 12:12:12',
                isTemplate: true,
                users: [],
                groups: [],
                decription: '我是详情我是详情我是详情我是详情我是详情我是详情我是详情我是详情我是详情我是详情我是详情我是详情我是详情我是详情'
            }, {
                id: 3,
                name: '我是标题我是标题我是详情我是详情我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题',
                creator: '张三',
                createdAt: '2019-01-02 12:12:12',
                isTemplate: false,
                users: ['dfdf'],
                groups: [],
                decription: '我是详情我是详情我是详情我是详情我是详情我是详情我是详情我是详情我是详情我是详情我是详情我是详情我是详情我是详情我是详情我是详情我是详情我是详情我是详情'
            }, {
                id: 4,
                name: '我是标题',
                creator: '张三',
                createdAt: '2019-01-02 12:12:12',
                isTemplate: false,
                users: ['dfdf'],
                groups: [],
                decription: '我是详情我是详情我是详情我是详情我是详情我是详情我是详情我是详情我是详情我是详情我是详情我是详情我是详情我是详情我是详情我是详情我是详情我是详情我是详情我是详情我是详情我是详情我是详情'
            }, {
                id: 5,
                name: '我是标题',
                creator: '张三',
                createdAt: '2019-01-02 12:12:12',
                isTemplate: false,
                users: ['dfdf'],
                groups: [],
                decription: '我是详情我是详情我是详情我是详情我是详情我是详情我是详情我是详情我是详情我是详情我是详情我是详情我是详情我是详情我是详情我是详情我是详情我是详情我是详情'
            }]
        };
    },
    components: {
        SdxwProjectCard,
        SdxwProjectCardList
    },
    methods: {
        handleOperate(data) {
            console.error(data);
        }
    }
}
</script>

<style lang="scss">
    .sdx-projectcard {
        background: #f7f7f7;
    }
</style>
