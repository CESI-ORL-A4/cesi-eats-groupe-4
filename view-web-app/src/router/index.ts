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
            path: '/signIn',
            name: 'signIn',
            component: () => import('../views/SignInView.vue'),
            meta: {
                guest: true
            }
        },
        {
            path: '/signUp',
            name: 'signUp',
            component: () => import('../views/SignUpView.vue'),
            meta: {
                guest: true
            }
        },
        {
            path: '/cgu',
            name: 'cgu',
            component: () => import('../views/CGUView.vue'),
            meta: {
                guest: true
            }
        },
        {
            path: '/account',
            name: 'account',
            component: () => import('../views/AccountView.vue'),
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/basic',
            name: 'basic',
            component: () => import('../views/BasicView.vue'),
            meta: {
                requiresAuth: true,
                is_basic: true
            }
        },
        {
            path: '/deliverer',
            name: 'deliverer',
            component: () => import('../views/DelivererView.vue'),
            meta: {
                requiresAuth: true,
                is_deliverer: true
            }
        },
        {
            path: '/owner',
            name: 'owner',
            component: () => import('../views/OwnerView.vue'),
            /*
            meta: {
                requiresAuth: true,
                is_owner: true
            }*/
        },
        {
            path: '/owner/products',
            name: 'owner-products',
            component: () => import('../views/owners/Owner-ProductsView.vue'),
            /*
            meta: {
                requiresAuth: true,
                is_owner: true
            }*/
        },
        {
            path: '/owner/product/add',
            name: 'owner-product-add',
            component: () => import('../views/owners/Owner-ProductAddView.vue'),
            /*
            meta: {
                requiresAuth: true,
                is_owner: true
            }*/
        },
        {
            path: '/owner/commands',
            name: 'owner-commands',
            component: () => import('../views/owners/Owner-CommandsView.vue'),
            /*
            meta: {
                requiresAuth: true,
                is_owner: true
            }*/
        },
        {
            path: '/owner/history-command',
            name: 'owner-history-command',
            component: () => import('../views/owners/Owner-HistoryCommandView.vue'),
            /*
            meta: {
                requiresAuth: true,
                is_owner: true
            }*/
        },
        {
            path: '/owner/menus',
            name: 'owner-menus',
            component: () => import('../views/owners/Owner-MenusView.vue'),
            /*
            meta: {
                requiresAuth: true,
                is_owner: true
            }*/
        },
        {
            path: '/owner/menu/add',
            name: 'owner-menu-add',
            component: () => import('../views/owners/Owner-MenuAddView.vue'),
            /*
            meta: {
                requiresAuth: true,
                is_owner: true
            }*/
        },
        {
            path: '/owner/new',
            name: 'owner-new',
            component: () => import('../views/owners/Owner-NewView.vue'),
            /*
            meta: {
                requiresAuth: true,
                is_owner: true
            }*/
        },
        {
            path: '/owner/restaurant-information',
            name: 'owner-restaurant-information',
            component: () => import('../views/owners/Owner-RestaurantInformationView.vue'),
            /*
            meta: {
                requiresAuth: true,
                is_owner: true
            }*/
        },
        {
            path: '/owner/stats',
            name: 'owner-stats',
            component: () => import('../views/owners/Owner-StatsView.vue'),
            /*
            meta: {
                requiresAuth: true,
                is_owner: true
            }*/
        },
        {

            path: '/restaurants',
            name: 'restaurants',
            component: () => import('../views/RestaurantsView.vue'),
            meta: {
                requiresAuth: true,
                is_basic: true
            }
        },
        {

            path: '/restaurant/:id',
            name: 'restaurant',
            component: () => import('../views/MenusView.vue'),
            meta: {
                guest: true
            },
        },
    ]
})

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (localStorage.getItem('jwt') == null) {
            next({
                path: '/signIn',
                params: {nextUrl: to.fullPath}
            })
        } else {
            const role = localStorage.getItem('role')
            if (to.matched.some(record => record.meta.is_basic)) {
                //console.log(role);
                if (role === "BASIC") {
                    next()
                }
            } else if (to.matched.some(record => record.meta.is_deliverer)) {
                //console.log(role);
                if (role === "DELIVERER") {
                    next()
                }
            } else if (to.matched.some(record => record.meta.is_owner)) {
                //console.log(role);
                if (role === "OWNER") {
                    next()
                }
            } else {
                next()
            }
        }
    } else if (to.matched.some(record => record.meta.guest)) {
        if (localStorage.getItem('jwt') == null) {
            next()
        } else {
            next()
        }
    } else {
        next()
    }
})


export default router
