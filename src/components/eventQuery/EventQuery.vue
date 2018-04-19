<template>
  <div class="event-query">
     <Row class="wrap">
        <Col span="3" class="itemList">
			  <p  v-for="(item,$index) in itemList" @click="selectId(item.m_iEquipNo,$index)" :class="$index==activeClass?'clickActive':''">
              {{item.m_EquipNm}}
        </p>
           <!--  :class="$index==active?'clickActive':''" -->
        </Col>
        <Col span="21" class="itemDetail">
          <div class="dateSelect">
            <DatePicker type="datetimerange" format="yyyy/MM/dd HH:mm" :options="option1" placeholder="请选择日期时间" style="width: 500px" @on-change="dateVale"></DatePicker>
            <Button type="primary" style="margin-left:10px;border-radius:0;background:#2d8cf0;" @click="selectEvent()">查询</Button >
          </div>
        	
          <div class="common-tab">
              <Tabs type="card">
                <TabPane  label="设备事件" >
                   <Table :columns="equipTh" :data="equipEvent" height="600"></Table>
                </TabPane>
                <TabPane label="设置事件">
                   <Table :columns="sysTh" :data="setEvent" height="600"></Table>
                </TabPane>
                <TabPane label="系统事件">
                   <Table :columns="sysEventTh" :data="sysEvent" height="600" ></Table>
                </TabPane>

              </Tabs>
             
            </div>
        </Col>
      </Row>
  </div>
</template>

<script>
export default {
   data () {
    return {
      itemList:[],//左侧列表
      equipEvent:[],//右侧设备事件
      setEvent:[],//右侧设置事件
      sysEvent:[],//右侧系统事件
      dateValue:[],
      equipId:0,
      equipTh:[
        {
          title:"设备名称",
          key:"name"
        },{
          title:"设备事件",
          key:"event"
        },{
          title:"时间",
          key:"time",
          sortable: true
        }
      ],
      sysTh:[
          {
            title:"设备名称",
            key:"name"
          },{
            title:"设置事件",
            key:"event"
          },{
            title:"操作人员",
            key:"person"
          },{
            title:"时间",
            key:"time",
            sortable: true
          }
      ],
      sysEventTh:[

          {
              title: '设备事件',
              key: 'event'
          },
          {
              title: '时间',
              key: 'time',
              sortable: true
          }
      ],
      // data1:[],
      activeClass:null,

      option1:{
        shortcuts:[
                      {
                        text: '今天',
                        value () {
                            const end=new Date();
                            const start=new Date().toLocaleDateString();
                            return [start, end];
                        }
                      },{
                            text: '7天',
                                value () {
                                    const end = new Date();
                                    const start = new Date();
                                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                                    return [start, end];
                                
                            }
                      },{
                            text: '30天',
                            value () {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                                return [start, end];
                            }
                      }

                  ]
      }
    }
  },mounted (){
    this.init()

  },methods:{
    init(){
      this.Axios.post("/api/real/equip_state",{userName:window.localStorage.login_msg}).then(res=>{
        let response=res.data.HttpData.data;
        this.itemList=response;
      })
     },
     selectId(id,index){
        this.equipId=id;
        this.activeClass=index;

     },
     selectEvent(){
        this.loadEventList();
     },
     dateVale(val){
        this.dateValue=val;
     },
     loadEventList(){
      let dates=this.dateValue;
      let timeStr="";
      if(this.dateValue[0]==""){
        this.dateValue[0]=this.dateValue[1].split(" ")[0];
      }
      timeStr=this.dateValue.toString();
      // this.Axios.post("/api/event/get_equip_evt",{times:timeStr,equip_nos:this.equipId}).then(res1=>{//加载模拟量配置
      //     this.equipEvent=res1.data.HttpData.data;
      // });
      // this.Axios.post("/api/event/get_set_evt",{times:timeStr,equip_nos:this.equipId}).then(res2=>{
      //     this.setEvent=res2.data.HttpData.data;
      // })
      // this.Axios.post("/api/event/get_sys_evt",{times:timeStr}).then(res3=>{
      //   // console.log(res)
      //     this.sysEvent=res3.data.HttpData.data;
        
      // }),
      this.Axios.post("/oApi/GWService.asmx/QueryEquipEvt",{times:timeStr,equip_no_list:this.equipId}).then(res=>{//加载模拟量配置
         // this.equipEvent=res.data.HttpData.data;
          if(res.data!='false'){
            this.equipEvent=[];
            let respon=JSON.parse(res.data.d)
            // this.equipEvent=JSON.parse(res.data.d);
            for(var i=0;i<respon.length;i++){
              let item={
                name:respon[i].equip_nm,
                event:respon[i].event,
                time:respon[i].time
              }
              this.equipEvent.push(item);
            }
            
          }
      });
      this.Axios.post("/oApi/GWService.asmx/QuerySetupsEvt",{times:timeStr,equip_no_list:this.equipId}).then(res=>{
          if(res.data!='false'){
            this.setEvent=[];
            let respon=JSON.parse(res.data.d)
            for(var i=0;i<respon.length;i++){
              let item={
                name:respon[i].equip_nm,
                event:respon[i].event,
                person:respon[i].operator,
                time:respon[i].time
              }
              this.setEvent.push(item);
            }
          }
      });
      this.Axios.post("/oApi/GWService.asmx/QuerySystemEvt",{times:timeStr}).then(res=>{
        // console.log(res)
        // console.log(res)
          if(res.data!='false'){
            this.sysEvent=[];
            // this.sysEvent=JSON.parse(res.data.d);
            let respon=JSON.parse(res.data.d)
            for(var i=0;i<respon.length;i++){
              let item={
                // name:,
                event:respon[i].event,
                time:respon[i].time
              }
              this.sysEvent.push(item)
            }
            // data1
          }
        
      });
     }

   
  },
  watch:{
       equipEvent:function(val){
         // console.log(val)
         if(val.length!=0)this.$Message.success('操作成功');
          
       },
       setEvent:function(val){
         // console.log(val)
         if(val.length!=0)this.$Message.success('操作成功');
          
       },
       sysEvent:function(val){
         // console.log(val)
         if(val.length!=0)this.$Message.success('操作成功');
          
       },
     }
}
</script>

