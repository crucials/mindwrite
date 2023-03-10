<template>
    <div class="themeable w-[87%] bg-white dark:bg-neutral-900 border border-neutral-300
        dark:border-neutral-700 p-5 rounded-lg" @click="closeDropDown">
        <document-line v-for="block in document.content" :key="block.id" :block="block" 
            @new-line-queried="createNewLine" @block-text-update-queried="updateBlockText"
            @line-deletion-queried="deleteLine" :focused-block-id="focusedBlockId"
            @next-line-focus-queried="focusOnNextLine" @previous-line-focus-queried="focusOnPreviousLine"
            @click.right="(event : MouseEvent) => showDropDownAtCursorPosition(event, block)"
            @block-name-update-queried="updateBlockName"
            @block-state-update-queried="updateBlockState"
            class="mb-3 last:mb-0"/>

        <div class="absolute w-40" :style="`left: ${blockDropDownPosition.x}px; top: ${blockDropDownPosition.y}px`">
            <drop-down-list :opened="blockDropDownListOpened" :items="availableBlocks" :doOnClick="changeBlock"
                :class="{ 'pointer-events-none': !blockDropDownListOpened }"/>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import DocumentLine from './DocumentLine.vue'
    
    import { inject, ref, type Ref } from 'vue'
    import type { Block, DropDownItem, NotesDocument } from '@/scripts/types'


    const document = inject('documentToEdit') as Ref<NotesDocument>
    const focusedBlockId = ref(1)
    
    function createNewLine(currentBlock : Block) {
        const documentContent = document.value.content
        const newBlock : Block = {
            id: documentContent.length + 1,
            blockName: 'simple-text',
            text: '',
            checked: false,
            state: 'fire'
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

    const blockDropDownListOpened = ref(false)
    type Position = { x : number, y : number }
    const blockDropDownPosition = ref<Position>({ x: 0, y: 0 })
    const availableBlocks : DropDownItem[] = [
        {
            translationKey: 'blockNames.simpleText',
            value: 'simple-text'
        },

        {
            translationKey: 'blockNames.heading',
            value: 'heading'
        },

        {
            translationKey: 'blockNames.checkBox',
            value: 'check-box'
        },

        {
            translationKey: 'blockNames.emoji',
            value: 'emoji'
        },

        {
            translationKey: 'blockNames.highlightedText',
            value: 'highlighted-text'
        }
    ]
    const currentEditingBlock = ref<Block>()

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
            currentEditingBlock.value.blockName = newBlockNameItem.value
        }
    }
</script>

<style>
    
</style>