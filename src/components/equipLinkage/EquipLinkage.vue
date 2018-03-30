<template>
  <div class="equip-linkage">
    <gw-tabs :navList="tabs" @tabsNavClick="tabClick">
      <div v-for="(tab, index) of tabs" :slot="tab.name" :key="index">
        <table>
          <thead>
            <tr>
              <th v-for="(head, cIndex) of tab.data.tbTitle" :key="cIndex" v-text="head"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, cIndex) of tab.data.list" :key="cIndex + '-tr'">
              <td v-text="item.equipName"></td>
              <td v-text="item.cType"></td>
              <td v-text="item.cCurren"></td>
              <td v-text="item.title"></td>
              <td v-text="item.title"></td>
              <td v-text="item.title"></td>
              <td v-text="item.title"></td>
              <td v-text="item.title"></td>
              <td v-text="item.title"></td>
            </tr>
          </tbody>
        </table>
        <div class="btnbar">
          <a class="btn add" href="javascript:;" @click="showAdd = !showAdd">添加</a>
          <a class="btn save" href="javascript:;" @click="save(tab)">保存</a>
        </div>
      </div>
    </gw-tabs>
    <Modal v-model="showAdd" title="Common Modal dialog box title">
      <div slot="header">新增联动设置</div>
      <Form :label-width="180"
      :model="formData"
      >
        <FormItem label="选择联动触发设备和触发点：">
          <Cascader
          :data="listAdd"
          :load-data="loadListAdd" v-model="selectedAdd"
          ></Cascader>
        </FormItem>
        <FormItem label="设置延时时间(毫秒)：">
          <Input
          v-model="formData.layout"
          placeholder="延时时间"
          ></Input>
        </FormItem>
        <FormItem label="选择联动关联设备和操作"
        >
        <Cascader
        :data="formData.linkageEquips"
        :load-data="loadLinkageEquips"
        >
        </Cascader>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>

