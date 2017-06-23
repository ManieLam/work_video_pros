function getToken() {
    return wx.getStorageSync('token')
}

module.exports = {
    getToken: getToken
}
