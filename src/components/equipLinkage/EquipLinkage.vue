<template>
  <div class="equip-linkage">
    <gw-tabs :navList="tabs" @tabsNavClick="tabClick">
      <div v-for="(tab, index) of tabs" :slot="tab.name" :key="index">
        <Spin fix v-if="loadData">
            <Icon type="load-c" size=18 class="spin-icon-load"></Icon>
            <div>Loading</div>
        </Spin>
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
              <td v-text="item.delayTime"></td>
              <td v-text="item.linkageEquip"></td>
              <td v-text="item.linkageOpt"></td>
              <td v-text="item.optCode"></td>
              <td v-text="item.remarks"></td>
              <td>
                <ButtonGroup size="small">
                  <Button type="success" icon="ios-compose-outline" title="编辑" @click="editModal(item)"></Button>
                  <Button type="error" icon="ios-trash-outline" title="删除" @click="deleteLinkage(item)"></Button>
                </ButtonGroup>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="btnbar">
          <a class="btn add" href="javascript:;" @click="showAdd = !showAdd">添加</a>
          <!-- <a class="btn save" href="javascript:;" @click="save(tab)">保存</a> -->
        </div>
      </div>
    </gw-tabs>
    <Modal v-model="showAdd"
    @on-ok="addLinkage(formData)"
    >
      <div slot="header">新增联动设置</div>
      <Form :label-width="180"
      :model="formData"
      >
        <FormItem label="选择联动触发设备和触发点：">
          <Cascader
          :data="listAdd"
          :load-data="loadListAdd"
          v-model="formData.selectedAdd"
          ></Cascader>
        </FormItem>
        <FormItem label="设置延时时间(毫秒)：">
          <Input
          v-model="formData.layout"
          placeholder="延时时间"
          ></Input>
        </FormItem>
        <FormItem label="选择联动关联设备和操作："
        >
          <Cascader
          :data="formData.linkageEquips"
          :load-data="loadLinkageEquips"
          v-model="formData.selectedLinkages"
          >
          </Cascader>
        </FormItem>
        <!-- <FormItem label="命令菜蔬：">
          <Input
          v-model="formData.optCode"
          placeholder="命令参数"
          ></Input>
        </FormItem> -->
        <FormItem label="备注信息：">
          <Input
          v-model="formData.remarks"
          placeholder="备注信息"
          ></Input>
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
      loadData: false,
      showAdd: false,
      showDelete: false,
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
            list: []
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
        isEdit: false,
        layout: 0,
        selectedAdd: [],
        linkageEquips: [],
        selectedLinkages: [],
        optCode: '',
        remarks: ''
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
    addLinkage (data) {
      let reqData = {
        id: data.id,
        equipNo: data.selectedAdd[0],
        cType: data.selectedAdd[1],
        cNo: data.selectedAdd.length > 2 ? data.selectedAdd[2] : 0,
        delay: parseInt(data.layout),
        linkEquipNo: data.selectedLinkages[0],
        linkNo: data.selectedLinkages[1],
        optCode: data.optCode,
        remarks: data.remarks
      }
      if (!reqData.equipNo || !reqData.cType || !reqData.linkEquipNo || !reqData.linkNo) {
        this.$Message.info('配置不正确，请选择后操作!')
        return false
      }
      if (data.isEdit === false) {
        this.Axios.post('/api/datas/addLinkage', reqData)
          .then(res => {
            let rt = res.data.HttpData
            if (rt.code === 200) {
              if (rt.data === 1) {
                this.$Message.success('添加成功')
                this.initTableList(this.tabs[0].data)
              } else {
                this.$Message.warning('操作失败，请重试！')
              }
            } else {
              console.log(rt)
            }
          })
          .catch(err => {
            console.log(err)
          })
      } else {
        this.Axios.post('/api/datas/updateLinkage', reqData)
          .then(res => {
            let rt = res.data.HttpData
            if (rt.code === 200) {
              if (rt.data === 1) {
                this.$Message.success('修改成功')
                this.initTableList(this.tabs[0].data)
              } else {
                this.$Message.warning('修改失败，请重试！')
              }
            } else {
              this.$Message.error('服务器错误，请重试！')
            }
            this.formData.isEdit = false
          })
          .catch(err => {
            console.log(err)
          })
      }
    },
    editModal (row) {
      this.showAdd = true
      // console.log(row)
      this.formData.id = row.originalData.ID
      this.formData.selectedAdd = [row.originalData.iequip_no, row.originalData.iycyx_type, row.originalData.iycyx_no]
      this.formData.layout = row.originalData.delay
      this.formData.selectedLinkages = [row.originalData.oequip_no, row.originalData.oset_no]
      this.formData.remarks = row.originalData.ProcDesc
      this.formData.isEdit = true
      // this.addLinkage(this.formData)
    },
    deleteLinkage (row) {
      // console.log(row)
      this.$Modal.confirm({
        title: '操作提示',
        content: '是否确定删除该设置?',
        onOk: () => {
          this.Axios.post('/api/datas/deleteLinkage', {
            id: row.originalData.ID
          })
            .then(res => {
              let rt = res.data.HttpData
              if (rt.code === 200 && rt.data === 1) {
                this.$Message.success('删除成功')
                this.initTableList(this.tabs[0].data)
              } else {
                this.$Message.warning('操作失败，请重试！')
              }
            })
            .catch(err => {
              console.log(err)
            })
        }
      })
      this.showDelete = true
    },
    loadListAdd(item, callback) {
      // 触发设备和可触发点级联载入
      item.loading = true;
      let reqData = {
        equip_nos: item.value
      };
      this.Axios.all([
        this.Axios.post("/api/datas/getYcp", reqData),
        this.Axios.post("/api/datas/getYxp", reqData)
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
      this.loadData = true
      this.Axios.all([this.Axios.post('/api/Datas/getLinkageList'), this.Axios.post('/api/Datas/getYcpList'), this.Axios.post('/api/Datas/getYxpList'), this.Axios.post('/api/Datas/getSetparmList')])
        .then(this.Axios.spread((res, ycpRes, yxpRes, parmRes) => {
          let rt = res.data.HttpData,
            ycpRt = ycpRes.data.HttpData,
            yxpRt = yxpRes.data.HttpData,
            parmRt = parmRes.data.HttpData
          if (rt.code === 200 && ycpRt.code === 200 && yxpRt.code === 200 && parmRt.code === 200) {
            let data = rt.data,
              ycpData = ycpRt.data,
              yxpData = yxpRt.data,
              parmData = parmRt.data
            // console.log(data)
            dt.list = data.map(row => {
              let result = {}
              result.originalData = row
              result.delayTime = row.delay
              result.optCode = row.value
              result.remarks = row.ProcDesc
              this.formData.linkageEquips.forEach(item => {
                if (row.oequip_no === item.value) {
                  result.linkageEquip = item.label
                }
              })
              parmData.forEach(item => {
                if (row.oequip_no === item.equip_no && row.oset_no === item.set_no) {
                  result .linkageOpt = item.set_nm
                }
              })
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
            this.loadData = false
            // console.log(dt.list)
          }
        }))
        .catch(err => {
          console.log(err)
        })
    },
    initAddList() {
      // 获取新增设置菜单相关数据
      if (this.listAdd.length < 1 || this.formData.linkageEquips.length < 1) {
        this.loadData = true
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
                this.loadData = false
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
