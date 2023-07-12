<template>
    <div class="flex items-center gap-x-2 relative" ref="emojiBlockContainer">
        <button class="emoji-button" @click="emojiMenuOpened = !emojiMenuOpened" :disabled="viewOptions.readMode">
            <img :src="'emojis/' + state + '.svg'" :alt="t('picturesAltTexts.emojis.' + state)" class="w-5 h-5">
        </button>

        <span class="themeable text-lg text-black dark:text-white">
            <slot></slot>
        </span>

        <div class="absolute top-full left-0 themeable p-2 bg-white shadow-sm shadow-black/30 
            dark:bg-neutral-900 dark:shadow-white/30 items-center gap-1 flex-wrap max-w-[205px] 
            rounded-xl" :class="emojiMenuOpened ? 'flex' : 'hidden'">

            <button v-for="emoji in availableEmojis" :key="emoji" class="emoji-button" 
                @click="selectEmoji(emoji)">
                <img :src="'emojis/' + emoji + '.svg'" :alt="t('picturesAltTexts.emojis.' + emoji)" class="w-5 h-5">
            </button>

        </div>
    </div>
</template>

<script lang="ts" setup>
    import useBlockMutationObserver from '@/composables/block-mutation-observer'
    import { useCurrentDocumentStore } from '@/stores/current-document'
    import { storeToRefs } from 'pinia'
    import { ref, type PropType } from 'vue'
    import { useI18n } from 'vue-i18n'

    defineProps({
        state: {
            type: String as PropType<string>,
            required: true
        }
    })

    const emit = defineEmits<{
        (event : 'block-name-update-queried', newName : 'simple-text') : void
        (event : 'block-state-update-queried', newState : string) : void
    }>()

    const { viewOptions } = storeToRefs(useCurrentDocumentStore())

    const emojiMenuOpened = ref(false)
    const availableEmojis = [ 
        'fire', 'beach', 'lightning', 'rocket', 'star', 'leaf', 'sad', 'happy', 
        'burger', 'desktop', 'mobile'
    ]

    function selectEmoji(emojiName : string) {
        emojiMenuOpened.value = false
        emit('block-state-update-queried', emojiName)
    }

    const emojiBlockContainer = ref<HTMLDivElement>()
    useBlockMutationObserver(emojiBlockContainer, emit)

    const { t } = useI18n()
</script>

<style scoped>
    .emoji-button {
        @apply transition-colors duration-300 p-1 hover:bg-neutral-200 dark:hover:bg-neutral-800 rounded-md
            disabled:hover:bg-transparent dark:disabled:hover:bg-transparent;
    }
</style>