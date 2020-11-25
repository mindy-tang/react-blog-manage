import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home.vue'
import Admin from '../components/admin/Admin.vue'
import Cate from '../components/cate/Cate.vue'
import Book from '../components/book/Book.vue'
import ArticalAdd from '../components/artical/ArticalAdd.vue'
import ArticalList from '../components/artical/ArticalList.vue'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        redirect: '/home'
    },
    // {
    //     path: '/login',
    //     name: 'Login',
    //     component: Login
    // },
    {
        path: '/home',
        name: 'Home',
        component: Home,
        redirect: '/cate',
        children: [
            { path: '/list', component: ArticalList },
            { path: '/artical', component: ArticalAdd },
            { path: '/cate', component: Cate },
            { path: '/book', component: Book },
            { path: '/admin', component: Admin },
        ]
    }
]

const router = new VueRouter({
    routes
})

//路由导航守卫控制路由权限
router.beforeEach((to, from, next) => {
    if (to.path === '/login') return next()
    const tokenStr = window.sessionStorage.getItem('token');
    // if (!tokenStr) return next('/login');
    next();
})

export default router