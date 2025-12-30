import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import ProjectsPage from '../views/ProjectsPage.vue'
import AboutPage from '../views/AboutPage.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: HomePage
    },
    {
        path: '/projects',
        name: 'Projects',
        component: ProjectsPage
    },
    {
        path: '/about',
        name: 'About',
        component: AboutPage
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior() {
        return { top: 0 }
    }
})

// 全局路由守卫：未匹配的路由直接跳转到 /404.html
router.beforeEach((to) => {
    if (to.matched.length === 0) {
        // 强制跳转到静态 404 页面，完全离开 Vue 应用
        window.location.replace('/404.html');
        // 返回 false 阻止 Vue Router 继续导航
        return false;
    }
})

export default router
