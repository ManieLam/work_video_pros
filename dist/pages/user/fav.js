const Api = require('../../utils/Api')
let isPull = false
let isLoading = false

Page({
  data: {
    favs: [],
    cursor: 0,
    isDone: false
  },
  loadFavs: function (args) {
    if (isLoading || this.data.isDone) return

    isLoading = true
    Api.queryFavList(args)
      .then(res => {
        this.setData({
          favs: this.data.favs.concat(res.topics),
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
    this.loadFavs()
  },
  onReachBottom: function () {
    this.loadFavs({
      cursor: this.data.cursor
    })
  }
})
