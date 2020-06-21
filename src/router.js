import Vue from 'vue'
import Router from 'vue-router'
import store from './store'
import Login from './views/Login'
import Gallery from './views/Gallery'
import NotFound from './components/NotFound'

Vue.use(Router)

const isAuthenticated = (to, from, next) => {
  if (store.getters.isAuthenticated) {
    next();
    return;
  }
  next('/login');
}

const isNotAuthenticated = (to, from, next) => {
  if (!store.getters.isAuthenticated) {
    next();
    return;
  }
  next('/page/1');
}

const logout = (to, from, next) => {
  if (store.getters.isAuthenticated) {
    store.dispatch('AUTH_LOGOUT');
  }
  next('/login');
}

export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login,
      beforeEnter: isNotAuthenticated,
    },
    {
      path: '/logout',
      name: 'logout',
      beforeEnter: logout,
    },
    {
      path: '/page/:page',
      name: 'gallery',
      component: Gallery,
      beforeEnter: isAuthenticated,
    },
    {
      path: '*',
      name: 'notFound',
      component: NotFound
    }
  ]
})
