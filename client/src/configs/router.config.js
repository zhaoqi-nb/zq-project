import MyPage from '@/pages/My';
import One from '@/pages/One/one';
import Two from '@/pages/One/two';
import Layouts from '@/layouts';

export default [
  {
    path: '/',
    component: Layouts,
    routes: [
      {
        path: '/',
        redirect: '/my',
      },
      {
        path: '/my',
        name: '我的1',
        component: MyPage,
      },
      {
        path: '/profile',
        name: '我的2',
        routes: [
          {
            path: '/profile',
            redirect: '/profile/config',
          },
          {
            path: '/profile/config',
            name: '配置中心',
            icon: 'icon-setting',
            component: One,
          },
          {
            path: '/profile/config/:id/:type?',
            name: '机器人配置',
            hideInMenu: true,
            component: MyPage,
          },
          {
            path: '/profile/feedback',
            name: '用户反馈',
            icon: 'icon-fankui',
            component: Two,
          },
          {
            path: '/profile/feedback/:type/:id?',
            hideInMenu: true,
            breadcrumb: '@/layouts/Basic/Breadcrumb/Dynamic/Action', // 自定义面包屑
            component: MyPage,
          },
        ],
      },
    ],
  },
];
