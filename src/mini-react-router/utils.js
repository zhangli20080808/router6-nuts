import React from 'react';
/**
 * 将children 路由 映射成对象，类比dom -》 vdom
 * @param {*} params
 */
export function createRoutesFromChildren(children) {
  const routes = [];
  React.Children.forEach(children, (child) => {
    const route = {
      path: child.props.path,
      element: child.props.element,
    };
    if (child.children) {
      route.children = createRoutesFromChildren(child.props.children);
    }
    routes.push(route);
  });
  return routes;
}
