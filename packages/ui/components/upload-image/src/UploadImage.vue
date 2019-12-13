<template>
    <div class="sdxu-upload-image">
        <div class="sdxu-upload-image__img">
            <img
                v-if="imageSrc"
                :src="imageSrc"
            >
            <div
                v-else
                class="sdxu-upload-image__placeholder"
            >
                <span>
                    {{ t('view.model.Click_the_select_Picture_button') }}
                </span>
                <span>
                    {{ t('view.model.Upload_pictures') }}
                </span>
            </div>
        </div>
        <div class="sdxu-upload-image__upload-trigger">
            <SdxuUpload
                class="upload-image"
                :action="type === 'base64' ? '' : ''"
                :auto-upload="true"
                :show-file-list="false"
                :before-upload="type === 'base64' ? handleBeforeUpload : null"
                :multiple="false"
                :limit="1"
                accept="image/x-png,image/jpeg"
            >
                <SdxuButton
                    type="default"
                    size="small"
                >
                    {{ t('view.model.Select_pictures') }}
                </SdxuButton>
                <div
                    slot="tip"
                    class="el-upload__tip"
                >
                    {{ t('view.model.Support_uploading_JPG_PNG_files') }}
                </div>
            </SdxuUpload>
        </div>
        <slot />
    </div>
</template>

<script>
import SdxuButton from '@sdx/ui/components/button';
import SdxuUpload from '@sdx/ui/components/upload';
import locale from '@sdx/utils/src/mixins/locale';

import { file2base64 } from '@sdx/utils/src/helper/tool';

export default {
    name: 'SdxuUploadImage',
    mixins: [locale],
    components: {
        SdxuButton,
        SdxuUpload,
    },
    props: {
        image: {
            type: String,
            default: ''
        },
        type: {
            type: String,
            default: 'base64',
            validator: value => {
                return ['url', 'base64'].includes(value);
            }
        }
    },
    data() {
        return {

        };
    },
    computed: {
        imageSrc: {
            get() {
                return this.image;
            },
            set(nval) {
                this.$emit('update:image', nval);
            }
        }
    },
    methods: {
        handleBeforeUpload(file) {
            file2base64(file).then(res => {
                this.imageSrc = res;
            }, err => {
                if (err === 'TYPE_INVALID') {
                    this.$message.error(this.t('view.model.fileFormatError'));
                }
            });
            return false;
        },
    }
};
</script>

<style>

</style>
