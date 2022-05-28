import {
  Button,
  Grid,
  Space,
  Swiper,
  Toast,
} from 'antd-mobile';
import { useHistory } from 'umi';
import {
  FolderOutline,
  ReceivePaymentOutline,
  RightOutline,
  ScanningOutline,
  TravelOutline,
  UploadOutline,
} from 'antd-mobile-icons';
import styles from './index.less';

export default function IndexPage() {
  const history = useHistory();
  const colors = ['#ace0ff', '#bcffbd', '#e4fabd', '#ffcfac'];

  const items = colors.map((color, index) => (
    <Swiper.Item key={index}>
      <div
        className={styles.content}
        style={{ background: color }}
        onClick={() => {
          Toast.show(`你点击了卡片 ${index + 1}`);
        }}
      >
        {index + 1}
      </div>
    </Swiper.Item>
  ));
  return (
    <div className={styles.homeWarp}>
      <div className={styles.header}>
        <Grid columns={4}>
          <Grid.Item className={styles.iconWarp}>
            <ScanningOutline />
            <div className={styles.iconText}>扫一扫</div>
          </Grid.Item>
          <Grid.Item className={styles.iconWarp}>
            <ReceivePaymentOutline />
            <div className={styles.iconText}>收付款</div>
          </Grid.Item>
          <Grid.Item className={styles.iconWarp}>
            <TravelOutline />
            <div className={styles.iconText}>出行</div>
          </Grid.Item>
          <Grid.Item className={styles.iconWarp}>
            <FolderOutline />
            <div className={styles.iconText}>卡包</div>
          </Grid.Item>
        </Grid>
      </div>
      <div className={styles.ribbonWarp}>
        <Grid columns={5}>
          {[
            '饿了么',
            '消费金',
            '市民中心',
            '蚂蚁森林',
            '转账',
            '余额宝',
            '花呗',
            '运动',
            '我的小程序',
            '更多',
          ].map((text, index) => (
            <Grid.Item
              className={styles.iconWarp}
              key={`item-${index}`}
              onClick={() => history.push('/detail')}
            >
              <ScanningOutline />
              <div className={styles.iconText}>{text}</div>
            </Grid.Item>
          ))}
        </Grid>
      </div>
      <div className={styles.messageWarp}>
        <div className={styles.messageList}>
          <div className={styles.messageItem}>
            婉玉：余额宝的欠费什么时候还得完 <span>7分钟前</span>
          </div>
          <div className={styles.messageItem}>
            蚂蚁财富：你都还完了我还赚谁的钱 <span>15分钟前</span>
          </div>
        </div>
        <div className={styles.messageArrow}>
          <RightOutline />
        </div>
      </div>
      <div className={styles.adWarp}>
        <Swiper autoplay={true} loop={true}>
          {items}
        </Swiper>
      </div>
      <div className={styles.toastBox}>
        <div>Toast 提示展示</div>
        <Space wrap>
          <Button
            color='primary'
            onClick={() =>
              Toast.show({
                icon: 'success',
                content: '保存成功',
              })
            }
          >
            成功
          </Button>
          <Button
            onClick={() => {
              Toast.show({
                icon: 'fail',
                content: '名称已存在',
              });
            }}
          >
            失败
          </Button>
          <Button
            onClick={() => {
              Toast.show({
                icon: 'loading',
                content: '加载中…',
              });
            }}
          >
            加载中
          </Button>
          <Button
            onClick={() => {
              Toast.show({
                content: '上传中',
                icon: <UploadOutline />,
              });
            }}
          >
            自定义图标
          </Button>
        </Space>
      </div>
    </div>
  );
}
