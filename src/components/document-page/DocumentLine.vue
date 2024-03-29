<template>
    <div>
        <component :contenteditable="!viewOptions.readMode" :is="block.blockName + '-block'" @keydown="checkForNewLineQuery"
            class="min-h-[20px] focus:outline-none" @input="queryBlockTextUpdate" :id="'block' + block.id"
            v-model:checked="block.checked" :state="block.state" spellcheck="false"
            @block-name-update-queried="(newName : string) => emit('block-name-update-queried', newName, block.id)"
            @block-state-update-queried="(newState : string) => emit('block-state-update-queried', newState, block.id)"
            @touchstart="startHolding"
            @touchend="stopHolding">
            {{ blockInitialText }}
        </component>
    </div>
</template>

<script lang="ts" setup>
    import type { Block } from '@/scripts/types'
    import { nextTick, onBeforeUpdate, onMounted, toRefs, watch, type PropType } from 'vue'
    import VanillaCaret from 'vanilla-caret-js'
    import { storeToRefs } from 'pinia'
    import { useCurrentDocumentStore } from '@/stores/current-document'

    const props = defineProps({
        block: {
            type: Object as PropType<Block>,
            required: true
        },

        focusedBlockId: {
            type: Number as PropType<number>,
            required: true
        }
    })
    const { block } = toRefs(props)
    let blockInitialText = block.value.text

    const { viewOptions } = storeToRefs(useCurrentDocumentStore())

    let timeoutAfterTouchId = 0
    

    function toggleFocus() {
        if(!viewOptions.value.readMode) {
            const blockElement = document.getElementById('block' + block.value.id)

            if(props.focusedBlockId == block.value.id) {
                const caret = new VanillaCaret(blockElement)
                caret.setPos(block.value.text.length)
                blockElement?.focus()
            }
            else {
                blockElement?.blur()
            }
        }
    }

    onMounted(() => {
        toggleFocus()

        watch(() => props.focusedBlockId, () => {  
            toggleFocus()
        })
    })

    onBeforeUpdate(() => {
        blockInitialText = block.value.text
        
        nextTick(() => {
            toggleFocus()
        })
    })

    const emit = defineEmits<{
        (event : 'block-text-update-queried', newText : string, blockToUpdateId : number) : void,
        (event : 'new-line-queried' | 'line-deletion-queried', currentBlock : Block) : void,
        (event : 'next-line-focus-queried' | 'previous-line-focus-queried', currentBlock : Block) : void,
        (event : 'block-name-update-queried', newName : string, blockToUpdateId : number) : void,
        (event : 'block-state-update-queried', newState : string, blockToUpdateId : number) : void,
        (event : 'touch-hold', touchEvent : TouchEvent) : void
    }>()

    function checkForNewLineQuery(event : KeyboardEvent) {      
        if(event.key == 'Enter') {
            event.preventDefault()
            emit('new-line-queried', block.value)
            return
        }

        if(event.key == 'Backspace' && block.value.text.length == 0) {   
            event.preventDefault()
            emit('line-deletion-queried', block.value)
            return
        }

        checkForLineFocusChange(event)
    }

    function checkForLineFocusChange(event : KeyboardEvent) {
        if(event.key == 'ArrowDown') {
            event.preventDefault()
            emit('next-line-focus-queried', block.value)
        }
        else if(event.key == 'ArrowUp') {
            event.preventDefault()
            emit('previous-line-focus-queried', block.value)
        }
    }

    function queryBlockTextUpdate(event : Event) {    
        const targetElement = event.target as HTMLElement
        let blockText = targetElement.innerText

        if(block.value.blockName === 'spoiler') {
            blockText = (targetElement.querySelector('.hidden-text') as HTMLParagraphElement).innerText
        }

        if(blockText) {
            emit('block-text-update-queried', blockText, block.value.id)
        }
    }

    function startHolding(event : TouchEvent) {
        timeoutAfterTouchId = window.setTimeout(() => {
            emit('touch-hold', event)
        }, 500)
    }

    function stopHolding(event : TouchEvent) {
        window.clearTimeout(timeoutAfterTouchId)
    }
</script>

<style>

</style>