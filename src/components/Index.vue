<template>
  <div class="gw-index">
    <header class="header">
      <div class="header-logo">
        <img class="logo" src="@assets/img/logo.png" alt="logo">
        <div class="txt">
          <h1>敢为软件</h1>
          <p>ganwei software</p>
        </div>
      </div>
      <div class="header-opt">
        <span class="user" title="当前登陆用户"><span class="iconfont">&#xe62d;</span>admin</span>
        <span class="iconfont" title="设置">&#xe653;</span>
        <span
        class="iconfont"
        title="退出登陆"
        @click="logout"
        >&#xe641;</span>
      </div>
    </header>
    <div class="main">
      <aside class="nav-left" :class="[isFold ? 'close' : 'open']">
        <nav class="nav-list">
          <Tree
          :data="navList"
          :render="renderNavItem"
          ></Tree>
        </nav>
        <div class="fold" :class="[isFold ? 'close' : 'open']" @click="foldAside">
          <span class="ivu-icon" :class="[isFold ? 'ivu-icon-arrow-left-b' : 'ivu-icon-arrow-right-b']"></span>
        </div>
      </aside>
      <section class="main-body">
        <router-view class="router-page"></router-view>
      </section>
    </div>
  </div>
</template>

<script>
import leftNavData from '@assets/data/leftNav.json'
export default {
  data () {
    return {
      navEquipsClickTime: 0,
      navList: leftNavData,
      isFold: false
    }
  },
  methods: {
    foldAside () {
      // 侧边栏收起展开
      this.isFold = !this.isFold
    },
    hasRightKey () {
      // 判断appkey和infokey是否存在正确
      if (window.localStorage['gw_token']) {
        this.$store.dispatch('setToken')
        this.Axios.defaults.headers.common['Authorization'] = this.$store.state.gwToken
        this.Axios.get('/api/server/auth_name').then(rt => {
          let data = rt.data.HttpData
          if (data.code !== 200) {
            console.log(data)
            this.$router.push('/login')
          } else {
            console.log('密钥验证成功,当前连接的服务:[', data.data, ']')
          }
        }).catch(err => {
          console.log(err)
          console.log('密钥验证失败，请检查登陆设置!')
        })
      } else {
        this.$router.push('/')
      }
    },
    logout () {
      // 退出登陆
      window.localStorage.removeItem('gw_appkey')
      window.localStorage.removeItem('gw_infokey')
      window.localStorage.removeItem('gw_token')
      window.localStorage.removeItem('login_msg')
      this.Axios.defaults.headers.common['Authorization'] = ''
      this.$router.push('/login')
    },
    loadNavList (navItem, callback) {
      if (navItem.hasChild) {
        navItem.loading = true
        // 异步获取列表节点
        this.Axios.post('/api/real/equip_tree').then(res => {
          let data = res.data.HttpData
          if (data.code === 200) {
            let d = []
            d.push(data.data)
            // console.log(d)
            let resultData = []
            this.dealNavList(d, resultData)
            callback(resultData)
          } else {
            console.log(res)
          }
        }).catch(err => {
          console.log(err)
        })
      } else {
        return false
      }
    },
    dealNavList (arrData, result) {
      // 处理设备数据子列表
      arrData.forEach((dt, index) => {
        if (dt.GWEquipTreeItems && dt.GWEquipTreeItems.length) {
          result.push({
            title: dt.Name,
            children: [],
            render: (h, {root, node, data}) => {
              return h('div', {
                style: {
                  fontSize: '14px',
                  cursor: 'pointer',
                  position: 'relative'
                },
                class: 'nav-item',
                on: {
                  click: () => {
                    this.$set(data, 'expand', !data.expand)
                  }
                }
              }, [
                h('Icon', {
                  style: {
                    width: '20px',
                    height: '20px',
                    lineHeight: '20px',
                    textAlign: 'center'
                  },
                  class: ['ivu-icon', data.expand ? 'ivu-icon-arrow-down-b' : 'ivu-icon-arrow-right-b']
                }),
                h('span', {
                  style: {
                    lineHeight: '50px'
                  }
                }, data.title)
              ])
            }
          })
          this.dealNavList(dt.GWEquipTreeItems, result[index].children)
        } else {
          result.push({
            title: dt.Name,
            href: 'equips',
            children: [],
            render: (h, {root, node, data}) => {
              return h('div', {
                style: {
                  fontSize: '14px',
                  cursor: 'pointer',
                  position: 'relative'
                },
                class: 'nav-item',
                on: {
                  click: () => {
                    this.$router.push(data.href)
                  }
                }
              }, [
                h('span', {
                  style: {
                    lineHeight: '50px'
                  }
                }, data.title)
              ])
            }
          })
        }
      })
    },
    renderNavItem (h, {root, node, data}) {
      // leftNav节点渲染
      if (data.hasChild) {
        return h('div', {
          style: {
            fontSize: '16px',
            paddingLeft: '34px',
            position: 'relative',
            cursor: 'pointer'
          },
          class: 'nav-item',
          on: {
            click: (ev) => {
              if (this.navEquipsClickTime < 1) {
                this.navEquipsClickTime = 1
                this.loadNavList(data, (rt) => {
                  rt.forEach(item => {
                    data.children.push(item)
                  })
                  data.loading = false
                  this.$set(data, 'expand', !data.expand)
                })
              } else {
                this.$set(data, 'expand', !data.expand)
              }
            }
          }
        }, [
          h('Icon', {
            style: {
              width: '20px',
              height: '20px',
              lineHeight: '20px',
              position: 'absolute',
              top: '50%',
              left: '10px',
              marginTop: '-10px',
              textAlign: 'center'
            },
            class: ['ivu-icon', data.expand ? 'ivu-icon-arrow-down-b' : 'ivu-icon-arrow-right-b']
          }),
          h('Icon', {
            props: {
              type: data.iconClass,
              size: 22
            },
            style: {
              verticalAlign: 'middle',
              width: '22px'
            }
          }),
          h('span', {
            style: {
              verticalAlign: 'middle',
              lineHeight: '60px',
              marginLeft: '16px'
            }
          }, data.title),
          h('Spin', {
            props: {
              fix: true
            },
            style: [data.loading ? {'z-index': '71'} : {'z-index': '-1'}]
          })
        ])
      } else {
        return h('div', {
          style: {
            fontSize: '16px',
            paddingLeft: '34px',
            position: 'relative',
            cursor: 'pointer'
          },
          class: 'nav-item',
          on: {
            click: () => {
              this.$router.push(data.href)
            }
          }
        }, [
          h('Icon', {
            props: {
              type: data.iconClass,
              size: 22
            },
            style: {
              verticalAlign: 'middle',
              width: '22px'
            }
          }),
          h('span', {
            style: {
              verticalAlign: 'middle',
              lineHeight: '60px',
              marginLeft: '16px'
            }
          }, data.title)
        ])
      }
    }
  },
  created () {
    this.hasRightKey()
  }
}
</script>

<style lang="scss" src="../assets/styles/sass/index.scss"></style>