<style scoped>

*{
  font-family: "微软雅黑"
}
 ::-webkit-scrollbar {/*滚动条整体样式*/
    width: 4px;     /*高宽分别对应横竖滚动条的尺寸*/
    height: 4px;
  }
::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
    border-radius: 5px;
    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    background: rgba(0,0,0,0.2);
  }
::-webkit-scrollbar-track {/*滚动条里面轨道*/
    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    border-radius: 0;
    background: rgba(0,0,0,0.1);
  }
.event-query{width:100%;height:100%;}
.event-query .wrap{width:100%;height:100%;}
.event-query .wrap .itemDetail{height:100%;overflow: hidden;padding-left: 15px;}
.event-query .wrap .itemList{height:100%;overflow-y: scroll;}
.dateSelect{padding:20px  0;}

 .common-table::-webkit-scrollbar,.itemList::-webkit-scrollbar {/*滚动条整体样式*/
            width: 4px;     /*高宽分别对应横竖滚动条的尺寸*/
            height: 4px;
        }
.common-table::-webkit-scrollbar-thumb,.itemList::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
    border-radius: 5px;
    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    background: rgba(0,0,0,0.2);
}
.common-table::-webkit-scrollbar-track,.itemList::-webkit-scrollbar-track {/*滚动条里面轨道*/
    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    border-radius: 0;
    background: rgba(0,0,0,0.1);
}
.itemList p{width:95%;
  height:50px;
  line-height: 50px;
  background: #f9f9f9 !important;
  margin:10px auto;
  font-size:15px;
  text-align: center;
}
.itemList p:hover{
  border:1px solid #2d8cf0;
  box-sizing: border-box;
  color:#2d8cf0;
  cursor:pointer;
}
.clickActive{
   border:1px solid #2d8cf0;
  box-sizing: border-box;
  color:#2d8cf0;
}

</style>
