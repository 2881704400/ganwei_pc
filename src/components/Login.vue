<template>
  <Row class="login" >
     <Col span="12" class="loginLogo">
        <img src="../assets/img/logos.png" alt="">
     </Col>
     <Col span="12" class="loginForm">
        <Row>
          <Col span="4"><i class="ivu-icon ivu-icon-ios-personadd-outline"></i></Col>
          <Col span="20"> <input type="text" v-model="userName" placeholder="用户名"></Col>
        </Row>
        <Row>
          <Col span="4"><i class="ivu-icon ivu-icon-ios-locked-outline"></i></Col>
          <Col span="20"><input type="password" v-model="userPwd" @keyup.enter="login" placeholder="密码"></Col>
        </Row>
        <br>
        <button @click="login">登陆</button> 
     </Col>    
  </Row>
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
            let gwToken = key.appkey + '-' + key.infokey
            window.localStorage.setItem('gw_token', gwToken)
            window.localStorage.setItem('login_msg', data.message)
            this.$store.dispatch('reflashSet')
            // 设置登陆验证session密钥
            this.Axios.defaults.headers.common['Authorization'] = this.$store.state.gwToken
            this.$router.replace('/index')
            break
          case 1002:
            this.$Message.error(data.message)
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
  }
}
</script>


<style lang="scss" src="../assets/styles/sass/login.scss"></style>
