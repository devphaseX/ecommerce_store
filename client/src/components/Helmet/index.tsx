import React from 'react';
import { useLayoutEffect } from 'react';

interface HelmetProps {
  pageTitle: string;
  children: React.ReactNode;
}

const Helmet = ({ pageTitle, children }: HelmetProps) => {
  useLayoutEffect(() => {
    document.title = pageTitle;
  }, []);

  return <div>{children}</div>;
};

export { Helmet };
