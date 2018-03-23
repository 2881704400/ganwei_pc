<template>
  <div class="login" style="color: #333;">
    <br><br><br>
    用户名：<input type="text" v-model="userName"><br><br><br>
    密码：<input type="password" v-model="userPwd" @keyup.enter="login"><br><br>
    <button @click="login">登陆</button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      userName: '',
      userPwd: ''
    }
  },
  methods: {
    login () {
      // 登录操作
      let reqData = 'username=' + this.userName + '&userpwd=' + this.userPwd
      this.Axios.post('/api/server/getkey', reqData).then(rt => {
        let data = rt.data.HttpData
        switch (data.code) {
          case 200:
            // 登陆成功操作
            let key = data.data
            window.localStorage.setItem('gw_appkey', key.appkey)
            window.localStorage.setItem('gw_infokey', key.infokey)
            let gwToken = key.appkey + '-' + key.infokey
            window.localStorage.setItem('gw_token', gwToken)
            window.localStorage.setItem('login_msg', data.message)
            this.$store.dispatch('setToken')
            this.$store.dispatch('setLoginMsg')
            // 设置登陆验证session密钥
            this.Axios.defaults.headers.common['Authorization'] = this.$store.state.gwToken
            this.$router.push('/index')
            break
          case 1003:
            console.log(data)
            break
          case 1007:
            console.log(data)
            break
          default:
            console.log(data)
        }
      }).catch(err => {
        console.log(err)
      })
    }
  },
  mounted () {}
}
</script>
