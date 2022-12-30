import React, { useMemo } from 'react';

import { NavigateContext } from './Context';

export default function Router({ navigator, children }) {
  const navigateContext = useMemo(() => {
    return { navigator };
  }, [navigator]);
  console.log(navigateContext, 'navigateContext');
  return (
    <NavigateContext.Provider value={navigateContext}>
      {children}
    </NavigateContext.Provider>
  );
}
