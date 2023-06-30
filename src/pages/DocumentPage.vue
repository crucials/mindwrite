<template>
    <main-container class="py-12 px-16 justify-start items-start sm:px-5">
        <nav class="w-full flex items-center justify-between gap-x-4 gap-y-7 mb-9 flex-wrap">
            <div class="flex items-center gap-x-10">
                <router-link to="/" class="flex-shrink-0">
                    <img src="@/assets/images/left-blue-arrow.svg" :alt="$t('picturesAltTexts.leftBlueArrow')" />
                </router-link>
            
                <span class="themeable font-normal text-black dark:text-white text-2xl sm:text-xl">
                    {{ currentDocument?.title }}
                </span>
            </div>

            <div class="tip">
                <p class="tip-text">
                    {{ t('documentPage.blockChangeTip') }}
                </p>

                <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_111_161)">
                        <path
                            d="M21 36.75C29.6985 36.75 36.75 29.6985 36.75 21C36.75 12.3015 29.6985 5.25 21 5.25C12.3015 5.25 5.25 12.3015 5.25 21C5.25 29.6985 12.3015 36.75 21 36.75Z"
                            stroke-width="3" stroke-linecap="round"/>
                        <path d="M21 28V21" stroke-width="3" stroke-linecap="round"/>
                        <path d="M21 14.4375V14.6562" stroke-width="3" stroke-linecap="round"/>
                    </g>
                    <defs>
                        <clipPath id="clip0_111_161">
                            <rect width="42" height="42" fill="white" />
                        </clipPath>
                    </defs>
                </svg>
            </div>
        </nav>

        <toggle-button v-model="viewOptions.readMode">
            Read mode
        </toggle-button>

        <document-area class="flex-grow mx-auto" id="documentArea"/>
    </main-container>
</template>

<script lang="ts" setup>
    import MainContainer from '@/components/MainContainer.vue'
    import DocumentArea from '@/components/document-page/DocumentArea.vue'
    import ToggleButton from '@/components/ui-kit/ToggleButton.vue'

    import { onMounted, ref } from 'vue'
    import { useI18n } from 'vue-i18n'
    import { useDocumentsStore } from '@/stores/documents'
    import { useCurrentDocumentStore } from '@/stores/current-document'
    import { storeToRefs } from 'pinia'
    import { useRoute, useRouter } from 'vue-router'
    import { toBlob } from 'html-to-image'
    import { saveAs } from 'file-saver'


    const { t } = useI18n()

    const { documents } = storeToRefs(useDocumentsStore())
    const { currentDocument, viewOptions } = storeToRefs(useCurrentDocumentStore()) 

    const router = useRouter()
    const route = useRoute()

    if(documents.value.length > 0) {
        const foundDocument = documents.value.find(document => document.id == Number(route.params.documentId))

        if (foundDocument) {
            currentDocument.value = foundDocument

            if(route.query.downloadScreenshot == 'true') {
                onMounted(() => {
                    downloadScreenshot()
                })
            }

        }
        else {
            router.push('/not-found')
        }
    }
    else {
        router.push('/product')
    }

    function downloadScreenshot() {
        const documentAreaElement = document.querySelector('#documentArea') as HTMLElement

        toBlob(documentAreaElement).then((blob) => {
            if(blob) {
                saveAs(blob, 'document' + currentDocument.value?.id)
            }
        })
    }
</script>

<style>
    .tip {
        @apply flex items-center gap-x-3 flex-shrink-0 lg:flex-row-reverse lg:justify-end sm:w-full;
    }

    .tip-text {
        transition: color 0.3s ease, transform 0.7s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 0.2s linear;
        max-width: 27vw;
        @apply text-black dark:text-white text-sm opacity-0 translate-x-12 lg:opacity-100 lg:transform-none 
            sm:max-w-full;
    }

    .tip path {
        @apply transition-colors duration-300 stroke-black dark:stroke-white;
    }

    .tip:hover .tip-text {
        @apply translate-x-0 opacity-100;
    }
</style>