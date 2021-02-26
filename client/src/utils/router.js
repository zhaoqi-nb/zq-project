/* eslint-disable no-unused-vars */
import React from 'react';
import { router } from 'dva';
// import Loadable from 'react-loadable';
import { Icon, Spin } from 'antd';
// import { Route, Switch, Redirect, matchPath } from 'react-router-dom';

const { Switch, Route, Redirect, matchPath } = router;

export const DEFAULT_MATCH_OPTIONS = { exact: true, strict: false };

// const Loading = () => (
//   <Spin indicator={<Icon
//     type="loading"
//     style={{ fontSize: 24 }}
//     spin
//   />}
//   >
//     111
//   </Spin>
// );

// const getComponent = (routeConfig, currentAuthority) => {
//   const { redirect, component, routes, path, ...restRouteProps } = routeConfig;
//   return Loadable({
//     loader: () => import('../pages/One/one'),
//     loading: Loading,
//     render(loaded, props) {
//       console.log(loaded)
//       if (redirect) {
//         return <Redirect
//           {...props}
//           from={path}
//           to={redirect}
//         />;
//       }
//       const Component = loaded.default;
//       return <Route exact path={path} {...props} component={Component} />;
//     },
//   });
// };

// 递归获取路由表里所有路由
// const getChildren2 = (route, currentAuthority) => {
//   route.map((routeConfig, i) => {
//     const { routes } = routeConfig;
//     if (routes) {
//       getChildren2(routes, currentAuthority)
//       return
//     }
//     console.log(routeConfig)
//     const ComponentWithSubRoutes = getComponent(routeConfig, currentAuthority);
//     return (
//       <Route
//         key={i}
//         path={routeConfig.path}
//         component={ComponentWithSubRoutes}
//         exact
//       />
//     );
//   })
// };

const getChildren = (routes, currentAuthority) => {
  if (routes) {
    const routeChildrens = routes
      .map((item) => {
        const {
          path,
          routes: routeChildren,
          redirect,
          component: Component,
          authority,
          ...restRouteProps
        } = item;
        let children = routeChildren && getChildren(routeChildren, currentAuthority);
        let route;
        if (redirect) {
          const redirectTo = redirect;
          route = redirectTo && (
            <Redirect key={path} from={path} to={redirectTo} exact {...restRouteProps} />
          );
        } else if (Component) {
          children = children && <Switch>{children}</Switch>;
          route = (
            <Route
              key={path || 'fallback'}
              render={(props) => (
                <Component {...props} routes={routeChildren}>
                  {children}
                </Component>
              )}
              path={path}
              exact={!children}
              {...restRouteProps}
            />
          );
        } else if (routeChildren) {
          route = getChildren(routeChildren, currentAuthority);
        }
        return route;
      })
      .reduce((children, item) => children.concat(item), [])
      .filter((item) => item);
    return routeChildrens;
  }
  return null;
};

export const getLayouts = (layoutRoutes, currentAuthority) => (
  <Switch>
    {layoutRoutes.map((item) => {
      const { path, routes, component: Component, authority, ...restProps } = item;
      return (
        <Route
          key={path}
          path={path}
          render={(props) => (
            <Component {...props} routes={routes} currentAuthority={currentAuthority}>
              <Switch>{getChildren(routes, currentAuthority)}</Switch>
            </Component>
          )}
          {...restProps}
        />
      );
    })}
  </Switch>
);

export const formatter = (data, parentAuthority) => {
  if (!data) {
    return undefined;
  }

  return data.map((item) => {
    const { redirect, authority, routes } = item;
    if (redirect) {
      return item;
    }
    const formattedItem = {
      ...item,
      authority: authority || parentAuthority,
    };
    if (routes) {
      formattedItem.routes = formatter(routes, formattedItem.authority);
    }
    return formattedItem;
  });
};
