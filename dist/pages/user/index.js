const Auth = require('../../utils/Auth')
const app = getApp()

Page({
    data: {
        user: null
    },
    onLoad: function() {
        Auth.checkOrLogin()
            .then(user => {
                this.setData({
                    user: user
                })
            })
    }
})
