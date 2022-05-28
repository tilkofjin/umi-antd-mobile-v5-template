import { useHistory } from 'umi';
import { NavBar } from 'antd-mobile';
import React, { ReactNode } from 'react';
import './index.less';

/**
 * 不同的全局 layout
 * @param props
 * @url https://umijs.org/zh-CN/docs/convention-routing#%E4%B8%8D%E5%90%8C%E7%9A%84%E5%85%A8%E5%B1%80-layout
 */
const BaseLayout: React.FC<{ navTitle?: string | ReactNode }> = ({
  children,
  navTitle,
}) => {
  const history = useHistory();
  return (
    <React.Fragment>
      <NavBar
        back={history?.location?.pathname !== '/home' ? '返回' : ''}
        onBack={() => history.goBack()}
      >
        {navTitle}
      </NavBar>
      <div className="global-layout">{children}</div>
    </React.Fragment>
  );
};

export default BaseLayout;
