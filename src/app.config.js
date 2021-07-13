export default {
  pages: [
    'pages/index/index',
    'pages/mall/index',
    'pages/shop/index',
    'pages/user/index',
    'pages/wxLogin/index',
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
  subPackages: [
    {
      root: 'pages/pageA/',
      pages: [
        'post/index',
        'chat/index'
      ]
    },
    {
      root: 'pages/pageB/',
      pages: [
        'checkOrders/index',
        'successDetail/index',
        'logistics/index',
        'couponCackage/index',
        'uploadMerchandise/index',
        'cashWithdrawal/index',
        'addressLists/index',
        'addAddress/index',
        'editAddress/index',
        'paintingProductDetail/index',
        'welfareProductDetail/index',
        'integrationProductDetail/index',
        'shoppingCart/index'
      ]
    },
    {
      root: 'pages/pageC/',
      pages: [
        'shopCollection/index',
        'shopDetails/index'
      ]
    },
    {
      root: 'pages/pageD/',
      pages: [
        'userInfo/index',
        'fans/index',
        'myConcern/index',
        'myIntegration/index',
        'myPost/index',
        'like/index',
        'comment/index',
        'welfare/index',
        'orderLists/index',
        'sell/index',
        'blacklist/index',
        'message/index',
        'contact/index',
        'checkCalendar/index',
        'myWithdrawalRecord/index',
        'newIndex/index',
        'opinion/index',
        'feedback/index',
        'feedback/submit'
      ]
    }
  ]
}
