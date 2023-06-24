<template>
    <input type="text" class="themeable w-2/3 bg-neutral-150 dark:bg-neutral-800 
        focus:outline-none transition-all duration-300 focus:border focus:border-main
        rounded-lg px-5 py-2 text-black dark:text-white placeholder:text-neutral-300 dark:placeholder:text-neutral-700" 
        :value="modelValue"
        @input="event => $emit('update:modelValue', (event.target as HTMLInputElement).value)">
</template>

<script lang="ts" setup>
    defineProps<{
        modelValue : string
    }>()
</script>

<style scoped>

</style>