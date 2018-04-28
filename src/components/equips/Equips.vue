<template>
  <div class="equips">
    <gw-tabs :navList="tabData"
    @tabsNavClick="tabClick"
    >
      <div :slot="tabData[0].name" class="visual">
        <table class="gw-table yc">
          <thead>
            <tr>
              <th v-for="(th, index) of tabData[0].tbHead" :key="index" v-text="th"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(line, lineIdx) of tabData[0].tbList" :key="lineIdx">
              <td class="status">
                <span :class="{warning : line.m_IsAlarm}"></span>
              </td>
              <td v-text="line.m_iYCNo"></td>
              <td v-text="line.m_YCNm"></td>
              <td v-text="line.m_YCValue + line.m_Unit"></td>
              <td class="chart">
                <Button type="primary"
                icon="stats-bars" @click="toggleModal"></Button>
              </td>
              <td v-text="line.m_AdviceMsg"></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div :slot="tabData[1].name" class="stat">
        <table class="gw-table yx">
          <thead>
            <tr>
              <th v-for="(th, index) of tabData[1].tbHead" :key="index" v-text="th"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(line, lineIdx) of tabData[1].tbList" :key="lineIdx">
              <td class="status">
                <span :class="{warning : line.m_IsAlarm}"></span>
              </td>
              <td v-text="line.m_iYXNo"></td>
              <td v-text="line.m_YXNm"></td>
              <td v-text="line.m_YXState"></td>
              <td v-text="line.m_AdviceMsg"></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div :slot="tabData[2].name" class="tab-set">
        <Card title="操作命令" :dis-hover="true">
          <Button icon="ios-search"
          v-for="(btn, btnIndex) of tabData[2].setList"
          :key="btnIndex"
          v-text="btn.set_nm"
          @click="setEquip(btn)"
          ></Button>
        </Card>
      </div>
    </gw-tabs>
    <Modal
    v-model="showChart"
    title='实时曲线'
    >
      暂无数据
      <!-- <div slot="footer"></div> -->
    </Modal>
    <gw-loading v-if="isLoading"></gw-loading>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import gwTabs from "@page/public/GwTabs"
