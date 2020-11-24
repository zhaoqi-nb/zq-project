import MyPage from '@/pages/My';
import Layouts from '@/layouts';

export default [
  {
    path: '/',
    component: Layouts,
    routes: [
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
            path: '/profile/config',
            name: '配置中心',
            icon: 'icon-setting',
            component: MyPage,
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
            component: MyPage,
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
