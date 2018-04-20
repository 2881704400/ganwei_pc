
<template>
    <div>
        <Row class="schedule">
            <Col class="schedule_top" span="24">
            <!-- <h2><i class="ivu-icon ivu-icon-alert-circled"></i>当前页面 / 报警排表</h2> -->
            </Col>
            <Col class="schedule_bottom" span="24">
            <Tabs value="User" type="card" :animated="false" @on-click="tabsEvent">

                <TabPane label="人员" name="User" class="publicSchedule">
                   
                    <p class="Schedule_search">
                        <Button type="primary" class="AddLine" @click.stop="addAdministratorModal">添加</Button>
                       <span>
                          <i slot="prepend" class="ivu-icon ivu-icon-ios-search"></i>
                          <input type="text" placeholder="请输入人员姓名" v-model = "filtersValue" @input="conditions(Alarm_user)"/>
                       </span>
                      <button class="btn_search" @click="nullString(Alarm_user)">清空</button>
                    </p>
                    <table class="gw-table">
                        <thead>
                            <tr>
                                <th>人员姓名</th>
                                <th>电话</th>
                                <th>短信</th>
                                <th>电子邮箱</th>
                                <th>报警通知级别</th>
                                <th>操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item_parent,index_parent) in filtersArray">
                                <td>
                                  {{item_parent.Administrator}}
                                </td>
                                <td>
                                  {{item_parent.Telphone}}
                                </td>
                                <td>
                                  {{item_parent.MobileTel}}
                                </td>
                                <td>
                                  {{item_parent.EMail}}
                                </td>
                                <td>
                                  {{item_parent.AckLevel}}
                                </td>
                                <td>
                                    <i class="iconfont icon-scheduleMODIFY" title="修改" @click.stop="modifyFAdministrator(item_parent)" v-show="!item_parent.isShow"></i>
                                    <i class="iconfont icon-scheduleDEL" title="删除" @click.stop="removeAdministrator(item_parent)" v-show="!item_parent.isShow"></i>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <Modal v-model="user_modal" title="人员设置"  class="ModalUser"  :mask-closable="false">
                        <Row>
                            <Col span="6">
                            <span>人员姓名:</span>
                            </Col>
                            <Col span="18"><input type="text" placeholder="请输入人员姓名" v-model="user_admin" v-on:input="" id="userAdmin"/></Col>

                            <Col span="6">
                            <span>电话号码:</span>
                            </Col>
                            <Col span="18"><input type="text" placeholder="请输入电话" v-model="user_telphone" /></Col>

                            <Col span="6">
                            <span>短信号码:</span>
                            </Col>
                            <Col span="18"><input type="text" placeholder="请输入短信" v-model="user_molphone" /></Col>

                            <Col span="6">
                            <span>电子邮箱:</span>
                            </Col>
                            <Col span="18"><input type="text" placeholder="请输入电子邮箱" v-model="user_email" /></Col>

                            <Col span="6">
                            <span>报警通知级别:</span>
                            </Col>
                            <Col span="18"><input type="number" placeholder="请输入报警通知级别" v-model="user_level" min="0"/></Col>
                        </Row>
                        <div slot="footer">
                            <Button type="text" size="large" @click="saveUpdateAdministrator">取消</Button>
                            <Button type="primary" size="large" @click="saveUpdateAdministrator" id="user_ok" :disabled="false">确定</Button>
                        </div>                        
                    </Modal>


                </TabPane>

                <TabPane label="设备分组范围" name="Equipment" class="publicSchedule">
                    <div class="EquipmentLeft">
                        <Row>
                            <Col span="12">
                            <h4>设备分组 </h4>
                            </Col>
                            <Col span="12" class="rightBtn">
                            <Button type="primary" size="small" @click.stop="addEquipGroup()">添加</Button>
                            </Col>
                        </Row>
                        <ul class="leftContent">
                            <li v-for="equipUsertItem in equipUser" @click.stop="EquipGroupSel(equipUsertItem)" :class="{selectEquipName: equipUsertItem.group_no == selectEquip}">
                                <Row v-show="!equipUsertItem.isShow">
                                    <Col span="18">
                                    <a href="#">{{equipUsertItem.group_name}}</a>
                                    </Col>
                                    <Col span="3" class="alignCenter">
                                    <i class="iconfont icon-scheduleMODIFY equipDelete" title="修改" @click.stop="modifyEquipGroup(equipUsertItem)"></i>
                                    </Col>
                                    <Col span="3" class="alignCenter">
                                    <i class="iconfont icon-scheduleDEL equipDelete" title="删除" @click.stop="removeEquipGroup(equipUsertItem)"></i>
                                    </Col>
                                </Row>
                                <Row v-show="equipUsertItem.isShow">
                                    <Col span="20"><input type="text" v-model="equipUsertItem.group_name"></Col>
                                    <Col span="4" class="alignCenter">
                                    <i class="iconfont icon-scheduleSAVE" title="保存" @click.stop="saveEquipGroupName(equipUsertItem)"></i>
                                    </Col>
                                </Row>
                            </li>
                        </ul>
                    </div>
                    <div class="EquipmentRight">
                        <Row>
                            <Col span="12">
                            <h4>设备分组 </h4>
                            </Col>
                            <Col span="12" class="rightBtn">
                            <Button type="primary" size="small" @click.stop="allCheckbox('all')">全选</Button>
                            <Button type="primary" size="small" @click.stop="allCheckbox('back')">取消</Button>
                            </Col>
                        </Row>
                        <ul class="rightContent">
                            <li v-for="(equipNameItem,equipIndex) in equipName" :key="equipNameItem.group_no">
                               <Checkbox  v-model="equipNameItem.equipNameShow" :id='"checkConf_"+equipIndex'  @on-change="radioCheckbox(equipNameItem)">{{equipNameItem.equip_nm}}</Checkbox>
                              <!-- <input type="checkbox" :id='"checkConf_"+equipIndex' v-model="equipNameItem.equipNameShow" @click.stop="radioCheckbox(equipNameItem)" /> -->
                              <!-- <label :for='"checkConf_"+equipIndex'>{{equipNameItem.equip_nm}}</label> -->
                            </li>
                        </ul>
                    </div>
                </TabPane>

                <TabPane label="管理范围" name="Administration" class="publicSchedule">
                    <p class="Schedule_search">
                       <Button type="primary" @click.stop="addAlmReport()" class="AddLine">添加</Button>
                       <span>
                          <i slot="prepend" class="ivu-icon ivu-icon-ios-search"></i>
                          <input type="text" placeholder="请输入人员姓名" v-model = "filtersValue" @input="conditions(AlmReportData)"/>
                       </span>
                       <button class="btn_search" @click="nullString(AlmReportData)">清空</button>
                    </p>

                    <table class="gw-table">
                        <thead>
                            <tr>
                                <th>人员姓名</th>
                                <th>设备分组名称</th>
                                <th>操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item_parent,index_parent) in filtersArray">
                                <td>
                                    {{item_parent.Administrator}}
                                </td>
                                <td>
                                    {{item_parent.group_name}}
                                </td>
                                <td>
                                    <i class="iconfont icon-scheduleMODIFY" title="修改" @click.stop="modifyAlmReport(item_parent)"></i>
                                    <i class="iconfont icon-scheduleDEL" title="删除" @click.stop="removeAlmReport(item_parent)"></i>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <Modal v-model="AlmReport_modal" title="管理范围" @on-ok="saveUpdateAlmReportt" class="ModalUser" :mask-closable="false">
                        <Row>
                            <Col span="6">
                            <span>人员姓名:</span>
                            </Col>
                            <Col span="18">
                            <Select v-model="AlmReport_Administrator">
                                <Option v-for="item_child in Alarm_user" :value="item_child.Administrator" :key="item_child.Administrator">{{item_child.Administrator}}</Option>
                            </Select>

                            </Col>

                            <Col span="6">
                            <span>设备分组名称:</span>
                            </Col>
                            <Col span="18">

                            <Select v-model="AlmReport_group_no">
                                <Option v-for="item_child in equipUser" :value="item_child.group_no" :key="item_child.group_no">{{item_child.group_name}}</Option>
                            </Select>
                            </Col>

                        </Row>
                    </Modal>

                </TabPane>

                <TabPane label="周排表" name="Tablerow" class="publicSchedule">
                    
                    <p class="Schedule_search">
                       <Button class="AddLine" type="primary"  @click.stop="addWeekAlmReport">添加</Button>
                       <span>
                          <i slot="prepend" class="ivu-icon ivu-icon-ios-search"></i>
                          <input type="text" placeholder="请输入人员姓名" v-model = "filtersValue" @input="conditions(WeekAlmReport)"/>
                       </span>
                      <button class="btn_search" @click="nullString(WeekAlmReport)">清空</button>
                    </p>

   

                    <table class="gw-table">
                        <thead>
                            <tr>
                                <th>人员姓名</th>
                                <th>星期</th>
                                <th>开始时间</th>
                                <th>结束时间</th>
                                <th>操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item,index) in filtersArray">
                                <td>
                                    {{item.Administrator}}
                                </td>
                                <td>
                                    {{item.week_day}}
                                </td>
                                <td>
                                    {{item.begin_time}}
                                </td>
                                <td>
                                    {{item.end_time}}
                                </td>

                                <td>
                                    <i class="iconfont icon-scheduleMODIFY" title="修改" @click.stop="modifyWeekAlmReport(item)"></i>
                                    <i class="iconfont icon-scheduleDEL" title="删除" @click.stop="removeWeekAlmReport(item)"></i>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <Modal v-model="Week_modal" title="周排表" @on-ok="saveUpdateWeekAlmReport" class="ModalWeek" :mask-closable="false">
                        <Row>
                            <Col span="5">
                            <span>人员姓名:</span>
                            </Col>
                            <Col span="19">
                            <Select v-model="Week_admin">
                                <Option v-for="item_child in Alarm_user" :value="item_child.Administrator" :key="item_child.Administrator">{{item_child.Administrator}}</Option>
                            </Select>
                            </Col>
                            <Col span="5">
                            <span>星期:</span>
                            </Col>
                            <Col span="19">
                            <Select v-model="Week_week">
                                <Option v-for="item_child in WeekWeek" :value="item_child.value" :key="item_child.value">{{item_child.value}}</Option>
                            </Select>
                            </Col>
                            <Col span="5">
                            <span>开始时间:</span>
                            </Col>
                            <Col span="19">
                            <!-- <input placeholder="开始时间"  style="width: 100%;height: 100%;" v-model="Week_stime" /> -->
                            <TimePicker format="HH:mm" type="time" placeholder="开始时间" style="width: 100%;outline: none;"  v-model="Week_stime"></TimePicker>
                            </Col>
                            <Col span="5">
                            <span>结束时间:</span>
                            </Col>
                            <Col span="19">
                            <!-- <input  placeholder="开始时间" style="width: 100%;height: 100%;" v-model="Week_etime" /> -->
                            <TimePicker format="HH:mm" type="time" placeholder="结束时间" style="width: 100%;outline: none;"  v-model="Week_etime"></TimePicker>
                            </Col>
                        </Row>
                    </Modal>

                </TabPane>

                <TabPane label="特定日期排表" name="Datetablerow" class="publicSchedule">
                    <p class="Schedule_search">
                       <Button type="primary" class="AddLine" @click.stop="addSpeAlmReport">添加</Button>
                       <span>
                          <i slot="prepend" class="ivu-icon ivu-icon-ios-search"></i>
                          <input type="text" placeholder="请输入人员姓名" v-model = "filtersValue" @input="conditions(SpeAlmReport)"/>
                       </span>
                      <button class="btn_search" @click="nullString(SpeAlmReport)">清空</button>
                    </p>                    
                    <table class="gw-table">
                        <thead>
                            <tr>
                                <th>人员姓名</th>
                                <th>开始时间</th>
                                <th>结束时间</th>
                                <th>操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item,index) in filtersArray">
                                <td>
                                    {{item.Administrator}}
                                </td>
                                <td>
                                    {{item.begin_time}}
                                </td>
                                <td>
                                    {{item.end_time}}
                                </td>
                                <td>
                                    <i class="iconfont icon-scheduleMODIFY" title="修改" @click.stop="modifySpeAlmReport(item)"></i>
                                    <i class="iconfont icon-scheduleDEL" title="删除" @click.stop="removeSpeAlmReport(item)"></i>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <Modal v-model="Spe_modal" title="周排表" @on-ok="saveUpdateSpeAlmReport" class="ModalWeek" :mask-closable="false">
                        <Row>
                            <Col span="5">
                            <span>人员姓名:</span>
                            </Col>
                            <Col span="19">
                            <Select v-model="Spe_admin">
                                <Option v-for="item_child in Alarm_user" :value="item_child.Administrator" :key="item_child.Administrator">{{item_child.Administrator}}</Option>
                            </Select>
                            </Col>
                            <Col span="5">
                            <span>开始时间:</span>
                            </Col>
                            <Col span="19">
                            <DatePicker type="datetime" placeholder="开始时间" format="yyyy/MM/dd HH:mm:ss" style="width: 100%;height: 100%;" v-model="Spe_begin_time"></DatePicker>
                            </Col>
                            <Col span="5">
                            <span>结束时间:</span>
                            </Col>
                            <Col span="19">
                            <DatePicker type="datetime" placeholder="结束时间" format="yyyy/MM/dd HH:mm:ss" style="width: 100%;height: 100%;" v-model="Spe_end_time"></DatePicker>
                            </Col>
                        </Row>
                    </Modal>
                </TabPane>

            </Tabs>
            </Col>
        </Row>
    </div>
