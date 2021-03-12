/**
 * 路由表
 * path         路径
 * component    组件
 * redirect     重定向路径
 * routes       子路由
 * hideInMenu   隐藏路由
 * breadcrumb   自定义面包屑（暂不支持）
 * authority    路由的权限设置
 */
// import MyPage from '@/pages/My';
// import One from '@/pages/One/one';
// import Two from '@/pages/One/two';
// import Layouts from '@/layouts';
import Loadable from '@/Loadable'

const Layouts = Loadable(() => import('@/layouts'))
const MyPage = Loadable(() => import('@/pages/My'))
const One = Loadable(() => import('@/pages/One/one'))
const Two = Loadable(() => import('@/pages/One/two'))
const Canvas = Loadable(() => import('@/pages/Canvas'))

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
        name: '一级菜单1',
        routes: [
          {
            path: '/my',
            name: '二级菜单1',
            component: MyPage,
          },
          {
            path: '/my/manage',
            name: '二级菜单2',
            routes: [
              {
                path: '/my/manage1',
                name: '三级菜单1',
                icon: 'icon-setting',
                component: One,
              },
              {
                path: '/my/manage2',
                name: '三级菜单2',
                icon: 'icon-setting',
                component: Two,
              },
              {
                path: '/my/manage3',
                name: '三级菜单隐藏',
                icon: 'icon-setting',
                authority: 9,
                // hideInMenu: true,
                component: MyPage,
              },
            ],
            // component: One,
          },
        ],
      },
      {
        path: '/profile',
        name: '一级菜单2',
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
            component: Canvas,
          },
          {
            path: '/profile/hidden',
            name: '测试隐藏',
            icon: 'icon-fankui',
            component: MyPage,
            hideInMenu: true,
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
