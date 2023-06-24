<template>
    <div class="themeable w-[87%] bg-white dark:bg-neutral-900 border border-neutral-300
        dark:border-neutral-700 p-5 rounded-lg flex flex-col gap-y-3" @click="closeDropDown">
        <document-line v-for="block in document.content" :key="block.id" :block="block" 
            @new-line-queried="createNewLine" @block-text-update-queried="updateBlockText"
            @line-deletion-queried="deleteLine" :focused-block-id="focusedBlockId"
            @next-line-focus-queried="focusOnNextLine" @previous-line-focus-queried="focusOnPreviousLine"
            @click.right="(event : MouseEvent) => showDropDownAtCursorPosition(event, block)"
            @block-name-update-queried="updateBlockName"
            @block-state-update-queried="updateBlockState"/>

        <div class="absolute w-40 min-w-2" :style="`left: ${blockDropDownPosition.x}px; top: ${blockDropDownPosition.y}px`">
            <drop-down-list :opened="blockDropDownListOpened" :items="blockDropdownItems" :doOnClick="changeBlock"
                :class="{ 'pointer-events-none': !blockDropDownListOpened }"/>
        </div>

        <link-pop-up :visible="linkPopUpVisible" :target-link="targetLinkBlock" 
            @window-close="linkPopUpVisible = false"/>
    </div>
</template>

<script lang="ts" setup>
    import DocumentLine from './DocumentLine.vue'
    import LinkPopUp from './LinkPopUp.vue'
    
    import { inject, ref, type Ref } from 'vue'
    import type { Block, DropDownItem, NotesDocument } from '@/scripts/types'
    import blockDropdownItems from '@/scripts/block-dropdown-items'
    import useLinkPopUp from '@/composables/link-pop-up'


    type Position = { x : number, y : number }

    const document = inject('documentToEdit') as Ref<NotesDocument>
    const focusedBlockId = ref(1)

    const { linkPopUpVisible } = useLinkPopUp()
    const targetLinkBlock = ref<Block>()

    const blockDropDownListOpened = ref(false)
    const blockDropDownPosition = ref<Position>({ x: 0, y: 0 })
    const currentEditingBlock = ref<Block>()
    
    function createNewLine(currentBlock : Block) {
        const documentContent = document.value.content
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

    function deleteLine(currentBlock : Block) {
        const documentContent = document.value.content
        
        if(currentBlock.id > 1) {
            document.value.content = documentContent.filter(block => block.id != currentBlock.id)
            focusedBlockId.value = currentBlock.id - 1
        }
    }

    function focusOnNextLine(currentBlock : Block) {
        const content = document.value.content
        const currentBlockIndex = content.indexOf(currentBlock)
        if(currentBlockIndex < content.length - 1) {
            focusedBlockId.value = content[currentBlockIndex + 1].id
        }
    }
    function focusOnPreviousLine(currentBlock : Block) {
        const content = document.value.content
        const currentBlockIndex = content.indexOf(currentBlock)
        if(currentBlockIndex > 0) {
            focusedBlockId.value = content[currentBlockIndex - 1].id
        }
    }

    function updateBlockText(newText : string, blockToUpdateId : number) {
        const blockToUpdate = document.value.content.find(block => block.id == blockToUpdateId)
        if(blockToUpdate) {
            blockToUpdate.text = newText
        }
    }
    function updateBlockName(newName : string, blockToUpdateId : number) {
        const blockToUpdate = document.value.content.find(block => block.id == blockToUpdateId)
        if(blockToUpdate) {
            blockToUpdate.blockName = newName 
        }
    }

    function updateBlockState(newState : string, blockToUpdateId : number) {
        const blockToUpdate = document.value.content.find(block => block.id == blockToUpdateId)
        if(blockToUpdate) {
            blockToUpdate.state = newState
        }
    }

    function showDropDownAtCursorPosition(event : MouseEvent, targetBlock : Block) {
        event.preventDefault()    
        currentEditingBlock.value = targetBlock   
        
        showDropDown({ x: event.x, y: event.y - 63 })
    }

    function showDropDown(position : Position) {
        blockDropDownPosition.value = position
        blockDropDownListOpened.value = true
    }

    function closeDropDown(event : Event) {
        if(!(event.target as HTMLElement).classList.contains('drop-down-list')) {
            blockDropDownListOpened.value = false
        }
    }

    function changeBlock(newBlockNameItem : DropDownItem) {
        if(currentEditingBlock.value) {
            if(newBlockNameItem.value === 'emoji') {
                currentEditingBlock.value.state = 'fire'
            }
            else if(newBlockNameItem.value === 'link') {
                targetLinkBlock.value = currentEditingBlock.value
                linkPopUpVisible.value = true
            }

            currentEditingBlock.value.blockName = newBlockNameItem.value
        }
    }
</script>

<style>
    
</style>