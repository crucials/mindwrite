<template>
    <label class="flex items-center gap-x-3 hover:cursor-pointer">
        <input type="checkbox" :checked="modelValue" class="hidden"
            @change="(event : Event) => $emit('update:modelValue', (event.target as HTMLInputElement).checked)"> 

        <span class="themeable text-lg dark:text-white">
            <slot></slot>
        </span> 

        <div class="toggle-button" :class="{ 'toggled': modelValue }">
            <div class="toggle-button-circle"></div>
        </div>
    </label>
</template>

<script lang="ts" setup>
    defineProps<{
        modelValue : boolean
    }>()
</script>

<style scoped>
    .toggle-button {
        @apply transition-colors duration-300 w-16 p-1 bg-neutral-150 rounded-3xl dark:bg-neutral-800;
    }

    .toggle-button-circle {
        @apply h-6 w-6 bg-white rounded-full dark:bg-neutral-900 transition-all duration-300;
    }

    .toggled {
        @apply bg-main dark:bg-main;
    }

    .toggled .toggle-button-circle {
        @apply translate-x-8
    }
</style>