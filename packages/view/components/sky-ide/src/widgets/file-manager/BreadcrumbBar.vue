<template>
    <div class="skyide-file-breadcrumb-bar">
        <div class="file-breadcrumb">
            <EllipseBreadcrumb
                :breadcrumb="list"
                @nav="handleNav"
            />
        </div>
    </div>
</template>

<script>
import { getPathName } from './helper/fileListTool';
import EllipseBreadcrumb from './EllipseBreadcrumb';
import locale from '@sdx/utils/src/mixins/locale';

export default {
    name: 'BreadcrumbBar',
    inject: ['fileManager', 'app'],
    mixins: [locale],
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
                name: '',
                path: startPath,
                showIcon: true
            });
            this.list = pathObjArr;
            return pathObjArr;
        },
        handleNav(item) {
            this.app.file.currentPath = item.path;
        }
    }
};
</script>

<style lang="scss" scoped>
    @import "~@sdx/utils/src/theme-common/var";
    .skyide-file-breadcrumb-bar {
        height: 40px;
        background: #314065;
        color: #A0A5B8;
        display: flex;
        padding-left: 10px;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #1C253D;
        .loaded-tip {
            color: $sdx-text-regular-color;
        }
    }
</style>
