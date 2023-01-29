import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './scripts/router'
import i18n from './internationalization/i18n'
import globalComponents from './scripts/global-components'

import App from './App.vue'

const app = createApp(App)

globalComponents.forEach(component => {
    if(component.__name) {
        app.component(component.__name, component)
    }
})

app.use(createPinia()).use(router).use(i18n).mount('#app')