import React from 'react';

const Home = React.lazy(() => import('./views/Home'));
const Login = React.lazy(() => import('./views/Login'));
const Account = React.lazy(() => import('./views/Account'));
const Register = React.lazy(() => import('./views/Register'));
const Dashboard = React.lazy(() => import('./views/Dashboard'));
const Activity = React.lazy(() => import('./views/Account/Activity'));
const Financial = React.lazy(() => import('./views/Account/Financial'));
const Page404 = React.lazy(() => import('./views/Page404'));
const Page500 = React.lazy(() => import('./views/Page500'));

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/Home', name: 'Home', component: Home },
  { path: '/Login', name: 'Login', component: Login },
  { path: '/Account',exact: true, name: 'Dashboard', component: Account },
  { path: '/Register', name: 'Register', component: Register },
  { path: '/Dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/Account/Activity', name: 'Activity', component: Activity },
  { path: '/Account/Financial', name: 'Financial', component: Financial },
  { path: '/404', name: '404', component: Page404 },
  { path: '/500', name: '500', component: Page500 },
];

export default routes;