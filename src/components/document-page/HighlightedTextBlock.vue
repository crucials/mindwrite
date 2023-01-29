<template>
    <mark class="bg-transparent text-lg font-bold" :style="`color: ${mainColors[documentMainColor]}`">
        <slot></slot>
    </mark>
</template>

<script lang="ts" setup>
    import mainColors from '@/scripts/main-colors'
    import type { NotesDocument } from '@/scripts/types'
    import { inject, type Ref } from 'vue'

    const documentMainColor = (inject('documentToEdit') as Ref<NotesDocument>).value.mainColor
</script>

<style>

</style>