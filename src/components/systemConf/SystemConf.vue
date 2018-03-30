<template>
  <div class="system-conf">
    <Row class="wrap">
      <Col span="3" class="itemList">
      <p  v-for="(item,$index) in itemList" @click="loadInformation(item.m_iEquipNo,$index)" :class="$index==active?'clickActive':''">
        {{item.m_EquipNm}}
      </p>
    </Col>
    <Col span="21" class="itemDetail">
    <div class="common-tab">
      <Tabs type="card">
        <TabPane label="设备配置" >
          <div class="common-table">
            <table>
              <thead>
                <tr>
                  <th>设备号</th>
                  <th>设备名称</th>
                  <th>关联界面</th>
                  <th>关联视频</th>
                  <th>资产编号</th>
                  <th>预案号</th>
                  <th>显示报警</th>
                  <th>记录报警</th>
                  <th v-for="item in checkAlarm">{{item[1]}}</th>
                  <!-- <th>Email报警</th> -->
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in equipItem" @click="loadInfor()">
                  <td>{{item.equip_no}}</td>
                  <td>{{item.equip_nm}}</td>
                  <td>{{item.related_pic}}</td>
                  <td>{{item.related_video}}</td>
                  <td>{{item.ZiChanID}}</td>
                  <td>{{item.PlanNo}}</td>

                  <td v-for="item in alarmArrEq">
                    <Icon  v-if="item" type="ios-checkmark-outline" size="20" style="color:#2d8cf0;"></Icon>
                    <Icon  size="20"  v-else type="ios-circle-outline" ></Icon>
                  </td>
                </tr>

              </tbody>
            </table>
          </div>
        </TabPane>

        <TabPane label="模拟量配置">
          <div class="common-table">
            <table>
             <thead>
              <tr>
                <th>设备号</th>
                <th>模拟量编号</th>
                <th>模拟量名称</th>
                <th>下限值 </th>
                <th>回复下限值</th>
                <th>回复上限值</th>
                <th>上限值</th>
                <th>单位</th>
                <th>关联页面</th>
                <th>关联视频</th>
                <th>资产编号</th>
                <th>预案号</th>
                <th>曲线记录</th>
                <th>显示报警</th>
                <th>记录报警</th>
                <th v-for="item in checkAlarm">{{item[1]}}</th>

              </tr>
            </thead>
            <tbody>
              <tr v-for="item in yCItemDict" @click="loadInfor()">
                <td>{{item.equip_no}}</td>
                <td>{{item.yc_no}}</td>
                <td>{{item.yc_nm}}</td>
                <td>{{item.val_min}}</td>
                <td>{{item.restore_min}}</td>
                <td>{{item.restore_max}}</td>
                <td>{{item.val_max}}</td>
                <td>{{item.unit}}</td>
                <td>{{item.related_pic}}</td>
                <td>{{item.related_video}}</td>
                <td>{{item.ZiChanID}}</td>
                <td>{{item.PlanNo}}</td>
                <td>
                 <Icon  v-if="item.mapping" type="ios-checkmark-outline" size="20" style="color:#2d8cf0;"></Icon>
                 <Icon  size="20"  v-else type="ios-circle-outline" ></Icon>
                 <!-- {{item.mapping}} -->

               </td>
               <td v-for="item in alarmArrYc">
                <Icon  v-if="item" type="ios-checkmark-outline" size="20" style="color:#2d8cf0;"></Icon>
                <Icon  size="20"  v-else type="ios-circle-outline" ></Icon>
              </td>

            </tr>

          </tbody>
        </table>
      </div>
    </TabPane>
    <TabPane label="状态量配置">
      <div class="common-table">
       <table>
         <thead>
          <tr>
            <th>设备号</th>
            <th>模拟量编号</th>
            <th>状态量名称</th>
            <th>0-1事件 </th>
            <th>1-0事件</th>
            <th>关联页面</th>
            <th>关联视频</th>
            <th>资产编号</th>
            <th>预案号</th>
            <th>显示报警</th>
            <th>记录报警</th>
            <th v-for="item in checkAlarm">{{item[1]}}</th>


          </tr>
        </thead>
        <tbody>
          <tr v-for="item in yXItemDict" @click="loadInfor()">
            <td>{{item.equip_no}}</td>
            <td>{{item.yx_no}}</td>
            <td>{{item.yx_nm}}</td>
            <td>{{item.evt_01}}</td>
            <td>{{item.evt_10}}</td>
            <td>{{item.related_pic}}</td>
            <td>{{item.related_video}}</td>
            <td>{{item.ZiChanID}}</td>
            <td>{{item.PlanNo}}</td>
            <td v-for="item in alarmArrYx">
              <Icon  v-if="item" type="ios-checkmark-outline" size="20" style="color:#2d8cf0;"></Icon>
              <Icon  size="20"  v-else type="ios-circle-outline" ></Icon>
            </td>

          </tr>
        </tbody>
      </table>
    </div>
  </TabPane>
  <TabPane label="设置配置">
    <div class="common-table">
      <table>
       <thead>
        <tr>
          <th>设备号</th>
          <th>设置号</th>
          <th>状态量名称</th>
          <th>设置名称 </th>
          <th>设置类型</th>
          <th>操作命令</th>
          <th>操作参数</th>
          <th>记录</th>
          <th>动作</th>
          <th>值</th>
          <th>是否可以执行</th>                           
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in get_setparm" @click="loadInfor()">
          <td>{{item.equip_no}}</td>
          <td>{{item.set_no}}</td>
          <td>{{item.sta_n}}</td>
          <td>{{item.set_nm}}</td>
          <td>{{item.set_type}}</td>
          <td>{{item.main_instruction}}</td>
          <td>{{item.minor_instruction}}</td>
          <td>

           <Icon  v-if="item.record" type="ios-checkmark-outline" size="20" style="color:#2d8cf0;"></Icon>
           <Icon  size="20"  v-else type="ios-circle-outline" ></Icon>
         </td>
         <td>{{item.action}}

         </td>
         <td>{{item.value}}</td>
         <td>
          <Icon  v-if="item.canexecution" type="ios-checkmark-outline" size="20" style="color:#2d8cf0;"></Icon>
          <Icon  size="20"  v-else type="ios-circle-outline" ></Icon>
        </td>

      </tr>
    </tbody>
  </table>
