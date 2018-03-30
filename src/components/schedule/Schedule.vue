
<template>
<div  @click.stop="toggleALL(Alarm_boolean)">
<Row class="schedule">
    <Col class="schedule_top" span="24">
       <h2 ><i class="ivu-icon ivu-icon-ios-cog"></i>当前页面 / 报警排表</h2>
    </Col>
    <Col class="schedule_bottom" span="24">
        <Tabs value="User" type="card" :animated="false" @on-click="tabsEvent">
            
                <TabPane label="人员" name="User" class="publicSchedule">
                    <table class="userTable"  >
                        <thead><tr><th>人员姓名</th><th>电话</th><th>短信</th><th>电子邮箱</th><th>报警通知级别</th></tr></thead>
                        <tbody>
                            <tr v-for="(item_parent,index_parent) in Alarm_user" @dblclick.stop="!Alarm_boolean[index_parent].isShow?toggle(Alarm_boolean[index_parent]):''"  @click.stop="!Alarm_boolean[index_parent].isShow?toggleALL(Alarm_boolean):''">
                                <td v-for="(item_child,index_child) in item_parent" >
                                    <div class="larmTabulate_txt" v-show="!Alarm_boolean[index_parent].isShow"   >
                                        {{item_child}}
                                    </div>
                                    <div class="larmTabulate_input"  v-show="Alarm_boolean[index_parent].isShow">
                                        <input type="text" v-model="item_parent[index_child]"/>
                                         <!-- @blur="toggle(item_parent)" v-focus="focusclick" -->
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <!--  -->
                </TabPane>

                <TabPane label="设备分组范围" name="Equipment" class="publicSchedule">
                   <div class="EquipmentLeft">
                        <Row>
                            <Col span="12"><h4>设备分组 </h4></Col>
                            <Col span="12" class="rightBtn"><Button type="primary" size="small"  @click.stop="addEquipGroupClick()" >添加</Button></Col>
                        </Row>
                        <ul>
                            <li v-for="equipUsertItem in equipUser" @click.stop="equipUsertItem.isShow?'':EquipGroupClick(equipUsertItem)" :class="{selectEquipName: equipUsertItem.group_no == selectEquip}">
                                <Row v-show="!equipUsertItem.isShow">
                                    <Col span="20"><a  href="#" >{{equipUsertItem.group_name}}</a></Col>
                                    <Col span="4" class="alignCenter"><i class="ivu-icon ivu-icon-ios-trash-outline equipDelete" title="删除" @click.stop="removeEquipGroupClick(equipUsertItem)"></i></Col>
                                </Row>
                                <Row v-show="equipUsertItem.isShow">
                                    <Col span="20"><input type="text" v-model="equipUsertItem.group_name"></Col>
                                    <Col span="4"  class="alignCenter"><i class="ivu-icon ivu-icon-checkmark-round" title="保存" @click.stop="saveEquipGroupClick(equipUsertItem)"></i></Col>
                                </Row>
                            </li>
                        </ul>
                   </div>
                   <div class="EquipmentRight">
                        <Row>
                            <Col span="12"><h4>设备分组 </h4></Col>
                            <Col span="12" class="rightBtn"><Button type="primary" size="small"  @click.stop="allSelectEquip('all')" >全选</Button><Button type="primary" size="small"  @click.stop="allSelectEquip('back')" >取消</Button></Col>
                        </Row>
                        <ul >
                            <li  v-for="(equipNameItem,equipIndex) in equipName"><input type="checkbox" :id='"checkConf_"+equipIndex' v-model="equipNameItem.equipNameShow" @click.stop="updateEquipCheckbox(equipNameItem)"/> <label :for='"checkConf_"+equipIndex'>{{equipNameItem.equip_nm}}</label></li>
                        </ul>
                   </div>
                </TabPane>

                <TabPane label="管理范围" name="Administration" class="publicSchedule">
                    <table class="userTable AlmReportTable">
                        <thead><tr><th>人员姓名</th><th>设备分组名称</th><th>操作</th></tr></thead>
                        <tbody>
                            <tr v-for="(item_parent,index_parent) in AlmReportData">
                                <td>
                                    <Select v-model="item_parent.Administrator">
                                        <Option :value="item_child.group_no" v-for="(item_child,index_child) in AlmReportData">{{item_child.Administrator}}</Option>
                                    </Select>

                                </td>
                                <td>
                                    <Select  >
                                        <Option :value="item_child.group_no" v-for="(item_child,index_child) in equipUser">{{item_child.group_name}}</Option>
                                    </Select>
   
                                </td>
                                <td>
                                    <i class="ivu-icon ivu-icon-document" title="删除" @click.stop="removeEquipGroupClick(equipUsertItem)"></i> 
                                    <i class="ivu-icon ivu-icon-ios-trash-outline" title="保存" @click.stop="removeEquipGroupClick(equipUsertItem)"></i>
                                </td>
                            </tr>
                        </tbody>
                    </table>                    
                </TabPane>

                <TabPane label="周排表" name="Tablerow" class="publicSchedule">
                     <table class="userTable"  >
                        <thead><tr>人员姓名<th>电话</th><th>短信</th><th>电子邮箱</th><th>报警通知级别</th></tr></thead>
                        <tbody>
                            <tr v-for="(item_parent,index_parent) in Alarm_user" @dblclick.stop="!Alarm_boolean[index_parent].isShow?toggle(Alarm_boolean[index_parent]):''"  @click.stop="!Alarm_boolean[index_parent].isShow?toggleALL(Alarm_boolean):''">
                                <td v-for="(item_child,index_child) in item_parent" >
                                    <div class="larmTabulate_txt" v-show="!Alarm_boolean[index_parent].isShow"   >
                                        {{item_child}}
                                    </div>
                                    <div class="larmTabulate_input"  v-show="Alarm_boolean[index_parent].isShow">
                                        <input type="text" v-model="item_parent[index_child]"/>
                                         <!-- @blur="toggle(item_parent)" v-focus="focusclick" -->
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>                   
                </TabPane>

                <TabPane label="特定日期排表" name="Datetablerow" class="publicSchedule">
                    <table class="userTable"  >
                        <thead><tr>人员姓名<th>电话</th><th>短信</th><th>电子邮箱</th><th>报警通知级别</th></tr></thead>
                        <tbody>
                            <tr v-for="(item_parent,index_parent) in Alarm_user" @dblclick.stop="!Alarm_boolean[index_parent].isShow?toggle(Alarm_boolean[index_parent]):''"  @click.stop="!Alarm_boolean[index_parent].isShow?toggleALL(Alarm_boolean):''">
                                <td v-for="(item_child,index_child) in item_parent" >
                                    <div class="larmTabulate_txt" v-show="!Alarm_boolean[index_parent].isShow"   >
                                        {{item_child}}
                                    </div>
                                    <div class="larmTabulate_input"  v-show="Alarm_boolean[index_parent].isShow">
                                        <input type="text" v-model="item_parent[index_child]"/>
                                         <!-- @blur="toggle(item_parent)" v-focus="focusclick" -->
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>                    
                </TabPane>

            </Tabs>
    </Col>    
