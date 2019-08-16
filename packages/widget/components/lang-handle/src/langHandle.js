import locale from '@sdx/utils/src/locale/index';
import { addClass } from '@sdx/utils/src/helper/dom';

export default {
    mounted() {
        addClass(this.$el, `is-lang-${locale.getLang()}`);
        this.$$lang = locale.getLang();
    }
};
