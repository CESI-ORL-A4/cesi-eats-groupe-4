import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView
        },
        {
            path: '/SignIn',
            name: 'SignIn',
            component: () => import('../views/SignInView.vue')
        },
        {
            path: '/SignUp',
            name: 'SignUp',
            component: () => import('../views/SignUpView.vue')
        },
        {
            path: '/Account',
            name: 'Account',
            component: () => import('../views/AccountView.vue')
        },
        {
            path: '/Basic',
            name: 'Basic',
            component: () => import('../views/BasicView.vue')
        },
        {
            path: '/Deliverer',
            name: 'Deliverer',
            component: () => import('../views/DelivererView.vue')
        },
        {
            path: '/Owner',
            name: 'Owner',
            component: () => import('../views/OwnerView.vue')
        },
    ]
})

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (localStorage.getItem('jwt') == null) {
            next({
                path: '/SignIn',
                params: {nextUrl: to.fullPath}
            })
        } else {
            const role = JSON.parse(localStorage.getItem('role')!)
            if (to.matched.some(record => record.meta.is_admin)) {
                console.log(role);
                if (role === "user") {
                    next()
                } else {
                    next({name: 'user'})
                }
            } else {
                next()
            }
        }
    } else if (to.matched.some(record => record.meta.guest)) {
        if (localStorage.getItem('jwt') == null) {
            next()
        } else {
            next({name: 'user'})
        }
    } else {
        next()
    }
})

export default router
