/**
 * 可以将数组对象形式的路由，直接在页面上使用, 渲染哪个路由
 * @param {*} routes
 */
export function useRoutes(routes) {
  const pathname = window.location.pathname;
  console.log(routes);
  return routes.map((route) => {
    const match = pathname === route.path || pathname === '/' + route.path;
    return match ? route.element : null;
  });
}
