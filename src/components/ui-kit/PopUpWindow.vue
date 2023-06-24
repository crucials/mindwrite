<template>
    <Teleport to="#app">
        <div class="backdrop" :class="{ 'backdrop-opened': opened }" @click="closePopUpWindow"></div>
        <dialog :class="`pop-up-window pop-up-window-${width}`" :open="opened">
            <slot></slot>
        </dialog>
    </Teleport>
</template>

<script lang="ts" setup>
    import type { PropType } from 'vue'

    defineProps({
        opened: {
            type: Boolean as PropType<boolean>,
            required: true
        },

        width: {
            type: String as PropType<'medium' | 'large'>,
            default: 'medium'
        }
    })

    const emit = defineEmits<{
        (event : 'window-close') : void
    }>()
    function closePopUpWindow(event : Event) {
        if((event.target as HTMLElement).classList.contains('backdrop')) {
            emit('window-close')
        }
    }

    
</script>

<style scoped>
    .pop-up-window {
        transition: background-color 0.3s, transform 0.63s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        @apply block fixed top-1/2 mx-auto rounded-lg py-6 px-9 bg-white dark:bg-neutral-900 w-1/3 min-w-3;
    }

    .pop-up-window-medium {
        @apply min-w-3;
    }

    .pop-up-window-large {
        @apply min-w-5;
    }

    .pop-up-window:not([open]) {
        transform: translateY(calc(-60vh - 100%))
    }

    .pop-up-window[open] {
        @apply -translate-y-1/2;
    }

    .backdrop {
        @apply fixed hidden w-full h-screen bg-black/30 top-0 left-0;
    }

    .backdrop-opened {
        @apply block;
    }
    
    @media (max-width: 700px) {
        .pop-up-window {
            @apply w-11/12;
        }
        .pop-up-window-large {
            @apply min-w-3.5;
        }
    }

    @media (max-width: 375px) {
        .pop-up-window {
            @apply w-4/5 min-w-3;
        }
    }
</style>