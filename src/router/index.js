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
    },
    // 捕获所有未匹配的路由，重定向到静态 404 页面
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        beforeEnter: () => {
            // 使用 replace 跳转到静态 404 页面，避免历史记录问题
            window.location.replace('/404.html');
            return false; // 阻止路由继续
        }
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior() {
        return { top: 0 }
    }
})


export default router
