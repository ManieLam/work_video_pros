const Api = require('../../utils/Api')
let isPull = false
let isLoading = false

Page({
  data: {
    notifications: [],
    cursor: 0,
    isDone: false
  },
  loadNotifications: function (args) {
    if (isLoading || this.data.isDone) return

    isLoading = true
    Api.queryNotificationList(args)
      .then(res => {
        this.setData({
          notifications: this.data.notifications.concat(res.notifications),
          cursor: res.next_cursor,
          isDone: res.next_cursor === 0 ? true : false
        })
        isLoading = false
      })
      .catch(err => {
        isLoading = false
      })
  },
  onLoad: function () {
    this.loadNotifications()
  },
  onReachBottom: function () {
    this.loadNotifications({
      cursor: this.data.cursor
    })
  }
})
