Component({
  data: {
    selected: null,
    list: [
      {
        id: 'home',
        pagePath: '/pages/index/index',
        iconPath: '/assets/tabBar/home.png',
        selectedIconPath: '/assets/tabBar/home-selected.png'
      },
      {
        id: 'mall',
        pagePath: '/pages/mall/index',
        iconPath: '/assets/tabBar/mall.png',
        selectedIconPath: '/assets/tabBar/mall-selected.png'
      },
      {
        id: 'shop',
        pagePath: '/pages/shop/index',
        iconPath: '/assets/tabBar/shop.png',
        selectedIconPath: '/assets/tabBar/shop-selected.png'
      },
      {
        id: 'user',
        pagePath: '/pages/user/index',
        iconPath: '/assets/tabBar/user.png',
        selectedIconPath: '/assets/tabBar/user-selected.png'
      }
    ]
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path

      this.setData({
        selected: null
      })
      wx.switchTab({ url })
    }
  }
})
