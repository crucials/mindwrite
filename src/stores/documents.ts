import mainColors from '@/scripts/main-colors'
import type { Block, NotesDocument, Template } from '@/scripts/types'
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
                    state: 'fire'
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

    function getRandomMainColor() : string {
        const keys = Object.keys(mainColors)
        const randomIndex = Math.floor(keys.length * Math.random())
        return keys[randomIndex]
    }

    return { documents, createNewDocument }
})