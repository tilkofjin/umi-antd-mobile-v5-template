declare namespace API {
  type NoDataResult = Record<string, any>;

  type SysUserInfo = {
    status: number;
    stackMessage: string;
    msg: string;
    msgCode?: number;
    data: any;
  };
}