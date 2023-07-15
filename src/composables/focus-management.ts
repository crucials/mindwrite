import { Block, NotesDocument } from '@/scripts/types'
import { Ref, ref } from 'vue'

export default function useFocusManagement(currentDocument : Ref<NotesDocument | undefined>) {
    const focusedBlockId = ref(1)

    function focusOnNextLine(currentBlock : Block) {
        if(currentDocument.value) {
            const content = currentDocument.value.content
            const currentBlockIndex = content.indexOf(currentBlock)

            if(currentBlockIndex < content.length - 1) {
                focusedBlockId.value = content[currentBlockIndex + 1].id
            }
        }
    }
    function focusOnPreviousLine(currentBlock : Block) {
        if(currentDocument.value) {
            const content = currentDocument.value.content
            const currentBlockIndex = content.indexOf(currentBlock)

            if(currentBlockIndex > 0) {
                focusedBlockId.value = content[currentBlockIndex - 1].id
            }
        }
    }

    return { focusedBlockId, focusOnNextLine, focusOnPreviousLine }
}