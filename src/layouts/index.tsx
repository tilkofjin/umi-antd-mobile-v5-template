import React, { useEffect, useMemo, useState } from 'react';
import { IRouteComponentProps } from 'umi';
import type { BadgeProps } from 'antd-mobile/es/components/badge';
import { findChildrenCode } from '@/utils';
import BaseLayout from './baseLayout';

export interface GloableValueProps {
  homeBadge?: BadgeProps['content'];
  messageBadge?: BadgeProps['content'];
  todoBadge?: BadgeProps['content'];
  meBadge?: BadgeProps['content'];
}

const needLayout = ['/home', '/detail']; // 判断是否需要 layout

export const GloableContext = React.createContext<{
  items: GloableValueProps;
  callback?: (values: GloableValueProps) => void;
}>({
  items: {},
});

const Index: React.FC<IRouteComponentProps> = ({
  children,
  history,
  routes,
}) => {
  const { pathname } = history.location;
  const [navTitle, setNavTitle] = useState('');
  const [gloableValues, setGloableValues] = useState<GloableValueProps | any>(
    {},
  );

  useEffect(() => {
    const res = findChildrenCode(routes, pathname); // 根据路由匹配 nav 的 name
    res?.name && setNavTitle(res.name);
  }, [pathname, navTitle]);

  return (
    <GloableContext.Provider
      value={{
        items: gloableValues,
        callback: (items) => setGloableValues({ ...items }),
      }}
    >
      {needLayout.includes(pathname) ? (
        <BaseLayout navTitle={navTitle}>{children}</BaseLayout>
      ) : (
        children
      )}
    </GloableContext.Provider>
  );
};

export default Index;