</div>
</TabPane>
</Tabs>
</div>
</Col>
</Row>
<Modal
title="其他信息"
v-model="modal10"
class-name="vertical-center-modal">
<p>Content of dialog</p>
<p>Content of dialog</p>
<p>Content of dialog</p>
</Modal>
</div>
</template>

<script>

export default {
  data () {
    return {
      itemList:[],//左侧列表
      equipItem:[],//右侧设备配置
      yCItemDict:[],//右侧模拟量数据
      yXItemDict:[],//右侧状态量数据
      get_setparm:[],//右侧设置配置
      active:0,
      isCheck:true,
      noCheck:false,
      checkAlarm:[],
      alarmArrEq:[],
      alarmArrYc:[],
      alarmArrYx:[],
      modal10:false

    }
  },mounted (){
    this.init();
    this.getAlarm();

  },methods:{
    init(){
      this.Axios.post("/api/real/equip_state",{userName:window.localStorage.login_msg}).then(res=>{
        let response=res.data.HttpData.data;
        this.itemList=response;
        // console.log(response[0])
        this.loadInformation(response[0].m_iEquipNo,0)
      })
    },
    loadInformation(id,index){
      // console.log(123)
      // console.log(this.alarmArr)
      this.active=index;
      this.Axios.post("/oApi/GWService.asmx/GetSystemConfig",{table_name:'Equip',equip_no_list:id}).then(res1=>{//加载设备配置
       let response=res1.data.d;
       this.equipItem=JSON.parse(response);
       this.alarmSchemes(this.equipItem[0].alarm_scheme,this.alarmArrEq)
        // console.log(this.equipItem[0].alarm_scheme)
      });
      this.Axios.post("/oApi/GWService.asmx/GetSystemConfig",{table_name:'ycp',equip_no_list:id}).then(res2=>{//加载模拟量配置
        let data2=res2.data.d;
        this.yCItemDict=JSON.parse(data2);
        // console.log(this.yCItemDict)
        for(var i=0;i<this.yCItemDict.length;i++){
          this.alarmSchemes(this.yCItemDict[i].alarm_scheme,this.alarmArrYc)
        }
        
      });
      this.Axios.post("/oApi/GWService.asmx/GetSystemConfig",{table_name:'yxp',equip_no_list:id}).then(res3=>{//加载模拟量配置
        let data3=res3.data.d;
        this.yXItemDict=JSON.parse(data3);
        // console.log( this.yXItemDict)
        for(var i=0;i<this.yXItemDict.length;i++){
          this.alarmSchemes(this.yXItemDict[i].alarm_scheme,this.alarmArrYx)
        }
      });
       this.Axios.post("/oApi/GWService.asmx/GetSystemConfig",{table_name:'SetParm',equip_no_list:id}).then(res4=>{//加载设置配置
        let data4=res4.data.d;
        this.get_setparm=JSON.parse(data4);

      });
     },
    getAlarm(){//获取报警信息
      this.Axios.post("/oApi/GWService.asmx/QueryTableData",{tableName:'AlarmProc'}).then(res=>{//加载设置配置
        // console.log(res)
        let response=JSON.parse(res.data.d);
        for(var i=0;i<response.length;i++){
          var arr=[];
          arr[0]=response[i].Proc_Code;
          arr[1]=response[i].Proc_name;
          this.checkAlarm.push(arr);
        }

        // console.log(this.checkAlarm)
      });
    },
    alarmSchemes(alaCode,arrName){//判断显示报警,记录报警,email报警,选项累加
      console.log(arrName)

      var _this=this;
      if((alaCode & 1)>0){
       arrName[0]=true
     }else{
      arrName[0]=false
    };

    if((alaCode & 2)>0){
     arrName[1]=true
   }else{
    arrName[1]=false
  };
        // console.log(this.checkAlarm.length)
        for(var j=0;j<this.checkAlarm.length;j++){
          var alays = parseInt(this.checkAlarm[j][0]);
          if ((alaCode & alays) > 0) {
            var k = j + 2;
            arrName[k]=true
          }
          else {
            var k = j + 2; 
            arrName[k]=false
          }
        }
        // console.log(_this.alarmArr)
      },
      loadInfor(){
        this.modal10=true
      }
    }
  }
  </script>

  <style scope>
  .vertical-center-modal{
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .ivu-modal{
    top: 0;
  }
  .system-conf{width:100%;height:100%;}
  .system-conf .wrap{width:100%;height:90%;}
  .system-conf .wrap .itemDetail{height:100%;overflow: hidden;padding-left: 15px;}
  .system-conf .wrap .itemList{height:100%;overflow-y: scroll;}
  .itemList::-webkit-scrollbar {/*滚动条整体样式*/
    width: 4px;     /*高宽分别对应横竖滚动条的尺寸*/
    height: 4px;
  }
  .itemList::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
    border-radius: 5px;
    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    background: rgba(0,0,0,0.2);
  }
  .itemList::-webkit-scrollbar-track {/*滚动条里面轨道*/
    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    border-radius: 0;
    background: rgba(0,0,0,0.1);
  }
  .itemList p{width:80%;
    height:50px;
    line-height: 50px;
    background: #f9f9f9;
    margin:10px auto;
    font-size:15px;
    text-align: center;
  }
  .itemList p:hover{
    border:1px solid #09b7f7;
    box-sizing: border-box;
    color:#09b7f7;
    cursor:pointer;
  }
  .clickActive{
   border:1px solid #09b7f7;
   box-sizing: border-box;
   color:#09b7f7;
 }
 .common-moal .ivu-modal-content {
  border-radius: 0px;
}

