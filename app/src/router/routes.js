const routes = [
  {
    path: '/',
    children: [
      { path: '', component: () => import('pages/HomeScreen.vue') }
    ],
    beforeEnter(to, from) {
      const token = localStorage.getItem('token');
      if (!token) return { path: '/login' }
    }
  },
  {
    path: '/login',
    children: [
      { path: '', component: () => import('pages/LoginScreen.vue') }
    ]
  },
  {
    path: '/register',
    children: [
      { path: '', component: () => import('pages/RegisterScreen.vue') }
    ]
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
