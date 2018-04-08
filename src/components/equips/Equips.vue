<template>
  <div class="equips">
    <gw-tabs :navList="tabData"
    @tabsNavClick="tabClick"
    >
      <div :slot="tabData[0].name">
        <table class="gw-table">
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
              <td v-text="line.m_YCState"></td>
              <td v-text="line.m_AdviceMsg"></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div :slot="tabData[1].name">
        <table class="gw-table">
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
      <div :slot="tabData[2].name">
        设置tab页
      </div>
    </gw-tabs>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import gwTabs from "@page/public/GwTabs"
export default {
  name: 'equips',
  data () {
    return {
      tabData: [
        {
          name: 'ycData',
          title: '模拟量',
          isActive: false,
          isShow: true,
          tbHead: ['报警状态', '值ID', '名称', '当前值', '图表数据', '备注'],
          tbList: []
        },
        {
          name: 'yxData',
          title: '状态量',
          isActive: false,
          isShow: true,
          tbHead: ['报警状态', '状态ID', '名称', '当前状态', '备注'],
          tbList: []
        },
        {
          name: 'setData',
          title: '设置',
          isShow: true,
          isActive: false
        }
      ]
    }
  },
  components: {
    gwTabs
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
      this.Axios.post('/api/real/equip_item_state', {
        equip_no: this.equipNo
      }).then(res => {
        let rt = res.data.HttpData
        if (rt.code === 200) {
          let data = rt.data
          console.log(data)
          for (let key in data.YCItemDict) {
            this.tabData[0].tbList.push(data.YCItemDict[key])
          }
          for (let key in data.YXItemDict) {
            this.tabData[1].tbList.push(data.YXItemDict[key])
          }
          // this.tabData.forEach(item => {
          //   if (!this.tabData.some(tb => {
          //     return tb.isActive === true
          //   })) {
          //     item.isActive = item.tbList.length > 0 ? true : false
          //   }
          //   item.isShow = item.tbList.length > 0 ? true : false
          // })
          // console.log(this.tabData)
        } else {
          this.$Message.warning('数据获取失败，请重试！')
          console.log(rt)
        }
      }).catch(err => {
        this.$Message.warning('token验证失败，请检查登陆信息!')
        console.log(err)
      })
    }
  },
  // beforeRouteEnter (to, from, next) {
  //   next(vm => {
  //     vm.$store.commit('setEquipNo', to.hash.substr(1))
  //     vm.getAllState()
  //   })
  // },
  beforeRouteUpdate (to, from, next) {
    this.$store.commit('setEquipNo', to.hash.substr(1))
    this.getAllState()
    next()
  },
  mounted () {
    this.$store.commit('setEquipNo', this.$route.hash.substr(1))
    this.getAllState()
  }
}
</script>

<style lang="scss" src="@assets/styles/sass/equips.scss"></style>
