<template>
  <div class="equips">
    <p v-if="noData">暂无数据</p>
    <Tabs
    v-else
    v-model="activeTab"
    type="card"
    class="tabs"
    >
      <TabPane
      label="值"
      name="valData"
      :disabled="valDisable"
      >
        <table class="gw-table">
          <thead>
            <tr>
              <th v-for="(th, index) of valTH" :key="index" v-text="th"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(line, lineIdx) of valData" :key="lineIdx">
              <td>
                <span :class="{warning : !line.m_YCValue}"></span>
              </td>
              <td v-text="line.m_iYCNo"></td>
              <td v-text="line.m_YCNm"></td>
              <td v-text="line.m_YCState"></td>
              <td v-text="line.m_AdviceMsg"></td>
            </tr>
          </tbody>
        </table>
      </TabPane>
      <TabPane
      label="状态"
      name="stateData"
      :disabled="statuDisable"
      >
        <table class="gw-table">
          <thead>
            <tr>
              <th v-for="(th, index) of statuTH" :key="index" v-text="th"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(line, lineIdx) of statuData" :key="lineIdx">
              <td>
                <span :class="{warning : !line.m_YXValue}"></span>
              </td>
              <td v-text="line.m_iYXNo"></td>
              <td v-text="line.m_YXNm"></td>
              <td v-text="line.m_YXState"></td>
              <td v-text="line.m_AdviceMsg"></td>
            </tr>
          </tbody>
        </table>
      </TabPane>
      <TabPane label="操作" name="opt">设置</TabPane>
    </Tabs>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'equips',
  data () {
    return {
      noData: true,
      activeTab: 'valData',
      valTH: ['报警状态', '值ID', '名称', '当前值', '图表数据', '备注'],
      statuTH: ['报警状态', '状态ID', '名称', '当前状态', '备注'],
      valData: [],
      statuData: []
    }
  },
  computed: mapState({
    valDisable () {
      return this.valData.length > 0 ? false : true
    },
    statuDisable () {
      return this.statuData.length > 0 ? false : true
    },
    equipNo: state => state.curEquip.equipNo
  }),
  methods: {
    getAllState () {
      this.Axios.post('/api/real/equip_item_state', {
        equip_no: this.equipNo
      }).then(res => {
        let data = res.data.HttpData
        if (data.code === 200) {
          this.noData = false
          let d = data.data
          this.valData.splice(0, this.valData.length)
          this.statuData.splice(0, this.statuData.length)
          for (let key in d.YCItemDict) {
            this.valData.push(d.YCItemDict[key])
          }
          if (this.valData.length < 1) {
            this.activeTab = 'statuData'
          }
          for (let key in d.YXItemDict) {
            this.statuData.push(d.YXItemDict[key])
          }
          if (this.statuData.length < 1) {
            this.activeTab = 'opt'
          }
          console.log(d)
        } else {
          this.noData = true
          console.log(data)
        }
      }).catch(err => {
        console.log(err)
        console.log('密钥验证失败，请检查登陆信息!')
      })
    },
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.$store.commit('setEquipNo', to.hash.substr(1))
      vm.getAllState()
    })
  },
  beforeRouteUpdate (to, from, next) {
    this.$store.commit('setEquipNo', to.hash.substr(1))
    this.getAllState()
    next()
  }
}
</script>

<style lang="scss" src="@assets/styles/sass/equips.scss"></style>