<script>
import gwTabs from "@page/public/GwTabs";
export default {
  data() {
    return {
      showAdd: false,
      selectedAdd: [],
      listAdd: [],
      typeList: [
        {
          value: "X",
          label: "状态量报警",
          children: []
        },
        {
          value: "x",
          label: "状态量恢复",
          children: []
        },
        {
          value: "C",
          label: "模拟量越线",
          children: []
        },
        {
          value: "c",
          label: "模拟量恢复",
          loading: false,
          children: []
        },
        {
          value: "E",
          label: "设备通讯故障",
          children: []
        },
        {
          value: "e",
          label: "设备通讯恢复",
          children: []
        },
        {
          value: "S",
          label: "设备状态故障",
          children: []
        },
        {
          value: "s",
          label: "设备状态恢复",
          children: []
        }
      ],
      tabs: [
        {
          name: "linkage",
          title: "联动设置",
          isActive: true,
          data: {
            tbTitle: [
              "触发设备",
              "触发类型",
              "触发点",
              "延时(ms)",
              "联动设备",
              "联动命令",
              "命令参数",
              "备注信息",
              "操作"
            ],
            list: [
              {
                title: "a"
              },
              {
                title: "a"
              },
              {
                title: "a"
              },
              {
                title: "a"
              },
              {
                title: "a"
              },
              {
                title: "a"
              },
              {
                title: "b"
              }
            ]
          }
        },
        {
          name: "edit",
          title: "场景编辑",
          isActive: false,
          data: {
            tbTitle: [
              "全选",
              "触发设备",
              "触发类型",
              "触发点",
              "延时(ms)",
              "联动设备",
              "联动命令",
              "命令参数",
              "备注信息"
            ],
            list: []
          }
        }
      ],
      formData: {
        layout: 0,
        linkageEquips: []
      }
    };
  },
  methods: {
    tabClick(navList, nv) {
      navList.map(nv => {
        nv.isActive = false
      })
      this.$set(nv, "isActive", true)
      console.log(nv)
    },
    save() {},
    loadListAdd(item, callback) {
      // 触发设备和可触发点级联载入
      item.loading = true;
      let reqData = {
        equip_nos: item.value
      };
      this.Axios.all([
        this.Axios.post("/api/real/get_ycp", reqData),
        this.Axios.post("/api/real/get_yxp", reqData)
      ])
        .then(
          this.Axios.spread((ycpRes, yxpRes) => {
            let ycpRt = ycpRes.data.HttpData,
              yxpRt = yxpRes.data.HttpData;
            if (ycpRt.code === 200 || yxpRt.code === 200) {
              let ycpData = ycpRt.data,
                yxpData = yxpRt.data;
              item.children = this.typeList;
              if (!ycpData || !ycpData.length) {
                item.children = item.children.filter((child, index) => {
                  return index !== 2 && index !== 3;
                });
              } else {
                item.children.map((child, index) => {
                  if (index === 2 || index === 3) {
                    child.children = ycpData.map(yc => {
                      return {
                        value: yc.yc_no,
                        label: yc.yc_nm
                      }
                    })
                  }
                })
              }
              if (!yxpData || !yxpData.length) {
                item.children = item.children.filter((item, index) => {
                  return index !== 0 && index !== 1;
                });
              } else {
                item.children.map((child, index) => {
                  if (index === 0 || index === 1) {
                    child.children = yxpData.map(yx => {
                      return {
                        value: yx.yx_no,
                        label: yx.yx_nm
                      }
                    })
                  }
                })
              }
              item.loading = false;
              // console.log(ycpData, yxpData)
            } else {
              console.log(ycpRes, yxpRes);
              this.$Message.warning(ycpRt.message);
            }
            callback();
          })
        )
        .catch(err => {
          console.log(err);
        });
    },
    loadLinkageEquips (equip, callback) {
      // 联动设备和操作级联
      equip.loading = true
      this.Axios.post('/api/real/get_setparm', {
        equip_nos: equip.value
      })
        .then(res => {
          let rt = res.data.HttpData
          if (rt.code === 200) {
            let data = rt.data
            // console.log(data)
            equip.children = data.map(item => {
              return {
                value: item.set_no,
                label: item.set_nm,
                children: []
              }
            })
          }
          equip.loading = false
          callback()
        })
        .catch(err => {
          console.log(err)
        })
    },
    initTableList (dt) {
      this.Axios.all([this.Axios.post('/api/Datas/getLinkageList'), this.Axios.post('/api/Datas/getYcpList'), this.Axios.post('/api/Datas/getYxpList')])
        .then(this.Axios.spread((res, ycpRes, yxpRes) => {
          let rt = res.data.HttpData,
            ycpRt = ycpRes.data.HttpData,
            yxpRt = yxpRes.data.HttpData
          if (rt.code === 200 && ycpRt.code === 200 && yxpRt.code === 200) {
            let data = rt.data,
              ycpData = ycpRt.data,
              yxpData = yxpRt.data
            console.log(ycpData)
            dt.list = data.map(row => {
              let result = {}
              this.listAdd.forEach(item => {
                result.equipName = (item.value === row.iequip_no) ? item.label : result.equipName
              })
              this.typeList.forEach(item => {
                if (item.value === row.iycyx_type)
                {
                  result.cType = item.label
                }
              })
              // console.log(row)
              if (row.iycyx_type === "c" || row.iycyx_type === "C"){
                ycpData.forEach(item => {
                  if (row.iequip_no === item.equip_no && row.iycyx_no === item.yc_no) {
                    result.cCurren = item.yc_nm
                  }
                })
              } else if (row.iycyx_type === "x" || row.iycyx_type === "X") {
                yxpData.forEach(item => {
                  if (row.iequip_no === item.equip_no && row.iycyx_no === item.yx_no) {
                    result.cCurren = item.yx_nm
                  }
                })
              } else {
                result.cCurren = "无"
              }
              return result
            })
            console.log(dt.list)
          }
        }))
        .catch(err => {
          console.log(err)
        })
    },
    initAddList() {
      // 获取新增设置菜单相关数据
      if (this.listAdd.length < 1 || this.formData.linkageEquips.length < 1) {
        this.Axios.all([this.Axios.post('/api/real/equip_state'), this.Axios.post('/api/Datas/getSetparmList', {all: true})])
          .then(this.Axios.spread((equipRes, parmRes) => {
            let equipRt = equipRes.data.HttpData,
              parmRt = parmRes.data.HttpData
              if (equipRt.code === 200 && parmRt.code === 200) {
                let equipData = equipRt.data,
                  parmData = parmRt.data
                  // console.log(equipData)
                // 触发设备列表
                this.listAdd = equipData.map(item => {
                  return {
                    value: item.m_iEquipNo,
                    label: item.m_EquipNm,
                    loading: false,
                    children: []
                  }
                })
                // 联动关联设备列表
                this.formData.linkageEquips = equipData.filter((equip, index) => {
                  if (parmData.some(parm => {
                    return equip.m_iEquipNo === parm.equip_no
                  })) {
                    return equip
                  }
                }).map(equip => {
                  return {
                      value: equip.m_iEquipNo,
                      label: equip.m_EquipNm,
                      loading: false,
                      children: []
                    }
                })
                // console.log(this.formData.linkageEquips)
              }
              this.initTableList(this.tabs[0].data)
          }))
          .catch(err => {
            console.log(err)
          })
      }
    }
  },
  components: {
    gwTabs
  },
  mounted() {
    this.initAddList()
  }
}
</script>

<style lang="scss" src="@assets/styles/sass/equip-linkage.scss"></style>
