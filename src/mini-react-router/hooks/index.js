import { useContext } from 'react';
import { matchRoutes } from 'react-router-dom';
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
  // 渲染父路由
  const matches = matchRoutes(routes, { pathname });

  console.log(matches, 'matches');
  console.log(renderMatches(matches));
  return renderMatches(matches);
  // params: {}
  // pathname: "/product"
  // pathnameBase: "/product"
  // route:  {  element ,path }

  // return routes.map((route) => {
  //   // const match = pathname === route.path || pathname === '/' + route.path;
  //   const match = pathname.startsWith(route.path);
  //   console.log(pathname, route, 'route');
  //   // TODO 子路由后续处理 children
  //   // return match ? route.element : null;
  //   // 子路由，匹配到谁渲染谁
  //   return (
  //     match &&
  //     route.children.map((child) => {
  //       let m = normalizePathname(child.path) === pathname;
  //       return (
  //         m && (
  //           <RouteContext.Provider
  //             value={{ outlet: child.element }}
  //             children={
  //               route.element !== undefined ? route.element : <Outlet />
  //             }
  //           />
  //         )
  //       );
  //     })
  //   );
  // });
}

function renderMatches(matches) {
  if (matches == null) {
    return null;
  }
  // 前面包含后面
  return matches.reduceRight((outlet, match) => {
    // 当前route有无element，有渲染，如果还有children，由outlet手动决定是否渲染
    return (
      <RouteContext.Provider
        value={{
          outlet,
          matches,
        }}
        children={match.route.element || outlet}
      ></RouteContext.Provider>
    );
  }, null);
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
