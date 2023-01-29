import { createI18n } from 'vue-i18n'
import english from './english'
import german from './german'
import russian from './russian'

type Translation = typeof english

export default createI18n<Translation, string>({
    legacy: false,
    warnHtmlMessage: false,
    messages: {
        'en-US': english,
        'ru-RU': russian,
        'de-DE': german
    },
})