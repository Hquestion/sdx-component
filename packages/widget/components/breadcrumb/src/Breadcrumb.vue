<template>
    <div class="bread-crumb-container">
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
import { Breadcrumb } from 'element-ui';
export default {
    name: 'SdxwBreadcrumb',
    data() {
        return {
            breadcrumbs: []
        };
    },
    components: {
        [Breadcrumb.name]: Breadcrumb
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
    watch: {
        $route: {
            handler(nVal) {
                this.breadcrumbs = [];
                nVal.matched.forEach(route => {
                    if (route.meta && route.meta.breadcrumb) {
                        this.breadcrumbs.push(route);
                    }
                });
            },
            immediate: true
        }
    }
};
</script>
