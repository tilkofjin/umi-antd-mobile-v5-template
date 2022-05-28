import { Result } from 'antd';
import Button from 'antd-mobile/es/components/button';
import React from 'react';
import { history } from 'umi';
import './404.less'
const NoFoundPage: React.FC = () => (
  <div className="no-found-wrap">
    <Result
      status="404"
      title="404"
      subTitle="Sorry, 您访问的页面不存在"
      extra={
        <Button color='primary' onClick={() => history.push('/')}>
          返回首页
        </Button>
      }
    />
  </div>
);

export default NoFoundPage;
