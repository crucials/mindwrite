import { onMounted, type Ref } from 'vue';

export default function useBlockMutationObserver(blockRootElement : Ref<HTMLElement | undefined>, 
        emit : (event : 'block-name-update-queried', newName : 'simple-text') => void) {

    onMounted(() => {
        if(blockRootElement.value) {
            const blockMutationObserver = new MutationObserver(() => {
                emit('block-name-update-queried', 'simple-text')
            })
            blockMutationObserver.observe(blockRootElement.value, { childList: true })
        }
    })
}