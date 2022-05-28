import { ReactChild, ReactFragment, ReactPortal } from 'react';
import { Redirect } from 'umi';

//假的权限验证
const useAuth = () => {
  const isLogin = localStorage.getItem('token');
  return { isLogin };
};

export default (props: {
  children: boolean | ReactChild | ReactFragment | ReactPortal;
}) => {
  const { isLogin } = useAuth();
  if (isLogin) {
    return <div>{props.children}</div>;
  } else {
    return <Redirect to="/login" />;
  }
};
