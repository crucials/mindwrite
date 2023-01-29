<template>
    <div class="themeable flex items-center gap-x-2 dark:text-white text-xl hover:cursor-pointer relative" 
        @mouseenter="dropDownListOpened = true" @mouseleave="dropDownListOpened = false">
        <slot></slot>

        {{ t(chosenItem.translationKey) }}
        <svg width="8" height="7" viewBox="0 0 8 7" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4.15476 6.30975L0.556633 0.077611L7.75289 0.077611L4.15476 6.30975Z" class="themeable 
                fill-black dark:fill-white" />
        </svg>

        <drop-down-list :opened="dropDownListOpened" :items="items" :doOnClick="chooseItem"/>
    </div>
</template>

<script lang="ts" setup>
    import { ref, type PropType } from 'vue'
    import type { DropDownItem } from '@/scripts/types'
    import { useI18n } from 'vue-i18n'

    const props = defineProps({
        items: {
            type: Array as PropType<DropDownItem[]>,
            required: true
        },

        initialItemNumber: {
            type: Number as PropType<number>,
            default: 0
        }
    })

    const { t } = useI18n()

    const chosenItem = ref<DropDownItem>(props.items[props.initialItemNumber])
    const dropDownListOpened = ref(false)

    const emit = defineEmits<{
        (event : 'item-chosen', item : DropDownItem) : void
    }>()
    function chooseItem(item : DropDownItem) {
        chosenItem.value = item
        emit('item-chosen', item)
    }
</script>

<style scoped>

</style>