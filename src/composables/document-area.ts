import { Block, DropDownItem, NotesDocument } from '@/scripts/types'
import { Ref, ref } from 'vue'
import useFocusManagement from './focus-management'
import useLinkPopUp from './link-pop-up'

export default function useDocumentArea(currentDocument : Ref<NotesDocument | undefined>) {
    const { focusedBlockId, focusOnNextLine, focusOnPreviousLine } = useFocusManagement(currentDocument)
    const currentEditingBlock = ref<Block>()
    const targetLinkBlock = ref<Block>()
    const { linkPopUpVisible } = useLinkPopUp()
        
    function createNewLine(currentBlock : Block) {
        if(currentDocument.value) {
            const documentContent = currentDocument.value.content
            const newBlock : Block = {
                id: documentContent.length + 1,
                blockName: 'simple-text',
                text: '',
                checked: false,
                state: ''
            }

            documentContent.splice(documentContent.indexOf(currentBlock) + 1, 0, newBlock)
            focusedBlockId.value = newBlock.id
        }
    }

    function deleteLine(currentBlock : Block) {
        if(currentDocument.value) {
            const documentContent = currentDocument.value.content
            
            if(currentBlock.id > 1) {
                currentDocument.value.content = documentContent.filter(block => block.id != currentBlock.id)
                focusedBlockId.value = currentBlock.id - 1
            }
        }
    }

    function updateBlockText(newText : string, blockToUpdateId : number) {
        const blockToUpdate = currentDocument.value?.content.find(block => block.id == blockToUpdateId)
        if(blockToUpdate) {
            blockToUpdate.text = newText
        }
    }
    function updateBlockName(newName : string, blockToUpdateId : number) {
        const blockToUpdate = currentDocument.value?.content.find(block => block.id == blockToUpdateId)
        if(blockToUpdate) {
            blockToUpdate.blockName = newName 
        }
        
        focusedBlockId.value = blockToUpdateId
    }
    function updateBlockState(newState : string, blockToUpdateId : number) {
        const blockToUpdate = currentDocument.value?.content.find(block => block.id == blockToUpdateId)
        if(blockToUpdate) {
            blockToUpdate.state = newState
        }
    }
    function changeBlock(newBlockNameItem : DropDownItem) {
        if(currentEditingBlock.value) {
            if(newBlockNameItem.value === 'open-in-new-tab') {
                window.open(currentEditingBlock.value.state)
                return
            }

            if(newBlockNameItem.value === 'emoji') {
                currentEditingBlock.value.state = 'fire'
            }
            else if(newBlockNameItem.value === 'link') {
                currentEditingBlock.value.state = ''
                targetLinkBlock.value = currentEditingBlock.value
                linkPopUpVisible.value = true
            }

            currentEditingBlock.value.blockName = newBlockNameItem.value
        }
    }

    return {
        focusedBlockId, focusOnNextLine, focusOnPreviousLine,
        createNewLine, deleteLine, updateBlockName, updateBlockText, updateBlockState, 
        changeBlock, linkPopUpVisible, targetLinkBlock, currentEditingBlock
    }
}