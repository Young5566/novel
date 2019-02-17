/**
 * @author: Young
 * @QQ:403353323
 * @date:2018/7/4
 */

import Vue from 'vue';
import Router from 'vue-router';
import Login from '../components/login/Login';
import Regist from '../components/regist/Regist';
import ReadNovel from '../components/readNovel/readNovel';
import Detail from '../components/detail/Detail';
import Base from '../components/base';
import Home from '../components/home1/home1';
import Search from '../components/search/Search';
import Ancient from '../components/ancient/Ancient';
import Doing from '../components/doing/Doing';
import Imagimary from '../components/imaginary/Imaginary';
import Now from '../components/now/Now';
import Suspense from '../components/suspense/suspense';
import Young from '../components/young/Young';
import Finish from '../components/finish/Finish';
import Middle from '../components/middle/Middle';

// 路由管理
Vue.use(Router);

const routes = [
    {
        path: '/',
        component: Base,
        children: [
            {
                path: '/',
                name: 'Home',
                component: Home,
                meta: {
                    keepAlive: false
                }
            },
            {
                path: '/detail',
                name: 'Detail',
                component: Detail,
                meta: {
                    keepAlive: false
                }
            },
            {
                path: '/finish',
                name: 'Finish',
                component: Finish,
                meta: {
                    keepAlive: true
                }
            },
            {
                path: '/young',
                name: 'Young',
                component: Young,
                meta: {
                    keepAlive: true
                }
            },
            {
                path: '/ancient',
                name: 'Ancient',
                component: Ancient,
                meta: {
                    keepAlive: true
                }
            },
            {
                path: '/doing',
                name: 'Doing',
                component: Doing,
                meta: {
                    keepAlive: true
                }
            },
            {
                path: '/imaginary',
                name: 'Imaginary',
                component: Imagimary,
                meta: {
                    keepAlive: true
                }
            },
            {
                path: '/now',
                name: 'Now',
                component: Now,
                meta: {
                    keepAlive: true
                }
            },
            {
                path: '/suspense',
                name: 'Suspense',
                component: Suspense,
                meta: {
                    keepAlive: true
                }
            },
            {
                path: '/search',
                name: 'Search',
                component: Search,
                meta: {
                    keepAlive: false
                }
            }
        ]
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
        meta: {
            keepAlive: false
        }
    },
    {
        path: '/regist',
        name: 'Regist',
        component: Regist,
        meta: {
            keepAlive: false
        }
    },
    {
        path: '/read',
        name: 'Read',
        component: ReadNovel,
        meta: {
            keepAlive: false
        }
    },
    {
        path: '/middle',
        name: 'Middle',
        component: Middle
    }
    ];

const router = new Router({
    mode: 'history',
    routes: routes
});

router.beforeEach((to, from, next) => {
    if (to.matched.some(r => r.meta.requireAuth)) {
        if (window.localStorage.token) {
            console.log(window.localStorage.token);
            next();
        } else {
            next({path: '/login'});
        }
    } else {
        next();
    }
});

export default router;
