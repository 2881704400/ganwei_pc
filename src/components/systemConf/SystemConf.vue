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
             <!-- <Table :columns="columnsEq" :data="dataEq"></Table> -->
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
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in equipItem" @click="loadInfor(0,'')">
                  <td>{{item.equip_no}}</td>
                  <td>{{item.equip_nm}}</td>
                  <td>{{item.related_pic}}</td>
                  <td v-if="contentEq.length>0">{{contentEq[0]}}</td>
                  <td v-else></td>
                   <td v-if="contentEq.length>0">{{contentEq[1]}}</td>
                  <td v-else></td>

                  <td>{{item.PlanNo}}</td>

                  <td v-for="item in alarmArrEq">
                    <Icon  v-if="item=='true'" type="ios-checkmark-outline" size="20" style="color:#2d8cf0;"></Icon>
                    <Icon  size="20"  v-else type="ios-circle-outline" ></Icon>
                  </td>
                  <td class="operta" @click.stop="edict(0,'')">编辑</td>
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
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item,$index) in yCItemDict" @click="loadInfor(1,$index)">
                <td>{{item.equip_no}}</td>
                <td>{{item.yc_no}}</td>
                <td>{{item.yc_nm}}</td>
                <td>{{item.val_min}}</td>
                <td>{{item.restore_min}}</td>
                <td>{{item.restore_max}}</td>
                <td>{{item.val_max}}</td>
                <td>{{item.unit}}</td>
                <td>{{item.related_pic}}</td>
                <td v-if="contentYc.length>0">{{contentYc[0][$index]}}</td>
                <td v-else></td>
                <!-- <td>{{contentYc[0][$index]}}</td> -->
                <td v-if="contentYc.length>0">{{contentYc[1][$index]}}</td>
                <td v-else></td>
                <!-- <td>{{contentYc[1][$index]}}</td> -->
                <td>{{item.PlanNo}}</td>
                <td>
                 <Icon  v-if="item.mapping" type="ios-checkmark-outline" size="20" style="color:#2d8cf0;"></Icon>
                 <Icon  size="20"  v-else type="ios-circle-outline" ></Icon>
                 <!-- {{item.mapping}} -->

               </td>
               <td v-for="item in alarmArrYc">
                <Icon  v-if="item=='true'" type="ios-checkmark-outline" size="20" style="color:#2d8cf0;"></Icon>
                <Icon  size="20"  v-else type="ios-circle-outline" ></Icon>
              </td>
               <td class="operta" @click.stop="edict(1,$index)">编辑</td>
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
            <th>状态量编号</th>
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
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item,$index) in yXItemDict" @click="loadInfor(2,$index)">
            <td>{{item.equip_no}}</td>
            <td>{{item.yx_no}}</td>
            <td>{{item.yx_nm}}</td>
            <td>{{item.evt_01}}</td>
            <td>{{item.evt_10}}</td>
            <td>{{item.related_pic}}</td>
            <td v-if="contentYx.length>0">{{contentYx[0][$index]}}</td>
                <td v-else></td>
            <!-- <td>{{contentYx[0][$index]}}</td> -->
            <td v-if="contentYx.length>0">{{contentYx[1][$index]}}</td>
                <td v-else></td>
            <!-- <td>{{contentYx[1][$index]}}</td> -->
            <td>{{item.PlanNo}}</td>
            <td v-for="item in alarmArrYx">
              <Icon  v-if="item=='true'" type="ios-checkmark-outline" size="20" style="color:#2d8cf0;"></Icon>
              <Icon  size="20"  v-else type="ios-circle-outline" ></Icon>
            </td>
             <td class="operta" @click.stop="edict(2,$index)">编辑</td>
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
          <th>操作</th>                           
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item,$index) in get_setparm" >
          <td>{{item.equip_no}}</td>
          <td>{{item.set_no}}</td>
          <td>{{item.sta_n}}</td>
          <td>{{item.set_nm}}</td>
          <td>{{item.set_type}}</td>
          <td>{{item.main_instruction}}</td>
          <td>{{item.minor_instruction}}</td>
          <td>

           <Icon  v-if="item.record=='True'||item.record=='true'" type="ios-checkmark-outline" size="20" style="color:#2d8cf0;"></Icon>
           <Icon  size="20"  v-else type="ios-circle-outline" ></Icon>
         </td>
         <td>{{item.action}}

         </td>
         <td>{{item.value}}</td>
         <td>
          <Icon  v-if="item.canexecution=='True'||item.canexecution=='true'" type="ios-checkmark-outline" size="20" style="color:#2d8cf0;"></Icon>
          <Icon  size="20"  v-else type="ios-circle-outline" ></Icon>
        </td>
         <td class="operta" @click.stop="edict(3,$index)">编辑</td>
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
      title="查看其他信息"
      v-model="modal1"
      class-name="vertical-center-modal" :styles="{top: '50px',width:'800px'}" class="uploadWrap">
       <Row>
        <Col span="12">
               <p class="moreInforWord" v-for="(key,val) in moreInfor" :key="val" v-if="val>=0&&val<=7">
                  <span class="lableName">{{key.name}}</span>:<span class="labelVal">{{key.value}}</span> 
               </p>
        </Col>
         <Col span="12">
              <p class="moreInforWord" v-for="(key,val) in moreInfor" :key="val" v-if="val>7">
                  <span class="lableName">{{key.name}}</span>:<span class="labelVal">{{key.value}}</span> 
               </p>
        </Col>
       </Row>

     
     
  </Modal>
  <Modal
      title="编辑信息"
      v-model="modal2"
      class-name="vertical-center-modal"  :styles="{top: '50px',width:'800px'}" class="uploadWrap" @on-ok="configData(configIndex)">
      <Row>
        <Col span="13">
          <p v-for="(item,index) in uploadInfor"   style="margin-top:10px;">

            <span  style="width:140px;display:inline-block;">{{item.name}}:</span>
            <Input v-model="item.value"  v-if="index==0||item.name=='模拟量编号'||item.name=='状态量编号'||item.name=='设置号'" disabled placeholder="请输入对应值" style="width: 200px;margin-left:20px;"></Input>
            <Input v-model="item.value"  v-else="index!=0" placeholder="请输入对应值" style="width: 200px;margin-left:20px;"></Input>
          </p>
          
        </Col>
        <Col span="11">

        <p style="margin-top:10px;" v-show="isSet_P">
          <span style="width:100px;display:inline-block;">关联视频:</span>
          <Select style="width:200px;margin-left:20px;"  v-model="loadDefVideo"  ><!--:label-in-value="true" @on-change="v=>{getC(v,'type')}" -->
                <Option v-for="item in  videoList" :key="item.ID"   :value="item.videoCode" >{{item.ChannelName}}</Option>
                
          </Select>
        </p>
         <p style="margin-top:10px;" v-show="isSet_P">
          <span style="width:100px;display:inline-block;">资产编号:</span>
          <Select  style="width:200px;margin-left:20px;"  v-model="loadDefZic">
                <Option v-for="item in  zizhanList" :key="item.ZiChanID" :value="item.ZiChanID">{{item.ZiChanName}}</Option>
          </Select>
        </p>
        <p style="margin-top:10px;" v-show="isSet_P">
          <span style="width:100px;display:inline-block;">预案号:</span>
          <Select  style="width:200px;margin-left:20px;" v-model="loadDefPlan">
                <Option v-for="item in  planList" :key="item.PlanNo" :value="item.PlanNo">{{item.PlanNo}}</Option>
          </Select>
        </p>
         <p style="margin-top:10px;" v-show="isSet_P">
          <span style="width:100px;display:inline-block;">是否显示报警 :</span>
          <Select  style="width:200px;margin-left:20px;" v-model="switchArr[0]">
               <Option v-for="item in swit" :key="item.keys" :value="item.keys">{{item.txt}}</Option>                    
          </Select>
        </p> 
         <p style="margin-top:10px;" v-show="isSet_P">
          <span style="width:100px;display:inline-block;">是否记录报警 :</span>
          <Select  style="width:200px;margin-left:20px;" v-model="switchArr[1]">
               <Option v-for="item in swit" :key="item.keys" :value="item.keys">{{item.txt}}</Option>               
          </Select>
        </p>  
        <p style="margin-top:10px;" v-show="isSet_P" v-for="(item,index) in checkAlarm">
          <span style="width:100px;display:inline-block;">是否{{item[1]}}:</span>
          <Select  style="width:200px;margin-left:20px;" v-model="switchArr[2+index]">
             <Option v-for="item in swit" :key="item.keys" :value="item.keys">{{item.txt}}</Option>

          </Select>
        </p>
        <p style="margin-top:10px;" v-show="isYc">
          <span style="width:100px;display:inline-block;" >是否曲线记录:</span>
          <Select style="width:200px;margin-left:20px;" v-model="curve_rcd">
             <Option v-for="item in switB" :key="item.keys" :value="item.keys">{{item.txt}}</Option>
          </Select>
        </p>
         <p style="margin-top:10px;" v-show="isYc">
          <span style="width:100px;display:inline-block;" >是否比例变换:</span>
          <Select style="width:200px;margin-left:20px;" v-model="scaleTran">
             <Option v-for="item in switB" :key="item.keys" :value="item.keys">{{item.txt}}</Option>
          </Select>
        </p>
         <p style="margin-top:10px;"  v-show="!isSet_P">
          <span style="width:100px;display:inline-block;">是否记录:</span>
          <Select  style="width:200px;margin-left:20px;" v-model="switchBArr[0]">
              <Option v-for="item in switB" :key="item.keys" :value="item.keys">{{item.txt}}</Option>
          </Select>
        </p>   
        <p style="margin-top:10px;"  v-show="!isSet_P">
          <span style="width:100px;display:inline-block;">是否可执行:</span>
          <Select  style="width:200px;margin-left:20px;" v-model="switchBArr[1]">
              <Option v-for="item in switB" :key="item.keys" :value="item.keys">{{item.txt}}</Option>
          </Select>
        </p>  
        <p style="margin-top:10px;"  v-show="isYx">
          <span style="width:100px;display:inline-block;">是否取反:</span>
          <Select  style="width:200px;margin-left:20px;" v-model="negate">
              <Option v-for="item in switB" :key="item.keys" :value="item.keys">{{item.txt}}</Option>
          </Select>
        </p>   
        </Col>
    </Row>

     
  </Modal>
