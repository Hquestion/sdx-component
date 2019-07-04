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
import { MY_SHARE_PATH, ACCEPTED_SHARE_PATH, PROJECT_SHARE_PATH } from './helper/fileListTool';

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
        buildBreadcrumb(val = '', startPath = '') {
            let startPathNameMap = {};
            let startName;
            if (startPath) {
                let startPathList = startPath.split('/');
                startName = startPathList[startPathList.length - 1];
                startPathNameMap = {
                    [startName]: startPath
                };
                val = val.replace(startPath, `/${startName}`);
            }
            let list = val.split('/').slice(1);
            let pathObjArr = list.map((item, index) => {
                let name = getPathName(item);
                let path = '/' + list.slice(0, index + 1).join('/');
                if(startName) {
                    path = path.replace(eval(`/${startName}/`), startPathNameMap[startName].slice(1));
                }
                return { name, path };
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

            const routeObj = {
                name: this.$route.name,
                query: {}
            };
            if (item.path) {
                routeObj.query = {path: item.path};
            }
            if (this.fileManager.rootKind !== '' && ![MY_SHARE_PATH, ACCEPTED_SHARE_PATH, PROJECT_SHARE_PATH].includes(item.path)) {
                routeObj.query.startPath = this.$route.query.startPath;
                routeObj.query.ownerId = this.$route.query.ownerId;
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
                let startPath = this.$route.query.startPath || '';
                this.list = this.buildBreadcrumb(val.query.path, startPath);
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