</template>

<script>
import { formatDate } from "../../assets/js/date.js";
// import $ from "jquery";
// import { mCustomScrollbar } from "../../assets/js/jquery.mCustomScrollbar.concat.min.js";
export default {
  
  data() {
    return {
      //人员
      Alarm_user: [],
      user_modal: false,
      user_isjudege: false,
      user_admin: "",
      user_telphone: "",
      user_molphone: "",
      user_email: "",
      user_level: 1,
      user_saveCell: "",
      disabled: "disabled",

      //设备分组范围
      equipUser: [], //设备名称
      equipName: [], //所选设备
      selectEquip: 1,

      //管理范围
      AlmReportData: [],
      AlmReport_modal: false,
      AlmReport_isjudege: false,
      AlmReport_id: "",
      AlmReport_group_no: "",
      AlmReport_group_name: "",
      AlmReport_Administrator: "",
      AlmReport_isShow: "",

      //周排表
      WeekAlmReport: [],
      WeekWeek: [
        { index: 0, value: "每天" },
        { index: 1, value: "星期日" },
        { index: 2, value: "星期一" },
        { index: 3, value: "星期二" },
        { index: 4, value: "星期三" },
        { index: 5, value: "星期四" },
        { index: 6, value: "星期五" },
        { index: 7, value: "星期六" }
      ],
      Week_modal: false,
      Week_isjudege: false,
      Week_id: "",
      Week_admin: "",
      Week_week: "",
      Week_stime: "",
      Week_etime: "",

      //待定日期排表
      SpeAlmReport: [],
      Spe_modal: false,
      Spe_isjudege: false,
      Spe_id: "",
      Spe_admin: "",
      Spe_begin_time: "",
      Spe_end_time: "",

      //过滤
      filtersArray:[],
      filtersValue: '',
    };
  },
  mounted() {
    this.getAdministrator();
    this.filtersArray = this.Alarm_user;
    //     var scrollbarStyle = {theme: "light-3",};
    //     $.mCustomScrollbar.defaults.scrollButtons.enable = true; //enable scrolling buttons by default
    //     $.mCustomScrollbar.defaults.axis = "yx";
    //     $('.navList').mCustomScrollbar({
    //         theme: "light-3",
    //         axis: 'y',
    //         autoHideScrollbar: true
    //     });    
  },
  methods: {
    tabsEvent: function(name) {

      this.filtersValue = "";
      switch (name) {
        case "User":
          this.filtersArray = this.Alarm_user;
          this.getAdministrator();
          break;
        case "Equipment":
         
          this.getEquip();
          break;
        case "Administration":
          this.filtersArray = this.AlmReportData;
          this.getEquipGroup();
          this.getAlmReport();
          this.getAdministrator();
          break;
        case "Tablerow":
          this.filtersArray = this.WeekAlmReport;
          this.getAdministrator();
          this.getWeekAlmReport();
          break;
        case "Datetablerow":
          this.filtersArray = this.SpeAlmReport;
          this.getAdministrator();
          this.getSpeAlmReport();
          break;
        default:
          break;
      }
    },
    //人员
    getAdministrator: function() {
      var WeekAlmReport = this;
      let url = "/api/Db/SelectData?tableName=Administrator";
      this.XHRGet(url, _success_user_query);
      function _success_user_query(response) {
        WeekAlmReport.Alarm_user.length = 0;
        let arrayLike = response.data.HttpData.data;
        let code = response.data.HttpData.code;
        if(code == 200)
        {
            let AlarmTabulateLenth = arrayLike.length;
            for (var i = 0; i < AlarmTabulateLenth; i++) {
              let AlarmTabulate_data = {
                Administrator: arrayLike[i].Administrator,
                Telphone: arrayLike[i].Telphone,
                MobileTel: arrayLike[i].MobileTel,
                EMail: arrayLike[i].EMail,
                AckLevel: arrayLike[i].AckLevel,
                saveCell: "",
                isShow: false
              };
              WeekAlmReport.Alarm_user.push(AlarmTabulate_data);
            }
        }
        else
        {
              WeekAlmReport.getAdministrator();
        }
      }
    },
    removeAdministrator: function(dt) {
      var WeekAlmReport = this.Alarm_user,dtThis = this,
        deleteJson = {
          tableName: "Administrator",
          ifName: "Administrator",
          ifValue: dt.Administrator,
          type: "string"
        };
      this.deleteBaseData("deleteEquipGroup", deleteJson, _success_admin_del);
      function _success_admin_del() {
        WeekAlmReport.forEach(function(ele1, index1) {
          if (ele1.Administrator == dt.Administrator) {
            WeekAlmReport.splice(index1, 1);
          }
        });
      //AlmReport   WeekAlmReport  SpeAlmReport
          var emptyAlmReport = {"tableName":"AlmReport","Administrator":dt.Administrator};
          dtThis.XHRPost("nullTableCell",emptyAlmReport, _success_empty_AlmReport);
          function _success_empty_AlmReport() {}  

          var emptyWeekAlmReport = {"tableName":"WeekAlmReport","Administrator":dt.Administrator};
          dtThis.XHRPost("nullTableCell",emptyWeekAlmReport, _success_empty_WeekAlmReport);
          function _success_empty_WeekAlmReport() {}  

          var emptySpeAlmReport = {"tableName":"SpeAlmReport","Administrator":dt.Administrator};
          dtThis.XHRPost("nullTableCell",emptySpeAlmReport, _success_empty_SpeAlmReport);
          function _success_empty_SpeAlmReport() {}            

      }
    },
    modifyFAdministrator: function(dt) {
      this.user_isjudege = false;
      this.user_modal = true;

      dt.saveCell = dt.Administrator;

      this.user_admin = dt.Administrator;
      this.user_telphone = dt.Telphone;
      this.user_molphone = dt.MobileTel;
      this.user_email = dt.EMail;
      this.user_level = dt.AckLevel;
      this.user_saveCell = dt.Administrator;
    },
    addAdministratorModal: function() {
      this.user_isjudege = true;
      this.user_modal = true;
      this.user_admin = "";
      this.user_telphone = "";
      this.user_molphone = "";
      this.user_email = "";
      this.user_level = this.user_level;
    },
    saveUpdateAdministrator: function() {
      var WeekAlmReport = this.Alarm_user;
      //本地更新
      let AdministratorLocal = {
        Administrator: this.user_admin,
        Telphone: this.user_telphone,
        MobileTel: this.user_molphone,
        EMail: this.user_email,
        AckLevel: this.user_level,
        saveCell: this.user_saveCell,
        isShow: false
      };
      //数据库更新
      let AdministratorUpdate = {
        tableName: "Administrator",
        Administrator: this.user_admin,
        Telphone: this.user_telphone,
        MobileTel: this.user_molphone,
        EMail: this.user_email,
        AckLevel: this.user_level,
        ifName: "Administrator",
        ifValue: this.user_saveCell
      };
      if (this.user_isjudege) {
        this.XHRPost(
          "insertEquipGroup",
          AdministratorUpdate,
          _success_admin_insert
        );
        function _success_admin_insert() {
          WeekAlmReport.push(AdministratorLocal);
        }
      } else {
        this.XHRPost(
          "updateEquipGroup",
          AdministratorUpdate,
          _success_admin_update
        );
        function _success_admin_update() {
          WeekAlmReport.forEach(function(ele, index) {
            if (ele.Administrator == AdministratorLocal.saveCell) {
              WeekAlmReport.splice(index, 1, AdministratorLocal);
              return false;
            }
          });
        }
      }
      this.user_modal = false;
    },
    cancalUpdateAdministrator: function(){
      this.user_modal = false;
    },
    onValidate(){
      var dtThis = this,dt=document.getElementById("userAdmin").parentNode;
      if(dtThis.user_admin !="")
        for(var i=0;i<dtThis.Alarm_user.length;i++)
        {
            if(dtThis.Alarm_user[i].Administrator == dtThis.user_admin)
              {
                  dt.id = "msgInfo";
                   document.getElementById("user_ok").disabled="disabled";
                  break;
              }
              else 
              { 
                dt.id = "";
                document.getElementById("user_ok").disabled="";
              }
        }
      else
        document.getElementById("user_ok").disabled="disabled";

    },

    //设备分组范围
    getEquipGroup: function() {
      var WeekAlmReport = this;
      let url = "/api/Db/SelectData?tableName=EquipGroup";
      this.XHRGet(url, _success_equip_query);
      function _success_equip_query(response) {
        WeekAlmReport.equipUser.length = 0;
        let arrayLike = response.data.HttpData.data;
        let code = response.data.HttpData.code;
        if(code == 200)
        {
            let getEquipUserLength = arrayLike.length;
            for (var i = 0; i < getEquipUserLength; i++) {
              if(i == 0)
               WeekAlmReport.selectEquip = arrayLike[i].group_no;
              let equipUser_data = {
                equipcomb: arrayLike[i].equipcomb,
                group_name: arrayLike[i].group_name,
                group_no: arrayLike[i].group_no,
                isShow: false
              };
              WeekAlmReport.equipUser.push(equipUser_data);
            }
            setTimeout(function(){ WeekAlmReport.initEquip();},200);
        }
        else
        {
             WeekAlmReport.getEquipGroup();
        }
      }
    },
    EquipGroupSel: function(dt) {
      this.selectEquip = dt.group_no;
      this.initEquip(dt.group_no);
    },
    modifyEquipGroup: function(dt) {
      dt.isShow = !dt.isShow;
    },
    removeEquipGroup: function(dt) {
      var WeekAlmReport = this.equipUser,dtThis = this,
        deleteJson = {
          tableName: "EquipGroup",
          ifName: "group_no",
          ifValue: dt.group_no,
          type: "number"
        };
      this.deleteBaseData("deleteEquipGroup", deleteJson, _success_admin_del);
      function _success_admin_del() {
        WeekAlmReport.forEach(function(ele1, index1) {
          if (ele1.group_no == dt.group_no) {
            WeekAlmReport.splice(index1, 1);
          }
        });
          var emptyAlmReport_group_no = {"tableName":"AlmReport_group_no","group_no":dt.group_no};
          dtThis.XHRPost("nullTableCell",emptyAlmReport_group_no, _success_empty_AlmReport_group_no);
          function _success_empty_AlmReport_group_no() {}          
      }
    },
    addEquipGroup: function() {
      var group_no_value,
        WeekAlmReport = this.equipUser;
      var groupArray = new Array();
      WeekAlmReport.forEach(function(ele1, index1) {
        groupArray[index1] = ele1.group_no;
      });
      group_no_value = Math.max.apply(null, groupArray) + 1; //获取设备分组最大序号

      var AdministratorLocal = {
        equipcomb: "",
        group_name: "新增设备分组",
        group_no: group_no_value > 1 ? group_no_value : 1,
        isShow: false
      };
      var AdministratorUpdate = {
        tableName: "EquipGroup",
        groupName: AdministratorLocal.group_name,
        groupNo: AdministratorLocal.group_no
      };
      this.XHRPost(
        "insertEquipGroup",
        AdministratorUpdate,
        _success_equipgroup_insert
      );
      function _success_equipgroup_insert() {
        WeekAlmReport.push(AdministratorLocal);
      }
    },
    saveEquipGroupName: function(dt) {
      let WeekAlmReportInsert = {
        tableName: "EquipGroup",
        equipcomb: dt.equipcomb,
        group_name: dt.group_name,
        ifValue: dt.group_no
      };
      this.XHRPost(
        "updateEquipGroup",
        WeekAlmReportInsert,
        _success_equipgroup_update
      );
      function _success_equipgroup_update() {
        dt.isShow = !dt.isShow;
      }
    },

    //设备分组右侧设备选择
    getEquip: function(groupNo) {
      var dthis = this;
      let url = "/api/Db/SelectData?tableName=Equip";
      this.XHRGet(url, _success_equip1_query);
      function _success_equip1_query(response) {
        dthis.equipName.length = 0;
        let arrayLike = response.data.HttpData.data;
        let code = response.data.HttpData.code;
        if(code == 200)
        {        
            let getEquipNameLength = arrayLike.length;
            for (var i = 0; i < getEquipNameLength; i++) {
              let equipName_data = {
                equip_no: arrayLike[i].equip_no,
                equip_nm: arrayLike[i].equip_nm,
                equipNameShow: false
              };
              dthis.equipName.push(equipName_data);
            }
            dthis.getEquipGroup();
           
        }
        else
        { 
            dthis.getEquip();
        }
      }
    },
    initEquip: function(value) {
      // $('.rightContent').mCustomScrollbar(scrollbarStyle);
      //清空勾选
      this.equipName.forEach(function(ele, index) {
        ele.equipNameShow = false;
      });
      //设置勾选
      var selectEquip = value || this.selectEquip; //value 是进入
      if (this.equipUser != null && this.equipName != null) {
        var stringValue;
        this.equipUser.forEach(function(ele, index) {
          if (ele.group_no == selectEquip && ele.equipcomb != null) {
            stringValue = ele.equipcomb;
          }
        });
        this.equipName.forEach(function(ele1, index1) {
          // console.log(stringValue+"====="+stringValue.split("#").indexOf(ele1.equip_no.toString()));
          if (
            stringValue != undefined &&
            stringValue.split("#").indexOf(ele1.equip_no.toString()) > -1
          ) {
            ele1.equipNameShow = true;
          }
        });
      }
    },
    allCheckbox: function(value) {
      var group_nameValue,
        equipcombString = "#",
        equipUser = this.equipUser,
        equipName = this.equipName,
        selectEquip = this.selectEquip;
      if (value == "all")
        equipName.forEach(function(ele1, index1) {
          ele1.equipNameShow = true;
          equipcombString += ele1.equip_no + "#";
        });
      else
        equipName.forEach(function(ele1, index1) {
          ele1.equipNameShow = false;
        });
      //取列表名
      this.equipUser.forEach(function(ele, index) {
        if (ele.group_no == selectEquip) {
          group_nameValue = ele.group_name;
        }
      });

      let WeekAlmReportInsert = {
        tableName: "EquipGroup",
        group_name: group_nameValue,
        equipcomb: equipcombString,
        ifValue: selectEquip
      };

      this.XHRPost(
        "updateEquipGroup",
        WeekAlmReportInsert,
        _success_equip1_update
      );
      function _success_equip1_update() {
        equipUser.forEach(function(ele, index) {
          if (ele.group_no == selectEquip) {
            ele.equipcomb = equipcombString;
          }
        });
      }
    },
    radioCheckbox: function(dt) {
      var group_nameValue,
        stringListEquip,
        selectEquip = this.selectEquip,
        equipUser = this.equipUser;
      equipUser.forEach(function(ele, index) {
        if (ele.group_no == selectEquip) {
          if (dt.equipNameShow) {
           
            ele.equipcomb == null || ele.equipcomb == ""
              ? (ele.equipcomb = "#" + dt.equip_no + "#")
              : (ele.equipcomb += dt.equip_no + "#");
             
           
          } else {

            ele.equipcomb = ele.equipcomb.replace("#" + dt.equip_no + "#", "#");
            
          }
          stringListEquip = ele.equipcomb;
        }
      });
      //取列表名
      equipUser.forEach(function(ele, index) {
        if (ele.group_no == selectEquip) {
          group_nameValue = ele.group_name;
        }
      });

      let WeekAlmReportInsert = {
        tableName: "EquipGroup",
        group_name: group_nameValue,
        equipcomb: stringListEquip,
        ifValue: selectEquip
      };

      this.XHRPost(
        "updateEquipGroup",
        WeekAlmReportInsert,
        _success_radio_update
      );
      function _success_radio_update() {
        equipUser.forEach(function(ele, index) {
          if (ele.group_no == selectEquip) {
            ele.equipcomb = stringListEquip;
          }
        });
      }
    },

    //管理范围
    getAlmReport: function() {
      var dthis = this;
      let url = "/api/Db/SelectData?tableName=AlmReport";
      this.XHRGet(url, _success_user_query);
      function _success_user_query(response) {
        dthis.AlmReportData.length = 0;
        let arrayLike = response.data.HttpData.data;
        let code = response.data.HttpData.code;
        if(code == 200)
        {        
            let getAlmReportLength = arrayLike.length;
            for (var i = 0; i < getAlmReportLength; i++) {
              let AlmReport_data = {
                id: arrayLike[i].id,
                group_no: arrayLike[i].group_no,
                group_name: dthis.equipNameFun(arrayLike[i].group_no),
                Administrator: arrayLike[i].Administrator,
                isShow: false
              };
              dthis.AlmReportData.push(AlmReport_data);
            }
        }
        else
        {
            dthis.getAlmReport();
        }
      }
    },
    removeAlmReport: function(dt) {
      var WeekAlmReport = this.AlmReportData,
        deleteJson = {
          tableName: "AlmReport",
          ifName: "id",
          ifValue: dt.id,
          type: "number"
        };
      this.deleteBaseData("deleteEquipGroup", deleteJson, _success_admin_del);
      function _success_admin_del() {
        WeekAlmReport.forEach(function(ele1, index1) {
          if (ele1.id == dt.id) {
            WeekAlmReport.splice(index1, 1);
          }
        });
      }
    },
    modifyAlmReport: function(dt) {
      this.AlmReport_isjudege = false;
      this.AlmReport_modal = true;

      this.AlmReport_id = dt.id;
      this.AlmReport_group_no = dt.group_no;
      this.AlmReport_group_name = dt.group_name;
      this.AlmReport_Administrator = dt.Administrator;
      this.AlmReport_isShow = dt.isShow;
    },
    addAlmReport: function(dt) {
      this.AlmReport_isjudege = true;
      this.AlmReport_modal = true;
      this.AlmReport_id = "";
      this.AlmReport_group_no = "";
      this.AlmReport_Administrator = "";
    },
    saveUpdateAlmReportt: function() {
      var dthis = this,
        WeekAlmReport = this.AlmReportData,
        idValue = this.idReturn(this.WeekAlmReport),
        weekID = this.AlmReport_isjudege ? idValue : this.AlmReport_id; //获取新建id主键
      //本地更新
      let WeekAlmReportLocal = {
        id: weekID,
        group_no: this.AlmReport_group_no,
        group_name: dthis.equipNameFun(this.AlmReport_group_no),
        Administrator: this.AlmReport_Administrator,
        isShow: false
      };
      //数据库更新
      let WeekAlmReportInsert = {
        tableName: "AlmReport",
        group_no: this.AlmReport_group_no,
        Administrator: this.AlmReport_Administrator,
        ifValue: weekID
      };
      if (this.AlmReport_isjudege) {
        this.XHRPost(
          "insertEquipGroup",
          WeekAlmReportInsert,
          _success_Alm_insert
        );
        function _success_Alm_insert() {
          WeekAlmReport.push(WeekAlmReportLocal);
        }
      } else {
        this.XHRPost(
          "updateEquipGroup",
          WeekAlmReportInsert,
          _success_Alm_update
        );
        function _success_Alm_update() {
          WeekAlmReport.forEach(function(ele, index) {
            if (ele.id == WeekAlmReportLocal.id) {
              WeekAlmReport.splice(index, 1, WeekAlmReportLocal);
              return false;
            }
          });
        }
      }
    },

    // 周排表
    getWeekAlmReport: function() {
      var WeekAlmReport = this;

      let url = "/api/Db/SelectData?tableName=WeekAlmReport";
      this.XHRGet(url, _success_week_query);
      function _success_week_query(response) {
        WeekAlmReport.WeekAlmReport.length = 0;
        let arrayLike = response.data.HttpData.data;
        let code = response.data.HttpData.code;
        if(code == 200)
        {           
            let getEquipNameLength = arrayLike.length;
            for (var i = 0; i < getEquipNameLength; i++) {
              let dataJson = {
                id: arrayLike[i].id,
                Administrator: arrayLike[i].Administrator,
                week_day: WeekAlmReport.weekReturn(arrayLike[i].week_day),
                begin_time: formatDate(new Date(arrayLike[i].begin_time), "hh:mm"),
                end_time: formatDate(new Date(arrayLike[i].end_time), "hh:mm"),
                isShow: false
              };
              WeekAlmReport.WeekAlmReport.push(dataJson);
            }
        }
        else
        {
             WeekAlmReport.getWeekAlmReport();
        }
      }
    },
    removeWeekAlmReport: function(dt) {
      var dtID = dt.id,
        WeekAlmReport = this.WeekAlmReport,
        deleteJson = {
          tableName: "WeekAlmReport",
          ifName: "id",
          ifValue: dt.id,
          type: "number"
        };
      this.deleteBaseData("deleteEquipGroup", deleteJson, _success_week_del);
      function _success_week_del() {
        WeekAlmReport.forEach(function(ele1, index1) {
          if (ele1.id == dtID) {
            WeekAlmReport.splice(index1, 1);
          }
        });
      }
    },
    modifyWeekAlmReport: function(dt) {
      this.Week_isjudege = false;
      this.Week_modal = true;

      this.Week_id = dt.id;
      this.Week_admin = dt.Administrator;
      this.Week_week = dt.week_day;
      this.Week_stime = dt.begin_time;
      this.Week_etime = dt.end_time;
    },
    addWeekAlmReport: function() {
      this.Week_isjudege = true;
      this.Week_modal = true;
      this.Week_admin = "";
      this.Week_week = "";
      this.Week_stime = "";
      this.Week_etime = "";
    },
    saveUpdateWeekAlmReport: function() {
      var weekIndex,
        WeekAlmReport = this.WeekAlmReport,
        weekStr = this.Week_week,
        idValue = this.idReturn(this.WeekAlmReport),
        weekID = this.Week_isjudege ? idValue : this.Week_id; //获取新建id主键
      this.WeekWeek.forEach(function(ele, index) {
        if (ele.value == weekStr) {
          weekIndex = ele.index;
          return false;
        }
      });
      //本地更新
      let WeekAlmReportLocal = {
        id: weekID,
        Administrator: this.Week_admin,
        week_day: this.Week_week,
        begin_time: this.Week_stime,
        end_time:this.Week_etime,
        isShow: false
      };
      //数据库更新
      let WeekAlmReportInsert = {
        tableName: "WeekAlmReport",
        Administrator: this.Week_admin,
        week_day: weekIndex,
        begin_time: this.Week_stime,
        end_time: this.Week_etime,
        ifValue: weekID
      };
      if (this.Week_isjudege) {
        this.XHRPost(
          "insertEquipGroup",
          WeekAlmReportInsert,
          _success_week_insert
        );
        function _success_week_insert() {
          WeekAlmReport.push(WeekAlmReportLocal);
        }
      } else {
        this.XHRPost(
          "updateEquipGroup",
          WeekAlmReportInsert,
          _success_week_update
        );
        function _success_week_update() {
          WeekAlmReport.forEach(function(ele, index) {
            if (ele.id == WeekAlmReportLocal.id) {
              WeekAlmReport.splice(index, 1, WeekAlmReportLocal);
              return false;
            }
          });
        }
      }
    },

    // 特定日期排表
    getSpeAlmReport: function() {
      var WeekAlmReport = this;
      let url = "/api/Db/SelectData?tableName=SpeAlmReport";
      this.XHRGet(url, _success_week_query);
      function _success_week_query(response) {
        WeekAlmReport.SpeAlmReport.length = 0;
        let arrayLike = response.data.HttpData.data;
        let code = response.data.HttpData.code;
        if(code == 200)
        {            
            let getEquipNameLength = arrayLike.length;
            for (var i = 0; i < getEquipNameLength; i++) {
              let dataJson = {
                id: arrayLike[i].id,
                Administrator: arrayLike[i].Administrator,
                begin_time: formatDate(
                  new Date(arrayLike[i].begin_time),
                  "yyyy/MM/dd hh:mm:ss"
                ),
                end_time: formatDate(
                  new Date(arrayLike[i].end_time),
                  "yyyy/MM/dd hh:mm:ss"
                ),
                isShow: false
              };
              WeekAlmReport.SpeAlmReport.push(dataJson);
            }
        }
        else
        {
             WeekAlmReport.getSpeAlmReport();
        }
      }
    },
    removeSpeAlmReport: function(dt) {
      var dtID = dt.id,
        WeekAlmReport = this.SpeAlmReport,
        deleteJson = {
          tableName: "SpeAlmReport",
          ifName: "id",
          ifValue: dt.id,
          type: "number"
        };
      this.deleteBaseData("deleteEquipGroup", deleteJson, _success_Spe_del);
      function _success_Spe_del() {
        WeekAlmReport.forEach(function(ele1, index1) {
          if (ele1.id == dtID) {
            WeekAlmReport.splice(index1, 1);
          }
        });
      }
    },
    modifySpeAlmReport: function(dt) {
      this.Spe_isjudege = false;
      this.Spe_modal = true;

      this.Spe_id = dt.id;
      this.Spe_admin = dt.Administrator;
      this.Spe_begin_time = dt.begin_time;
      this.Spe_end_time = dt.end_time;
    },
    addSpeAlmReport: function() {
      this.Spe_isjudege = true;
      this.Spe_modal = true;
      this.Spe_id = "";
      this.Spe_admin = "";
      this.Spe_begin_time = "";
      this.Spe_end_time = "";
    },
    saveUpdateSpeAlmReport: function() {
      var weekIndex,
        WeekAlmReport = this.SpeAlmReport,
        idValue = this.idReturn(WeekAlmReport),
        weekID = this.Spe_isjudege ? idValue : this.Spe_id; //获取新建id主键

      //本地更新
      let WeekAlmReportLocal = {
        id: weekID,
        Administrator: this.Spe_admin,
        begin_time: formatDate(this.Spe_begin_time,"yyyy/MM/dd hh:mm:ss"),
        end_time: formatDate(this.Spe_end_time,"yyyy/MM/dd hh:mm:ss"),
        isShow: false
      };
      //数据库更新
      let WeekAlmReportInsert = {
        tableName: "SpeAlmReport",
        Administrator: this.Spe_admin,
        begin_time: this.Spe_begin_time,
        end_time: this.Spe_end_time,
        ifValue: weekID
      };
      if (this.Spe_isjudege) {
        this.XHRPost(
          "insertEquipGroup",
          WeekAlmReportInsert,
          _success_spe_insert
        );
        function _success_spe_insert() {
          WeekAlmReport.push(WeekAlmReportLocal);
        }
      } else {
        this.XHRPost(
          "updateEquipGroup",
          WeekAlmReportInsert,
          _success_spe_update
        );
        function _success_spe_update() {
          WeekAlmReport.forEach(function(ele, index) {
            if (ele.id == WeekAlmReportLocal.id) {
              WeekAlmReport.splice(index, 1, WeekAlmReportLocal);
              return false;
            }
          });
        }
      }
    },

    //发送请求
    XHRPost: function(api, updateJson, _success) {
      var msg = this.$Message;
      let urlna = "/api/Db/" + api;
      this.Axios.post(urlna, updateJson, {
        headers: { "Content-type": "application/json" }
      })
        .then(response => {
          // msg.info("执行成功");
          _success();
        })
        .catch(error => {
          console.log(error);
        });
    },
    XHRGet: function(url, _success) {
      var msg = this.$Message;
      this.Axios({
        method: "get",
        url: url,
        headers: {
          "Content-type": "application/x-www-form-urlencoded"
        }
      })
        .then(response => {
          // msg.info("执行成功");
          _success(response);
        })
        .catch(error => {
          console.log(error);
        });
    },
    deleteBaseData: function(api, json, _success) {
      this.$Modal.confirm({
        title: "提示",
        content:
          '<p style="font-size: 18px;position: relative;top: -6px;">确认删除该设备分组?</p>',
        okText: "确认",
        onOk: () => {
          this.XHRPost(api, json, _success);
        },
        cancelText: "取消"
      });
    },

    //字符串处理
    weekReturn: function(week) {
      var weekString;
      switch (week) {
        case 0:
          weekString = "每天";
          break;
        case 2:
          weekString = "星期一";
          break;
        case 3:
          weekString = "星期二";
          break;
        case 4:
          weekString = "星期三";
          break;
        case 5:
          weekString = "星期四";
          break;
        case 6:
          weekString = "星期五";
          break;
        case 7:
          weekString = "星期六";
          break;
        case 1:
          weekString = "星期日";
          break;
        default:
          break;
      }
      return weekString;
    },
    idReturn: function(dt) {
      var group_no_value;
      var groupArray = new Array();
      dt.forEach(function(ele1, index1) {
        groupArray[index1] = ele1.id;
      });
      group_no_value = Math.max.apply(null, groupArray) + 1;
      return group_no_value > 1 ? group_no_value : 1;
    },
    equipNameFun: function(value) {
      var equipName;
      this.equipUser.forEach(function(ele, index) {
        if (ele.group_no == value) equipName = ele.group_name;
        return equipName;
      });
      return equipName;
    },
    conditions: function(items){

        var searchRegex = new RegExp(this.filtersValue, 'gi');
        var arr=[],i=0;
        if(this.filtersValue != "")
        { 
          items.forEach(function(ele, index) {
              if(searchRegex.test(ele.Administrator))
                {arr[i] = ele;i++;}
          });
         }
         this.filtersArray = this.filtersValue == ""?items:arr;  
    },
    nullString: function(items){
      this.filtersValue = "";
      this.filtersArray = items; 
    }
  },


};




</script>


<style lang="scss" src="../../assets/styles/sass/Schedule.scss"></style>