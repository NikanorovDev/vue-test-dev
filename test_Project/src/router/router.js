import { createRouter, createWebHistory } from 'vue-router';
import Main from '../pages/Main.vue';
import UserPage from '../pages/UserPage.vue';
import About from '../pages/About.vue';
import PostIdPage from '../pages/PostIdPage.vue';

const routes = [
    {
        path: '/',
        component: Main
    },
    {
        path: '/users',
        component: UserPage
    },
    {
        path: '/about',
        component: About
    },
    {
        path: '/users/:id',
        component: PostIdPage
    }
]


const router = createRouter({
    routes,
    history: createWebHistory('process.env.BASE_URL')
})

export default router