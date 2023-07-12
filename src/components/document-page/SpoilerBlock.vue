<template>
    <details class="group open:pb-3" ref="spoilerRootElement">
        <summary contenteditable="false" class="transition-all duration-300 flex select-none gap-x-2
            items-center py-1 px-1.5 rounded-md hover:bg-neutral-150 dark:hover:bg-neutral-800 dark:text-white 
            hover:cursor-pointer w-fit group-open:mb-1.5 text-lg">
            <svg width="6" height="8" viewBox="0 0 6 8" fill="none" xmlns="http://www.w3.org/2000/svg"
                    class="transition-transform duration-300 group-open:rotate-90">
                <path d="M6 4L0 7.4641L0 0.535898L6 4Z" class="themeable fill-black dark:fill-white"/>
            </svg>

            {{ t('blockNames.spoiler') }}
        </summary>

        <SimpleTextBlock class="hidden-text pl-8">
            <slot></slot>
        </SimpleTextBlock>
    </details>
</template>

<script lang="ts" setup>
    import useBlockMutationObserver from '@/composables/block-mutation-observer'
    import { ref } from 'vue'
    import { useI18n } from 'vue-i18n'

    const emit = defineEmits<{
        (event : 'block-name-update-queried', newName : 'simple-text') : void
    }>()
    
    const { t } = useI18n()

    const spoilerRootElement = ref<HTMLDetailsElement>()
    useBlockMutationObserver(spoilerRootElement, emit)
</script>

<style scoped>
    summary {
        list-style: none;
    }

    summary::-webkit-details-marker {
        display: none;
    }
</style>