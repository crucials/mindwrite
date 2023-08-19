<template>
    <div class="themeable w-[87%] bg-white dark:bg-neutral-900 border border-neutral-300
        dark:border-neutral-700 p-5 rounded-lg flex flex-col gap-y-3" @click="closeDropDown">
        <document-line v-for="block in currentDocument?.content" :key="block.id" :block="block" 
            @new-line-queried="createNewLine" @block-text-update-queried="updateBlockText"
            @line-deletion-queried="deleteLine" :focused-block-id="focusedBlockId"
            @next-line-focus-queried="focusOnNextLine" @previous-line-focus-queried="focusOnPreviousLine"
            @click.right="(event : MouseEvent) => showDropDownAtCursorPosition(event, block)"
            @touch-hold="(touchEvent : TouchEvent) => showDropDownAtTouchPosition(touchEvent, block)"
            @block-name-update-queried="updateBlockName" @block-state-update-queried="updateBlockState"/>

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
    
    import { ref } from 'vue'
    import type { Block, DropDownItem } from '@/scripts/types'
    import blockDropdownItems from '@/scripts/block-dropdown-items'
    import useLinkPopUp from '@/composables/link-pop-up'
    import { storeToRefs } from 'pinia'
    import { useCurrentDocumentStore } from '@/stores/current-document'
    import useDocumentArea from '@/composables/document-area'


    type Position = { x : number, y : number }

    const { currentDocument, viewOptions } = storeToRefs(useCurrentDocumentStore())
    
    const { 
        focusedBlockId, focusOnNextLine, focusOnPreviousLine, createNewLine,
        deleteLine, updateBlockName, updateBlockText, updateBlockState, 
        changeBlock, linkPopUpVisible, targetLinkBlock, currentEditingBlock
    } = useDocumentArea(currentDocument)

    const blockDropDownListOpened = ref(false)
    const blockDropDownPosition = ref<Position>({ x: 0, y: 0 })

    function showDropDownAtCursorPosition(event : MouseEvent, targetBlock : Block) {
        if(!viewOptions.value.readMode) {
            event.preventDefault()
            currentEditingBlock.value = targetBlock
            
            showDropDown({ x: event.x, y: event.y - 63 }, targetBlock)
        }
    }

    function showDropDownAtTouchPosition(touchEvent : TouchEvent, targetBlock : Block) {
        if(!viewOptions.value.readMode) {
            currentEditingBlock.value = targetBlock
            showDropDown({ x: touchEvent.touches[0].clientX, y: touchEvent.touches[0].clientY - 140 }, targetBlock)
        }
    }
 
    function showDropDown(position : Position, targetBlock : Block) {
        blockDropDownPosition.value = position
        blockDropDownListOpened.value = true
    }

    function closeDropDown(event : Event) {
        if(!(event.target as HTMLElement).classList.contains('drop-down-list')) {
            blockDropDownListOpened.value = false
        }
    }
</script>

<style>
    
</style>