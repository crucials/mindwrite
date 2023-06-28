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
        @apply transition-all duration-300 min-w-2 px-5 py-3 absolute -top-3 left-0 opacity-0 hover:cursor-default
            z-10 pointer-events-none lg:min-w-1 ;
        background: linear-gradient(180deg, rgba(248, 247, 247, 0.15) 10%, #F8F7F7 100%);
    }

    .dark .drop-down-list {
        background: linear-gradient(180deg, rgba(0, 0, 0, 0.15) 10%, #000000 100%);
    }

    .drop-down-item {
        @apply text-black dark:text-white text-base after:w-full after:scale-x-0 after:h-px after:origin-center
                after:transition-transform after:duration-300 hover:after:scale-x-100 after:block after:bg-sky-gradient
                hover:cursor-pointer pointer-events-none;
    }

    .drop-down-list-opened {
        @apply opacity-100 top-full pointer-events-auto;
    }

    .drop-down-list-opened .drop-down-item {
        animation: pointer-events-delay 0.1s;
        animation-fill-mode: both;
        user-select: none
    }

    @keyframes pointer-events-delay {
        100% {
            @apply pointer-events-auto;
        }
    }
</style>