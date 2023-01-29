<template>
    <main-container class="overflow-hidden items-center justify-center p-5">
        <img src="@/assets/images/document.svg" :alt="$t('picturesAltTexts.documentIcon')" 
            class="document-icon large-document-icon bottom-12 left-12" 
            :style="`transform: translateX(${mouseXPosition / 4}px) translateY(${mouseYPosition / 4}px);`">
        <img src="@/assets/images/document.svg" :alt="$t('picturesAltTexts.documentIcon')" 
            class="document-icon medium-document-icon top-12 right-24" 
            :style="`transform: translateX(${mouseXPosition / 2}px) translateY(${mouseYPosition / 2}px) rotate(12deg);`">
        <img src="@/assets/images/document.svg" :alt="$t('picturesAltTexts.documentIcon')" 
            class="document-icon medium-document-icon top-72 right-6" 
            :style="`transform: translateX(${mouseXPosition / 2}px) translateY(${mouseYPosition / 2}px) rotate(6deg);`">
        <img src="@/assets/images/document.svg" :alt="$t('picturesAltTexts.documentIcon')" 
            class="document-icon small-document-icon top-24 left-60" 
            :style="`transform: translateX(${mouseXPosition}px) translateY(${mouseYPosition}px);`">
        <img src="@/assets/images/document.svg" :alt="$t('picturesAltTexts.documentIcon')" 
            class="document-icon small-document-icon top-44 left-20" 
            :style="`transform: translateX(${mouseXPosition}px) translateY(${mouseYPosition}px) rotate(-6deg);`">

        <h1 class="heading" :class="{ 'heading-visible': pageLoaded }">
            {{ $t('landingPage.heroHeading') }}
        </h1>

        <p class="themeable relative font-normal text-3xl text-center text-black dark:text-white
            lg:text-1xl" 
            v-html="$t('landingPage.heroSubHeading')"></p>

        <simple-button size="large" class="relative" @click="createDocument">
            {{ $t('landingPage.tryButtonText') }}
        </simple-button>
    </main-container>
</template>

<script lang="ts" setup>
    import MainContainer from '@/components/MainContainer.vue'
import router from '@/scripts/router';
import { useDocumentsStore } from '@/stores/documents';

    import { onMounted, ref } from 'vue'
    import { useI18n } from 'vue-i18n'


    const { t } = useI18n()
    document.title = t('pageTitles.landingPage')

    const pageLoaded = ref(false)
    onMounted(() => {
        setTimeout(() => {
            pageLoaded.value = true
        })
        window.addEventListener('mousemove', animateBackgroundIcons)
    })

    const mouseXPosition = ref(0)
    const mouseYPosition = ref(0)
    function animateBackgroundIcons(event : MouseEvent) {
        mouseXPosition.value = event.clientX / 50
        mouseYPosition.value = event.clientY / 50
    }

    const { createNewDocument } = useDocumentsStore()
    function createDocument() {
        router.push('/' + createNewDocument())
    }
</script>

<style>
    .heading {
        @apply font-bold text-6xl text-center text-black dark:text-white
            lg:text-4xl opacity-0 -translate-y-8 relative;
        transition: color 0.3s, opacity 0.8s linear, transform 1s cubic-bezier(0.215, 0.610, 0.355, 1);
    }

    .heading-visible {
        @apply opacity-100 translate-y-0;
    }

    .document-icon {
        @apply absolute sm:hidden;
    }

    .small-document-icon {
        width: 5%;
        min-width: 50px;
    }

    .large-document-icon {
        width: 13%;
        min-width: 110px;
    }

    .medium-document-icon {
        width: 8.5%;
        min-width: 160px;
    }
</style>