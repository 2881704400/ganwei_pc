<template>
  <div class="gw-index">
    <header class="header">
      <div class="header-logo">
        <img class="logo" src="../assets/img/logo.png" alt="logo">
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
export default {
  data () {
    return {
      navEquipsClickTime: 0,
      navList: [
        {
          title: '首页',
          href: 'home',
          iconClass: 'ios-home-outline',
          children: []
        },
        {
          title: '设备数据',
          href: 'equips',
          iconClass: 'ios-monitor-outline',
          loading: false,
          expand: false,
          hasChild: true,
          children: []
        },
        {
          title: '实时快照',
          href: 'snapshot',
          iconClass: 'ios-camera-outline',
          loading: false,
          children: []
        },
        {
          title: '系统配置',
          href: 'systemConf',
          iconClass: 'ios-gear-outline',
          loading: false,
          children: []
        },
        {
          title: '事件查询',
          href: 'eventQuery',
          iconClass: 'ios-search-strong',
          loading: false,
          children: []
        },
        {
          title: '报警排表',
          href: 'schedule',
          iconClass: 'ios-calendar-outline',
          loading: false,
          children: []
        },
        {
          title: '定时任务',
          href: 'timeTask',
          iconClass: 'ios-clock-outline',
          loading: false,
          children: []
        },
        {
          title: '设备联动',
          href: 'equipLinkage',
          iconClass: 'ios-toggle-outline',
          loading: false,
          children: []
        }
      ],
      isFold: false,
      foldBtnText: '收起'
    }
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
            console.log(data.data)
          }
        }).catch(err => {
          console.log(err)
        })
      } else {
        this.$router.push('/')
      }
    },
    logout () {
      window.localStorage.removeItem('gw_appkey')
      window.localStorage.removeItem('gw_infokey')
      this.$router.push('/')
    },
    loadNavList (navItem, callback) {
      if (navItem.hasChild) {
        navItem.loading = true
        // 异步获取列表节点
        this.Axios.post('/api/real/equip_tree', null, {
          headers: {
            Authorization: window.localStorage['gw_appkey'] + '-' + window.localStorage['gw_infokey']
          }
        }).then(res => {
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
      // 处理树状列表
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
    navItemExpand (item) {
      console.log(item)
    },
    navItemSelect (nodeArr) {
      console.log(nodeArr)
    },
    renderNavItem (h, {root, node, data}) {
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
