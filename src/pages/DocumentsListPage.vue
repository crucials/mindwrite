<template>
    <main-container class="py-12 px-16 m:p-8">
        <div class="flex gap-7 items-center mb-5 sm:flex-wrap">
            <button class="w-fit flex-shrink-0 sm:w-full text-center" @click="showChooseTemplatePopUp">
                <img src="@/assets/images/plus.svg" :alt="t('picturesAltTexts.plus')">
            </button>

            <import-documents-button>

            </import-documents-button>

            <simple-button size="medium" class="flex items-center gap-x-3 justify-center" @click="exportDocuments">
                <img src="@/assets/images/export.svg" :alt="t('picturesAltTexts.export')">
                {{ t('documentsListPage.exportButtonText') }}
            </simple-button>
        </div>

        <ul class="flex justify-center gap-x-24 gap-y-12 flex-wrap">
            <document-card v-for="document in documents" :key="document.id" :document-id="document.id"
                class="w-1/4 m:w-full max-w-lg" @edit-window-open="openEditWindow"/>
        </ul>

        <teleport to="#app">
            <pop-up-window :opened="editWindowOpened" @window-close="editWindowOpened = false" v-if="documentToEdit">
                <h2 class="themeable font-normal text-center text-3xl text-black dark:text-white mb-8">
                    {{ t('documentsListPage.editInfoWindowHeading') }}
                </h2>

                <label class="block mb-9">
                    <span class="themeable text-lg text-black dark:text-white block mb-2">
                        {{ t('documentsListPage.titleFieldLabel') }}
                    </span>

                    <text-field v-model="documentToEdit.title"/>
                </label>

                <div>
                    <span class="themeable text-lg text-black dark:text-white block mb-2">
                        {{ t('documentsListPage.mainColorSelectLabel') }}
                    </span>

                    <select-list :items="availableColors" 
                        :initialItemNumber="currentColorIndex" 
                        @item-chosen="(chosenItem : DropDownItem) => documentToEdit.mainColor = chosenItem.value"
                        class="max-w-[190px]" :key="colorSelectListKey">

                        <div class="transition-colors duration-300 w-5 h-5 rounded-full"
                            :style="`background-color: ${mainColors[documentToEdit.mainColor]}`"></div>

                    </select-list>
                </div>
            </pop-up-window>
        </teleport>

        <choose-template-pop-up :opened="chooseTemplateWindowOpened"
            @window-close="chooseTemplateWindowOpened = false"/>
    </main-container>
</template>

<script lang="ts" setup>
    import MainContainer from '@/components/MainContainer.vue'
    import DocumentCard from '@/components/document-list-page/DocumentCard.vue'
    import ChooseTemplatePopUp from '@/components/document-list-page/ChooseTemplatePopUp.vue'
    import ImportDocumentsButton from '@/components/document-list-page/ImportDocumentsButton.vue'

    import { useDocumentsStore } from '@/stores/documents'
    import { storeToRefs } from 'pinia'
    import { useI18n } from 'vue-i18n'
    import { useRouter } from 'vue-router'
    import { computed, ref } from 'vue'
    import type { DropDownItem, NotesDocument } from '@/scripts/types'
    import mainColors from '@/scripts/main-colors'
    import { saveAs } from 'file-saver'


    const router = useRouter()
    const { t } = useI18n()
    document.title = t('pageTitles.documentsListPage')

    const { documents } = storeToRefs(useDocumentsStore())

    if(documents.value.length == 0) {
        router.push('/product') 
    }

    const editWindowOpened = ref(false)
    const chooseTemplateWindowOpened = ref(false)
    const documentToEdit = ref<NotesDocument>(documents.value[0])
    const availableColors : DropDownItem[] = [
        { translationKey: 'colors.green', value: 'green' },
        { translationKey: 'colors.red', value: 'red' },
        { translationKey: 'colors.purple', value: 'purple' },
        { translationKey: 'colors.yellow', value: 'yellow' },
    ]
    const currentColorIndex = computed(() => availableColors.indexOf(availableColors
        .find(color => color.value == documentToEdit.value.mainColor) || availableColors[0]))
    const colorSelectListKey = ref(1)
    

    function showChooseTemplatePopUp() {
        chooseTemplateWindowOpened.value = true
    }

    function openEditWindow(newDocumentToEdit : NotesDocument) {
        documentToEdit.value = newDocumentToEdit
        colorSelectListKey.value++
        editWindowOpened.value = true
    }

    function importDocuments() {

    }

    function exportDocuments() {
        saveAs(new Blob([ JSON.stringify(documents.value) ], { type: 'application/json' }), 'mindwrite-documents.json')
    }
</script>

<style>

</style>