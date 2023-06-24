<template>
    <pop-up-window :opened="visible" @window-close="$emit('window-close')" width="large">
        <h2 class="themeable font-normal text-center text-3xl text-black dark:text-white mb-7">
            {{ t('documentPage.linkPopUp.heading') }}
        </h2>

        <form class="mb-8 flex items-stretch gap-x-2.5 flex-wrap gap-y-4 justify-center" @submit.prevent="saveUrl(enteredUrl)">
            <text-field v-model="enteredUrl" placeholder="https://example.com" type="url" class="flex-grow min-w-2.5"/>
            <simple-button class="flex-grow" type="submit">
                Save
            </simple-button>
        </form>

        <p class="themeable font-normal text-center text-base text-black dark:text-white mb-5">
            {{ t('documentPage.linkPopUp.selectDocumentText') }}
        </p>

        <splide :has-track="false" :options="documentsSliderOptions">
            <div class="splide__track">
                <ul class="splide__list">
                    <splide-slide v-for="document in documents">
                        <button class="themeable flex w-full items-center gap-x-3 p-3 rounded-lg hover:bg-neutral-150 
                            dark:hover:bg-neutral-800 min-w-2" @click="saveDocumentUrl(document.id)">
                            <div class="w-11 h-11 flex justify-center items-center rounded-lg" 
                                :style="`background-color: ${mainColors[document?.mainColor || '#E47070']}`">
                                <img src="@/assets/images/white-document.svg" :alt="t('picturesAltTexts.documentIcon')">
                            </div>

                            <h3 class="font-normal text-lg text-start dark:text-white lg:text-base">
                                {{ document.title }}
                            </h3>
                        </button>
                    </splide-slide> 
                </ul>
            </div>

            <div class="splide__arrows flex gap-x-4 items-center absolute -bottom-16 left-1/2 -translate-x-1/2">
                <button class="splide__arrow splide__arrow--prev transition-opacity duration-200 hover:opacity-90
                    disabled:hover:opacity-100">
                    <img src="@/assets/images/arrow-button.svg" :alt="t('picturesAltTexts.sliderLeftArrow')">
                </button>

                <button class="splide__arrow splide__arrow--next rotate-180 transition-opacity duration-200 hover:opacity-90
                    disabled:hover:opacity-100">
                    <img src="@/assets/images/arrow-button.svg" :alt="t('picturesAltTexts.sliderRightArrow')">
                </button>
            </div>
        </Splide>
    </pop-up-window>
</template>

<script lang="ts" setup>
    import { useI18n } from 'vue-i18n'
    import { ref, inject, type Ref, watch } from 'vue'
    import { storeToRefs } from 'pinia'
    import { useDocumentsStore } from '@/stores/documents'
    import mainColors from '@/scripts/main-colors'
    import type { Block, NotesDocument } from '@/scripts/types'

    const props = defineProps<{
        visible : boolean,
        targetLink? : Block
    }>()
    const emit = defineEmits<{
        (event : 'window-close') : void
    }>()

    const { t } = useI18n()
    const { documents } = storeToRefs(useDocumentsStore())
    const document = inject('documentToEdit') as Ref<NotesDocument>

    const enteredUrl = ref('')
    watch(() => props.targetLink, () => {
        const linkUrl = props.targetLink?.state

        if(linkUrl) {
            enteredUrl.value = linkUrl
        }
    })

    const documentsSliderOptions = { 
        perPage: 2,
        gap: '5px',
        pagination: false,
        breakpoints: {
            530: {
                perPage: 1
            },
        }
    }

    function saveDocumentUrl(documentId : number) {
        saveUrl(`${window.location.origin}/${documentId}`)
    }

    function saveUrl(url : string) {
        const documentBlocks = document.value.content
        const targetLinkIndex = documentBlocks.findIndex(block => block.id === props.targetLink?.id)

        document.value.content[targetLinkIndex].state = url

        emit('window-close')
    }
</script>

<style scoped>
    .splide {
        box-shadow: 0px 0px 20px #00000020;
        padding: 16px;
        border-radius: 8px;
        margin-bottom: 60px;
    }

    .dark .splide {
        box-shadow: 0px 0px 20px #00000040;
    }
</style>