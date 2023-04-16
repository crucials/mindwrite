import i18n from '@/internationalization/i18n'

const internationalization = i18n.global

export function recognizeLocale() {
    const languageFromLocalStorage = localStorage.getItem('language')
    const locale = internationalization.locale as any
    if(languageFromLocalStorage == null) {
        const preferredLanguage = navigator.language
        if(internationalization.availableLocales.includes(preferredLanguage)) {
            locale.value = preferredLanguage
            localStorage.setItem('language', preferredLanguage)
        }
    }
    else {
        locale.value = languageFromLocalStorage
    }
}