import gwLoading from "@page/public/GwLoading"
// import signalR from '@assets/js/signalr.js'
export default {
  name: 'equips',
  data () {
    return {
      isLoading: true,
      tabData: [
        {
          name: 'ycData',
          title: '模拟量',
          isActive: false,
          isShow: false,
          tbHead: ['报警状态', '模拟量ID', '名称', '当前值', '实时数据', '备注'],
          tbList: []
        },
        {
          name: 'yxData',
          title: '状态量',
          isActive: false,
          isShow: false,
          tbHead: ['报警状态', '状态量ID', '名称', '当前状态', '备注'],
          tbList: []
        },
        {
          name: 'setData',
          title: '设置',
          isShow: false,
          isActive: false,
          hasSet: false,
          setList: []
        }
      ],
      showChart: false
    }
  },
  components: {
    gwTabs,
    gwLoading
  },
  computed: mapState({
    equipNo: state => state.curEquip.equipNo
  }),
  methods: {
    tabClick(navList, nv) {
      navList.forEach(nv => {
        nv.isActive = false
      })
      this.$set(nv, "isActive", true)
      // console.log(nv)
    },
    getAllState () {
      this.isLoading = true
      this.Axios.post('/api/real/equip_item_state', {
        equip_no: this.equipNo
      }).then(res => {
        let rt = res.data.HttpData
        if (rt.code === 200) {
          let data = rt.data
          // console.log(data)
          this.tabData[0].tbList.splice(0, this.tabData[0].tbList.length)
          this.tabData[1].tbList.splice(0, this.tabData[1].tbList.length)
          for (let key in data.YCItemDict) {
            this.tabData[0].tbList.push(data.YCItemDict[key])
          }
          if (this.tabData[0].tbList.length > 0) {
            this.tabClick(this.tabData, this.tabData[0])
            this.tabData[0].isShow = true
          }
          else {
            this.tabData[0].isActive = false
            this.tabData[0].isShow = false
          }
          for (let key in data.YXItemDict) {
            this.tabData[1].tbList.push(data.YXItemDict[key])
          }
          if (this.tabData[1].tbList.length > 0) {
            this.tabData[1].isShow = true
            if (!this.tabData[0].isActive) {
              this.tabClick(this.tabData, this.tabData[1])
            }
          }
          else {
            this.tabData[1].isActive = false
            this.tabData[1].isShow = false
          }
          this.tabData[2].equipInfo = data.EquipItem
          this.getSetopt(this.tabData[2].equipInfo.m_iEquipNo)
          // console.log(this.tabData)
        } else {
          this.$Message.warning('数据获取失败，请重试！')
          this.isLoading = false
          console.log(rt)
        }
      }).catch(err => {
        this.$Message.warning('token验证失败，请检查登陆信息!')
        console.log(err)
      })
    },
    getSetopt (equipNo) {
      const reqData = {
        findEquip: true,
        equipNo: equipNo
      }
      this.Axios.post('/api/GWServiceWebAPI/getSetparmList', reqData)
        .then(res => {
          let rt = res.data.HttpData
          if (rt.code === 200) {
            let data = rt.data
            if (data.length > 0) {
              this.tabData[2].hasSet = true
              this.tabData[2].isShow = true
              this.tabData[2].setList = data
              if (!this.tabData[0].isShow && !this.tabData[1].isShow) {
                this.tabClick(this.tabData, this.tabData[2])
              }
            }
            else {
              this.tabData[2].hasSet = false
              this.tabData[2].isShow = false
            }
            // console.log(this.tabData[2].setList)
          }
          else {
            this.$Message.warning('获取设置操作列表失败，请重试！')
            console.log(rt)
          }
        })
        .catch(err => {
          console.log(err)
        })
        .then(() => {
          this.$nextTick(() => {
            this.isLoading = false
          })
        })
    },
    setEquip (equip) {
      // console.log(equip)
      this.$Modal.confirm({
        title: '执行操作',
        content: '<p>确定执行操作：<span style="color:#f90">' + equip.set_nm + '</span></p>',
        onOk: () => {
          const reqData = {
            equip_no: '' + equip.equip_no,
            main_instr: equip.main_instruction,
            mino_instr: equip.minor_instruction,
            value: equip.value
          }
          this.Axios.post('/api/real/setup', reqData)
            .then(res => {
              const rt = res.data.HttpData
              if (rt.code === 201) {
                this.$Message.success(rt.message)
                this.getAllState()
              } else {
                console.log(rt)
                this.$Message.warning('操作失败，请重试')
              }
            })
            .catch(err => {
              console.log(err)
            })
        }
      })
    },
    connectServer() {
      let url = 'http://localhost:7001'
      let conn = $.hubConnection('http://192.168.0.247:7001/signalr')
      let proxy = conn.createHubProxy('serverHub')
      // console.log(proxy)
      proxy.on('sendConnect', data => {
        console.log(data)
      });
      proxy.on('sendAll', function (a, b) {
          console.log(a, b)
      });
      proxy.on('sendYcpSingle', data => {
          console.log(data)
      });
      proxy.on('sendYxpSingle', data => {
          console.log(data)
      });
      
      conn.start()
        .done(() => {
            console.log('start!')
            proxy.invoke('Connect')
            //proxy.invoke('ListenEquipAll', window.localStorage.ac_appkey, window.localStorage.ac_infokey)
            proxy.invoke('StartListen', 1, window.localStorage.ac_appkey, window.localStorage.ac_infokey)
        })
        .fail(err => {
            console.log('错误-------:', err)
        })
    },
    toggleModal () {
      this.showChart = !this.showChart
    }
  },
  beforeRouteUpdate (to, from, next) {
    this.$store.commit('setEquipNo', to.hash.substr(1))
    this.getAllState()
    // this.connectServer()
    next()
  },
  mounted () {
    this.$store.commit('setEquipNo', this.$route.hash.substr(1))
    this.getAllState()
    // this.connectServer()
  }
}
</script>

<style lang="scss" src="@assets/styles/sass/equips.scss"></style>
