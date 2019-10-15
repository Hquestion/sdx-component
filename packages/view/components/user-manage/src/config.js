import {t} from '@sdx/utils/src/locale';

export const EXPIRES_OPTION = [
    {label: t('view.userManage.OneDay'), value: 24*60*60*1000},
    {label: t('view.userManage.OneWeek'), value: 7*24*60*60*1000},
    {label: t('view.userManage.OneMonth'), value: 30* 24*60*60*1000},
    {label: t('view.userManage.ThreeMonths'), value: 90 * 24*60*60*1000},
    {label: t('view.userManage.HalfYear'), value: 180 * 24*60*60*1000},
    {label: t('view.userManage.OneYear'), value: 365 * 24*60*60*1000},
    {label: t('view.userManage.MaxYears'), value: 99* 365 * 24*60*60*1000}
];
