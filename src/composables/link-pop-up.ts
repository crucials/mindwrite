import { ref } from 'vue'

export default function useLinkPopUp() {
    const linkPopUpVisible = ref(false)

    return { linkPopUpVisible }
}