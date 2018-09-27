import Vue from 'vue'
import VueRouter from 'vue-router'

// no lazy load
// import Home from '@/components/home/home'
// import About from '@/components/about/about'

// lazy load
// webpackChunkName: "hello", it can specific the chunk name
const Home = () => import(/* webpackChunkName: "route-hello" */'@/components/home/home')
const About = () => import(/* webpackChunkName: 'route-test' */'@/components/about/about')

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      component: Home
    },
    {
      path: '/about',
      component: About
    }
  ]
})
