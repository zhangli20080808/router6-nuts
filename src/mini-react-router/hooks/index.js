import { useContext } from 'react';
import { NavigateContext } from '../Context';
/**
 * 可以将数组对象形式的路由，直接在页面上使用, 渲染哪个路由
 * @param {*} routes
 * return React组件
 */
export function useRoutes(routes) {
  const pathname = window.location.pathname;
  console.log(routes);
  // 渲染父路由
  return routes.map((route) => {
    // const match = pathname === route.path || pathname === '/' + route.path;
    const match = pathname.startsWith(route.path);
    console.log(pathname, route, 'route');
    // TODO 子路由后续处理 children
    return match ? route.element : null;
  });
}

/**
 * 跳转 使用history，其也是通过 BrowserRouter 或者 HashRouter 传递过来
 * @param {*} params
 */
export function useNavigate() {
  const { navigator } = useContext(NavigateContext);
  return navigator.push;
}

export function useLocation() {
  const { location } = useContext(NavigateContext);
  return location;
}

/**
 * 渲染父路由的子路由，渲染children
 * @returns
 */
export function useOutlet() {}
