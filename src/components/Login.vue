<template>
  <Row class="login" v-cloak>
     <Col span="12" class="loginLogo">
        <img src="../assets/img/logos.png" alt="">
     </Col>
     <Col span="12" class="loginForm">
        <Row>
          <Col span="4"><i class="iconfont icon-scheduleUSER"></i></Col>
          <Col span="20"> <input type="text" v-model="userName" placeholder="用户名" autocomplete="off"></Col>
        </Row>
        <Row>
          <Col span="4"><i class="iconfont icon-schedulePASS"></i></Col>
          <Col span="20"><input type="password" v-model="userPwd" @keyup.enter="login" placeholder="密码" autocomplete="off"></Col>
        </Row>
        <Row>
          <Col span="14"><input type="text" v-model="verificationCode" placeholder="验证码" autocomplete="off"></Col>
          <Col span="10" style="height: 2rem;overflow: hidden;user-select: none;">
           <canvas width="100" height="40" id="verifyCanvas"></canvas>
           <img id="code_img" @click="refreshImg()">
          </Col>
        </Row>        
        <br>
        <button @click.stop="login" :class="{loading: loading}">
          登陆
          <Spin fix v-if="loading">
            loading...<Icon type="load-c" size=18 class="spin-icon-load"></Icon>
          </Spin>
        </button> 
     </Col>    
  </Row>
</template>

<script>
export default {
  data () {
    return {
      userName: '',
      userPwd: '',
      verificationCode:'',
      loading: false,
      nums : ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R',
        'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x',
        'y', 'z'],
    }
  },
  mounted () {
    this.userName = '';
    this.userPwd = '';
    this.verificationCode = '';
    this.drawCode();
  },
  methods: {
    login () {
      // 登录操作
      if (this.loading) return false
      this.loading = true
      if(!this.verificationCode){this.$Message.error("验证码不能为空");this.loading = false;return false;}
      let reqData = 'username=' + this.userName + '&userpwd=' + this.userPwd + '&verificationCode=' + this.verificationCode.toUpperCase();
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
            this.loading = false
            this.userName = ''
            this.userPwd = ''
            this.$router.replace('/index')
            
            break
          case 1002:
            this.$Message.error(data.message)
            this.loading = false
            console.log(data)
            break
          case 1003:
            this.$Message.error('用户名和密码不能为空！')
            this.loading = false
            console.log(data)
            break
          case 1007:
            this.$Message.error(data.message)
            this.loading = false
            console.log(data)
            break
          case 1014:
            this.$Message.error('服务器错误，请检查服务是否正常运行')
            this.loading = false
            console.log(data)
           break
          default:
            this.$Message.error('服务器错误，请重试！')
            this.loading = false
            console.log(data)
        }
      }).catch(err => {
        this.$Message.error('网络错误，请重试！')
        this.loading = false
        console.log(err)
      })
    },
    error (nodesc,msg) {
        this.$Notice.error({
            title: '登陆提示',
            desc: msg
        });
    },
    drawDot (canvas, context) {// 随机点(所谓画点其实就是画1px像素的线，方法不再赘述)
        var px = Math.floor(Math.random() * canvas.width);
        var py = Math.floor(Math.random() * canvas.height);
        context.moveTo(px, py);
        context.lineTo(px + 1, py + 1);
        context.lineWidth = 0.2;
        context.stroke();
    },
    convertCanvasToImage(canvas) { //绘制图片
        document.getElementById("verifyCanvas").style.display = "none";
        var image = document.getElementById("code_img");
        image.src = canvas.toDataURL("image/png");
        return image;
    },
    drawline(canvas, context) { //随机线
        context.moveTo(Math.floor(Math.random() * canvas.width), Math.floor(Math.random() * canvas.height));             //随机线的起点x坐标是画布x坐标0位置，y坐标是画布高度的随机数
        context.lineTo(Math.floor(Math.random() * canvas.width), Math.floor(Math.random() * canvas.height));  //随机线的终点x坐标是画布宽度，y坐标是画布高度的随机数
        context.lineWidth = 0.5;                                                  //随机线宽
        context.strokeStyle = 'rgba(50,50,50,0.3)';                               //随机线描边属性
        context.stroke();                                                         //描边，即起点描到终点
    },
    drawCode() { //绘制验证码
        var canvas = document.getElementById("verifyCanvas");  //获取HTML端画布
        var context = canvas.getContext("2d");                 //获取画布2D上下文
        context.fillStyle = "#05A2E5";                  //画布填充色
        context.fillRect(0, 0, canvas.width, canvas.height);   //清空画布
        context.fillStyle = "white";                           //设置字体颜色
        context.font = "25px Arial";                           //设置字体
        context.beginPath();
        context.stroke();
        context.closePath();
        var rand = new Array(),x = new Array(),y = new Array(),that = this.$options.methods;
       
      this.Axios.post('/api/GWgenerateCaptchaCode/GenerateCaptchaCode').then(rt => {
        let data = rt.data.HttpData
        if (data.code == 200) {
            for (var i = 0; i < 5; i++) {
                rand[i] = data.data["randomNumber"+(i+1)];//this.nums[Math.floor(Math.random() * this.nums.length)]
                x[i] = i * 16 + 10;
                y[i] = Math.random() * 20 + 20;
                context.fillText(rand[i], x[i], y[i]);
            }
              //载入图片
            //  var img=new Image(),image = document.getElementById("code_img");
            //  img.src="../Image/logos.png"; 
            //  image.onLoad=function(){
            //    context.drawImage(img,0,0,100,32); 
            //  };
            //   context.drawImage(img,0,0,100,32); 
              setTimeout(function(){
                //画3条随机线
                for (var i = 0; i < 2; i++) {
                    that.drawline(canvas, context);
                }
                // 画30个随机点
                for (var i = 0; i < 30; i++) {
                    that.drawDot(canvas, context);
                }
                that.convertCanvasToImage(canvas);
              },10);
        }
      }).catch(err => {
        console.log(err)
      })


    },
    refreshImg() { 
      let imgCanvas=document.getElementById("verifyCanvas"),cxt=imgCanvas.getContext("2d");  
      imgCanvas.style.display = "block";
      this.drawCode();
    }        
}

  
}

</script>


<style lang="scss" src="../assets/styles/sass/login.scss"></style>
