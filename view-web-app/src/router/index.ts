import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            alias: ['/home'],
            component: HomeView,
            meta: {
                guest: true
            }
        },
        {
            path: '/SignIn',
            name: 'SignIn',
            component: () => import('../views/SignInView.vue'),
            meta: {
                guest: true
            }
        },
        {
            path: '/SignUp',
            name: 'SignUp',
            component: () => import('../views/SignUpView.vue'),
            meta: {
                guest: true
            }
        },
        {
            path: '/Account',
            name: 'Account',
            component: () => import('../views/AccountView.vue'),
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/Basic',
            name: 'Basic',
            component: () => import('../views/BasicView.vue'),
            meta: {
                requiresAuth: true,
                is_basic: true
            }
        },
        {
            path: '/Deliverer',
            name: 'Deliverer',
            component: () => import('../views/DelivererView.vue'),
            meta: {
                requiresAuth: true,
                is_deliverer: true
            }
        },
        {
            path: '/Owner',
            name: 'Owner',
            component: () => import('../views/OwnerView.vue'),
            meta: {
                requiresAuth: true,
                is_owner: true
            }
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
            if (to.matched.some(record => record.meta.is_basic)) {
                console.log(role);
                if (role === "Basic") {
                    next()
                } else {
                    next({name: 'Basic'})
                }
            } else if (to.matched.some(record => record.meta.is_deliverer)) {
                console.log(role);
                if (role === "Deliverer") {
                    next()
                } else {
                    next({name: 'Deliverer'})
                }
            } else if (to.matched.some(record => record.meta.is_owner)) {
                console.log(role);
                if (role === "Owner") {
                    next()
                } else {
                    next({name: 'Owner'})
                }
            } else {
                next()
            }
        }
    } else if (to.matched.some(record => record.meta.guest)) {
        if (localStorage.getItem('jwt') == null) {
            next()
        }
    } else {
        next()
    }
})

export default router
