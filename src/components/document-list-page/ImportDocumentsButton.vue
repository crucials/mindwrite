<template>
    <simple-button tagName="label" size="medium" class="flex items-center gap-x-3 justify-center">
        <img src="@/assets/images/import.svg" :alt="t('picturesAltTexts.import')">
        {{ t('documentsListPage.importButtonText') }}

        <input type="file" class="hidden" @change="importDocuments" ref="fileInput">
    </simple-button>
</template>

<script lang="ts" setup>
    import { useI18n } from 'vue-i18n'
    import type { ImportedDocument, Block } from '@/scripts/types'
    import { ref } from 'vue'
    import { getRandomMainColor } from '@/scripts/utils'
    import { useDocumentsStore } from '@/stores/documents'
    import { storeToRefs } from 'pinia'

    const { t } = useI18n()
    const { documents } = storeToRefs(useDocumentsStore())

    const fileInput = ref<HTMLInputElement>()

    async function importDocuments() {
        const fileInputElement = fileInput.value

        if(fileInputElement && fileInputElement.files) {
            const uploadedFile = fileInputElement.files[0]
            try {
                const importedDocuments : ImportedDocument[] = JSON.parse(await uploadedFile.text())

                if(Array.isArray(importedDocuments)) {
                    importedDocuments.forEach(importedDocument => {
                        const newImportedDocumentId = documents.value.length + 1
                        
                        const processedContent = importedDocument.content?.filter((block) : block is Block => {
                            const invalid = !block.blockName || block.checked === undefined || !block.id || 
                                !block.state || !block.text

                            if(invalid) {
                                return false
                            }
                            else {
                                return true
                            }
                        })
                
                        documents.value.push({
                            id: newImportedDocumentId,
                            title: importedDocument.title || `Document ${newImportedDocumentId}`,
                            creationDate: importedDocument.creationDate || new Date().toString(),
                            mainColor: importedDocument.mainColor || getRandomMainColor(),
                            content: processedContent || []
                        })
                    })
                }
            }
            catch(error) {
                console.log(error)
            }   
        }
    }
</script>