<template>
  <div class="gw-index">
    <header class="header">
      <div class="header-logo">logo</div>
      <div class="header-opt">
        <span class="user" title="当前登陆用户"><span class="iconfont">&#xe62d;</span> admin</span>
        <span class="iconfont" title="换肤">&#xe91e;</span>
        <router-link
        class="iconfont"
        title="注销登陆"
        tag="span"
        to="/login"
        >&#xe641;</router-link>
      </div>
    </header>
    <div class="main">
      <aside class="nav-left" :class="[isFold ? 'close' : 'open']">
        <!-- <ul v-if="navList && navList.length">
          <template
          v-for="(item, index) in navList"
          >
            <ul v-if="item.childrens && item.childrens.length" :key="index + 'nv'">
              <li>abc</li>
            </ul>
            <router-link
            v-else
            tag="li"
            :key="index"
            :to="item.url"
            v-text="item.title"
            ></router-link>
          </template>
        </ul> -->
        <Tree :data="navList"></Tree>
        <div class="fold" @click="foldAside">
          {{foldBtnText}}
        </div>
      </aside>
      <router-view class="main-body"></router-view>
    </div>
  </div>
</template>

<script>
import NavLi from './index/NavLi'
export default {
  data () {
    return {
      navList: [
        {
          title: '首页',
          url: 'home'
        },
        {
          title: '设备数据',
          url: 'equips',
          children: [
            {
              title: 'asdf',
              children: [
                {
                  title: '3jicaidan'
                }
              ]
            }
          ]
        },
        {
          title: '实时快照',
          url: 'b'
        },
        {
          title: '系统配置',
          url: 'c'
        },
        {
          title: '事件查询',
          url: 'd'
        },
        {
          title: '报警排表',
          url: 'e'
        },
        {
          title: '定时任务',
          url: 'f'
        },
        {
          title: '设备联动',
          url: 'g'
        }
      ],
      isFold: false,
      foldBtnText: '收起'
    }
  },
  components: {
    NavLi
  },
  methods: {
    foldAside () {
      // 侧边栏折叠
      this.isFold = !this.isFold
      setTimeout(() => {
        this.foldBtnText = this.isFold ? '打开' : '收起'
      }, 600)
    },
    hasRightKey () {
      // 判断appkey和infokey是否存在正确
      if (window.localStorage['gw_appkey'] && window.localStorage['gw_infokey']) {
        this.Axios.get('/api/server/auth_name', {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': window.localStorage.getItem('gw_appkey') + '-' + window.localStorage.getItem('gw_infokey')
          }
        }).then(rt => {
          let data = rt.data.HttpData
          if (data.code !== 200) {
            console.log(data)
            this.$router.push('/')
          } else {
            console.log(data)
          }
        }).catch(err => {
          console.log(err)
        })
      } else {
        this.$router.push('/')
      }
    }
  },
  created () {
    this.hasRightKey()
  }
}
</script>

<style lang="scss" src="../assets/styles/sass/index.scss"></style>
