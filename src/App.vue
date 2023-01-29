<template>
    <navigation-bar/>
    <router-view/>
</template>

<script lang="ts" setup>
    import NavigationBar from '@/components/NavigationBar.vue'

    import { useI18n } from 'vue-i18n'


    // Get color theme
    if (localStorage.getItem('dark-theme') == null) {
        const darkThemeEnabled = window.matchMedia('(prefers-color-scheme: dark)').matches
        localStorage.setItem('dark-theme', String(darkThemeEnabled))
    }
    if (localStorage.getItem('dark-theme') == 'true') {
        document.documentElement.classList.add('dark')
    }

    const i18n = useI18n()
    const languageFromLocalStorage = localStorage.getItem('language')
    if(languageFromLocalStorage == null) {
        const preferredLanguage = navigator.language
        if(i18n.availableLocales.includes(preferredLanguage)) {
            i18n.locale.value = preferredLanguage
            localStorage.setItem('language', preferredLanguage)
        }
    }
    else {
        i18n.locale.value = languageFromLocalStorage
    }
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