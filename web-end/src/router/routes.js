
const routes = [
  {
    path: '/',
    component: () => import('../pages/HomeView.vue')
  },
  {
    path: '/post/:id',
    component: () => import('../pages/PostView.vue')
  },
  {
    path: '/user/:id',
    component: () => import('../pages/UserProfile.vue')
  },
  {
    path: '/subreadit/:name',
    component: () => import('../components/Subreddit')
  },
  {
    path: '/login',
    component: () => import('../pages/Login')
  },
  {
    path: '/register',
    component: () => import('../pages/Register')
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('../pages/Error404.vue')
  }
]

export default routes
