import { NotesDocument } from '@/scripts/types'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCurrentDocumentStore = defineStore('currentDocument', () => {
    const currentDocument = ref<NotesDocument>()
    const viewOptions = ref({
        readMode: false
    })

    return { currentDocument, viewOptions }
})