import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

Vue.use(VueRouter)

const routes: RouteConfig[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/pages/Home.vue'),
    meta: {
      title: 'DevilTea',
      withSuffix: false
    }
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@/pages/About.vue'),
    meta: {
      title: '關於我',
      description: '關於 DevilTea 的一些資訊 ＯｗＯ'
    }
  },
  {
    path: '/articles',
    name: 'ArticleList',
    component: () => import('@/pages/ArticleList.vue'),
    meta: {
      title: '文章列表',
      description: '文章們ㄉ列表'
    }
  },
  {
    path: '/articles/new',
    name: 'NewArticle',
    component: () => import('@/pages/ArticleEditor.vue')
  },
  {
    path: '/articles/:articleId',
    name: 'Article',
    component: () => import('@/pages/Article.vue')
  },
  {
    path: '/articles/:articleId/edit',
    name: 'EditArticle',
    component: () => import('@/pages/ArticleEditor.vue')
  },
  {
    path: '/404',
    name: 'NotFound',
    component: () => import('@/pages/NotFound.vue'),
    meta: {
      title: '404 Not Found',
      description: '找不到這個頁面 ＱＡＱ'
    }
  },
  {
    path: '*',
    redirect: '/404'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
