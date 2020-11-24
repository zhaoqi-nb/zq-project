/* eslint-disable no-unused-vars */
import React from 'react';
import { Route, Switch, Redirect, matchPath } from 'react-router-dom';

export const DEFAULT_MATCH_OPTIONS = { exact: true, strict: false };

const getRoute = (routes, path, redirect) => {
  let route;
  routes.some((r) => {
    const {
      path: routePath,
      redirect: routeRedirect,
      routes: children,
      component,
      exact = DEFAULT_MATCH_OPTIONS.exact,
      strict = DEFAULT_MATCH_OPTIONS.strict,
    } = r;
    if (path ? routePath === path : matchPath(redirect, { exact, strict, path: routePath })) {
      if (routeRedirect) {
        if (typeof routeRedirect === 'string') {
          path = undefined;
          redirect = routeRedirect;
          return false;
        }
        route = routeRedirect.reduce(
          (result, redirectPath) => result.concat(getRoute(routes, undefined, redirectPath) || []),
          [],
        );
        if (route.length <= 1) {
          [route] = route;
        }
        return true;
      }
      if (component) {
        route = r;
        return true;
      }
      route = getRoute(children, path, redirect);
      return true;
    }
    if (
      !routeRedirect &&
      (path
        ? path.indexOf(routePath) === 0
        : matchPath(redirect, { exact: false, strict: false, path: routePath }))
    ) {
      if (children) {
        route = getRoute(children, path, redirect);
        return true;
      }
      return false;
    }
    return false;
  });
  return route;
};

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
    console.log(routeChildrens);
    return routeChildrens;
  }
  return null;
};

export const getLayouts = (layoutRoutes, currentAuthority) => (
  <Switch>
    {layoutRoutes.map((item) => {
      const { path, routes, component: Component, authority, ...restProps } = item;
      console.log(layoutRoutes);
      return (
        <Route
          key={path}
          path={path}
          component={(props) => (
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
