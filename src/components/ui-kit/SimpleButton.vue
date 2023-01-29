<template>
    <button class="simple-button" :class="size">
        <slot></slot>
    </button>
</template>

<script lang="ts" setup>
    import type { PropType } from 'vue'

    type Size = 'large' | 'medium'

    defineProps({
        size: {
            type: String as PropType<Size>,
            default: 'medium'
        }
    })
</script>

<style>
    .simple-button {
        @apply bg-main rounded-lg text-white transition-all duration-300 hover:shadow-xl hover:shadow-main/40
            dark:hover:shadow-main/20 font-semibold active:scale-105;
    }

    .medium {
        @apply text-lg px-6 py-2.5;
    }

    .large {
        @apply px-7 text-2xl py-4 lg:text-xl;
    }
</style>