import type { Block, Template } from './types'
import english from '@/internationalization/english'
import german from '@/internationalization/german'
import russian from '@/internationalization/russian'
import i18n from '@/internationalization/i18n'
import { recognizeLocale } from './utils'

recognizeLocale()

let currentLocale

const locale = i18n.global.locale as any
if(locale.value == 'ru-RU') {
    currentLocale = russian
}
else if(locale.value == 'de-DE') {
    currentLocale = german
}
else {
    currentLocale = english
}

const NEW_LINE : Omit<Block, 'id'> = {
    blockName: 'simple-text',
    checked: false,
    state: 'fire',
    text: ''
}

export default<Template[]> [
    {
        name: 'firstDocument',
        content: [
            {
                id: 1,
                blockName: 'heading',
                checked: false,
                state: 'fire',
                text: currentLocale.templates.firstDocument.heading
            },
            
            {
                id: 2,
                blockName: 'simple-text',
                checked: false,
                state: 'fire',
                text: currentLocale.templates.firstDocument.simpleText
            },
        ]
    },

    {
        name: 'todoList',
        content: [
            {
                id: 1,
                blockName: 'heading',
                checked: false,
                state: 'fire',
                text: currentLocale.templates.todoList.name
            },

            {
                id: 2,
                blockName: 'check-box',
                checked: false,
                state: 'fire',
                text: currentLocale.templates.todoList.checkBoxText
            }
        ]
    }
]