.common-moal .ivu-modal-header {
  padding: 8px 16px;
}

.common-moal .ivu-modal-header p,
.common-moal .ivu-modal-header-inner {
  height: 30px;
  line-height: 35px;
  font-size: 16px;
  color: #1c2438;
  font-weight: 500;
}

.common-moal .ivu-btn {
  font-weight: 500;
  padding: 5px 20px;
  font-size: 14px;
  border-radius: 0px;

}

.common-moal .ivu-btn-text {
  color: #fff;
  background-color: #B5B5B5;
  border-color: #B5B5B5;
  font-size: 14px;
}

.color-error {
  color: #eb303a;
}

.color-warn {
  color: #F29100;
}

.color-info {
  color: #35b458;
}

.color-set {
  color: #eb303a;
}

.common-table table {
  width:100%;
  height:80%;
  margin: 0;
  padding: 0;
  /*border:1px solid #dddee1;*/
}

.common-table table thead tr {
  background: #fff;
}

.common-table table thead tr th {
  padding: 17px 0;
  width:auto;
  color: #858585;
  font-size: 16px;
  font-weight: 500;
  text-align: center;
}

.common-table table thead tr th:first-child {
  text-align: center;
}

.common-table table tbody tr td {
  padding: 11px 0;
  color: #2e2e2e;
  font-size: 16px;
  font-weight: 500;
  text-align: center;
  /*min-width: 168px;*/
}

