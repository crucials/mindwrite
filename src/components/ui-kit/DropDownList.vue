<template>
    <ul :class="{ 'drop-down-list': true, 'drop-down-list-opened': opened }" v-show="items.length > 0">
        <li class="themeable drop-down-item" v-for="item in items" :key="item.value" @click="doOnClick(item)">
            {{ t(item.translationKey) }}
        </li>
    </ul>
</template>

<script lang="ts" setup>
    import type { DropDownItem } from '@/scripts/types'
    import type { PropType } from 'vue'
    import { useI18n } from 'vue-i18n';

    defineProps({
        opened: {
            type: Boolean as PropType<boolean>
        },

        items: {
            type: Array as PropType<DropDownItem[]>,
            required: true
        },

        doOnClick: {
            type: Function as PropType<(clickedItem : DropDownItem) => void>,
            default: () => {}
        }
    })

    const { t } = useI18n()
</script>

<style scoped>
    .drop-down-list {
        @apply transition-all duration-300 min-w-full px-5 py-3 absolute -top-3 left-0 opacity-0 hover:cursor-default
            z-10 pointer-events-none;
        background: linear-gradient(180deg, rgba(248, 247, 247, 0.15) 10%, #F8F7F7 100%);
    }

    .dark .drop-down-list {
        background: linear-gradient(180deg, rgba(0, 0, 0, 0.15) 10%, #000000 100%);
    }

    .drop-down-item {
        @apply text-black dark:text-white text-base after:w-full after:scale-x-0 after:h-px after:origin-center
                after:transition-transform after:duration-300 hover:after:scale-x-100 after:block
                hover:cursor-pointer pointer-events-none;
    }

    .drop-down-item::after {
        background: linear-gradient(90deg, #4D94F8 62.25%, #4D94F830 78.78%, #FFFFFF00 87.33%);
    }

    .drop-down-list-opened {
        @apply opacity-100 top-full pointer-events-auto;
    }

    .drop-down-list-opened .drop-down-item {
        animation: pointer-events-delay 0.1s;
        animation-fill-mode: both;
    }

    @keyframes pointer-events-delay {
        100% {
            @apply pointer-events-auto;
        }
    }
</style>