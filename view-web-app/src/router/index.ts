import DelivererDashboardView from '@/views/DelivererDashboardView.vue'
import OwnerOrdersView from '@/views/owners/OwnerOrdersView.vue'
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
            meta: {
                requiresAuth: true,
                is_owner: true
            }
        },
        {
            path: '/owner/products',
            name: 'owner-products',
            component: () => import('../views/owners/OwnerProductsView.vue'),
            meta: {
                requiresAuth: true,
                is_owner: true
            }
        },
        {
            path: '/owner/products/add',
            name: 'owner-products-add',
            component: () => import('../views/owners/OwnerProductAddView.vue'),
            meta: {
                requiresAuth: true,
                is_owner: true
            }
        },
        {
            path: '/owner/products/:id',
            name: 'owner-products-update',
            component: () => import('../views/owners/OwnerProductUpdateView.vue'),
            meta: {
                requiresAuth: true,
                is_owner: true
            }
        },
        {
            path: '/owner/orders',
            name: 'owner-orders',
            component: OwnerOrdersView,
            meta: {
                requiresAuth: true,
                is_owner: true
            }
        },
        {
            path: '/owner/menus',
            name: 'owner-menus',
            component: () => import('../views/owners/OwnerMenusView.vue'),
            meta: {
                requiresAuth: true,
                is_owner: true
            }
        },
        {
            path: '/owner/menu/:id',
            name: 'owner-menu-update',
            component: () => import('../views/owners/OwnerMenuUpdateView.vue'),
            meta: {
                requiresAuth: true,
                is_owner: true
            }
        },
        {
            path: '/owner/menu/add',
            name: 'owner-menu-add',
            component: () => import('../views/owners/OwnerMenuAddView.vue'),
            meta: {
                requiresAuth: true,
                is_owner: true
            }
        },
        {
            path: '/owner/stats',
            name: 'owner-stats',
            component: () => import('../views/owners/OwnerStatsView.vue'),
            meta: {
                requiresAuth: true,
                is_owner: true
            }
        },
        {
            path: '/owner/account-new',
            name: 'owner-account-new',
            component: () => import('../views/owners/OwnerAccountNewView.vue'),
            meta: {
                requiresAuth: true,
                is_owner: true
            }
        },
        {
            path: '/owner/account-update',
            name: 'owner-account-update',
            component: () => import('../views/owners/OwnerAccountUpdateView.vue'),
            meta: {
                requiresAuth: true,
                is_owner: true
            }
        },
        {
            path: '/owner/history-order',
            name: 'owner-history-order',
            component: () => import('../views/owners/OwnerOrdersHistoryView.vue'),
            meta: {
                requiresAuth: true,
                is_owner: true
            }
        },
        {

            path: '/restaurants',
            name: 'restaurants',
            component: () => import('../views/RestaurantsView.vue'),
            meta: {
                guest: true
            }
        },
        {
            path: '/deliverer/dashboard',
            name: 'deliverer-dashboard',
            component: DelivererDashboardView,
            meta: {
                requiresAuth: true,
                is_deliverer: true
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
        {

            path: '/cart',
            name: 'cart',
            component: () => import('../views/CartView.vue'),
            meta: {
                requiresAuth: true,
                is_basic: true
            },
        },
        {

            path: '/notifications',
            name: 'notifications',
            component: () => import('../views/NotificationsView.vue'),
            meta: {
                requiresAuth: true
            },
        },
        {

            path: '/client-order',
            name: 'clientOrder',
            component: () => import('../views/ClientOrderView.vue'),
            meta: {
                requiresAuth: true,
                is_basic: true
            },
        },
        {

            path: '/no-access',
            name: 'noAccess',
            component: () => import('../views/NoAccessView.vue'),
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
            const role = localStorage.getItem('role');
            console.log(role);
            console.log(to);
            if (to.matched.some(record => record.meta.is_basic)) {
                if (role === "BASIC") {
                    next()
                }else{
                    next({
                        path: '/no-access',
                    })
                }
            } else if (to.matched.some(record => record.meta.is_deliverer)) {
                //console.log(role);
                if (role === "DELIVERER") {
                    next()
                }else{
                    next({
                        path: '/no-access',
                    })
                }
            } else if (to.matched.some(record => record.meta.is_owner)) {
                //console.log(role);
                if (role === "OWNER") {
                    next()
                }else{
                    next({
                        path: '/no-access',
                    })
                }
            } else{
                next()
            }
        }
    } else if (to.matched.some(record => record.meta.guest)) {
        if (localStorage.getItem('jwt') == null) {
            next()
        } else{
            next();
        }
    } else{
        next();
    }
})


export default router
