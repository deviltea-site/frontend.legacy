import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '@/pages/Home.vue'
import About from '@/pages/About.vue'
import ArticleList from '@/pages/ArticleList.vue'
import Article from '@/pages/Article.vue'
import NotFound from '@/pages/NotFound.vue'
import head from '@/utils/head'

Vue.use(VueRouter)

const routes: RouteConfig[] = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: 'DevilTea',
      withSuffix: false
    }
  },
  {
    path: '/about',
    name: 'About',
    component: About,
    meta: {
      title: '關於我',
      description: '關於 DevilTea 的一些資訊 ＯｗＯ'
    }
  },
  {
    path: '/articles',
    name: 'ArticleList',
    component: ArticleList,
    meta: {
      title: '文章列表',
      description: '文章們ㄉ列表'
    }
  },
  {
    path: '/articles/:articleId',
    name: 'Article',
    component: Article
  },
  {
    path: '/404',
    name: 'NotFound',
    component: NotFound,
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

router.beforeEach((to, from, next) => {
  if (to.name !== 'Article') {
    const { title, description, withSuffix = true } = to.meta
    if (title) {
      head.title(title, withSuffix)
      head.ogTitle(title, withSuffix)
    }
    if (description) head.ogDescription(description)
    next()
    return
  }
  next()
})

export default router
