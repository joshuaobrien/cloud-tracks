import Vue from 'vue'
import Router from 'vue-router'
import Landing from '@/components/Landing'
import Register from '@/components/Register'
import Login from '@/components/Login'
import Logout from '@/components/Logout'
import Playlists from '@/components/Playlists'
import Tracks from '@/components/Tracks'
import '../../static/reset.css'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [{
            path: '/',
            name: 'Landing',
            component: Landing
        },
        {
            path: '/register',
            name: 'Register',
            component: Register
        },
        {
            path: '/login',
            name: 'Login',
            component: Login
        },
        {
            path: '/playlists',
            name: 'Playlists',
            component: Playlists
        },
        {
            path: '/tracks/:id',
            name: 'Tracks',
            component: Tracks
        },
        {
            path: '/logout',
            name: 'Logout',
            component: Logout
        }
    ]
})