import React, { useState, useLayoutEffect } from 'react';
import { createBrowserHistory } from 'history';
import Router from './Router';

export default function BrowserRouter({ children }) {
  // 组件卸载之前用
  let historyRef = React.useRef();

  if (historyRef.current == null) {
    historyRef.current = createBrowserHistory();
  }

  const history = historyRef.current;

  const [state, setState] = useState({ location: history.location });
  // 签名函数和 useEffect，但是会在所有dom变更之后 延迟调用 useEffect
  // useLayoutEffect则是在 dom 更新完成之后，立刻执行，浏览器绘制之前执行
  // https://zhangli20080808.github.io/zl-docsify-blog/#/react/hooks?id=uselayouteffect
  // 涉及到组件更新，如果延迟，有些组件的更新可能会出问题
  useLayoutEffect(() => {
    history.listen(setState);
  }, [history]);

  return (
    <Router children={children} navigator={history} location={state.location} />
  );
}
