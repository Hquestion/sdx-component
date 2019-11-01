import SdxuTable from '@sdx/ui/components/table';
import SdxwSearchLayout from '@sdx/widget/components/search-layout';
import SdxuPagination from '@sdx/ui/components/pagination';
import SdxuInput from '@sdx/ui/components/input';
import SdxuButton from '@sdx/ui/components/button';

import ElTableColumn from 'element-ui/lib/table-column';
import ElSelect from 'element-ui/lib/select';
import ElOption from 'element-ui/lib/option';
import ElDatePicker from 'element-ui/lib/date-picker';


export default {
    components: {
        [SdxwSearchLayout.SearchLayout.name]: SdxwSearchLayout.SearchLayout,
        [SdxwSearchLayout.SearchItem.name]: SdxwSearchLayout.SearchItem,
        SdxuTable,
        SdxuPagination,
        SdxuInput,
        SdxuButton,
        ElDatePicker,
        ElTableColumn,
        ElSelect,
        ElOption
    },
    data() {
        return {
            taskName: '',
            creator: '',
            page: 1,
            pageSize: 10,
            total: 0
        };
    },
    methods: {
        handlePageChange(page) {
            this.page = page;
        }
    },
};