<template>
  <div class="equips">
      设备号:
      {{equipNo}}
    <Tabs :value="activeTab">
      <TabPane label="值" name="valData">
        <table>
          <thead>
            <tr>
              <th v-for="(th, index) of valTH" :key="index" v-text="th"></th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
      </TabPane>
      <TabPane label="状态" name="stateData">状态量</TabPane>
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
      active: 'valData',
      valTH: ['报警状态', '值ID', '名称', '当前值', '图表数据', '备注'],
      valData: []
    }
  },
  computed: mapState({
    equipNo: state => state.curEquip.equipNo
  }),
  methods: {
    getAllState () {
      this.Axios.post('/api/real/equip_item_state', {
        equip_no: this.equipNo
      }).then(res => {
        let data = res.data.HttpData
        if (data.code === 200) {
          let d = data.data
          console.log(d)
        } else {
          console.log(data)
        }
      }).catch(err => {
        console.log(err)
        console.log('密钥验证失败，请检查登陆信息!')
      })
    }
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
