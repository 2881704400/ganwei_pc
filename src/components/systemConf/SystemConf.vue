

<style lang="scss">
$width:100%;
$height:100%;
$overflow:hidden;
$blueColor:#2d8cf0;
$num0:0px;
::-webkit-scrollbar{
  width: 8px !important;    
  height: 8px !important;
}
::-webkit-scrollbar-thumb{
  border-radius: none;
  -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
  background: rgba(0,0,0,0.2);
}
::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
  border-radius: 0;
  background: rgba(0,0,0,0.1);
}
.rowClassName{padding-left: $num0;padding-right: $num0;width: $width;text-align: center;}
.ivu-table-cell{padding-left: $num0;padding-right: $num0;width: $width;text-align: center;white-space: nowrap;overflow: hidden;word-break: keep-all;}
.ivu-modal{
  .ivu-modal-content>.ivu-modal-body{
     max-height:600px;overflow:auto;
  }
}
.moreInforWord{margin-top:10px;font-size:15px;float:left;width:50%;}
.lableName{font-size: 16px;margin-right:10px;color:#989898;}
.labelVal{font-size: 15px;margin-left:10px;color:#303030;}
.clickActive{
 border:1px solid $blueColor;
 box-sizing: border-box;
 color:$blueColor
}
.uploadWrap{
  p{
    float:left;
  }
}
.system-conf{
    width:$width;
    height:$height;
    .wrap{
        width:$width;
        height:$height;
        .itemDetail{
            height: $height;
            overflow: $overflow;
            padding-left: 15px;
        }
        .itemList{
            height: $height;
            overflow-y: auto;
            p{
              width:95%;
              height:50px;
              line-height: 50px;
              background: #f9f9f9;
              margin:10px auto;
              font-size:15px;
              text-align: center;
              white-space: nowrap;
              word-break: keep-all;
               text-overflow: ellipsis;
              overflow: $overflow;
              &:hover{
                  border:1px solid $blueColor;
                  box-sizing: border-box;
                  color:$blueColor;
                  cursor:pointer;
              }
            }
        }
    }
    .ivu-tabs-bar{
        margin-bottom:$num0;
        height: 40px;
    }
    .ivu-tabs-nav-container{height: 40px !important;}
    .ivu-table-wrapper{border:none;}
    .ivu-tabs.ivu-tabs-card>.ivu-tabs-bar{
        .ivu-tabs-tab{
              margin-right:$num0;
              border-radius: $num0;
              border-right: none;
              font-size:15px;
              height:40px;
              line-height: 2;
              border-bottom: 1px solid #dddee1;
              &:last-child{
                  border-right:1px solid #dddee1;
              }
        }
        .ivu-tabs-tab-active{
            border-top:1px solid $blueColor;
            box-sizing: border-box;
            background: #F9F9F9;
        }
    }
    .tableItem{
        width:100%;
	 	thead{
			/*width:100%;*/
			background: #fff;
			
	 	}
	    tbody{
	     	tr:hover{
	     		background: rgb(238,238,238);
	     	}
	    }
        .addF9{
	      	background: #F9F9F9;
	      }
	    tr{
	      height:40px;
	      text-align:center;

	      td,th{
	      	font-size: 14px;
	      	font-weight: 400;
	      	line-height: 40px;
	      }
	      td{
	      	color:#323232;
	      	height: 40px;
	      	i{
	      		font-size: 22px;
	      		color: rgb(45,140,240);
	      		vertical-align: middle;
	      		margin-right: 5px;
	      	}
	      	.edict{
	      		i{
	      			color: green;
	      		}
	      	}
	      	span{
	      		margin-right: 10px;
	      		cursor: pointer;
	      	}
	      }
	      th{
	      	color:#858585;
	      	border-bottom: 1px solid #ddd;
	      }
	    }
            
        
    }
    
   
  
}
</style>

<template>
  <div class="system-conf">
    <Row class="wrap">
      <Col span="3" class="itemList">
      <p title="全选" @click="selectAll()" :class="allSelect?'clickActive':''">全选</p>
      <p  v-for="(item,$index) in itemList" @click="loadInformation(item.m_iEquipNo,$index)"   ref="mybox" :title="item.m_EquipNm">
        <!-- :class="$index==active?'clickActive':''" -->
        {{item.m_EquipNm}}
      </p>
    </Col>
    <Col span="21" class="itemDetail">
    <div class="common-tabSys">
      <Button type="primary" style="margin-right:10px;border-radius:0;background:#2d8cf0;padding:8.5px 21.5px;font-size:14px;line-height:inherit;color:#fff;position:absolute;right:0;z-index: 99;" @click="selectEvent()">查询</Button >
      <Tabs type="card" :animated="false" @on-click="changTab" v-model="itemIds">

       <TabPane label="设备配置" class="ycp" >
					<div id="" style="width: 100%;overflow: auto;position: relative;" ref="tableWrap1" @scroll="paperScroll($event,0)"> 
						<table class="tableItem">
					<thead ref="fixHeader0">
               			<tr class="headItem">
                          <th>设备号</th>
                          <th>设备名称</th>
                          <th>关联界面</th>
                          <th>关联视频</th>
                          <th>资产编号</th>
                          <th>预案号</th>
                          <th v-for="item in  tableHeader">
                          	{{item.Proc_name}}
                          </th>
                          
                          <th>操作</th>
                        </tr>
               		</thead>
               <tbody>
                        <tr v-for="(item,$index) in dataEq" :class="$index%2==0?'addF9':''">
                          <td>{{item.equip_no}}</td>
                          <td>{{item.equip_nm}}</td>
                          <td>                        	
                        			{{item.related_pic}}
                        	</td>
                          <td>{{returnPic($index,0)}}</td>
	              					<td>{{returnZC($index,0)}}</td>
                          <td>{{item.PlanNo}}</td> 
                          
													<td v-for="items in tdInner[$index]">
														<span v-if="items.ischeck">
																<Icon type="ios-checkmark-outline"></Icon>
														</span>
														<span v-else>
															<Icon type="ios-circle-outline"></Icon>
														</span>
																
                          </td>
                          
                          <td>
                            <span @click="edictItem($index,0)"><i class="iconfont icon-scheduleMODIFY"></i> 编辑</span>
                            <span @click="lookInfor($index,0)" class="edict"><i class="iconfont icon-details"></i>详情</span>
                          </td>
                        </tr>
                </tbody>
            </table>
					</div>
        </TabPane>
        <TabPane label="遥测量配置" class="ycp" >
        	<div id="" style="width: 100%;overflow: auto;" ref="tableWrap2" @scroll="paperScroll($event,13)"> 
           <table class="tableItem">
             
             				<thead ref="fixHeader1">
                       <tr class="headItem">
                        <th>设备号</th>
                        <th>模拟量编号</th>
                        <th>模拟量名称</th>
                        <th>下限值</th>
                        <th>回复下限值</th>
                        <th>回复上限值</th>
                        <th>上限值</th>
                        <th>单位</th>
                        <th>关联页面</th>
                        <th>关联视频</th>
                        <th>资产编号</th>
                        <th>预案号</th>
                        <th>曲线记录</th>
                        <th v-for="item in  tableHeader">
                          	{{item.Proc_name}}
                        </th>
                        <th>操作</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(item,$index) in dataYc" :class="$index%2==0?'addF9':''">
                        <td>{{item.equip_no}}</td>
                        <td>{{item.yc_no}}</td>
                        <td>{{item.yc_nm}}</td>
                        <td>{{item.val_min}}</td>
                        <td>{{item.restore_min}}</td>
                        <td>{{item.restore_max}}</td>
                        <td>{{item.val_max}}</td>
                        <td>{{item.unit}}</td>
                        
                        <td>
                        	{{item.related_pic}}
                        </td>
                        <td>{{returnPic($index,1)}}</td>
	              				<td>{{returnZC($index,1)}}</td>
                        
                        <td>{{item.PlanNo}}</td>
                        <td v-if="item.curve_rcd">
                        		<Icon type="ios-checkmark-outline"></Icon>
                        </td>
                        <td v-else>
                        		<Icon type="ios-circle-outline"></Icon>
                        </td>
                        <td v-for="items in tdInnerYc[$index]">
														<span v-if="items.ischeck">
																<Icon type="ios-checkmark-outline"></Icon>
														</span>
														<span v-else>
															<Icon type="ios-circle-outline"></Icon>
														</span>
																
                         </td>
                        <td>
                            <span @click="edictItem($index,1)"><i class="iconfont icon-scheduleMODIFY"></i> 编辑</span>
                            <span @click="lookInfor($index,1)" class="edict"><i class="iconfont icon-details"></i>详情</span>
                          </td>
                      </tr>
              </tbody>
            </table>
            </div>
        </TabPane>
        <TabPane  label="遥信量配置" class="ycp" >
        	<div id="" style="width: 100%;height: 600px;overflow: auto;" ref="tableWrap3"  @scroll="paperScroll($event,2)"> 
            <table class="tableItem">
            <thead ref="fixHeader2">
	            <tr class="headItem" >
	              <th>设备号</th>
	              <th>状态量编号</th>
	              <th>状态量名称</th>
	              <th>0-1事件</th>
	              <th>1-0事件</th>
	              <th>关联页面</th>
	              <th>关联视频</th>
	              <th>资产编号</th>
	              <th>预案号</th>
	              <th v-for="item in  tableHeader">
              		{{item.Proc_name}}
             		</th>
	              <th>操作</th>
	            </tr>
           </thead>
            <tbody>
	            <tr v-for="(item,$index) in dataYx" :class="$index%2==0?'addF9':''" >
	              <td>{{item.equip_no}}</td>
	              <td>{{item.yx_no}}</td>
	              <td>{{item.yx_nm}}</td>
	              <td>{{item.evt_01}}</td>
	              <td>{{item.evt_10}}</td>
	              <td>{{item.related_pic}}</td>
	               <td>{{returnPic($index,2)}}</td>
	              <td>{{returnZC($index,2)}}</td>
	              <td>{{item.PlanNo}}</td>
	              <td v-for="items in tdInnerYx[$index]">
														<span v-if="items.ischeck">
																<Icon type="ios-checkmark-outline"></Icon>
														</span>
														<span v-else>
															<Icon type="ios-circle-outline"></Icon>
														</span>
																
                          </td>
	              <td>
	              	
	                <span @click="edictItem($index,2)"><i class="iconfont icon-scheduleMODIFY"></i> 编辑</span>
	                <span @click="lookInfor($index,2)" class="edict"><i class="iconfont icon-details"></i>详情</span>
	              </td>
	            </tr>
            </tbody>
              </table>
             </div>
        </TabPane>
        <TabPane label="设置配置" class="ycp" >
        			
					<div  style="width: 100%;overflow: auto;" ref="tableWrap4" @scroll="paperScroll($event,3)"> 

		              	<table class="tableItem">
		             		<thead ref="fixHeader3">
			                    <tr class="headItem">
			                      <th>设备号</th>
			                      <th>设置号</th>
			                      <th>设置名称</th>
			                      <th>设置类型</th>
			                      <th>操作命令</th>
			                      <th>操作参数</th>
			                      <th>记录</th>
			                      <th>动作</th>
			                      <th>值</th>
			                      <th>是否可执行</th>
			                      <th>操作</th>
			                    </tr>
										</thead>
		                  <tbody >
		                    <tr v-for="(item,$index) in dataSet" :class="$index%2==0?'addF9':''" >
		                      <td>{{item.equip_no}}</td>
		                      <td>{{item.set_no}}</td>
		                      <td>{{item.set_nm}}</td>
		                      <td>{{item.set_type}}</td>
		                      <td>{{item.main_instruction}}</td>
		                      <td>{{item.minor_instruction}}</td>
		                      <td v-if="item.record">
		                      	<Icon type="ios-checkmark-outline"></Icon>
		                      </td>
		                      <td v-else="item.canexecution">
		                      		<Icon type="ios-circle-outline"></Icon>
		                      </td>
		                      <td>{{item.action}}</td>
		                      <td>{{item.value}}</td>
		                      <td v-if="item.canexecution">
		                      		<Icon type="ios-checkmark-outline"></Icon>
		                      </td>
		                      <td v-else="item.canexecution">
		                      		<Icon type="ios-circle-outline"></Icon>
		                      </td>
		                      <td>
						        <span @click="edictItem($index,3)"><i class="iconfont icon-scheduleMODIFY"></i> 编辑</span>
		
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
<Modal title="查看其他信息" v-model="modal1" class-name="vertical-center-modal" :styles="{top: '50px',width:'800px'}" >
    <Row>

              <p class="moreInforWord" v-for="(key,val) in moreInfor" :key="val"  > <!--v-if="val>=0&&val<=10"-->
                <span class="lableName" style="width:170px;display:inline-block;text-align:right;">{{key.name}}</span>:<span class="labelVal">{{key.value}}</span> 
              </p>

    </Row>
</Modal>
<Modal title="编辑信息" v-model="modal2" class-name="vertical-center-modal"  :styles="{top: '50px',width:'800px'}"  class="uploadWrap"  @on-ok="configData(configIndex)">
<Row>

          <p v-for="(item,index) in uploadInfor"   style="margin-top:10px;">
            <span  style="width:125px;display:inline-block;text-align:right;">{{item.name}}:</span>
            <Input v-model="item.value"  v-if="index==0||item.name=='模拟量编号'||item.name=='状态量编号'||item.name=='设置号'" disabled placeholder="请输入对应值" style="width: 200px;margin-left:20px;"></Input>
            <Input v-model="item.value"  v-else="index!=0" placeholder="请输入对应值" style="width: 200px;margin-left:20px;"></Input>
          </p>

        <p style="margin-top:10px;" v-show="isSet_P">
          <span style="width:125px;display:inline-block;text-align:right;">关联视频:</span>
          <Select style="width:200px;margin-left:20px;" clearable v-model="loadDefVideo"  placement="bottom" filterable  transfer>
            <Option v-for="item in  videoList" :key="item.ID"   :value="item.videoCode" >{{item.ChannelName}}</Option>
          </Select>
        </p>
        <p style="margin-top:10px;" v-show="isSet_P">
          <span style="width:125px;display:inline-block;text-align:right;">资产编号:</span>
          <Select  style="width:200px;margin-left:20px;"  clearable v-model="loadDefZic"  placement="bottom" filterable transfer>
            <Option v-for="item in  zizhanList" :key="item.ZiChanID" :value="item.ZiChanID">{{item.ZiChanName}}</Option>
          </Select>
        </p>
        <p style="margin-top:10px;" v-show="isSet_P">
          <span style="width:125px;display:inline-block;text-align:right;">预案号:</span>
          <Select  style="width:200px;margin-left:20px;"  clearable v-model="loadDefPlan"  placement="bottom" filterable transfer>
            <Option v-for="item in  planList" :key="item.ID" :value="item.PlanNo">{{item.PlanNo}}</Option>
          </Select>
        </p>

        
        <p style="margin-top:10px;" v-show="isSet_P" v-for="(item,index) in checkAlarm">
            <span style="width:125px;display:inline-block;text-align:right;">是否{{item.name}}:</span>
            <Select  style="width:200px;margin-left:20px;" v-model="item.res" transfer>
             <Option v-for="item in swit" :key="item.keys" :value="item.keys">{{item.txt}}</Option>
           </Select>
        </p>

         <p style="margin-top:10px;" v-show="isYc">
          <span style="width:125px;display:inline-block;text-align:right;" >是否曲线记录:</span>
          <Select style="width:200px;margin-left:20px;" v-model="curve_rcd" transfer>
           <Option v-for="item in switB" :key="item.keys" :value="item.keys">{{item.txt}}</Option>
         </Select>
       </p>
       <p style="margin-top:10px;" v-show="isYc">
        <span style="width:125px;display:inline-block;text-align:right;" >是否比例变换:</span>
        <Select style="width:200px;margin-left:20px;" v-model="scaleTran" transfer>
         <Option v-for="item in switB" :key="item.keys" :value="item.keys">{{item.txt}}</Option>
       </Select>
     </p>
       <p style="margin-top:10px;"  v-show="isSet"><!-- v-show="!isSet_P" -->
        <span style="width:125px;display:inline-block;text-align:right;">是否记录:</span>
        <Select  style="width:200px;margin-left:20px;" v-model="isMarkSet" transfer>
          <Option v-for="item in switB" :key="item.keys" :value="item.keys">{{item.txt}}</Option>
        </Select>
      </p>   
      <p style="margin-top:10px;"  v-show="isSet"><!-- v-show="!isSet_P" -->
        <span style="width:125px;display:inline-block;text-align:right;">是否可执行:</span>
        <Select  style="width:200px;margin-left:20px;" v-model="isExeSet" transfer>
          <Option v-for="item in switB" :key="item.keys" :value="item.keys">{{item.txt}}</Option>
        </Select>
      </p>  
      <p style="margin-top:10px;"  v-show="isYx">
        <span style="width:125px;display:inline-block;text-align:right;">是否取反:</span>
        <Select  style="width:200px;margin-left:20px;" v-model="negate" transfer>
          <Option v-for="item in switB" :key="item.keys" :value="item.keys">{{item.txt}}</Option>
        </Select>
      </p>   
  <!-- </Col> -->
</Row>


</Modal>
</div>
</template>

<script>
export default {
  data () {
    return {
    	num:10,
	    loading:false,
	    allSelect:false,     
	    dataEq:[],
			dataSet:[],
			dataYx:[],
			dataYc:[],
			tableHeader:[
				{Proc_name:'显示报警'},
				{Proc_name:'记录报警'}
			],
			tdInner:[],
			tdInnerYc:[],
			tdInnerYx:[],
			isSet:true,
			configIndex:0,
			videoList:[],//视频表获取关联视频
			zizhanList:[],//资产编号
			waitDataEq:[],
			waitDataYc:[],
			waitDataYx:[],
			waitDataSet:[],
			itemIds:0,
			
			
			isAlarm:"",
			isMarkAmarm:"",
      alarmArrMark:[],//报警记录承载
      alarmArrIsShow:[],//报警显示
      alarmWay:[],//报警方式承载
      alarmArrMarkYc:[],//报警记录承载
      alarmArrIsShowYc:[],//报警显示
      alarmWayYc:[],
      alarmArrMarkYx:[],//报警记录承载
      alarmArrIsShowYx:[],//报警显示
      alarmWayYx:[],
      itemList:[],//左侧列表
      isMarkSet:"",
      isExeSet:"",
      isMarkSetArr:[],
      isExeSetArr:[],
      active:0,
      checkAlarm:[],//报警方式
      moreInfor:[],
      modal1:false,
      modal2:false,
      uploadInfor:[],
      leftNum:0,
      chazhiNum:0,
      
      
      planList:[],//预案号
      tableHeight:650,
      loadDefVideo:[],//默认选中的视频
      loadDefZic:"",
      loadDefPlan:"",
      swit:[
      {txt:"是",keys:'True'},
      {txt:"否",keys:'False'}
      ],
      isSet_P:true,
      isYx:false,
      switB:[
       {txt:"是",keys:'True'},
      {txt:"否",keys:'False'}
      ],
      isYc:false,
      curve_rcd:"",//是否曲线记录
      negate:"",//是否取反，
      scaleTran:"",//是否比例变换
      curve_rcdArr:[],
      negateArr:[],
      scaleTranArr:[],
      
      equipId:0,//当前设备id
      zcData:[],
      viData:[],
      alrmData:[],
      searchArr:[]
    }
  },beforeCreate(){
      this.Axios.post("/api/GWServiceWebAPI/get_DataByTableName",{TableName:'GWZiChanTable'}).then(res=>{
          this.zcData=res.data.HttpData.data;
          this.zizhanList=res.data.HttpData.data
//        zizhanList:[],//资产编号
//           console.log(this.zcData)
      });
      this.Axios.post("/api/GWServiceWebAPI/get_DataByTableName",{TableName :"GW_VideoInfo"}).then(res=>{
      	  let datas=res.data.HttpData.data;
          this.viData=datas;
          for(var i=0;i<datas.length;i++){
          	let arr={
          		ID:i,
              	videoCode:datas[i].EquipNum+","+datas[i].ID,
                ChannelName:datas[i].ChannelName
          	}
          	this.videoList.push(arr)
          }
          
      });

      this.Axios.post("/api/GWServiceWebAPI/get_DataByTableName",{TableName:'AlarmProc'}).then(res=>{
        let datas=res.data.HttpData.data
        this.alrmData=datas;
        for(var i=0;i<this.alrmData.length;i++){
          	this.tableHeader.push({Proc_name:this.alrmData[i].Proc_name})
        }
      })
      
  },mounted (){
	  	
	  var h = document.documentElement.clientHeight || document.body.clientHeight;
	  this.$refs.tableWrap1.style.height=h-160+"px"
	  this.$refs.tableWrap2.style.height=h-160+"px"
	  this.$refs.tableWrap3.style.height=h-160+"px"
	  this.$refs.tableWrap4.style.height=h-160+"px"

      this.init();
     
  },
  methods:{
  	changTab:function(){
  		var that=this
			switch(this.itemIds)
			{
				case 0:
							that.dataEq=that.waitDataEq.slice(0,100);
							console.log(that.dataEq)
							setTimeout(function(){
								that.dataEq=that.waitDataEq;
							},1000)
				break;
				case 1:
						this.dataYc=this.waitDataYc.slice(0,100);
						setTimeout(function(){
							that.dataYc=that.waitDataYc;
						},1000)
				break;
				case 2:
						this.dataYx=this.waitDataYx.slice(0,100);
						setTimeout(function(){
							that.dataYx=that.waitDataYx;
						},1000)
				break;
				case 3:
						this.dataSet=this.waitDataSet.slice(0,100);
						setTimeout(function(){
							that.dataSet=that.waitDataSet;
						},1000)
				break;
			}
			
  	},
paperScroll($evnet,id){
	switch(id){
		case 0:
			this.$refs.fixHeader0.style.transform='translateY('+$evnet.target.scrollTop+'px)';
		break;
		case 1:
			this.$refs.fixHeader1.style.transform='translateY('+$evnet.target.scrollTop+'px)';
		break;
		case 2:
			this.$refs.fixHeader2.style.transform='translateY('+$evnet.target.scrollTop+'px)';
		break;
		case 3:
			this.$refs.fixHeader3.style.transform='translateY('+$evnet.target.scrollTop+'px)';
		break;
		
	}

},
  returnPic(option,itemId){
  	let dom
  	if(itemId==0){
  		 dom=this.dataEq[option].related_video
  	}else if(itemId==1){
  		 dom=this.dataYc[option].related_video
  	}else{
  		 dom=this.dataYx[option].related_video
  		 
  	}

		if(dom){
			 let	pic=dom.split(",")
					for(var i=0;i<this.viData.length;i++){
						if(this.viData[i].EquipNum==pic[0]&&this.viData[i].ID==pic[1]){
								return this.viData[i].ChannelName;
								break;
						}
					}			
		}else{
				return ""
		}

  },returnZC(option,itemId){
			let dom
			if(itemId==0){
				 dom=this.dataEq[option].ZiChanID
			}else if(itemId==1){
				 dom=this.dataYc[option].ZiChanID
			}else{
				 dom=this.dataYx[option].ZiChanID
				 
			}
		
				if(dom){
							for(var i=0;i<this.zcData.length;i++){
								if(this.zcData[i].ZiChanID==dom){
										return this.zcData[i].ZiChanName;
										break;
								}
							}			
				}else{
						return ""
				}
  },returnAlarm(optionId,itemId){

  		let data;
  		if(itemId==0){
  			data=this.dataEq[optionId].alarm_scheme
  		}else if(itemId==1){
  			data=this.dataYc[optionId].alarm_scheme
  		}else if(itemId==2){
  			data=this.dataYx[optionId].alarm_scheme
  		}

	    let arr=[];
	    if(data & 1>0){
			arr.push(
					{
						res:"True",
						name:"显示报警",
						code:1
					}
				)
		}else{
			arr.push({res:"False",name:"显示报警"})
		}
		
		if(data&2>0){
			arr.push({res:"True",name:"记录报警"})
		}else{
			arr.push({res:"False",name:"记录报警"})
		}
		
		for(var m=0;m<this.alrmData.length;m++){
			
			if((data & this.alrmData[m].Proc_Code)>0){
			
				arr.push({res:"True",name:this.alrmData[m].Proc_name,code:this.alrmData[m].Proc_Code})
			}else{
				arr.push({res:"False",name:this.alrmData[m].Proc_name,code:this.alrmData[m].Proc_Code})
			}
		}
		return arr
		
 },
  init(){
//	this.selectEvent()
    var h = document.documentElement.clientHeight || document.body.clientHeight;
    this.tableHeight=h-160;
        this.Axios.post("/api/real/equip_state",{userName:window.localStorage.login_msg}).then(res=>{
          let response=res.data.HttpData.data;
          this.itemList=response;
        //* this.loadInformation(response[0].m_iEquipNo,0)
      })
      },loadInformation(id,index){
        let nameStr=this.$refs.mybox[index].className;
        if(nameStr=="clickActive"){
          this.allSelect=false;
          this.$refs.mybox[index].className=""
           var that = this;
           for (var i = 0;i <that.searchArr.length;i++) {
               var ind = that.searchArr[i];
               if (ind==id) {
                   that.searchArr.splice(i,1);
               }
           }
        }else{
          
          this.$refs.mybox[index].className="clickActive"
          this.searchArr.push(id);
          if(this.searchArr.length==this.itemList.length){
            this.allSelect=true;
          }
        }
        // console.log(this.searchArr)
      },selectAll(){
        
        if(!this.allSelect){
          this.allSelect=true;
          this.searchArr=[];
          for(var i=0;i<this.itemList.length;i++){
            this.$refs.mybox[i].className="clickActive";
            this.searchArr.push(this.itemList[i].m_iEquipNo);
          }
        }else{
          this.allSelect=false;
          this.searchArr=[];
          for(var i=0;i<this.itemList.length;i++){
            this.$refs.mybox[i].className="";
          }
          
        }
     },selectEvent(){
      	this.loading=true;
				
        let id=this.searchArr.toString();
        if(id==""){
        	return
        }
        // console.log(id)
        this.getPlanData()
        // this.active=index;
//      this.equipId=id;
        this.Axios.all([this.Axios.post("/api/Real/get_equip",{equip_nos:id})]).then(this.Axios.spread((res) => {
        let eqData=res.data.HttpData.data;
        this.waitDataEq=[];
				this.waitDataEq=eqData
				if(this.itemIds==0){
					this.dataEq=this.waitDataEq
				}else{
					this.dataEq=this.waitDataEq.slice(0,100)
				}
					
				
        
        this.tdInner=[]
		for(var i=0;i<eqData.length;i++){
//					console.log(eqData[i].alarm_scheme)
			 let arr=[];
			  if(eqData[i].alarm_scheme & 1>0){
					arr.push({ischeck:true})
				}else{
					arr.push({ischeck:false})
				}
				
				if(eqData[i].alarm_scheme&2>0){
					arr.push({ischeck:true})
				}else{
					arr.push({ischeck:false})
				}
				
				for(var m=0;m<this.alrmData.length;m++){
					if((eqData[i].alarm_scheme & this.alrmData[m].Proc_Code)>0){
					
						arr.push({ischeck:true})
					}else{
						arr.push({ischeck:false})
					}
				}
				this.tdInner.push(arr)
		}

            })).catch(err => {})
//加载模拟量配置
this.Axios.all([this.Axios.post("/api/real/get_ycp",{equip_nos:id})]).then(this.Axios.spread((res) => {

 let dataYc=res.data.HttpData.data;
   this.waitDataYc=[];
	this.waitDataYc=dataYc
	if(this.itemIds==1){
		this.dataYc=this.waitDataYc
	}else{
		 this.dataYc=this.waitDataYc.slice(0,100)
	}

 this.tdInnerYc=[]
 for(var i=0;i<dataYc.length;i++){
					 let arr=[];
					  if(dataYc[i].alarm_scheme & 1>0){
							arr.push({ischeck:true})
						}else{
							arr.push({ischeck:false})
						}
						
						if(dataYc[i].alarm_scheme&2>0){
							arr.push({ischeck:true})
						}else{
							arr.push({ischeck:false})
						}
						
						for(var m=0;m<this.alrmData.length;m++){
							if((dataYc[i].alarm_scheme&this.alrmData[m].Proc_Code)>0){
								arr.push({ischeck:true})
							}else{
								arr.push({ischeck:false})
							}
						}
						this.tdInnerYc.push(arr)
	}

            })).catch(err => {})
this.Axios.all([this.Axios.post("/api/Real/get_yxp",{equip_nos:id})]).then(this.Axios.spread((res) => {
  
 let dataYx=res.data.HttpData.data;
 	this.waitDataYx=[];
	this.waitDataYx=res.data.HttpData.data;
	if(this.itemIds==2){
		this.dataYx=this.waitDataYx
	}else{
		this.dataYx=this.waitDataYx.slice(0,100);
	}
 
	
//	setTimeout(function(){
//		this.num=200
//	},2000)
	
 this.tdInnerYx=[]
  for(var i=0;i<dataYx.length;i++){
					 let arr=[];
					  if(dataYx[i].alarm_scheme & 1>0){
							arr.push({ischeck:true})
						}else{
							arr.push({ischeck:false})
						}
						
						if(dataYx[i].alarm_scheme&2>0){
							arr.push({ischeck:true})
						}else{
							arr.push({ischeck:false})
						}
						
						for(var m=0;m<this.alrmData.length;m++){
							if((dataYx[i].alarm_scheme&this.alrmData[m].Proc_Code)>0){
								arr.push({ischeck:true})
							}else{
								arr.push({ischeck:false})
							}
						}
						this.tdInnerYx.push(arr)
	}

   })).catch(err => {})
       this.Axios.post("/api/Real/get_setparm",{equip_nos:id}).then(res4=>{//加载设置配置
        this.loading=false;
        // let data4=res4.data.d;
        let dataSet=res4.data.HttpData.data;
        this.dataSet=[];
      	this.waitDataSet=[]
				this.waitDataSet=dataSet;
				if(this.itemIds==3){
					this.dataSet=this.waitDataSet
				}else{
					this.dataSet=this.waitDataSet.slice(0,100);
				}
        

          });
     },edictItem($index,itemId){
     		this.modal1=false;
     		this.modal2=true;
     		this.uploadInfor=[];
        	let index=$index;
        	this.configIndex=itemId;
     		switch (itemId)
     		{
     			case 0:
//   				
		            this.isSet_P=true;
		            this.isSet=false;
		            this.isYx=false;
		            this.isYc=false;
		            this.checkAlarm=this.returnAlarm(index,0)
		            console.log(this.checkAlarm)
		            let eqData=this.dataEq;
		            this.loadDefVideo=eqData[index].related_video;
		            this.loadDefZic=eqData[index].ZiChanID;
		            this.loadDefPlan=eqData[index].PlanNo;
		            this.equipId=eqData[index].equip_no;
       				this.uploadInfor=[
       				    {name:"设备号",value:eqData[index].equip_no,listName:'equip_no'},
	                    {name:"设备名称",value:eqData[index].equip_nm,listName:'equip_nm'},
	                    {name:"关联界面",value:eqData[index].related_pic||"",listName:'related_pic'},
	                    {name:"设备属性",value:eqData[index].equip_detail,listName:'equip_detail'},
	                    {name:"通讯刷新周期",value:eqData[index].acc_cyc,listName:'acc_cyc'},
	                    {name:"通故障处理意见",value:eqData[index].proc_advice,listName:'proc_advice'},
	                    {name:"故障提示",value:eqData[index].out_of_contact,listName:'out_of_contact'},
	                    {name:"故障恢复提示",value:eqData[index].contacted,listName:'contacted'},
	                    {name:"报警声音文件",value:eqData[index].event_wav,listName:'event_wav'},
	                    {name:"通讯端口",value:eqData[index].local_addr,listName:'local_addr'},
	                    {name:"设备地址",value:eqData[index].equip_addr,listName:'equip_addr'},
	                    {name:"通讯参数",value:eqData[index].communication_param,listName:'communication_param'},
	                    {name:"通讯时间参数",value:eqData[index].communication_time_param,listName:'communication_time_param'},
	                    {name:"报警升级周期（分钟）",value:eqData[index].AlarmRiseCycle,listName:'AlarmRiseCycle'},
	                    {name:"模板设备号",value:eqData[index].raw_equip_no,listName:'raw_equip_no'},
	                    {name:"附表名称",value:eqData[index].tabname,listName:'tabname'},
	                    {name:"属性",value:eqData[index].attrib,listName:'attrib'},
	                    {name:"安全时段",value:eqData[index].SafeTime,listName:'SafeTime'}
       				 ]
       				console.log(this.uploadInfor)
     			break;
     			case 1:
		            this.isSet_P=true;
		            this.isSet=false;
		            this.isYx=false;
		            this.isYc=true;
		            let dataYc=this.dataYc;
		            this.loadDefVideo=dataYc[index].related_video;
		            this.loadDefZic=dataYc[index].ZiChanID;
		            this.loadDefPlan=dataYc[index].PlanNo;
		            this.checkAlarm=this.returnAlarm(index,1);
		            this.curve_rcd=this.dataYc[index].curve_rcd==true?"True":"False";
		            this.scaleTran=this.dataYc[index].mapping==true?"True":"False";
		            this.equipId=dataYc[index].equip_no;

       			  	this.uploadInfor=[
       				   {name:"设备号",value:dataYc[index].equip_no,listName:'equip_no'},
	                   {name:"模拟量编号",value:dataYc[index].yc_no,listName:'yc_no'},
	                   {name:"单位",value:dataYc[index].unit,listName:'unit'},
	                   {name:"属性值",value:dataYc[index].val_trait,listName:'val_trait'},
	                   {name:"下限值",value:dataYc[index].val_min,listName:'val_min'},
	                   {name:"上限值",value:dataYc[index].val_max,listName:'val_max'},
	                   {name:"最小值",value:dataYc[index].physic_min,listName:'physic_min'},
	                   {name:"最大值",value:dataYc[index].physic_max,listName:'physic_max'},
	                   {name:"操作命令",value:dataYc[index].main_instruction,listName:'main_instruction'},
	                   {name:"操作参数",value:dataYc[index].minor_instruction,listName:'minor_instruction'},
	                   {name:"关联页面",value:dataYc[index].related_pic,listName:'related_pic'},
	                   {name:"处理意见",value:dataYc[index].proc_advice,listName:'proc_advice'},
	                   {name:"报警级别",value:dataYc[index].lvl_level,listName:'lvl_level'},
	                   {name:"声音文件",value:dataYc[index].wave_file,listName:'wave_file'},
	                   {name:"报警屏蔽",value:dataYc[index].alarm_shield,listName:'alarm_shield'},
	                   {name:"安全时段",value:dataYc[index].SafeTime,listName:'SafeTime'},
	                   {name:"模拟量名称",value:dataYc[index].yc_nm,listName:'yc_nm'},
	                   {name:"回复下限值",value:dataYc[index].restore_min,listName:'restore_min'},
	                   {name:"回复上限值",value:dataYc[index].restore_max,listName:'restore_max'},
	                   {name:"实测最小值",value:dataYc[index].yc_min,listName:'yc_min'},
	                   {name:"实测最大值",value:dataYc[index].yc_max,listName:'yc_max'},
	                   {name:"越下限事件",value:dataYc[index].outmin_evt,listName:'outmin_evt'},
	                   {name:"越上限事件",value:dataYc[index].outmax_evt,listName:'outmax_evt'},
	                   {name:"曲线记录阈值",value:dataYc[index].curve_limit,listName:'curve_limit'},
	                   {name:"报警升级周期",value:dataYc[index].AlarmRiseCycle,listName:'AlarmRiseCycle'},
	                   {name:"起始安全时段",value:dataYc[index].safe_bgn,listName:'safe_bgn'},
	                   {name:"结束安全时段",value:dataYc[index].safe_end,listName:'safe_end'},
	                   {name:"越线滞纳时间(秒)",value:dataYc[index].alarm_acceptable_time,listName:'alarm_acceptable_time'},
	                   {name:"恢复滞纳时间(秒)",value:dataYc[index].alarm_repeat_time,listName:'alarm_repeat_time'},
	                   {name:"重复报警时间(分钟)",value:dataYc[index].restore_acceptable_time,listName:'restore_acceptable_time'},
       				]
     			break;
     			case 2:
				        this.isSet_P=true;
				        this.isSet=false;
				        this.isYx=true;
				        this.isYc=false;
				        let dataYx=this.dataYx;
				        
				        this.loadDefVideo=dataYx[index].related_video;
			            this.loadDefZic=dataYx[index].ZiChanID;
			            this.loadDefPlan=dataYx[index].PlanNo;
			            this.checkAlarm=this.returnAlarm(index,2);
						this.negate=this.dataYx[index].inversion==true?"True":"False";
						 this.equipId=dataYx[index].equip_no;
						this.uploadInfor=[
					        {name:"设备号",value:dataYx[index].equip_no,listName:'equip_no'},
					        {name:"模拟量编号",value:dataYx[index].yx_no,listName:'yx_no'},
					        {name:"状态量名称",value:dataYx[index].yx_nm,listName:'yx_nm'},
					        {name:"0-1事件  ",value:dataYx[index].evt_01,listName:'evt_01'},
					        {name:"1-0事件",value:dataYx[index].evt_10,listName:'evt_10'},
					        {name:"关联页面",value:dataYx[index].related_pic,listName:'related_pic'},
					        {name:"处理意见0-1",value:dataYx[index].proc_advice_r,listName:'proc_advice_r'}, 
					        {name:"处理意见1-0",value:dataYx[index].proc_advice_d,listName:'proc_advice_d'},
					        {name:"0-1级别",value:dataYx[index].level_r,listName:'level_r'},
					        {name:"1-0级别",value:dataYx[index].level_d,listName:'level_d'}, 
				            {name:"初始状态",value:dataYx[index].initval,listName:'initval'},
			 	            {name: "属性值",value:dataYx[index].val_trait,listName:'val_trait'}, 
					        {name:"操作命令",value:dataYx[index].main_instruction,listName:'main_instruction'}, 
					        {name:"操作参数",value:dataYx[index].minor_instruction,listName:'minor_instruction'}, 
					        {name:"越线滞纳时间（秒）",value:dataYx[index].alarm_acceptable_time,listName:'alarm_acceptable_time'}, 
					        {name:"恢复滞纳时间（秒）",value:dataYx[index].alarm_repeat_time,listName:'alarm_repeat_time'}, 
					        {name:"重复报警时间（分钟）",value:dataYx[index].restore_acceptable_time,listName:'restore_acceptable_time'},
					        {name: "声音文件",value:dataYx[index].wave_file,listName:'wave_file'},
					        {name: "报警屏蔽",value:dataYx[index].alarm_shield,listName:'alarm_shield'}, 
					        {name:"报警升级周期（分钟）",value:dataYx[index].AlarmRiseCycle,listName:'AlarmRiseCycle'}, 
					        {name:"安全时段",value:dataYx[index].SafeTime,listName:'SafeTime'}
						]
     			break;
     			case 3:
		            this.isSet_P=false;
		            this.isSet=true;
		            this.isYx=false;
		            this.isYc=false;
		            let dataSet=this.dataSet
		            this.isMarkSet=this.dataSet[index].record==true?"True":"False";
		            this.isExeSet=this.dataSet[index].canexecution==true?"True":"False";
		             this.equipId=dataSet[index].equip_no;
       				this.uploadInfor=[
       				   {name:"设备号",value:dataSet[index].equip_no,listName:'equip_no'},
	                   {name:"设置号",value:dataSet[index].set_no,listName:'set_no'},
	                   {name:"设置名称",value:dataSet[index].set_nm,listName:'set_nm'},
	                   {name:"值",value:dataSet[index].value,listName:'value'},
	                   {name:"设置类型",value:dataSet[index].set_type,listName:'set_type'},
	                   {name:"动作",value:dataSet[index].action,listName:'action'},
	                   {name:"操作命令",value:dataSet[index].main_instruction,listName:'main_instruction'},
	                   {name:"操作参数",value:dataSet[index].minor_instruction,listName:'minor_instruction'},
       				]
     			break;
     		}
//   		console.log($index,itemId)
     		
     		
     },lookInfor($index,itemId){
     		this.modal1=true;
     		this.modal2=false;
     		this.moreInfor=[]
        let ind=$index;
     		switch (itemId)
     		{
     			case 0:
                let eqData=this.dataEq;
     						this.moreInfor=[
     							  {name:"属性",value:eqData[ind].attrib},
			                    {name:"故障提示",value:eqData[ind].out_of_contact},             
			                    {name:"设备属性",value:eqData[ind].equip_detail},
			                    {name:"通讯端口",value:eqData[ind].local_addr},
			                    {name:"设备地址",value:eqData[ind].equip_addr},
			                    {name:"通讯参数",value:eqData[ind].communication_param},
			                    {name:"附表名称",value:eqData[ind].tabname},
			                    {name:"安全时段",value:eqData[ind].SafeTime},
			                    {name:"模板设备号",value:eqData[ind].raw_equip_no},
			                    {name:"通讯刷新周期",value:eqData[ind].acc_cyc},
			                    {name:"故障恢复提示",value:eqData[ind].contacted},
			                    {name:"报警声音文件",value:eqData[ind].event_wav},
			                    {name:"通讯时间参数",value:eqData[ind].communication_time_param},
			                    {name:"通故障处理意见",value:eqData[ind].proc_advice},
			                    {name:"报警升级周期（分钟)",value:eqData[ind].AlarmRiseCycle},
     						] 						
     			break;
     			case 1:
                let dataYc=this.dataYc;
     						this.moreInfor=[
     							  {name:"最小值",value:dataYc[ind].physic_min},
                    {name:"最大值",value:dataYc[ind].physic_max},
                    {name:"属性值",value:dataYc[ind].val_trait},
                    {name:"操作命令",value:dataYc[ind].main_instruction},
                    {name:"操作参数",value:dataYc[ind].minor_instruction},
                    {name:"声音文件",value:dataYc[ind].wave_file},
                    {name:"报警屏蔽",value:dataYc[ind].alarm_shield},
                    {name:"比例变换",value:dataYc[ind].mapping?"已变换":"未变换"},
                    {name:"安全时段",value:dataYc[ind].SafeTime},
                    {name:"处理意见",value:dataYc[ind].proc_advice},
                    {name:"报警级别",value:dataYc[ind].lvl_level},
                    {name:"越下限事件",value:dataYc[ind].outmin_evt},
                    {name:"越上限事件",value:dataYc[ind].outmax_evt},
                    {name:"实测最小值",value:dataYc[ind].yc_min},
                    {name:"实测最大值",value:dataYc[ind].yc_max},
                    {name:"报警升级周期",value:dataYc[ind].AlarmRiseCycle},
                    {name:"起始安全时段",value:dataYc[ind].safe_bgn},
                    {name:"结束安全时段",value:dataYc[ind].safe_end},
                    {name:"曲线记录阈值",value:dataYc[ind].curve_limit},
                    {name:"越线滞纳时间(秒)",value:dataYc[ind].alarm_acceptable_time},
                    {name:"恢复滞纳时间(秒)",value:dataYc[ind].alarm_repeat_time},
                    {name:"重复报警时间(分钟)",value:dataYc[ind].restore_acceptable_time},
     						] 
     			break;
     			case 2: 
                let dataYx=this.dataYx;
     				this.moreInfor=[
     							  {name:"取反",value:dataYx[ind].inversion?"已取反":"未取反"}, 
                    {name:"属性值",value:dataYx[ind].val_trait}, 
                    {name:"安全时段",value:dataYx[ind].SafeTime},
                    {name:"初始状态",value:dataYx[ind].initval},
                    {name:"操作命令",value:dataYx[ind].main_instruction}, 
                    {name:"操作参数",value:dataYx[ind].minor_instruction}, 
                    
                    {name:"报警屏蔽",value:dataYx[ind].alarm_shield}, 
                    {name:"0-1级别",value:dataYx[ind].level_r},
                    {name:"1-0级别",value:dataYx[ind].level_d}, 
                    {name:"起始安全时段",value:dataYx[ind].safe_bgn}, 
                    {name:"结束安全时段",value:dataYx[ind].safe_end}, 
                    {name:"处理意见0-1",value:dataYx[ind].proc_advice_r}, 
                    {name:"处理意见1-0",value:dataYx[ind].proc_advice_d},
                    {name:"越线滞纳时间(秒)",value:dataYx[ind].alarm_acceptable_time}, 
                    {name:"恢复滞纳时间(秒)",value:dataYx[ind].alarm_repeat_time}, 
                    {name:"重复报警时间(分钟)",value:dataYx[ind].restore_acceptable_time},
                    {name:"报警升级周期(分钟)",value:dataYx[ind].AlarmRiseCycle}, 
                    {name:"声音文件",value:dataYx[ind].wave_file},
     						] 
     			break;
     			
     		}
     		
     		
     		
     },
     getPlanData(){
      this.Axios.post("/api/GWServiceWebAPI/get_DataByTableName",{TableName :"GWPlan"}).then(res=>{
        let datas=res.data.HttpData.data;
        this.planList=[];
        for(var i=0;i<datas.length;i++){
          var item={
            ID:i,
            PlanNo:datas[i].PlanNo
          }
          this.planList.push(item)
        }
      })
    },configData(num){
        // console.log("点击确定"+num);
        switch (num)
        {
          case 0:
            // console.log(this.uploadInfor);
            var updateJSON=[];
            for (var i=0;i<this.uploadInfor.length;i++){
              var item={
                "id":this.equipId,
                "listName":this.uploadInfor[i].listName,
                "vlaue":this.uploadInfor[i].value?"'"+this.uploadInfor[i].value+"'":"''"
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
             "vlaue":this.loadDefVideo?"'"+this.loadDefVideo+"'":"''"
           	};
           	updateJSON.push(lateVideo)
           	var zichan={
	            "id":this.equipId,
	            "listName":"ZiChanID",
	            "vlaue":this.loadDefZic?"'"+this.loadDefZic+"'":"''"
	         };
          	updateJSON.push(zichan)
	          var planNo={
	            "id":this.equipId,
	            "listName":"PlanNo",
	            "vlaue":this.loadDefPlan?"'"+this.loadDefPlan+"'":"''"
	          };
          updateJSON.push(planNo)
          
               console.log(updateJSON)
            this.Axios.post("/api/real/update_equip",{update:JSON.stringify(updateJSON)}).then(res=>{
              var int=res.data.HttpData.data;
              if(int!=0&&res.data.HttpStatus==200){
                this.$Message.success('修改成功');
                this.selectEvent()
                 // this.loadInformation(this.equipId,this.active)
              }else{
                this.$Message.error('修改失败');
              }
            });
            break;
            case 1:
            var updateJSON=[];
            for(var i=0;i<this.uploadInfor.length;i++){
              var item={
                "id":this.equipId,
                "yc_no":this.uploadInfor[1].value,
                "listName":this.uploadInfor[i].listName,
                "vlaue":this.uploadInfor[i].value?"'"+this.uploadInfor[i].value+"'":"''"
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
             "vlaue":this.loadDefVideo?"'"+this.loadDefVideo+"'":"''"
           };
           updateJSON.push(lateVideo)
           var zichan={
            "id":this.equipId,
            "yc_no":this.uploadInfor[1].value,
            "listName":"ZiChanID",
            "vlaue":this.loadDefZic?"'"+this.loadDefZic+"'":"''"
          };
          updateJSON.push(zichan)
          var planNo={
            "id":this.equipId,
            "yc_no":this.uploadInfor[1].value,
            "listName":"PlanNo",
            "vlaue":this.loadDefPlan?"'"+this.loadDefPlan+"'":"''"
          };
          updateJSON.push(planNo)
          var curve_rcd={
            "id":this.equipId,
            "yc_no":this.uploadInfor[1].value,
            "listName":"curve_rcd",
            "vlaue":this.curve_rcd=="False"?false:true
          }
          updateJSON.push(curve_rcd);
          var scaleTran={
            "id":this.equipId,
            "yc_no":this.uploadInfor[1].value,
            "listName":"mapping",
            "vlaue":this.scaleTran=="False"?false:true
          }
          updateJSON.push(scaleTran);
          this.Axios.post("/api/real/update_ycp",{update:JSON.stringify(updateJSON)}).then(res=>{
	           var int=res.data.HttpData.data;
	           if(int!=0&&res.data.HttpStatus==200){
	            this.$Message.success('修改成功');
	             this.selectEvent()
	             // this.loadInformation(this.equipId,this.active)
	          }else{
	            this.$Message.error('修改失败');
	          }
          
          
        	});
               console.log(updateJSON)
            
            break;
            case 2:
            var updateJSON=[];
            for(var i=0;i<this.uploadInfor.length;i++){
              var item={
                "id":this.equipId,
                "yx_no":this.uploadInfor[1].value,
                "listName":this.uploadInfor[i].listName,
                "vlaue":this.uploadInfor[i].value?"'"+this.uploadInfor[i].value+"'":"''"
              }
              updateJSON.push(item)
            }
            var alarCode={
             "id":this.equipId,
             "yx_no":this.uploadInfor[1].value,
             "listName":"alarm_scheme",
             "vlaue":this.getAlarmCode()?"'"+this.getAlarmCode()+"'":"''"
            };//报警字段
            updateJSON.push(alarCode)
            var lateVideo={
             "id":this.equipId,
             "yx_no":this.uploadInfor[1].value,
             "listName":"related_video",
             "vlaue":this.loadDefVideo?"'"+this.loadDefVideo+"'":"''"
           };
           updateJSON.push(lateVideo)
           var zichan={
            "id":this.equipId,
            "yx_no":this.uploadInfor[1].value,
            "listName":"ZiChanID",
            "vlaue":this.loadDefZic?"'"+this.loadDefZic+"'":"''"
          };
          updateJSON.push(zichan)
          var planNo={
            "id":this.equipId,
            "yx_no":this.uploadInfor[1].value,
            "listName":"PlanNo",
            "vlaue":this.loadDefPlan?"'"+this.loadDefPlan+"'":"''"
          };
          updateJSON.push(planNo)
          var negate={
            "id":this.equipId,
            "yx_no":this.uploadInfor[1].value,
            "listName":"inversion",
            "vlaue":this.negate=="False"?false:true
          }
          updateJSON.push(negate);
            console.log(updateJSON);

          this.Axios.post("/api/real/update_yxp",{update:JSON.stringify(updateJSON)}).then(res=>{
           var int=res.data.HttpData.data;
           if(int!=0&&res.data.HttpStatus==200){
            this.$Message.success('修改成功');
             this.selectEvent()
             // this.loadInformation(this.equipId,this.active)
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
                "listName":"["+this.uploadInfor[i].listName+"]",
                "vlaue":this.uploadInfor[i].value?"'"+this.uploadInfor[i].value+"'":"''"
              }
              updateJSON.push(item)
            }
            var record={
              "id":this.equipId,
              "yx_no":this.uploadInfor[1].value,
              "listName":"[record]",
              "vlaue":this.isMarkSet=="False"?false:true
            }//是否记录,
            updateJSON.push(record);
            var canexecution={
              "id":this.equipId,
              "yx_no":this.uploadInfor[1].value,
              "listName":"[canexecution]",
              "vlaue":this.isExeSet=="False"?false:true
            }//是否可执行
            updateJSON.push(canexecution);
            this.Axios.post("/api/real/update_setparm",{update:JSON.stringify(updateJSON)}).then(res=>{
              console.log(res);
             var int=res.data.HttpData.data;
             if(int!=0&&res.data.HttpStatus==200){
              this.$Message.success('修改成功');
               // this.loadInformation(this.equipId,this.active)
              this.selectEvent()
            }else{
              this.$Message.error('修改失败');
            }
          });

            // console.log(this.uploadInfor)
            break;
          }
          // this.loadInformation(this.equipId)
         
        },getAlarmCode(){
          var code=0;
          console.log(this.checkAlarm)
        // console.log(this.isAlarm,this.isMarkAmarm,this.checkAlarm)
      	if(this.checkAlarm[0].res=="True"){
      		code+=1
      	}else{
      		code+=0
      	}
      	if(this.checkAlarm[1].res=="True"){
      		code+=2
      	}else{
      		code+=0
      	}
      	
        for(var i=2;i<this.checkAlarm.length;i++){
          if(this.checkAlarm[i].res=="True"){
            code+=parseInt(this.checkAlarm[i].code) 
          }else{
          	code+=0;
          }
        }
        //获取报警代码
        return code;
      }
    }
  }
  </script>

