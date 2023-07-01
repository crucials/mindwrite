<template>
    <div class="flex items-center gap-x-2" ref="checkBoxContainer">
        <input type="checkbox" class="accent-main" :checked="checked" @click="ignoreClickIfReadMode"
            @change="updateCheckBoxValue">

        <span class="themeable text-lg text-black dark:text-white" 
            :class="{ 'line-through text-neutral-400 dark:text-neutral-600': checked }">
            <slot></slot>
        </span>
    </div>
</template>

<script lang="ts" setup>
    import useBlockMutationObserver from '@/composables/block-mutation-observer'
    import { useCurrentDocumentStore } from '@/stores/current-document'
    import { storeToRefs } from 'pinia'
    import { ref, type PropType } from 'vue'

    defineProps({
        checked: {
            type: Boolean as PropType<boolean>,
            required: true
        }
    })

    const emit = defineEmits<{
        (event : 'update:checked', newValue : boolean) : void,
        (event : 'block-name-update-queried', newName : 'simple-text') : void
    }>()

    const { viewOptions } = storeToRefs(useCurrentDocumentStore())

    const checkBoxContainer = ref<HTMLDivElement>()
    useBlockMutationObserver(checkBoxContainer, emit)

    function ignoreClickIfReadMode(event : Event) {
        if(viewOptions.value.readMode) {
            event.preventDefault()
        }
    }

    function updateCheckBoxValue(event : Event) {
        emit('update:checked', (event.target as HTMLInputElement).checked)
    }
</script>

<style scoped>
    
</style>