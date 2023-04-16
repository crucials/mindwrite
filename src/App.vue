<template>
    <navigation-bar/>
    <router-view/>
</template>

<script lang="ts" setup>
    import NavigationBar from '@/components/NavigationBar.vue'

    import { recognizeLocale } from '@/scripts/utils'


    // Get color theme
    if (localStorage.getItem('dark-theme') == null) {
        const darkThemeEnabled = window.matchMedia('(prefers-color-scheme: dark)').matches
        localStorage.setItem('dark-theme', String(darkThemeEnabled))
    }
    if (localStorage.getItem('dark-theme') == 'true') {
        document.documentElement.classList.add('dark')
    }

    recognizeLocale()
</script>

<style>
    @tailwind base;
    @tailwind components;
    @tailwind utilities;

    @font-face {
        font-family: 'Open Sans';
        src: url('@/assets/fonts/OpenSans-Regular.woff');
        font-weight: normal;
    }

    @font-face {
        font-family: 'Open Sans';
        src: url('@/assets/fonts/OpenSans-SemiBold.woff');
        font-weight: 600;
    }

    @font-face {
        font-family: 'Open Sans';
        src: url('@/assets/fonts/OpenSans-Bold.woff');
        font-weight: 700;
    }

    html {
        @apply scroll-smooth;
    }

    * {
        @apply font-open-sans selection:bg-main selection:text-white;
    }

    /* Elements that changing depending on the color theme have this class */
    .themeable {
        @apply transition-colors duration-300;
    }
</style>