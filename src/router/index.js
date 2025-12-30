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
    // 移除NotFound路由，使用导航守卫处理404情况
]

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior() {
        return { top: 0 }
    }
})

// 添加全局导航守卫来处理404情况
router.beforeEach((to, from, next) => {
    // 检查路由是否存在
    const matchedRoute = router.hasRoute(to.name);

    // 如果路由路径不存在，重定向到404.html
    if (to.name !== undefined && !matchedRoute ||
        (to.matched.length === 0 && to.path !== '/')) {
        window.location.href = '/404.html';
        return;
    }

    next();
});

export default router
