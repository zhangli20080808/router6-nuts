import React from 'react';
import { useNavigate } from './hooks';

/**
 * 1. Link组件需要使用history对象，注意层级关系，数据传值,但是要考虑接受的是谁传递过来的，新增Router
 * @param {*} param0
 * @returns
 */
export default function Link({ to, children, ...rest }) {
  const navigate = useNavigate();
  const handle = (e) => {
    e.preventDefault();
    navigate(to);
  };
  return (
    <a href={to} onClick={handle} {...rest}>
      {children}
    </a>
  );
}