.common-table table tbody tr td:first-child {
  text-align: center;
}

.common-table table tbody tr td>i {
  width: 20px;
  height: 20px;
  font-size: 18px;
}

.common-table table tbody tr td>button {
  padding: 8px 9px;
  background: #05a3e5;
  font-size: 14px;
  color: #fff;
  border: 0;
}

.common-table table tbody tr {
  /*-webkit-transition: all 300ms linear 0s;-moz-transition: all 300ms linear 0s;-o-transition: all 300ms linear 0s;transition: all 300ms linear 0s;*/
}

.common-table table tbody tr:nth-child(even) {
  background: #fff;
}

.common-table table tbody tr:nth-child(odd) {
  background: #f9f9f9;
}

.common-table table tbody>.even {
  background: rgba(0, 0, 0, .13)!important;
}

.common-table table tbody>.odd {
  background-color: transparent!important;
}

.common-table table tbody tr:hover {
  background: rgba(255, 255, 255, .2)!important;
  border:1px solid #2d8cf0;
}

.common-table table tbody>.active {
  background: rgba(255, 255, 255, .2)!important;
}

.common-table table tbody>.hiddentd {
  background: rgba(0, 0, 0, .13)!important;
}

.common-table table tbody>.hiddentd:hover {
  background: rgba(0, 0, 0, .13)!important;
}

.common-table table tbody>.hiddentd td {
  padding: 0!important;
}

.common-tab {}
/* 主内容界面边框大小 */

.gw-index .main .main-body .snapashot {
  width: 100%;
  height: 100%;
  -webkit-box-shadow: 0px 0px 0px 0px #dadada;
  box-shadow: 0px 0px 0px 0px #dadada;
}
/* tab列表容器边框 */

.common-tab .ivu-tabs.ivu-tabs-card>.ivu-tabs-bar {
  border-bottom: 0px;
}
/* tab列表边框 */

.common-tab .ivu-tabs.ivu-tabs-card>.ivu-tabs-bar .ivu-tabs-nav {
  border: 1px solid #dddee1;
  box-sizing: border-box;
}
/* tab列表高度 */

.common-tab .ivu-tabs.ivu-tabs-card>.ivu-tabs-bar .ivu-tabs-nav-container {
  height: 50px;
}
/* tab内容高度 */

.common-tab .ivu-tabs-card>.ivu-tabs-content {

  /*border:1px solid red;*/
  margin-top: -16px;
}
/* tab内容背景色、边框 */

.common-tab .ivu-tabs-card>.ivu-tabs-content>.ivu-tabs-tabpane {
  background: #fff;
  border-top: 1px solid #dddee1;
  border-left: 1px solid #dddee1;
  /*position: absolute;*/
}
/* tab列表默认大小、颜色样式 */

.common-tab .ivu-tabs.ivu-tabs-card>.ivu-tabs-bar .ivu-tabs-tab {
  margin: 0;
  height: 49px;
  line-height: 20px;
  color: #2e2e2e;
  font-size: 16px;
  padding: 13px 25px 16px;
  text-align: center;
  min-width: 123px;
  border: 0px;
  border-right: 1px solid #dddee1;
  border-top: 3px solid rgba(255, 255, 255, 0);
  box-sizing: border-box;
  border-radius: 0;
  -webkit-transition: all .3s ease-in-out;
  transition: all .3s ease-in-out;
  background: #f8f8f9
}
/* tab列表最后一个右边框为0 */

.common-tab .ivu-tabs.ivu-tabs-card>.ivu-tabs-bar .ivu-tabs-tab:last-child {
  border-right: 0px;
}
/* tab列表选中样式 */

.common-tab .ivu-tabs.ivu-tabs-card>.ivu-tabs-bar .ivu-tabs-tab-active {
  height: 49px;
  background: #fff;
  box-sizing: border-box;
  border-top: 3px solid #09B7F7;
  border-right: 1px solid #dddee1;
  -webkit-transform: translateZ(0);
  transform: translateZ(0);
  color: #2e2e2e;
}
</style>
