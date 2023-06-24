<template>
    <nav class="themeable px-6 py-5 bg-white dark:bg-neutral-900 flex items-center gap-x-14 lg:justify-center 
        lg:gap-x-12 gap-y-6 lg:flex-wrap">
        <router-link to="/">
            <img src="@/assets/images/logo.svg" :alt="$t('picturesAltTexts.logo')">            
        </router-link>

        <select-list :items="[ { translationKey: 'languages.german', value: 'de-DE' },
            { translationKey: 'languages.english', value: 'en-US' },
            { translationKey: 'languages.russian', value: 'ru-RU' }, ]" 
            @item-chosen="changeLanguage" :initial-item-number="i18n.availableLocales.indexOf(i18n.locale.value)">

            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect y="-0.000213623" width="28" height="28" rx="4" class="themeable fill-black dark:fill-white"/>
                <path class="themeable stroke-white dark:stroke-black"
                    d="M14.913 19.0553H22.087M14.913 19.0553L13 23.4998M14.913 19.0553L17.7783 12.3987C18.0092 11.8623 18.1246 11.5941 18.2826 11.5093C18.4199 11.4357 18.5801 11.4357 18.7174 11.5093C18.8754 11.5941 18.9908 11.8623 19.2217 12.3987L22.087 19.0553M22.087 19.0553L24 23.4998M4 5.72201H10M10 5.72201H13.5M10 5.72201V3.49979M13.5 5.72201H16M13.5 5.72201C13.0039 9.00789 11.8526 11.9845 10.1656 14.4825M10.1656 14.4825C10.7627 14.991 11.3875 15.4162 12 15.722M10.1656 14.4825C8.81302 13.3307 7.60276 11.7516 7 10.1665M10.1656 14.4825C8.56086 16.8586 6.47143 18.8018 4 20.1665"
                    stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            
        </select-list>

        <select-list :items="[ { translationKey: 'themes.dark', value: 'dark' },
            { translationKey: 'themes.light', value: 'light' } ]" 
            :initial-item-number="darkThemeEnabled == 'true' ? 0 : 1"
            @item-chosen="changeColorTheme">
            <svg width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_54_23)">
                    <path
                        d="M24.2689 5.14464C21.4752 1.90767 17.7788 0.125 13.8604 0.125C10.5549 0.125 7.43103 1.39377 5.06422 3.69806C1.28837 7.37408 0.0434558 11.7475 1.64888 15.6973C2.9563 18.9142 5.95023 21.161 8.92954 21.161C9.00883 21.161 9.08708 21.1595 9.16599 21.156C9.60956 21.1377 10.0379 21.1008 10.4525 21.0649C10.953 21.0214 11.4259 20.9806 11.8449 20.9806C12.8386 20.9806 13.697 20.9806 13.697 23.5115C13.697 26.2277 15.3504 28.1248 17.7179 28.125C17.7181 28.125 17.7181 28.125 17.7182 28.125C19.4024 28.125 21.2678 27.15 23.1123 25.3059C25.5523 22.866 27.1755 19.4421 27.5653 15.9122C28.0042 11.9402 26.8334 8.11612 24.2689 5.14464ZM21.7399 23.9335C20.2883 25.3851 18.8597 26.1845 17.7181 26.1843C16.1825 26.1843 15.6379 24.7444 15.6379 23.5114C15.6379 20.4609 14.4325 19.0399 11.845 19.0399C11.3423 19.0399 10.8289 19.0844 10.2852 19.1313C9.8922 19.1651 9.48568 19.2004 9.08566 19.2169C9.03353 19.2192 8.98177 19.2202 8.92964 19.2202C6.75469 19.2202 4.44879 17.4313 3.44692 14.9666C2.15401 11.7859 3.23715 8.18561 6.41841 5.08845C8.42074 3.1392 11.0636 2.06567 13.8605 2.06567C17.2059 2.06567 20.3805 3.60926 22.7997 6.41246C27.5729 11.9434 26.0092 19.6643 21.7399 23.9335Z"
                        class="themeable fill-black dark:fill-white"/>
                    <path
                        d="M18.4722 15.7633C18.4722 17.386 19.7843 18.7063 21.3972 18.7063C23.01 18.7063 24.3221 17.386 24.3221 15.7633C24.3221 14.1403 23.01 12.8201 21.3972 12.8201C19.7843 12.8201 18.4722 14.1403 18.4722 15.7633ZM22.3812 15.7633C22.3812 16.3158 21.9398 16.7657 21.3972 16.7657C20.8545 16.7657 20.4131 16.3159 20.4131 15.7633C20.4131 15.2105 20.8546 14.7608 21.3972 14.7608C21.9398 14.7608 22.3812 15.2105 22.3812 15.7633Z"
                        class="themeable fill-black dark:fill-white"/>
                    <path
                        d="M21.7021 8.93881C21.7021 7.31585 20.39 5.99561 18.7772 5.99561C17.1644 5.99561 15.8522 7.31585 15.8522 8.93881C15.8522 10.5614 17.1644 11.8819 18.7772 11.8819C20.39 11.8819 21.7021 10.5614 21.7021 8.93881ZM17.793 8.93881C17.793 8.38588 18.2346 7.93647 18.7772 7.93647C19.3198 7.93647 19.7612 8.38588 19.7612 8.93881C19.7612 9.49127 19.3197 9.94125 18.7772 9.94125C18.2345 9.94125 17.793 9.49136 17.793 8.93881Z"
                        class="themeable fill-black dark:fill-white"/>
                    <path
                        d="M12.0811 3.86084C10.4683 3.86084 9.15619 5.18108 9.15619 6.80386C9.15619 8.42663 10.4683 9.74687 12.0811 9.74687C13.6939 9.74687 15.006 8.42663 15.006 6.80386C15.006 5.18108 13.6939 3.86084 12.0811 3.86084ZM12.0811 7.80639C11.5385 7.80639 11.0971 7.3566 11.0971 6.80386C11.0971 6.25112 11.5385 5.80142 12.0811 5.80142C12.6238 5.80142 13.0652 6.25112 13.0652 6.80386C13.0651 7.3566 12.6238 7.80639 12.0811 7.80639Z"
                        class="themeable fill-black dark:fill-white"/>
                    <path
                        d="M6.98623 8.87463C5.37345 8.87463 4.06122 10.1949 4.06122 11.8177C4.06122 13.4405 5.37345 14.7609 6.98623 14.7609C8.59901 14.7609 9.91105 13.4405 9.91105 11.8177C9.91105 10.1949 8.59901 8.87463 6.98623 8.87463ZM6.98623 12.82C6.44348 12.82 6.00208 12.3703 6.00208 11.8176C6.00208 11.265 6.44358 10.8154 6.98623 10.8154C7.52879 10.8154 7.97028 11.265 7.97028 11.8176C7.97028 12.3704 7.52879 12.82 6.98623 12.82Z"
                        class="themeable fill-black dark:fill-white"/>
                </g>
                <defs>
                    <clipPath id="clip0_54_23">
                        <rect width="28" height="28" fill="white" transform="translate(0.309509 0.125)" />
                    </clipPath>
                </defs>
            </svg>
        </select-list>
    </nav>
</template>

<script lang="ts" setup>
    import type { DropDownItem } from '@/scripts/types'
    import { useI18n } from 'vue-i18n'

    const darkThemeEnabled = localStorage.getItem('dark-theme')

    const i18n = useI18n()
    function changeLanguage(languageSelectItem : DropDownItem) {
        i18n.locale.value = languageSelectItem.value
        localStorage.setItem('language', languageSelectItem.value)
    }

    function changeColorTheme(themeSelectItem : DropDownItem) {
        if(themeSelectItem.value == 'dark') {
            document.documentElement.classList.add('dark')
        }
        else if(themeSelectItem.value == 'light') {
            document.documentElement.classList.remove('dark')
        }

        localStorage.setItem('dark-theme', String(themeSelectItem.value == 'dark'))
    }
</script>

<style>

</style>