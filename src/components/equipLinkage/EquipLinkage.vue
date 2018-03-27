<template>
  <div class="equip-linkage">
      <gw-tabs
      :navList="tabsData"
      @tabsNavClick="tabClick"
      >
        <div slot="linkage">
          <table>
            <thead>
              <tr>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div slot="edit">
          bbb
        </div>
      </gw-tabs>
  </div>
</template>

<script>
import gwTabs from '@page/public/GwTabs'
export default {
  data () {
    return {
      tabsData: [
        {
          name: 'linkage',
          title: '联动设置',
          isActive: true,
          tbTitle: ['全选', '触发设备', '触发类型', '触发点', '延时(ms)', '联动设备', '联动命令', '命令参数', '备注信息']
        },
        {
          name: 'edit',
          title: '场景编辑',
          isActive: false,
          tbTitle: ''
        }
      ]
    }
  },
  methods: {
    tabClick (navList, nv) {
      navList.map(nv => {
        nv.isActive = false
      })
      this.$set(nv, 'isActive', true)
      console.log(nv)
    }
  },
  components: {
    gwTabs
  },
  mounted () { }
}
</script>

<style lang="scss" src="@assets/styles/sass/equip-linkage.scss"></style>