</Row>
</div>
</template>

<script>

 export default {
        data () {
            return {
                //人员
                Alarm_boolean:[],
                Alarm_user: [],
                //设备数据
                equipUser:[], //设备名称
                equipName:[], //所选设备
                selectEquip: 1,
                //管理范围
                AlmReportData:[],
                AlmReportPeople:[], //人员选中
                AlmReportEquip:[],  //设备分组选中
            }
        },
        mounted(){
        this.getAdministrator()
        },
        methods: {

            tabsEvent: function(name){
                
                switch(name)
                {
                    case 'User': this.Alarm_user.length =0;this.Alarm_boolean.length=0;this.getAdministrator();break;
                    case 'Equipment':this.equipUser.length =0;this.equipName.length=0;this.getEquipGroup('getEquip'); break;
                    case 'Administration':this.AlmReportData.length =0;this.equipUser.length=0;this.getAlmReport(); break;
                    case 'Tablerow': this.getWeekAlmReport();break;
                    case 'Datetablerow': this.getSpeAlmReport();break;
                    default: break;
                }
            },
            getAdministrator: function(){
                   
                    //------获取人员信息表 start---------
                    let urlna = "/api/Db/SelectData?tableName=Administrator";
                    this.Axios({
                        method: 'get',
                        url: urlna,
                        headers: {
                            'Content-type': 'application/x-www-form-urlencoded',
                        },
                    }).then((response) => {
                          let arrayLike = response.data.HttpData.data;
                          let AlarmTabulateLenth = arrayLike.length;
                          for(var i=0;i<AlarmTabulateLenth;i++)
                          {
                            let AlarmTabulate_data =
                                [
                                    arrayLike[i].Administrator,
                                    arrayLike[i].Telphone,
                                    arrayLike[i].MobileTel,
                                    arrayLike[i].EMail,
                                    arrayLike[i].AckLevel,
                                ];
                            this.Alarm_user.push(AlarmTabulate_data);
                            let AlarmTabulate_boolean={'isShow':false};
                            this.Alarm_boolean.push(AlarmTabulate_boolean);
                          }
                        })
                        .catch((error) => {
                            console.log(error);
                        }
                    );
                   //------获取人员信息表 end---------
            },
            getEquipGroup: function(isJudge){
                    //------获取设备分组范围 start---------
                    let urlna = "/api/Db/SelectData?tableName=EquipGroup";
                    this.Axios({
                        method: 'get',
                        url: urlna,
                        headers: {
                            'Content-type': 'application/x-www-form-urlencoded',
                        },
                    }).then((response) => {
                          let arrayLike = response.data.HttpData.data;
                          let getEquipUserLength = arrayLike.length;
                          for(var i=0;i<getEquipUserLength;i++)
                          {
                            let equipUser_data =
                                {
                                   'equipcomb': arrayLike[i].equipcomb,
                                   'group_name': arrayLike[i].group_name,
                                   'group_no': arrayLike[i].group_no,
                                   'isShow':false
                                };
                            this.equipUser.push(equipUser_data);
                          }
                          if(isJudge)
                            this.getEquip();
                    })
                    .catch((error) => {
                            console.log(error);
                    });
                   //------获取设备分组范围 end---------
            }, 
            updateEquipCheckbox: function(dt){
                 var stringListEquip,selectEquip=this.selectEquip;
                 this.equipUser.forEach(function(ele,index){
                        if(ele.group_no == selectEquip)
                        {
                            if(dt.equipNameShow) //勾消 -- 往字符串去除内容
                            {
                                ele.equipcomb=ele.equipcomb.replace("#"+dt.equip_no+"#","#");
                            }
                            else //勾选 --  往字符串添加内容
                            {
                                (ele.equipcomb == null || ele.equipcomb == "")?ele.equipcomb += ('#'+dt.equip_no+'#'):ele.equipcomb += (dt.equip_no+'#');
                            }
                            stringListEquip = ele.equipcomb;
                        }
                    }); 
                this.updateCheckboxAxios('EquipGroup','equipcomb',stringListEquip,'group_no',selectEquip);
            },   
            updateCheckboxAxios: function(tableName,cellName,cellValue,ifName,ifValue){
                let urlna = "/api/Db/updateEquipGroup";
                this.Axios.post(urlna,{'tableName':tableName,'cellName':cellName,'cellValue':cellValue,'ifName':ifName,'ifValue': ifValue},{
                    headers: {'Content-type': 'application/json',}
                }).then((response) => {
                    console.log(response);
                })
                .catch((error) => {
                    console.log(error);
                });
            },              
            getEquip: function(groupNo){
                   //------获取设备子分组范围 start---------
                    let urlnaGroup = "/api/Db/SelectData?tableName=Equip";
                    this.Axios({
                        method: 'get',
                        url: urlnaGroup,
                        headers: {
                            'Content-type': 'application/x-www-form-urlencoded',
                        },
                    }).then((response) => {
                          let arrayLike = response.data.HttpData.data;
                          let getEquipNameLength = arrayLike.length;
                          for(var i=0;i<getEquipNameLength;i++)
                          {
                            let equipName_data ={'equip_no': arrayLike[i].equip_no, 'equip_nm': arrayLike[i].equip_nm, 'equipNameShow':false};
                            this.equipName.push(equipName_data);
                          }
                          this.initEquip();
                    })
                    .catch((error) => {
                            console.log(error);
                    });
                   //------获取设备子分组范围 end---------  
            },   
            initEquip: function(value){
                //清空勾选
                this.equipName.forEach(function(ele,index){ele.equipNameShow = false;});
                //设置勾选
                var selectEquip = value || this.selectEquip;
                if(this.equipUser != null && this.equipName != null)
                {
                    
                  var stringValue;
                  this.equipUser.forEach(function(ele,index){ if(ele.group_no == selectEquip && ele.equipcomb != null) {stringValue = ele.equipcomb;} });
                  this.equipName.forEach(function(ele1,index1){
                        if(stringValue != undefined && stringValue.split("#").indexOf(ele1.equip_no.toString()) > -1)
                        {
                            ele1.equipNameShow = true;
                        }
                    }); 

                }
            },
            EquipGroupClick: function(dt){
               if(this.selectEquip == dt.group_no) //改名
                 {
                  dt.isShow = !dt.isShow;
                 }
                else
                 {this.selectEquip = dt.group_no;this.initEquip(dt.group_no);}
            },  
            addEquipGroupClick: function(){
                var group_no_value;
                var groupArray = new Array();
                this.equipUser.forEach(function(ele1,index1){
                        groupArray[index1] = ele1.group_no;
                }); 
                group_no_value=Math.max.apply(null,groupArray)+1;
                console.log(group_no_value>1?group_no_value:1);

                let equipUser_data =
                {
                    'equipcomb': '',
                    'group_name': '新增设备分组',
                    'group_no':group_no_value>1?group_no_value:1,
                    'isShow':false
                };
                this.equipUser.push(equipUser_data);    
                //------新增设备分组 start---------
                let url = "/api/Db/insertEquipGroup";
                this.Axios.post(url,{'groupName': equipUser_data.group_name,'groupNo': equipUser_data.group_no},{
                    headers: {'Content-type': 'application/json',}
                }).then((response) => {
                    console.log(response);
                })
                .catch((error) => {
                    console.log(error);
                });
                //------新增设备分组 end---------
            },  
            removeEquipGroupClick: function(dt){
               
                this.$Modal.confirm({
                    title: '提示',
                    content: '<p style="font-size: 18px;position: relative;top: -6px;">确认删除该设备分组?</p>',
                    okText: '确认',
                    onOk: () => {
                        var msg = this.$Message;
                        var equipUser = this.equipUser;
                        //------删除分组 start---------
                        let urlna = "/api/Db/deleteEquipGroup";
                        this.Axios.post(urlna,{'tableName': 'EquipGroup','ifName': 'group_no','ifValue':dt.group_no},{
                            headers: {'Content-type': 'application/json',}
                        }).then((response) => {
                            equipUser.forEach(function(ele1,index1){
                                    if(ele1.group_no == dt.group_no)
                                    {
                                        equipUser.splice(index1,1); 
                                    }
                            }); 
                            msg.info('删除成功');
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                        //------删除分组 end---------

                        
                    },
                    cancelText: '取消'
                }); 
             
            },  
            saveEquipGroupClick: function(dt){
                dt.isShow =!dt.isShow;
              //插入数据库   
              this.updateCheckboxAxios('EquipGroup','group_name',dt.group_name,'group_no',dt.group_no);  
            },             
            allSelectEquip: function(value){
              var equipcombString = '#',equipName = this.equipName,selectEquip=this.selectEquip;
              if(value == "all")
                equipName.forEach(function(ele1,index1){
                       ele1.equipNameShow =  true;
                       equipcombString +=(ele1.equip_no+'#');
                }); 
              else
                equipName.forEach(function(ele1,index1){
                       ele1.equipNameShow =  false;
                }); 

              this.equipUser.forEach(function(ele,index){ if(ele.group_no == selectEquip) {ele.equipcomb =equipcombString;} });  
              //更新equipcomb
              this.updateCheckboxAxios('EquipGroup','equipcomb',equipcombString,'group_no',selectEquip);
               
            },               
            getAlmReport: function(){
                    //------管理范围 start---------
                    let urlna = "/api/Db/SelectData?tableName=AlmReport";
                    this.Axios({
                        method: 'get',
                        url: urlna,
                        headers: {
                            'Content-type': 'application/x-www-form-urlencoded',
                        },
                    }).then((response) => {
                          let arrayLike = response.data.HttpData.data;
                          let getAlmReportLength = arrayLike.length;
                          for(var i=0;i<getAlmReportLength;i++)
                          {
                            let AlmReport_data =
                                {
                                   'group_no': arrayLike[i].group_no,
                                   'Administrator': arrayLike[i].Administrator,
                                   'isShow':false,
                                };

                            this.AlmReportPeople.push(AlmReport_data.Administrator);
                            this.AlmReportEquip.push(AlmReport_data.group_no);

                            this.AlmReportData.push(AlmReport_data);
                            
                          }    

                          this.getEquipGroup('getAlmReport');
                    })
                    .catch((error) => {
                            console.log(error);
                    });
                   //------管理范围 end---------
            },   
            getWeekAlmReport: function(){
                    //------周排表 start---------
                    let urlna = "/api/Db/SelectData?tableName=WeekAlmReport";
                    this.Axios({
                        method: 'get',
                        url: urlna,
                        headers: {
                            'Content-type': 'application/x-www-form-urlencoded',
                        },
                    }).then((response) => {

                    })
                    .catch((error) => {
                            console.log(error);
                    });
                   //------周排表 end---------
            },   
            getSpeAlmReport: function(){
                    //------获取特定日期排表 start---------
                    let urlna = "/api/Db/SelectData?tableName=SpeAlmReport";
                    this.Axios({
                        method: 'get',
                        url: urlna,
                        headers: {
                            'Content-type': 'application/x-www-form-urlencoded',
                        },
                    }).then((response) => {

                    })
                    .catch((error) => {
                            console.log(error);
                    });
                   //------获取特定日期排表 end---------
            },   
            toggle:function(dt){
                dt.isShow =!dt.isShow;
            },
            toggleALL: function(dt){
               for(var i=0;i<dt.length;i++)
               {
                 dt[i].isShow = false;
               }
            }
        },
        directives: {
                focus: {
                update: function (el, {value}) {
                    if (value) {
                    el.focus()
                    }
                }
                }
        },
    }
</script>


<style lang="scss" src="../../assets/styles/sass/Schedule.scss"></style>