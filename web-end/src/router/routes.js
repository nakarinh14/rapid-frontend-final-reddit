
const routes = [
  {
    path: '/',
    component: () => import('../pages/HomeView.vue')
  },
  {
    path: '/post',
    component: () => import('../pages/PostView.vue')
  },
  {
    path: '/user',
    component: () => import('../pages/UserProfile.vue')
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('../pages/Error404.vue')
  }
]

export default routes
