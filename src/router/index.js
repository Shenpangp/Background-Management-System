import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '@/views/Main.vue'
import Home from '@/views/Home.vue'
import User from '@/views/User.vue'
import Mall from '@/views/Mall.vue'
import PageOne from '@/views/PageOne.vue'
import PageTwo from '@/views/PageTwo.vue'
import Login from '@/views/Login'
Vue.use(VueRouter)

export default new VueRouter({
    routes: [
        { // /home
            path: '/',
            component: Main,
            name: 'Main',
            redirect: '/home',
            children: [
                // { // home
                //     path: '/home',
                //     name: 'home',
                //     component: Home
                // },
                // { // user
                //     path: '/user',
                //     name: 'user',
                //     component: User
                // },
                // { // mall
                //     path:'/mall',
                //     name: 'mall',
                //     component: Mall
                // },
                // { //page1
                //     path:'/page1',
                //     name: 'page1',
                //     component: PageOne
                // },
                // { // page2
                //     path:'/page2',
                //     name: 'page2',
                //     component: PageTwo
                // }
            ]
        },
        { // login
            path: '/login',
            name: 'login',
            component: Login
        }
    ]
})
