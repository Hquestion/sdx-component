<template>
    <div class="sdxu-upload-image">
        <div class="sdxu-upload-image__img">
            <img
                v-if="imagePreview"
                :src="imagePreview"
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
                name="files"
                :action="type === 'base64' ? '' : '/gateway/file-manager/api/v1/files/upload'"
                :data="uploadInfo"
                :auto-upload="true"
                :show-file-list="false"
                :before-upload="handleBeforeUpload"
                :multiple="false"
                :limit="1"
                :max-size="maxSize"
                :on-success="handleUploadSuccess"
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
import { getUser } from '@sdx/utils/src/helper/shareCenter';

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
            default: 'url',
            validator: value => {
                return ['url', 'base64'].includes(value);
            }
        },
        defaultImage: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            maxSize: 2 * 1024 * 1024,
            uploadInfo: {
                ownerId: getUser().uuid || '',
                path: '/',
                filesystem: 'cephfs',
                overwrite: 1
            },
            headers: {
                'content-type': 'multipart/form-data'
            },
            imagePreview: this.defaultImage || '',
            imgBase64: '',
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
                this.imgBase64 = res;
                if (this.type === 'base64') {
                    this.imageSrc = res;
                    this.imagePreview = res;
                }
            }, err => {
                if (err === 'TYPE_INVALID') {
                    this.$message.error(this.t('view.model.fileFormatError'));
                }
            });
            return this.type === 'url';
        },
        handleUploadSuccess(res) {
            const file = res && Array.isArray(res.files) && res.files[0] || '';
            if (file) {
                this.imageSrc = file.path ? `${getUser().uuid}:${file.path}` : '';
                this.imagePreview = this.imgBase64;
            }
        },
    }
};
</script>

<style>

</style>
