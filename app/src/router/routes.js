
const routes = [
  {
    path: '/',
    children: [
      { path: '', component: () => import('pages/HomeScreen.vue') }
    ]
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
