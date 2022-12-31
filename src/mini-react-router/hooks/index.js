import { useContext } from 'react';
import { NavigateContext, RouteContext } from '../Context';
import Outlet from '../Outlet';
import { normalizePathname } from '../utils';
/**
 * 可以将数组对象形式的路由，直接在页面上使用, 渲染哪个路由
 * @param {*} routes
 * return React组件
 */
export function useRoutes(routes) {
  const { pathname } = useLocation();
  console.log(routes);
  // 渲染父路由
  return routes.map((route) => {
    // const match = pathname === route.path || pathname === '/' + route.path;
    const match = pathname.startsWith(route.path);
    console.log(pathname, route, 'route');
    // TODO 子路由后续处理 children
    // return match ? route.element : null;
    // 子路由，匹配到谁渲染谁
    return (
      match &&
      route.children.map((child) => {
        let m = normalizePathname(child.path) === pathname;
        return (
          m && (
            <RouteContext.Provider
              value={{ outlet: child.element }}
              children={
                route.element !== undefined ? route.element : <Outlet />
              }
            />
          )
        );
      })
    );
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
   思考？如何在 useOutlet 中拿到 children，层级不太确定，使用useContext
 * @returns
 */
export function useOutlet() {
  const { outlet } = useContext(RouteContext);
  return outlet;
}
