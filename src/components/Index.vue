<template>
  <div class="gw-index">
    <header class="header">
      <div class="header-logo">
        <img class="logo" src="@assets/img/logos0.png" alt="logo">
      </div>
      <div class="header-opt">
        <span class="user" title="当前登陆用户">
          <span class="iconfont">&#xe62e;</span>{{$store.state.loginMsg}}</span>
        <span class="iconfont icon-Menu" :title="isFold ?'展开面板':'收缩面板'" :class="[isFold ? 'close' : 'open']" @click="foldAside"></span>
        <span class="iconfont icon-set" title="设置"></span>
        <span class="iconfont" title="退出登陆" @click="logout">&#xe641;</span>
      </div>
    </header>
    <div class="main">
      <aside class="nav-left" :class="[isFold ? 'close' : 'open']">
        <nav class="nav-list">
          <Tree v-if="navList.length" :data="navList" :render="renderNavItem"></Tree>
        </nav>
        <!-- <div class="fold" :class="[isFold ? 'close' : 'open']" @click="foldAside">
          <span class="ivu-icon" :class="[isFold ? 'ivu-icon-arrow-left-b' : 'ivu-icon-arrow-right-b']"></span>
            <span class="iconfont icon-Menu"></span>
        </div> -->
      </aside>
      <section class="main-body">
        <!-- <div class="title">
          <span>home</span>>><span>{{curPath}}</span>
        </div> -->
        <router-view class="router-page"></router-view>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      navList: [
        {
            "title": "首页",
            "href": "home",
            "iconClass": " iconfont icon-MenuHome",
            "loading": false,
            "hasChild": false,
            "children": [],
            "selected": true
        },
        {
            "title": "设备数据",
            "href": "equips",
            "iconClass": " iconfont icon-MenuEquips",
            "loading": false,
            "expand": false,
            "hasChild": true,
            "children": [],
            "selected": false
        },
        {
            "title": "实时快照",
            "href": "snapshot",
            "iconClass": " iconfont icon-MenuSnapshot",
            "loading": false,
            "hasChild": false,
            "children": [],
            "selected": false
        },
        {
            "title": "系统配置",
            "href": "systemConf",
            "iconClass": " iconfont icon-MenuSystemConf",
            "loading": false,
            "hasChild": false,
            "children": [],
            "selected": false
        },
        {
            "title": "事件查询",
            "href": "eventQuery",
            "iconClass": " iconfont icon-MenuEventQuery",
            "loading": false,
            "hasChild": false,
            "children": [],
            "selected": false
        },
        {
            "title": "报警排表",
            "href": "schedule",
            "iconClass": " iconfont icon-MenuSchedule",
            "loading": false,
            "hasChild": false,
            "children": [],
            "selected": false
        },
        {
            "title": "定时任务",
            "href": "timeTask",
            "iconClass": " iconfont icon-MenuTimeTask",
            "loading": false,
            "hasChild": false,
            "children": [],
            "selected": false
        },
        {
            "title": "设备联动",
            "href": "equipLinkage",
            "iconClass": " iconfont icon-MenuEquipLinkage",
            "loading": false,
            "hasChild": false,
            "children": [],
            "selected": false
        }
    ],
      isFold: false,
      curPath: ""
    };
  },
  methods: {
    foldAside() {
      // 侧边栏收起展开
      this.isFold = !this.isFold;
    },
    getAuth() {
      // 判断appkey和infokey是否存在正确
      if (window.localStorage["gw_token"]) {
        this.$store.dispatch("reflashSet");
        this.Axios.defaults.headers.common[
          "Authorization"
        ] = this.$store.state.gwToken;
        this.Axios.get("/api/server/auth_name")
          .then(rt => {
            let data = rt.data.HttpData;
            if (data.code !== 200) {
              console.log(data);
              this.$router.push("/login");
            } else {
              console.log("密钥验证成功,当前连接的服务:[", data.data, "]");
            }
          })
          .catch(err => {
            console.log(err);
            console.log("密钥验证失败，请检查登陆设置!");
          });
      } else {
        this.$router.push("/");
      }
    },
    logout() {
      // 退出登陆
      this.$Modal.confirm({
        title: '操作提示',
        content: '是否注销当前登陆？',
        onOk: () => {
          window.localStorage.removeItem("gw_token")
          window.localStorage.removeItem("login_msg")
          // this.navList.splice(0, this.navList.length)
          this.$store.commit('clickEquips', 0)
          this.$router.replace("/login")
        }
      })
    },
    loadNavList(navItem, callback) {
      if (navItem.hasChild) {
        navItem.loading = true;
        // 异步获取列表节点
        this.Axios.all([this.Axios.post("/api/real/equip_tree"), this.Axios.post('/api/datas/getEquipList')])
          .then(this.Axios.spread((treeRes, equipRes) => {
            let treeRt = treeRes.data.HttpData,
              equipRt = equipRes.data.HttpData
            if (treeRt.code === 200 && equipRt.code === 200) {
              let treeData = []
              let equipData = equipRt.data
              treeData = treeRt.data.GWEquipTreeItems
              let resultData = []
              this.dealNavList(treeData, equipData, resultData)
              callback(resultData)
              console.log("获取设备列表成功!")
            } else {
              this.$Message.warning('获取设备列表失败，请重试！')
              console.log(treeRes)
            }
          }))
          .catch(err => {
            console.log(err)
          })
      } else {
        return false;
      }
    },
    dealNavList(arrData, equipList, result) {
      // 处理设备数据子列表
      arrData = arrData.filter(item => {
        if (equipList.some(equip => {
          return equip.equip_no === parseInt(item.EquipNo) || item.EquipNo === ''
        })) {
          return item
        }
      })
      arrData.forEach((dt, index) => {
        if (dt.GWEquipTreeItems && dt.GWEquipTreeItems.length) {
          result.push({
            title: dt.Name,
            children: [],
            selected: false,
            render: (h, { root, node, data }) => {
              return h(
                "div",
                {
                  style: {
                    fontSize: "14px",
                    cursor: "pointer",
                    position: "relative",
                    paddingLeft: "20px"
                  },
                  class: ["nav-item", data.selected ? "selected" : ""],
                  on: {
                    click: () => {
                      this.$set(data, "expand", !data.expand);
                    }
                  }
                },
                [
                  h("Icon", {
                    style: {
                      width: "20px",
                      height: "20px",
                      lineHeight: "20px",
                      textAlign: "center"
                    },
                    class: [
                      "ivu-icon",
                      data.expand
                        ? "ivu-icon-arrow-down-b"
                        : "ivu-icon-arrow-right-b"
                    ]
                  }),
                  h(
                    "span",
                    {
                      style: {
                        lineHeight: "50px"
                      }
                    },
                    data.title
                  )
                ]
              );
            }
          });
          this.dealNavList(dt.GWEquipTreeItems, equipList, result[index].children);
        } else {
          let equipNo = parseInt(dt.EquipNo)
          if (equipNo === 300) {
            dt.Name = '场景控制'
          } else if (equipNo === 1005) {
            dt.Name = '虚拟设备'
          }
          result.push({
            title: dt.Name,
            equipNo: dt.EquipNo,
            href: "equips",
            children: [],
            selected: false,
            render: (h, { root, node, data }) => {
              return h(
                "div",
                {
                  style: {
                    fontSize: "14px",
                    cursor: "pointer",
                    position: "relative",
                    paddingLeft: "12px"
                  },
                  class: ["nav-item", data.selected ? "selected" : ""],
                  on: {
                    click: () => {
                      if (data.selected) return false;
                      root.forEach(ele => {
                        ele.node.selected = false;
                      });
                      data.selected = true;
                      this.$router.push({
                        path: "equips#" + data.equipNo
                      });
                    }
                  }
                },
                [
                  h(
                    "span",
                    {
                      style: {
                        lineHeight: "50px",
                        marginLeft: "30px"
                      }
                    },
                    data.title
                  )
                ]
              );
            }
          });
        }
      });
    },
    renderNavItem(h, { root, node, data }) {
      
      // leftNav节点渲染
      if (data.hasChild) {
        return h(
          "div",
          {
            style: {
              fontSize: "16px",
              paddingLeft: "34px",
              position: "relative",
              cursor: "pointer"
            },
            class: ["nav-item", data.selected ? "selected" : ""],
            on: {
              click: ev => {
                if (this.$store.state.navEquipsClickTime < 1) {
                  this.$store.commit("clickEquips", 1);
                  this.loadNavList(data, rt => {
                    rt.forEach(item => {
                      data.children.push(item);
                    });
                    data.loading = false;
                    this.$set(data, "expand", !data.expand);
                  });
                } else {
                  this.$set(data, "expand", !data.expand);
                }
                if (data.selected) return false;
                root.forEach(ele => {
                  ele.node.selected = false;
                });
                data.selected = true;
              }
            }
          },
          [
            h("Icon", {
              style: {
                width: "20px",
                height: "20px",
                lineHeight: "20px",
                position: "absolute",
                top: "50%",
                left: "10px",
                marginTop: "-10px",
                textAlign: "center"
              },
              class: [
                "ivu-icon",
                data.expand ? "ivu-icon-arrow-down-b" : "ivu-icon-arrow-right-b"
              ]
            }),
            h("Icon", {
              props: {
                type: data.iconClass,
                size: 28
              },
              style: {
                verticalAlign: "middle",
                width: "22px"
              }
            }),
            h(
              "span",
              {
                style: {
                  verticalAlign: "middle",
                  lineHeight: "60px",
                  marginLeft: "20px"
                }
              },
              data.title
            ),
            h("Spin", {
              props: {
                fix: true
              },
              style: [data.loading ? { "z-index": "71" } : { "z-index": "-1" }]
            })
          ]
        );
      } else {
        return h(
          "div",
          {
            style: {
              fontSize: "16px",
              paddingLeft: "34px",
              position: "relative",
              cursor: "pointer",
              transition: "all 400ms"
            },
            class: ["nav-item", data.selected ? "selected" : ""],
            on: {
              click: () => {
                if (data.selected) return false;
                root.forEach(ele => {
                  ele.node.selected = false;
                });
                data.selected = true;
                this.$router.push(data.href);
              }
            }
          },
          [
            h("Icon", {
              props: {
                type: data.iconClass,
                size: 28
              },
              style: {
                verticalAlign: "middle",
                width: "22px"
              }
            }),
            h(
              "span",
              {
                style: {
                  verticalAlign: "middle",
                  lineHeight: "60px",
                  marginLeft: "20px"
                }
              },
              data.title
            )
          ]
        );
      }
    }
  },
  created() {
    this.getAuth()
  }
};
</script>

<style lang="scss" src="../assets/styles/sass/index.scss"></style>
