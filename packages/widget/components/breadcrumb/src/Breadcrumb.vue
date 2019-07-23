<template>
    <div class="sdxw-breadcrumb">
        <el-breadcrumb
            :separator="seperator"
            :separator-class="seperatorClass"
            v-if="breadcrumbs.length"
        >
            <el-breadcrumb-item
                v-for="(crumb, index) in breadcrumbs"
                :to="crumb"
                :key="index"
            >
                {{ crumb.meta.breadcrumb }}
            </el-breadcrumb-item>
        </el-breadcrumb>
    </div>
</template>

<script>
import { Breadcrumb, BreadcrumbItem } from 'element-ui';

export default {
    name: 'SdxwBreadcrumb',
    data() {
        return {
            breadcrumbs: []
        };
    },
    components: {
        [Breadcrumb.name]: Breadcrumb,
        [BreadcrumbItem.name]: BreadcrumbItem
    },
    props: {
        seperator: {
            type: String,
            default: '/'
        },
        seperatorClass: {
            type: String,
            default: ''
        }
    },
    // watch: {
    //     $route: {
    //         handler(nVal) {
    //             this.breadcrumbs = [];
    //             nVal.matched.forEach(route => {
    //                 if (route.meta && route.meta.breadcrumb) {
    //                     this.breadcrumbs.push(route);
    //                 }
    //             });
    //         },
    //         immediate: true
    //     }
    // },
    methods: {
        buildBreadcrumb(to, from) {
            if (to.name) {
                let cachedHis = localStorage.getItem('widget.breadcrumb.history');
                if (cachedHis) {
                    cachedHis = JSON.parse(cachedHis);
                }
                let breadcrumbs = cachedHis || [];

                const route = {
                    name: to.name,
                    path: to.path,
                    query: to.query,
                    params: to.params,
                    meta: to.meta
                };
                if (route.meta.isRoot) {
                    breadcrumbs = [];
                    breadcrumbs.push(route);
                } else {
                    // 如果路由在历史记录中
                    let historyIndex = breadcrumbs.findIndex(item => item.name === route.name);
                    if (historyIndex >= 0) {
                        breadcrumbs = breadcrumbs.slice(0, historyIndex + 1);
                    } else {
                        breadcrumbs.push(route);
                    }
                }
                localStorage.setItem('widget.breadcrumb.history', JSON.stringify(breadcrumbs));
                this.breadcrumbs = breadcrumbs;
            }
        }
    },
    created() {
        this.buildBreadcrumb(this.$route);
        this.$router.afterEach((to, from) => {
            this.buildBreadcrumb(to, from);
        });
    }
};
</script>
