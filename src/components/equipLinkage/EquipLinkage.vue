<template>
  <div class="equip-linkage">
      <gw-tabs
      :navList="tabs"
      @tabsNavClick="tabClick"
      >
        <div
        v-for="(tab, index) of tabs"
        :slot="tab.name"
        >
          <table>
            <thead>
              <tr>
                <th
                v-for="(head, cIndex) of tab.data.tbTitle"
                :key="cIndex"
                v-text="head"
                ></th>
              </tr>
            </thead>
            <tbody>
              <tr
              v-for="(item, cIndex) of tab.data.list"
              :key="cIndex + '-tr'"
              >
                <td
                v-text="item.title"
                ></td>
                <td
                v-text="item.title"
                ></td>
                <td
                v-text="item.title"
                ></td>
                <td
                v-text="item.title"
                ></td>
                <td
                v-text="item.title"
                ></td>
                <td
                v-text="item.title"
                ></td>
                <td
                v-text="item.title"
                ></td>
                <td
                v-text="item.title"
                ></td>
                <td
                v-text="item.title"
                ></td>
                <td
                v-text="item.title"
                ></td>
              </tr>
            </tbody>
          </table>
          <div class="btnbar">
            <a class="btn add" href="javascript:;"
            @click="showAdd = !showAdd"
            >添加</a>
            <a class="btn save" href="javascript:;"
            @click="save(tab)"
            >保存</a>
          </div>
        </div>
      </gw-tabs>
      <Modal
      v-model="showAdd"
      title="Common Modal dialog box title"
      >
          <div slot="header">新增联动设置</div>
          <Form :label-width="160">
            <FormItem label="选择联动设备和触发的类型">
              <Cascader
              :data="listAdd"
              :load-data="loadListAdd"
              v-model="selectedAdd"
              @on-visible-change="getEquips"
              ></Cascader>
            </FormItem>
          </Form>
          
      </Modal>
  </div>
</template>

<script>
import gwTabs from '@page/public/GwTabs'
export default {
  data () {
    return {
      showAdd: true,
      selectedAdd: [],
      listAdd: [],
      typeList: ["状态量报警", "状态量恢复", "模拟量越线", "模拟量恢复", "设备通讯故障", "设备通讯恢复", "设备状态故障", "设备状态恢复"],
      tabs: [
        {
          name: 'linkage',
          title: '联动设置',
          isActive: true,
          data: {
            tbTitle: ['全选', '触发设备', '触发类型', '触发点', '延时(ms)', '联动设备', '联动命令', '命令参数', '备注信息', '操作'],
            list: [
              {
                title: 'a'
              },
              {
                title: 'a'
              },
              {
                title: 'a'
              },
              {
                title: 'a'
              },
              {
                title: 'a'
              },
              {
                title: 'a'
              },
              {
                title: 'b'
              }
            ]
          }
        },
        {
          name: 'edit',
          title: '场景编辑',
          isActive: false,
          data: {
            tbTitle: ['全选', '触发设备', '触发类型', '触发点', '延时(ms)', '联动设备', '联动命令', '命令参数', '备注信息'],
            list: [
            ]
          }
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
    },
    addRow (tab) {
      tab.data.list.push({
        title: 'new title'
      })
    },
    save () {
    },
    loadListAdd (item, callback) {
      item.loading = true
      this.Axios.all([this.Axios.post('/api/real/get_ycp', {equip_nos: item.m_iEquipNo}), this.Axios.post('/api/real/get_yxp', {equip_nos: item.m_iEquipNo})], {
        equipNo: item.value
      })
      .then(this.Axios.spread((ycpRes, yxpRes) => {
        console.log(ycpRes)
        console.log(yxpRes)
        // let rt = res.data.HttpData
        // if (rt.code === 200) {
        //   let data = rt.data
        //   console.log(data)
        // } else {
        //   this.$Message.warning(rt.message)
        // }
        callback()
      }))
      .catch(err => {
        console.log(err)
      })
    },
    getData () {
      this.Axios.post('/api/real/equip_state')
      .then(res => {
        let data = res.data.HttpData
        console.log(data)
        if (data.code === 200) {
          this.listAdd = data.map(item => {
            return {
              value: item.equip_no,
              label: item.equip_nm,
              loading: false,
              children: []
            }
          })
          console.log(this.listAdd)
        }
      }).catch(err => {
        console.log(err)
      })
    },
    getEquips () {
      this.Axios.post('/api/real/equip_state')
      .then(res => {
        let rt = res.data.HttpData
        if (rt.code === 200) {
          let data = rt.data
          this.listAdd = data.map(item => {
            return {
              value: item.m_iEquipNo,
              label: item.m_EquipNm,
              loading: false,
              children: []
            }
          })
          console.log(this.listAdd)
        } else {
          this.$Message.warning(rt.message) 
        }
      })
      .catch(err => {
        console.log(err)
      })
    }
  },
  components: {
    gwTabs
  },
  mounted () {
    // this.getData()
  }
}
</script>

<style lang="scss" src="@assets/styles/sass/equip-linkage.scss"></style>