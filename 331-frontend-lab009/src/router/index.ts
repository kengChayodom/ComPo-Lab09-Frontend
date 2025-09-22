// src/router.ts
import { createRouter, createWebHistory } from 'vue-router'
import AuctionItemVIew from '@/views/AuctionItemVIew.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => AuctionItemVIew, 
      props: (route) => {
        const page = parseInt((route.query.page as string) || '1')
        const pageSize = parseInt((route.query.pageSize as string) || '2')
        return {
          page: isNaN(page) ? 1 : page,
          pageSize: isNaN(pageSize) ? 2 : pageSize,
        }
      }
    }
  ]
})

export default router
