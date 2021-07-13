export default {
  pages: [
    // 首页
    'pages/index/index',
    // 商城
    'pages/mall/index',
    // 探店
    'pages/shop/index',
    // 个人中心
    'pages/user/index',
    // 微信登录
    'pages/wxLogin/index',
    // 身份认证
    'pages/identity/index'
  ],

  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: '美院君',
    navigationBarTextStyle: 'white',
    navigationStyle: 'custom'
  },

  tabBar: {
    color: '#454545',
    selectedColor: '#0a6ffb',
    list: [
      {
        pagePath: 'pages/index/index',
        iconPath: 'assets/tabBar/home.png',
        selectedIconPath: 'assets/tabBar/home-selected.png'
      },
      {
        pagePath: 'pages/mall/index',
        iconPath: 'assets/tabBar/mall.png',
        selectedIconPath: 'assets/tabBar/mall-selected.png'
      },
      {
        pagePath: 'pages/shop/index',
        iconPath: 'assets/tabBar/shop.png',
        selectedIconPath: 'assets/tabBar/shop-selected.png'
      },
      {
        pagePath: 'pages/user/index',
        iconPath: 'assets/tabBar/user.png',
        selectedIconPath: 'assets/tabBar/user-selected.png'
      }
    ]
  },

  // 分包路径
  subPackages: [
    {
      root: 'pages/pageA/',
      pages: [
        // 发帖
        'post/index',
        // 聊天
        'chat/index'
      ]
    },
    {
      root: 'pages/pageB/',
      pages: [
        // 确认订单
        'checkOrders/index',
        // 订单详情
        'successDetail/index',
        // 订单详情
        'logistics/index',
        // 优惠券包
        'couponCackage/index',
        // 上传商品
        'uploadMerchandise/index',
        // 我要提现
        'cashWithdrawal/index',
        // 收货地址列表
        'addressLists/index',
        // 新增收货地址
        'addAddress/index',
        // 修改收货地址
        'editAddress/index',
        // 作品展卖详情
        'paintingProductDetail/index',
        // 爱心义卖详情
        'welfareProductDetail/index',
        // 积分商品详情
        'integrationProductDetail/index',
        // 购物车
        'shoppingCart/index'
      ]
    },
    {
      root: 'pages/pageC/',
      pages: [
        // 店铺收藏列表
        'shopCollection/index',
        // 探店-店铺详情
        'shopDetails/index'
      ]
    },
    {
      root: 'pages/pageD/',
      pages: [
        // 个人信息
        'userInfo/index',
        // 我的粉丝
        'fans/index',
        // 我的关注
        'myConcern/index',
        // 积分
        'myIntegration/index',
        // 我的帖子
        'myPost/index',
        // 我的点赞
        'like/index',
        // 我的评论
        'comment/index',
        // 美院福利
        'welfare/index',
        // 订单列表
        'orderLists/index',
        // 我要售卖
        'sell/index',
        // 黑名单
        'blacklist/index',
        // 我的消息
        'message/index',
        // 我的物品
        // 'myBelongings/index',
        // 联系我们
        'contact/index',
        // // 帮助中心
        // 'help/index',
        // 签到日历
        'checkCalendar/index',
        // 我的提现记录
        'myWithdrawalRecord/index',
        // 我的物品
        'newIndex/index',
        // 意见和建议
        'opinion/index',
        'feedback/index',
        'feedback/submit'
      ]
    }
  ]
}
