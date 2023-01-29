import { createRouter, createWebHistory } from 'vue-router'

import LandingPage from '@/pages/LandingPage.vue'
import DocumentsListPage from '@/pages/DocumentsListPage.vue'
import DocumentPage from '@/pages/DocumentPage.vue'
import NotFoundPage from '@/pages/NotFoundPage.vue'

export default createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: DocumentsListPage
        },

        {
            path: '/:documentId',
            component: DocumentPage
        },

        {
            path: '/product',
            component: LandingPage
        },

        {
            path: '/not-found',
            component: NotFoundPage
        },

        {
            path: '/:pathMatch(.*)*',
            redirect: '/not-found'
        }
    ]
})