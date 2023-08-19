<template>
    <div ref="linkBlockContainer">
        <a :href="state" class="text-lg text-main after:w-full after:scale-x-0 after:h-px after:origin-center
            after:transition-transform after:duration-300 hover:after:scale-x-100 after:block after:bg-sky-gradient
            block w-fit hover:cursor-pointer" @click="navigateToLink">
            <slot></slot>
        </a>
    </div>
</template>

<script lang="ts" setup>
    import { ref } from 'vue'
    import useBlockMutationObserver from '@/composables/block-mutation-observer'
    import { useCurrentDocumentStore } from '@/stores/current-document'
    import { storeToRefs } from 'pinia'

    const props = defineProps<{
        state : string
    }>()
    const emit = defineEmits<{
        (event : 'block-name-update-queried', newName : 'simple-text') : void
    }>()

    const linkBlockContainer = ref<HTMLDivElement>()
    useBlockMutationObserver(linkBlockContainer, emit)

    const { viewOptions } = storeToRefs(useCurrentDocumentStore())
    
    function navigateToLink(event : MouseEvent) {
        if(!viewOptions.value.readMode) {
            if(event.ctrlKey) {
                window.open(props.state)
            }
            else {
                window.location.href = props.state
            }
        }
    }
</script>

<style scoped>

</style>