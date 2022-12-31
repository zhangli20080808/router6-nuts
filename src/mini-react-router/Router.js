import React, { useMemo } from 'react';

import { NavigateContext } from './Context';

export default function Router({ navigator, location, children }) {
  const navigateContext = useMemo(() => {
    return { navigator, location };
  }, [navigator]);
  return (
    <NavigateContext.Provider value={navigateContext}>
      {children}
    </NavigateContext.Provider>
  );
}
