import React, { useEffect } from 'react';
import { useNavigate } from './hooks';
export default function Navigate({ to, state, replace }) {
  const navigate = useNavigate();
  useEffect(() => {
    navigate(to, { replace, state });
  }, [navigate, to, replace, state]);

  return null;
}
