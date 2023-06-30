<template>
    <mark class="bg-transparent text-lg font-bold" :style="`color: ${mainColors[documentMainColor]}`">
        <slot></slot>
    </mark>
</template>

<script lang="ts" setup>
    import mainColors from '@/scripts/main-colors'
    import { storeToRefs } from 'pinia'
    import { useCurrentDocumentStore } from '@/stores/current-document'

    const documentMainColor= storeToRefs(useCurrentDocumentStore()).currentDocument.value?.mainColor || 'black'
</script>

<style>

</style>