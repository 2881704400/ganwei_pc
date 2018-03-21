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
      this.Axios.post('/api/server/getkey', reqData, {
        headers: {
          'content-type': 'application/x-www-form-urlencoded'
        }
      }).then(rt => {
        let data = rt.data.HttpData
        switch (data.code) {
          case 200:
            // 成功
            window.localStorage.setItem('gw_appkey', data.data.appkey)
            window.localStorage.setItem('gw_infokey', data.data.infokey)
            this.$router.push('/index')
            break
          case 1003:
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
