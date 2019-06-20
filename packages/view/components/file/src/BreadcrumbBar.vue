<template>
    <div class="sdxv-file-breadcrumb-bar">
        <div class="file-breadcrumb">
            <EllipseBreadcrumb
                :breadcrumb="list"
                @nav="handleNav"
            />
        </div>
        <div class="loaded-tip">
            已加载<span>{{ fileManager.loadedTotal }}</span>条，共{{ fileManager.total }}条
        </div>
    </div>
</template>

<script>
import { getPathName } from './helper/fileListTool';
import EllipseBreadcrumb from './EllipseBreadcrumb';

export default {
    name: 'BreadcrumbBar',
    inject: ['fileManager'],
    data() {
        return {
            list: []
        };
    },
    components: {
        EllipseBreadcrumb
    },
    methods: {
        buildBreadcrumb(val = '') {
            let list = val.split('/').slice(1);
            let pathObjArr = list.map((item, index) => {
                return {
                    name: getPathName(item),
                    path: '/' + list.slice(0, index + 1).join('/')
                };
            });
            pathObjArr.unshift({
                name: '全部文件',
                path: ''
            });
            if (this.$route.query.search) {
                pathObjArr.push({
                    name: '搜索结果',
                    path: ''
                });
            }
            return pathObjArr;
        },
        handleNav(item) {
            window.console.log(this.$route);
            const routeObj = {
                name: this.$route.name,
            };
            if (item.path) {
                routeObj.query = {path: item.path};
            }
            this.$router.replace(routeObj);
        }
    },
    mounted() {
        this.list = this.buildBreadcrumb(this.$route.query.path);
    },
    // activated() {
    //     this.unwatch = this.$watch('$route', (val, oldval) => {
    //         if (val.query.path !==  oldval.query.path || val.query.search !== oldval.query.search) {
    //             this.list = this.buildBreadcrumb(val.query.path);
    //         }
    //     });
    // },
    // deactivated() {
    //     this.unwatch && this.unwatch();
    // },
    watch: {
        $route(val, oldval) {
            if (val.query.path !==  oldval.query.path || val.query.search !== oldval.query.search) {
                this.list = this.buildBreadcrumb(val.query.path);
            }
        }
    }
};
</script>

<style lang="scss" scoped>
    .sdxv-file-breadcrumb-bar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 10px;
    }
</style>
