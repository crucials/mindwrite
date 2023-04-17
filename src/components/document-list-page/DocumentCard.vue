<template>
    <li class="document-card">
        <header class="flex justify-between gap-x-3 items-center mb-5 flex-wrap gap-y-5 lg:justify-start
            lg:gap-x-5">
            <div class="w-20 h-20 rounded-2xl flex-shrink-0" 
                :style="`background-color: ${mainColors[documentFromId?.mainColor || '#E47070']}`"></div>
            
            <router-link :to="'/' + documentId" class="themeable text-xl text-black dark:text-white w-1/2 sm:w-fit
                lg:w-fit">
                {{ documentFromId?.title }}
            </router-link>

            <div class="relative sm:w-full" @mouseenter="optionsDropDownListOpened = true" 
                @mouseleave="optionsDropDownListOpened = false">
                <svg width="36" height="40" viewBox="0 0 36 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M18.1164 16.25C18.7718 16.25 19.4126 16.4699 19.9575 16.882C20.5025 17.294 20.9273 17.8797 21.1781 18.5649C21.4289 19.2502 21.4945 20.0042 21.3667 20.7316C21.2388 21.459 20.9232 22.1272 20.4597 22.6517C19.9963 23.1761 19.4058 23.5333 18.7629 23.6779C18.1201 23.8226 17.4537 23.7484 16.8482 23.4645C16.2427 23.1807 15.7251 22.7001 15.3609 22.0834C14.9968 21.4667 14.8024 20.7417 14.8024 20C14.8024 19.0054 15.1516 18.0516 15.7731 17.3483C16.3946 16.6451 17.2375 16.25 18.1164 16.25ZM1.54663 20C1.54663 20.7417 1.74099 21.4667 2.10513 22.0834C2.46927 22.7001 2.98684 23.1807 3.59239 23.4645C4.19794 23.7484 4.86426 23.8226 5.5071 23.6779C6.14995 23.5333 6.74044 23.1761 7.2039 22.6517C7.66737 22.1272 7.98299 21.459 8.11086 20.7316C8.23873 20.0042 8.1731 19.2502 7.92228 18.5649C7.67145 17.8797 7.2467 17.294 6.70172 16.882C6.15674 16.4699 5.51602 16.25 4.86058 16.25C3.98167 16.25 3.13875 16.6451 2.51727 17.3483C1.89578 18.0516 1.54663 19.0054 1.54663 20ZM28.0583 20C28.0583 20.7417 28.2526 21.4667 28.6168 22.0834C28.9809 22.7001 29.4985 23.1807 30.104 23.4645C30.7096 23.7484 31.3759 23.8226 32.0187 23.6779C32.6616 23.5333 33.2521 23.1761 33.7155 22.6517C34.179 22.1272 34.4946 21.459 34.6225 20.7316C34.7504 20.0042 34.6847 19.2502 34.4339 18.5649C34.1831 17.8797 33.7583 17.294 33.2133 16.882C32.6684 16.4699 32.0277 16.25 31.3722 16.25C30.4933 16.25 29.6504 16.6451 29.0289 17.3483C28.4074 18.0516 28.0583 19.0054 28.0583 20Z"
                            class="themeable fill-black dark:fill-white" />
                </svg>

                <drop-down-list :items="options" :opened="optionsDropDownListOpened" class="w-44 break-words"
                    :doOnClick="doOptionAction"/>
            </div>
        </header>

        <p class="themeable text-neutral-400 dark:text-neutral-500 text-base mb-5">
            {{ t('documentsListPage.dateMessage') }}

            {{
                new Date(documentFromId?.creationDate || '').toLocaleString('en', 
                    { day:'2-digit', month: '2-digit', year: '2-digit' }).replace(/\//g, '.')
            }}
        </p>

        <router-link :to="'/' + documentId">
            <simple-button size="medium">
                Open
            </simple-button>
        </router-link>
    </li>
</template>

<script lang="ts" setup>
    import { useDocumentsStore } from '@/stores/documents'
    import { storeToRefs } from 'pinia'
    import { ref, type PropType } from 'vue'
    import mainColors from '@/scripts/main-colors'
    import { useI18n } from 'vue-i18n'
    import type { DropDownItem, NotesDocument } from '@/scripts/types'
    import { useRouter } from 'vue-router'

    const { t } = useI18n()

    const props = defineProps({
        documentId: {
            type: Number as PropType<number>,
            required: true
        }
    })

    const { documents } = storeToRefs(useDocumentsStore())
    const documentFromId = documents.value.find(document => document.id == props.documentId)

    const optionsDropDownListOpened = ref(false)
    const options : DropDownItem[] = [
        {
            translationKey: 'documentsListPage.options.delete',
            value: 'delete'
        },

        {
            translationKey: 'documentsListPage.options.update',
            value: 'update'
        },

        {
            translationKey: 'documentsListPage.options.export',
            value: 'export'
        }
    ]

    const router = useRouter()
    const emit = defineEmits<{
        (event : 'edit-window-open', documentToEdit : NotesDocument) : void
    }>()
    function doOptionAction(option : DropDownItem){      
        const value = option.value
        if(value == 'delete') {  
            documents.value = documents.value.filter(document => document.id != props.documentId)
        }
        else if(value == 'update') {
            if(documentFromId) {
                emit('edit-window-open', documentFromId)
            }
        }
        else if(value == 'export') {
            router.push(`/${props.documentId}?export=true`)
        }

        optionsDropDownListOpened.value = false
    }
</script>

<style scoped>
    .document-card {
        @apply transition-all duration-300 p-5 bg-white dark:bg-neutral-900 rounded-lg
            shadow-lg shadow-black/10 dark:shadow-white/5 hover:bg-neutral-100 min-w-3
            hover:dark:bg-[#1b1b1b] hover:shadow-none;
    }
</style>