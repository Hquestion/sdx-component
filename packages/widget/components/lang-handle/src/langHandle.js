import locale from '@sdx/utils/src/locale/index';
import { addClass } from '@sdx/utils/src/helper/dom';

export default {
    data() {
        return {
            lang$: 'zh-CN'
        };
    },
    mounted() {
        addClass(this.$el, `is-lang-${locale.getLang()}`);
        this.lang$ = locale.getLang();
    }
};
