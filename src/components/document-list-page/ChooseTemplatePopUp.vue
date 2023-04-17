<template>
    <teleport to="#app">
        <pop-up-window :opened="opened" @window-close="$emit('window-close')">
            <h6 class="themeable font-normal text-center text-3xl text-black dark:text-white mb-7">
                {{ t('documentsListPage.chooseTemplateWindowHeading') }}
            </h6>

            <select-list :items="templateSelectItems" class="w-fit mx-auto mb-9"
                @item-chosen="chooseTemplate"/>

            <simple-button class="block mx-auto mb-2" @click="create">
                {{ t('documentsListPage.createButtonText') }}
            </simple-button>

            <a class="block text-sm text-main text-center hover:cursor-pointer hover:underline" 
                @click="createWithoutTemplate">
                {{ t('documentsListPage.withoutTemplateText') }}
            </a>
        </pop-up-window>
    </teleport>
</template>

<script lang="ts" setup>
    import SelectList from '../ui-kit/SelectList.vue'
    import SimpleButton from '../ui-kit/SimpleButton.vue'

    import templates from '@/scripts/templates'
    import type { DropDownItem, Template } from '@/scripts/types'
    import { useI18n } from 'vue-i18n'
    import { useRouter } from 'vue-router'
    import { useDocumentsStore } from '@/stores/documents'
    import { ref } from 'vue'


    defineProps<{
        opened : boolean
    }>()

    const router = useRouter()
    const { t } = useI18n()
    const { createNewDocument } = useDocumentsStore()

    const selectedTemplate = ref<Template>(templates[0])
    const templateSelectItems : DropDownItem[] = templates.map(template => {
        return {
            value: template.name,
            translationKey: `templates.${template.name}.name`
        }
    })

    function chooseTemplate(chosenItem : DropDownItem) {
        const foundTemplate = templates.find(template => template.name == chosenItem.value)
        if(foundTemplate) {
            selectedTemplate.value = foundTemplate
        }
    }

    function create() {
        router.push('/' + createNewDocument(selectedTemplate.value))
    }

    function createWithoutTemplate() {
        router.push('/' + createNewDocument())
    }
</script>

<style>

</style>