</div>
</template>

<script>

export default {
  data () {
    return {
      // columnsEq:[
      //       {
      //         title:"设备号",
      //         key:"equip_no"  
      //       },{
      //         title:"设备名称",
      //         key:"equip_nm" 
      //       },{
      //         title:"关联界面",
      //         key:"related_pic" 
      //       },{
      //         title:"关联视频",
      //         key:"related_video" 
      //       },{
      //         title:"资产编号",
      //         key:"ZiChanID" 
      //       },{
      //         title:"预案号",
      //         key:"PlanNo" 
      //       },{
      //         title:"显示报警",
      //         key:"showAlarm" 
      //       },{
      //         title:"记录报警",
      //         key:"markAlarm" 
      //       },{
      //         title:"操作",
      //         key:"deal" 
      //       }  
      // ],
      // dataEq:[],
      itemList:[],//左侧列表
      equipItem:[],//右侧设备配置
      yCItemDict:[],//右侧模拟量数据
      yXItemDict:[],//右侧状态量数据
      get_setparm:[],//右侧设置配置
      active:0,
      checkAlarm:[],
      alarmArrEq:[],
      alarmArrYc:[],
      alarmArrYx:[],
      moreInfor:[],
      modal1:false,
      modal2:false,
      uploadInfor:[],
      videoList:[],//视频表获取关联视频
      zizhanList:[],//资产编号
      planList:[],//预案号
      viZiplListEq:[],
      viZiplListYc:[],
      viZiplListYx:[],
      loadDefVideo:[],//默认选中的视频
      loadDefZic:"",
      loadDefPlan:"",
      swit:[
           {txt:"是",keys:'true'},
           {txt:"否",keys:'false'}
      ],
      switchArr:[],
      isSet_P:true,
      isYx:false,
      switB:[
           {txt:"是",keys:'True'},
           {txt:"否",keys:'False'}
      ],
      switchBArr:[],//设置配置选择;
      isYc:false,
      curve_rcd:"",//是否曲线记录
      negate:"",//是否取反，
      scaleTran:"",//是否比例变换
      configIndex:0,
      equipId:0,//当前设备id
      videoIdUp:[],//关联视频字段
      zichanUp:[],//资产字段
      alarmCode:0,//报警
      contentEq:[],//展示内容
      contentYc:[],//展示内容
      contentYx:[]//展示内容
    }
  },mounted (){
    this.init();
    this.getAlarm();
    // this.getVideoList();

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
      this.active=index;
      this.equipId=id;
      this.Axios.post("/oApi/GWService.asmx/GetSystemConfig",{table_name:'Equip',equip_no_list:id}).then(res1=>{//加载设备配置
       let response=res1.data.d;
       this.equipItem=JSON.parse(response);
       console.log(res1)
      //  this.alarmSchemes(this.equipItem[0].alarm_scheme,this.alarmArrEq)
      //  this.getVideoList(id)
      //  this.getZiChan(id)
      //  this.getPlan(id)
        // console.log(response)
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
    },getVideoList(id){//视频
        this.Axios.post("/api/GWServiceWebAPI/get_DataByTableName",{TableName :"GW_VideoInfo"}).then(res=>{
        let datas=res.data.HttpData.data;
        for(var i=0;i<datas.length;i++){
            var item={
                ChannelName:datas[i].ChannelName,
                videoCode:datas[i].EquipNum+","+datas[i].ID
            }
            this.videoList.push(item)
        }
        let code=this.equipItem[0].related_video;
        for(var i=0;i<this.videoList.length;i++){
          if(code== this.videoList[i].videoCode){
              this.viZiplListEq.push(this.videoList[i].videoCode);
              this.contentEq.push(this.videoList[i].ChannelName)
          }
        }

        let arr=[];
        let arrName=[]
        for(var i=0;i<this.yCItemDict.length;i++){
          let codeYc=this.yCItemDict[i].related_video;
          
          for(var j=0;j<this.videoList.length;j++){
            if(codeYc==this.videoList[j].videoCode){
              arr.push(this.videoList[j].videoCode)
              arrName.push(this.videoList[j].ChannelName)
            }
          }
         
        }
        this.contentYc[0]=arrName;
        // console.log(this.contentYc)
        this.viZiplListYc[0]=arr;

        let arr2=[];
        let arr2Name=[];
        for(var i=0;i<this.yXItemDict.length;i++){
          let codeYx=this.yXItemDict[i].related_video;
          for(var j=0;j<this.videoList.length;j++){
            if(codeYx==this.videoList[j].videoCode){
              arr2.push(this.videoList[j].videoCode)
              arr2Name.push(this.videoList[j].ChannelName)
            }
          }
         
        }
        this.viZiplListYx[0]=arr2;
        this.contentYx[0]=arr2Name;
      });
    },
    getZiChan(id){//资产表
        this.Axios.post("/api/GWServiceWebAPI/get_DataByTableName",{TableName:'GWZiChanTable'}).then(res=>{    
        // this.zizhanList
        let datas=res.data.HttpData.data;
        //console.log(datas)
        for(var i=0;i<datas.length;i++){
            let item={
              ZiChanID:datas[i].ZiChanID,
              ZiChanName:datas[i].ZiChanName
            }
            this.zizhanList.push(item)
        }
        let code=this.equipItem[0].ZiChanID;
        for(var i=0;i<this.zizhanList.length;i++){
          if(code==this.zizhanList[i].ZiChanID){
            // this.defZichan=i
            this.viZiplListEq.push(this.zizhanList[i].ZiChanID);
            this.contentEq.push(this.zizhanList[i].ZiChanName)
          }
        }
        let arr=[];
        let arrName=[];
        for(var i=0;i<this.yCItemDict.length;i++){
          let codeYc=this.yCItemDict[i].ZiChanID
          
          for(var j=0;j<this.zizhanList.length;j++){
            if(this.zizhanList[j].ZiChanID==codeYc){
              arr.push(this.zizhanList[j].ZiChanID)
              arrName.push(this.zizhanList[j].ZiChanName)
                
            }
          }
         
        }
         this.viZiplListYc[1]=arr;
         this.contentYc[1]=arrName;
        let arr2=[];
        let arr2Name=[];
        for(var i=0;i<this.yXItemDict.length;i++){
          let codeYx=this.yXItemDict[i].ZiChanID
          
          for(var j=0;j<this.zizhanList.length;j++){
            if(this.zizhanList[j].ZiChanID==codeYx){
              arr2.push(this.zizhanList[j].ZiChanID)
              arr2Name.push(this.zizhanList[j].ZiChanName)
            }
          }
         
        }
         this.viZiplListYx[1]=arr2;
         this.contentYx[1]=arr2Name;
        
      });
    },
     getPlan(id){//预案
        this.Axios.post("/api/GWServiceWebAPI/get_DataByTableName",{TableName:'GWPlan'}).then(res=>{
          // console.log(res)
        this.planList=res.data.HttpData.data;
        let code=this.equipItem[0].PlanNo;
        for(var i=0;i<this.planList.length;i++){
          if(code==this.planList[i].PlanNo){
            // this.defPlan=i
            this.viZiplListEq.push(this.planList[i].PlanNo);
          }
        }     
      });
    },
    alarmSchemes(alaCode,arrName){
    //判断显示报警,记录报警,email报警,选项累加
      //console.log(arrName)

        var _this=this;
        if((alaCode & 1)>0){
             arrName[0]='true'
        }else{
            arrName[0]='false'
        };

        if((alaCode & 2)>0){
           arrName[1]='true'
         }else{
          arrName[1]='false'
        };
        // console.log(this.checkAlarm.length)
        for(var j=0;j<this.checkAlarm.length;j++){
          var alays = parseInt(this.checkAlarm[j][0]);
          if ((alaCode & alays) > 0) {
            var k = j + 2;
            arrName[k]='true'
          }
          else {
            var k = j + 2; 
            arrName[k]='false'
          }
        }
        // console.log(_this.alarmArr)
      },getvideo(){}
      ,
      loadInfor(num,index){
         this.modal1=true;
          switch (num){
          case 0:
          this.moreInfor=[             
                {name:"设备属性",value:this.equipItem[0].equip_detail},
                {name:"通讯刷新周期",value:this.equipItem[0].acc_cyc},
                {name:"通故障处理意见",value:this.equipItem[0].proc_advice},
                {name:"故障提示",value:this.equipItem[0].out_of_contact},
                {name:"故障恢复提示",value:this.equipItem[0].contacted},
                {name:"报警声音文件",value:this.equipItem[0].event_wav},
                {name:"通讯端口",value:this.equipItem[0].local_addr},
                {name:"设备地址",value:this.equipItem[0].equip_addr},
                {name:"通讯参数",value:this.equipItem[0].communication_param},
                {name:"通讯时间参数",value:this.equipItem[0].communication_time_param},
                {name:"报警升级周期（分钟）",value:this.equipItem[0].AlarmRiseCycle},
                {name:"模板设备号",value:this.equipItem[0].raw_equip_no},
                {name:"附表名称",value:this.equipItem[0].tabname},
                {name:"属性",value:this.equipItem[0].attrib},
                {name:"安全时段",value:this.equipItem[0].SafeTime}
              ];
          break;
          case 1:

           this.moreInfor=[
                {name:"比例变换",value:this.yCItemDict[index].mapping=="True"||this.yCItemDict[index].mapping=="true"?"已变换":"未变换"},
                {name:"曲线记录阈值",value:this.yCItemDict[index].curve_limit},
                {name:"实测最小值",value:this.yCItemDict[index].yc_min},
                {name:"实测最大值",value:this.yCItemDict[index].yc_max},
                {name:"最小值",value:this.yCItemDict[index].physic_min},
                {name:"最大值",value:this.yCItemDict[index].physic_max},
                {name:"属性值",value:this.yCItemDict[index].val_trait},
                {name:"操作命令",value:this.yCItemDict[index].main_instruction},
                {name:"操作参数",value:this.yCItemDict[index].minor_instruction},
                {name:"越线滞纳时间（秒）",value:this.yCItemDict[index].alarm_acceptable_time},
                {name:"恢复滞纳时间（秒）",value:this.yCItemDict[index].alarm_repeat_time},
                {name:"重复报警时间（分钟）",value:this.yCItemDict[index].restore_acceptable_time},
                {name:"处理意见",value:this.yCItemDict[index].proc_advice},
                {name:"报警级别",value:this.yCItemDict[index].lvl_level},
                {name:"报警升级周期",value:this.yCItemDict[index].AlarmRiseCycle},
                {name:"越下限事件",value:this.yCItemDict[index].outmin_evt},
                {name:"越上限事件",value:this.yCItemDict[index].outmax_evt},
                {name:"声音文件",value:this.yCItemDict[index].wave_file},
                {name:"报警屏蔽",value:this.yCItemDict[index].alarm_shield},
                {name:"安全时段",value:this.yCItemDict[index].SafeTime}
              ];
             
          break;
           case 2:
          // this.modalYx=true;
          this.moreInfor=[
                {name:"取反",value:this.yXItemDict[index].inversion=="True"||this.yXItemDict[index].inversion=="true"?"已取反":"未取反"}, 
                {name:"处理意见0-1",value:this.yXItemDict[index].proc_advice_r}, 
                {name:"处理意见1-0",value:this.yXItemDict[index].proc_advice_d},
                {name:"0-1级别",value:this.yXItemDict[index].level_r},
                {name:"1-0级别",value:this.yXItemDict[index].level_d}, 
                {name:"初始状态",value:this.yXItemDict[index].initval},
                {name: "属性值",value:this.yXItemDict[index].val_trait}, 
                {name:"操作命令",value:this.yXItemDict[index].main_instruction}, 
                {name:"操作参数",value:this.yXItemDict[index].minor_instruction}, 
                {name:"越线滞纳时间（秒）",value:this.yXItemDict[index].alarm_acceptable_time}, 
                {name:"恢复滞纳时间（秒）",value:this.yXItemDict[index].alarm_repeat_time}, 
                {name:"重复报警时间（分钟）",value:this.yXItemDict[index].restore_acceptable_time},
                {name: "声音文件",value:this.yXItemDict[index].wave_file},
                {name: "报警屏蔽",value:this.yXItemDict[index].alarm_shield}, 
                {name:"报警升级周期（分钟）",value:this.yXItemDict[index].AlarmRiseCycle}, 
                {name:"安全时段",value:this.yXItemDict[index].SafeTime}

                ];
          break;

        }

      },
      edict(num,index){

        this.modal2=true;
        switch (num)
        {
          case 0:
          this.uploadInfor=[];
          this.loadDefVideo=[];
          this.loadDefZic=[];
          this.loadDefPlan=[];
          this.switchArr=this.alarmArrEq;
          this.isSet_P=true;
          this.isYc=false;
          this.isYx=false;
          
          // console.log(this.equipItem);
          this.uploadInfor=[
                {name:"设备号",value:this.equipItem[0].equip_no,listName:'equip_no'},
                {name:"设备名称",value:this.equipItem[0].equip_nm,listName:'equip_nm'},
                {name:"关联界面",value:this.equipItem[0].related_pic,listName:'related_pic'},
                {name:"设备属性",value:this.equipItem[0].equip_detail,listName:'equip_detail'},
                {name:"通讯刷新周期",value:this.equipItem[0].acc_cyc,listName:'acc_cyc'},
                {name:"通故障处理意见",value:this.equipItem[0].proc_advice,listName:'proc_advice'},
                {name:"故障提示",value:this.equipItem[0].out_of_contact,listName:'out_of_contact'},
                {name:"故障恢复提示",value:this.equipItem[0].contacted,listName:'contacted'},
                {name:"报警声音文件",value:this.equipItem[0].event_wav,listName:'event_wav'},
                {name:"通讯端口",value:this.equipItem[0].local_addr,listName:'local_addr'},
                {name:"设备地址",value:this.equipItem[0].equip_addr,listName:'equip_addr'},
                {name:"通讯参数",value:this.equipItem[0].communication_param,listName:'communication_param'},
                {name:"通讯时间参数",value:this.equipItem[0].communication_time_param,listName:'communication_time_param'},
                {name:"报警升级周期（分钟）",value:this.equipItem[0].AlarmRiseCycle,listName:'AlarmRiseCycle'},
                {name:"模板设备号",value:this.equipItem[0].raw_equip_no,listName:'raw_equip_no'},
                {name:"附表名称",value:this.equipItem[0].tabname,listName:'tabname'},
                {name:"属性",value:this.equipItem[0].attrib,listName:'attrib'},
                {name:"安全时段",value:this.equipItem[0].SafeTime,listName:'SafeTime'}
              ];
            //console.log(this.viZiplListEq)
            this.loadDefVideo=this.viZiplListEq[0];
            this.loadDefZic=this.viZiplListEq[1];
            this.loadDefPlan=this.viZiplListEq[2];
            this.configIndex=num;
          break;
          case 1:
          this.uploadInfor=[];
          this.uploadInfor=[];
           this.loadDefVideo=[];
            this.loadDefZic=[];
            this.loadDefPlan=[];
            this.switchArr=this.alarmArrYc;
            this.isSet_P=true;
            this.isYc=true;
             this.isYx=false;
            this.curve_rcd="";
            this.scaleTran="";
          // console.log(this.yCItemDict);
           this.uploadInfor=[
                {name:"设备号",value:this.yCItemDict[index].equip_no,listName:'equip_no'},
                {name:"模拟量编号",value:this.yCItemDict[index].yc_no,listName:'yc_no'},
                {name:"模拟量名称",value:this.yCItemDict[index].yc_nm,listName:'yc_nm'},
                {name:"下限值  ",value:this.yCItemDict[index].val_min,listName:'val_min'},
                {name:"回复下限值",value:this.yCItemDict[index].restore_min,listName:'restore_min'},
                {name:"回复上限值",value:this.yCItemDict[index].restore_max,listName:'restore_max'},
                {name:"上限值",value:this.yCItemDict[index].val_max,listName:'val_max'},
                {name:"单位",value:this.yCItemDict[index].unit,listName:'unit'},
                {name:"关联页面",value:this.yCItemDict[index].related_pic,listName:'related_pic'},
                

                // {name:"比例变换",value:this.yCItemDict[index].mapping=="True"||this.yCItemDict[index].mapping=="true"?"已变换":"未变换"},
                {name:"曲线记录阈值",value:this.yCItemDict[index].curve_limit,listName:'curve_limit'},
                {name:"实测最小值",value:this.yCItemDict[index].yc_min,listName:'yc_min'},
                {name:"实测最大值",value:this.yCItemDict[index].yc_max,listName:'yc_max'},
                {name:"最小值",value:this.yCItemDict[index].physic_min,listName:'physic_min'},
                {name:"最大值",value:this.yCItemDict[index].physic_max,listName:'physic_max'},
                {name:"属性值",value:this.yCItemDict[index].val_trait,listName:'val_trait'},
                {name:"操作命令",value:this.yCItemDict[index].main_instruction,listName:'main_instruction'},
                {name:"操作参数",value:this.yCItemDict[index].minor_instruction,listName:'minor_instruction'},
                {name:"越线滞纳时间（秒）",value:this.yCItemDict[index].alarm_acceptable_time,listName:'alarm_acceptable_time'},
                {name:"恢复滞纳时间（秒）",value:this.yCItemDict[index].alarm_repeat_time,listName:'alarm_repeat_time'},
                {name:"重复报警时间（分钟）",value:this.yCItemDict[index].restore_acceptable_time,listName:'restore_acceptable_time'},
                {name:"处理意见",value:this.yCItemDict[index].proc_advice,listName:'proc_advice'},
                {name:"报警级别",value:this.yCItemDict[index].lvl_level,listName:'lvl_level'},
                {name:"报警升级周期",value:this.yCItemDict[index].AlarmRiseCycle,listName:'AlarmRiseCycle'},
                {name:"越下限事件",value:this.yCItemDict[index].outmin_evt,listName:'outmin_evt'},
                {name:"越上限事件",value:this.yCItemDict[index].outmax_evt,listName:'outmax_evt'},
                {name:"声音文件",value:this.yCItemDict[index].wave_file,listName:'wave_file'},
                {name:"报警屏蔽",value:this.yCItemDict[index].alarm_shield,listName:'alarm_shield'},
                {name:"安全时段",value:this.yCItemDict[index].SafeTime,listName:'SafeTime'}
              ];
              this.scaleTran=this.yCItemDict[index].mapping;
              this.curve_rcd=this.yCItemDict[index].curve_rcd;
              // console.log(this.execu)
              this.loadDefVideo=this.viZiplListYc[0][index];
              this.loadDefZic=this.viZiplListYc[1][index];
              this.loadDefPlan=this.yCItemDict[index].PlanNo;
              this.configIndex=num;
          break;
           case 2:
           // console.log(this.yXItemDict);
           this.uploadInfor=[];
           this.loadDefVideo=[];
            this.loadDefZic=[];
            this.loadDefPlan=[];
            this.switchArr=this.alarmArrYx;
            this.isSet_P=true;
            this.isYc=false;
             this.isYx=true;
            this.negate="";
          this.uploadInfor=[
                {name:"设备号",value:this.yXItemDict[index].equip_no,listName:'equip_no'},
                {name:"模拟量编号",value:this.yXItemDict[index].yx_no,listName:'yx_no'},
                {name:"状态量名称",value:this.yXItemDict[index].yx_nm,listName:'yx_nm'},
                {name:"0-1事件  ",value:this.yXItemDict[index].evt_01,listName:'evt_01'},
                {name:"1-0事件",value:this.yXItemDict[index].evt_10,listName:'evt_10'},
                {name:"关联页面",value:this.yXItemDict[index].related_pic,listName:'related_pic'},
                // {name:"取反",value:this.yXItemDict[index].inversion=="True"||this.yXItemDict[index].inversion=="true"?"已取反":"未取反"}, 
                {name:"处理意见0-1",value:this.yXItemDict[index].proc_advice_r,listName:'proc_advice_r'}, 
                {name:"处理意见1-0",value:this.yXItemDict[index].proc_advice_d,listName:'proc_advice_d'},
                {name:"0-1级别",value:this.yXItemDict[index].level_r,listName:'level_r'},
                {name:"1-0级别",value:this.yXItemDict[index].level_d,listName:'level_d'}, 
                {name:"初始状态",value:this.yXItemDict[index].initval,listName:'initval'},
                {name: "属性值",value:this.yXItemDict[index].val_trait,listName:'val_trait'}, 
                {name:"操作命令",value:this.yXItemDict[index].main_instruction,listName:'main_instruction'}, 
                {name:"操作参数",value:this.yXItemDict[index].minor_instruction,listName:'minor_instruction'}, 
                {name:"越线滞纳时间（秒）",value:this.yXItemDict[index].alarm_acceptable_time,listName:'alarm_acceptable_time'}, 
                {name:"恢复滞纳时间（秒）",value:this.yXItemDict[index].alarm_repeat_time,listName:'alarm_repeat_time'}, 
                {name:"重复报警时间（分钟）",value:this.yXItemDict[index].restore_acceptable_time,listName:'restore_acceptable_time'},
                {name: "声音文件",value:this.yXItemDict[index].wave_file,listName:'wave_file'},
                {name: "报警屏蔽",value:this.yXItemDict[index].alarm_shield,listName:'alarm_shield'}, 
                {name:"报警升级周期（分钟）",value:this.yXItemDict[index].AlarmRiseCycle,listName:'AlarmRiseCycle'}, 
                {name:"安全时段",value:this.yXItemDict[index].SafeTime,listName:'SafeTime'}

                ];
              this.negate=this.yXItemDict[index].inversion;
              this.loadDefVideo=this.viZiplListYx[0][index];
              this.loadDefZic=this.viZiplListYx[1][index];
              this.loadDefPlan=this.yXItemDict[index].PlanNo;
              this.configIndex=num;
          break;
          case 3:
          this.uploadInfor=[];
          this.loadDefVideo=[];
          this.loadDefZic=[];
          this.loadDefPlan=[];
          this.switchArr=[];
          this.isSet_P=false;
          this.isYc=false;
           this.isYx=false;
          this.switchBArr=[];
          // console.log(this.get_setparm);
          this.uploadInfor=[
              {name:"设备号",value:this.get_setparm[index].equip_no,listName:'equip_no'},
              {name:"设置号",value:this.get_setparm[index].set_no,listName:'set_no'},
              {name:"设置名称",value:this.get_setparm[index].set_nm,listName:'set_nm'},
              {name:"值",value:this.get_setparm[index].value,listName:'value'},
              {name:"设置类型",value:this.get_setparm[index].set_type,listName:'set_type'},
              {name:"动作",value:this.get_setparm[index].action,listName:'action'},
              {name:"操作命令",value:this.get_setparm[index].main_instruction,listName:'main_instruction'},
              {name:"操作参数",value:this.get_setparm[index].minor_instruction,listName:'minor_instruction'},
           ]

          this.switchBArr[0]=this.get_setparm[index].record
          this.switchBArr[1]=this.get_setparm[index].canexecution
          console.log(this.switchBArr)
          this.configIndex=num;
          break;
        }

      },configData(num){
        console.log("点击确定"+num);
        switch (num)
        {
          case 0:
            // console.log(this.uploadInfor);
            var updateJSON=[];
            for (var i=0;i<this.uploadInfor.length;i++){
              var item={
                  "id":this.equipId,
                  "listName":this.uploadInfor[i].listName,
                  "vlaue":"'"+this.uploadInfor[i].value+"'"
              }
              updateJSON.push(item)
            }
            var alarCode={
               "id":this.equipId,
                "listName":"alarm_scheme",
                "vlaue":"'"+this.getAlarmCode()+"'"
            };//报警字段
            updateJSON.push(alarCode)
            var lateVideo={
               "id":this.equipId,
                "listName":"related_video",
                "vlaue":"'"+this.loadDefVideo+"'"
            };
            updateJSON.push(lateVideo)
            var zichan={
                "id":this.equipId,
                "listName":"ZiChanID",
                "vlaue":"'"+this.loadDefZic+"'"
            };
            updateJSON.push(zichan)
            var planNo={
                "id":this.equipId,
                "listName":"PlanNo",
                "vlaue":"'"+this.loadDefPlan+"'"
            };
            updateJSON.push(planNo)
            this.Axios.post("/api/real/update_equip",{update:JSON.stringify(updateJSON)}).then(res=>{
                var int=res.data.HttpData.data;
                if(int!=0&&res.data.HttpStatus==200){
                    this.$Message.success('修改成功');
                }else{
                    this.$Message.error('修改失败');
                }

         
          
          
            });
             // console.log(updateJSON);
          break;
          case 1:
            // console.log(this.uploadInfor);
            // console.log(this.loadDefVideo);
            // console.log(this.loadDefZic);
            // console.log(this.loadDefPlan);
            // // console.log(this.switchArr);
            // console.log(this.curve_rcd);//曲线记录
            // console.log(this.scaleTran)//比例变换,
            var updateJSON=[];
            for(var i=0;i<this.uploadInfor.length;i++){
              var item={
                "id":this.equipId,
                "yc_no":this.uploadInfor[1].value,
                "listName":this.uploadInfor[i].listName,
                "vlaue":"'"+this.uploadInfor[i].value+"'"
              }
              updateJSON.push(item)
            }
            var alarCode={
               "id":this.equipId,
               "yc_no":this.uploadInfor[1].value,
                "listName":"alarm_scheme",
                "vlaue":"'"+this.getAlarmCode()+"'"
            };//报警字段
            updateJSON.push(alarCode)
            var lateVideo={
               "id":this.equipId,
               "yc_no":this.uploadInfor[1].value,
                "listName":"related_video",
                "vlaue":"'"+this.loadDefVideo+"'"
            };
            updateJSON.push(lateVideo)
            var zichan={
                "id":this.equipId,
                "yc_no":this.uploadInfor[1].value,
                "listName":"ZiChanID",
                "vlaue":"'"+this.loadDefZic+"'"
            };
            updateJSON.push(zichan)
            var planNo={
                "id":this.equipId,
                "yc_no":this.uploadInfor[1].value,
                "listName":"PlanNo",
                "vlaue":"'"+this.loadDefPlan+"'"
            };
            updateJSON.push(planNo)
            var curve_rcd={
              "id":this.equipId,
              "yc_no":this.uploadInfor[1].value,
                "listName":"curve_rcd",
                "vlaue":"'"+this.curve_rcd+"'"
            }
            updateJSON.push(curve_rcd);
            var scaleTran={
                "id":this.equipId,
                "yc_no":this.uploadInfor[1].value,
                "listName":"scaleTran",
                "vlaue":"'"+this.scaleTran+"'"
            }
             updateJSON.push(scaleTran);
             this.Axios.post("/api/real/update_ycp",{update:JSON.stringify(updateJSON)}).then(res=>{
                 var int=res.data.HttpData.data;
                if(int!=0&&res.data.HttpStatus==200){
                    this.$Message.success('修改成功');
                }else{
                    this.$Message.error('修改失败');
                }
         
          
          
              });
            // console.log(updateJSON)
            
          break;
          case 2:
          var updateJSON=[];
            for(var i=0;i<this.uploadInfor.length;i++){
              var item={
                "id":this.equipId,
                "yx_no":this.uploadInfor[1].value,
                "listName":this.uploadInfor[i].listName,
                "vlaue":"'"+this.uploadInfor[i].value+"'"
              }
              updateJSON.push(item)
            }
            var alarCode={
               "id":this.equipId,
               "yx_no":this.uploadInfor[1].value,
                "listName":"alarm_scheme",
                "vlaue":"'"+this.getAlarmCode()+"'"
            };//报警字段
            updateJSON.push(alarCode)
            var lateVideo={
               "id":this.equipId,
               "yx_no":this.uploadInfor[1].value,
                "listName":"related_video",
                "vlaue":"'"+this.loadDefVideo+"'"
            };
            updateJSON.push(lateVideo)
            var zichan={
                "id":this.equipId,
                "yx_no":this.uploadInfor[1].value,
                "listName":"ZiChanID",
                "vlaue":"'"+this.loadDefZic+"'"
            };
            updateJSON.push(zichan)
            var planNo={
                "id":this.equipId,
                "yx_no":this.uploadInfor[1].value,
                "listName":"PlanNo",
                "vlaue":"'"+this.loadDefPlan+"'"
            };
            updateJSON.push(planNo)
            
            var negate={
                "id":this.equipId,
                "yx_no":this.uploadInfor[1].value,
                "listName":"inversion",
                "vlaue":"'"+this.negate+"'"
            }
             updateJSON.push(negate);
             this.Axios.post("/api/real/update_yxp",{update:JSON.stringify(updateJSON)}).then(res=>{
                   var int=res.data.HttpData.data;
                if(int!=0&&res.data.HttpStatus==200){
                    this.$Message.success('修改成功');
                }else{
                    this.$Message.error('修改失败');
                }
          
          
              });
            // console.log(updateJSON)
            // console.log(this.uploadInfor)

          break;
          case 3:
             var updateJSON=[];
            for(var i=0;i<this.uploadInfor.length;i++){
              var item={
                "id":this.equipId,
                "yx_no":this.uploadInfor[1].value,
                "listName":this.uploadInfor[i].listName,
                "vlaue":"'"+this.uploadInfor[i].value+"'"
              }
              updateJSON.push(item)
            }
            var record={
                "id":this.equipId,
                "yx_no":this.uploadInfor[1].value,
                "listName":"record",
                "vlaue":"'"+this.switchBArr[0]+"'"
            }//是否记录
             updateJSON.push(record);
             var canexecution={
                "id":this.equipId,
                "yx_no":this.uploadInfor[1].value,
                "listName":"canexecution",
                "vlaue":"'"+this.switchBArr[1]+"'"
            }//是否可执行
             updateJSON.push(canexecution);
             this.Axios.post("/api/real/update_setparm",{update:JSON.stringify(updateJSON)}).then(res=>{
                   var int=res.data.HttpData.data;
                if(int!=0&&res.data.HttpStatus==200){
                    this.$Message.success('修改成功');
                }else{
                    this.$Message.error('修改失败');
                }
         
          
          
              });
            // console.log(updateJSON)
            // console.log(this.uploadInfor)
          break;
        }
      },getAlarmCode(){
        var code=0;
        // console.log(this.switchArr);
        // console.log(this.checkAlarm);
        this.switchArr[0]=="true"||this.switchArr[0]=="True"?code+=1:code+=0;
        this.switchArr[1]=="true"||this.switchArr[1]=="True"?code+=2:code+=0;
        for(var i=2;i<this.switchArr.length;i++){
            if(this.switchArr[i]=="true"||this.switchArr[i]=="True"){
                code+=parseInt(this.checkAlarm[i-2][0])
            }
        }
        //获取报警代码
        return code;
      }
    }
  }
  </script>

  <style scoped>
  .uploadWrap .ivu-row{max-height:500px !important;overflow-y: scroll;}
  .uploadWrap .ivu-modal{top:50px !important;}
  .operta{color:#3498db !important;font-size:15px !important;cursor:pointer;}
  .moreInforWord{margin-top:10px;font-size:15px;}
  .lableName{font-size: 16px;margin-right:10px;color:#989898;}
  .labelVal{font-size: 15px;margin-left:10px;color:#303030;}
  .system-conf{width:100%;height:100%;}
  .system-conf .wrap{width:100%;height:90%;}
  .system-conf .wrap .itemDetail{height:100%;overflow: hidden;padding-left: 15px;}
  .system-conf .wrap .itemList{height:100%;overflow-y: scroll;}
  .ivu-row::-webkit-scrollbar,.itemList::-webkit-scrollbar {/*滚动条整体样式*/
    width: 4px;     /*高宽分别对应横竖滚动条的尺寸*/
    height: 4px;
  }
  .ivu-row::-webkit-scrollbar-thumb,.itemList::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
    border-radius: 5px;
    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    background: rgba(0,0,0,0.2);
  }
  .ivu-row::-webkit-scrollbar-track,.itemList::-webkit-scrollbar-track {/*滚动条里面轨道*/
    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    border-radius: 0;
    background: rgba(0,0,0,0.1);
  }
  .itemList p{width:95%;
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
.common-table{
  height:650px;
  overflow-y: scroll;
}
.common-table table {
  width:100%;
 
  margin: 0;
  padding: 0;

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
  cursor: pointer;
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
