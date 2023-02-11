
const layoutBasic = () => import('layouts/BasicLayout.vue')
const layoutMain = () => import('layouts/UserLayout.vue')

const pageError404 = () => import('pages/Error404.vue')
const pageLogin = () => import('pages/auth/Login.vue')
const pageSignup = () => import('pages/auth/Signup.vue')
const pageDashboard = () => import('pages/Dashboard.vue')
const pageCalendar = () => import('pages/Calendar.vue')
const pageUserProfile = () => import('pages/user/Profile.vue')
const pageUsersList = () => import('pages/user/admin/UsersList.vue')
const pageClientsList = () => import('pages/client/ClientsList.vue')
const pageProjectsList = () => import('pages/project/ProjectsList.vue')
const pageProject = () => import('pages/project/Project.vue')

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login',
    component: layoutBasic,
    meta: {
      guest: true
    },
    children: [
      { path: '', component: pageLogin },
    ],
  },
  { path: '/signup',
    component: layoutBasic,
    meta: {
      guest: true
    },
    children: [
      { path: '', component: pageSignup },
    ],
  },
  {
    path: '/auth',
    component: () => import('layouts/BasicLayout.vue'),
    children: [
      {
        path: 'forgotPassword',
        name: 'ForgotPassword',
        component: () => import('pages/auth/ForgotPassword.vue')
      },
      {
        path: 'login',
        name: 'Login',
        component: () => import('pages/auth/Auth.vue')
      },
      {
        path: 'register',
        name: 'Register',
        component: () => import('pages/auth/Auth.vue')
      }
    ]
  },
  {
    path: '/',
    component: layoutMain,
    meta: {
      requiresAuth: true,
      isAdmin : false
    },
    children: [
      {
        path: '/dashboard',
        mame: 'Dashboard',
        component: pageDashboard,
        props: (route) => ({ query: route.query.q }),
      },
      {
        path: '/g/:groupId',
        mame: 'Group',
        component: pageDashboard,
        props: (route) => ({ query: route.query.q }),
      },
      { path: '/calendar', component: pageCalendar },
      { path: '/me',  component: pageUserProfile },
      { path: '/user-list',  component: pageUsersList },
      { path: '/client-list', component: pageClientsList },
      { path: '/project-list', component: pageProjectsList },
      { path: '/project/:id', component: pageProject },
    ],
  },
  /*

  {
    path: '/user',
    component: layoutMain,
    children: [
      {
        path: 'profile',
        name: 'UserProfile',
        component: pageUserProfile,
        meta: {
          requiresAuth: true,
          isAdmin : false
        }
      }
    ]
  },
  {
    path: '/admin',
    name: 'admin',
    //component: Admin,
    meta: {
      requiresAuth: true,
      isAdmin : true
    }
  },*/
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: pageError404
  })
}


export default routes
