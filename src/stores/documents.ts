import type { Block, NotesDocument, Template } from '@/scripts/types'
import { getRandomMainColor } from '@/scripts/utils'
import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useDocumentsStore = defineStore('documents', () => {
    const documents = ref<NotesDocument[]>([])
    const documentsFromLocalStorage = localStorage.getItem('documents')

    if(documentsFromLocalStorage) {
        documents.value = JSON.parse(documentsFromLocalStorage)
    }

    watch(documents, () => {
        localStorage.setItem('documents', JSON.stringify(documents.value))
    }, { deep: true })

    function createNewDocument(template? : Template) : number {
        let newDocumentContent : Block[]

        if(template) {
            newDocumentContent = template.content
        }
        else {
            newDocumentContent = [
                {
                    id: 1,
                    blockName: 'simple-text',
                    text: '',
                    checked: false,
                    state: ''
                }
            ]
        }

        const documentsValue = documents.value
        const newDocumentId = documentsValue.length + 1
        documentsValue.push({
            id: newDocumentId,
            title: 'Document ' + newDocumentId,
            creationDate: new Date().toString(),
            mainColor: getRandomMainColor(),
            content: newDocumentContent
        })

        return newDocumentId
    }

    return { documents, createNewDocument }
})