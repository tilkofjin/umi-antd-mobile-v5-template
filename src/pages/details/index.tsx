import { Result, Space } from 'antd-mobile';
import { useContext } from 'react';
import { GloableContext } from '@/layouts';

const Details: React.FC = () => {
  const todo = useContext(GloableContext);

  return (
    <div>
      <Result
        status="success"
        title="操作成功"
        description="内容详情可折行，建议不超过两行建议不超过两行建议不超过两行"
      />
      <Space justify={'center'} block style={{ '--gap': '24px' }}>
        <div style={{ fontSize: 22 }}>
          待办数：{todo.items.todoBadge || '0'}
        </div>
        <div style={{ fontSize: 22 }}>
          消息数：{todo.items.messageBadge || '0'}
        </div>
      </Space>
    </div>
  );
};

export default Details;
