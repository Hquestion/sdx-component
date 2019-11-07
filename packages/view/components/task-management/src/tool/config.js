import { t } from '@sdx/utils/src/locale';
export const taskType = [
    {
        value: '',
        label: t('sdxCommon.All')
    },
    {
        value: 'JUPYTER',
        label: 'Jupyter'
    },
    {
        value: 'SKYIDE',
        label: 'SkyIDE'
    },
    {
        value: 'CONTAINER_DEV',
        label: t('view.task.type.CONTAINERDEV')
    },
    {
        value: 'SKYFLOW',
        label: 'SkyFlow'
    },
    {
        value: 'MODELSERVICE',
        label: t('view.task.type.MODELSERVICE')
    }
];
export const executeType = [
    {
        value: '',
        label: t('sdxCommon.All')
    },
    {
        value: 'MANUAL',
        label: t('view.task.ManualExecution')
    },
    {
        value: 'CRONTAB',
        label: t('view.task.TimingExecution')
    },
    {
        value: 'REPEAT',
        label: t('view.task.MultipleExecution')
    },
    {
        value: 'TRIGGER',
        label: t('view.task.EventTriggering')
    }
];