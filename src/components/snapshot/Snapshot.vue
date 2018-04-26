<template>
	<div class="snapashot">
		<div class="common-tab">
			<Tabs type="card" @on-click="updateCardInfo" v-model="tabPaneValue">
				<template v-for="(itemTab,indexTab) of btnInfo">
					<TabPane :label="itemTab.btnCount" extra="itemTab.ID" :name="itemTab.btnValue" :class="{active : itemTab.isActive}" v-if="itemTab.btnStatus" :key="itemTab.spanId">
						<div class="common-table">
							<table>
								<thead>
									<tr>
										<th>类型</th>
										<th>时间</th>
										<th>事件</th>
										<th>确认</th>
										<th>处理意见</th>
									</tr>
								</thead>
								<tbody>
									<tr v-for="(item,index) of tableInfo" :key="index">
										<td>
											<img :src="getIMG(item.Level)" alt="" style="vertical-align: middle;" /> {{item.Level}}
										</td>
										<td>{{item.formatTime}}</td>
										<td>
											<p>{{item.EventMsg}}</p>
										</td>
										<td><button @click="showModalFun(item.EventMsg,item.Time)" v-show="!item.bConfirmed">请确认</button>
											<i v-show="item.bConfirmed" class="iconfont icon-ok"></i></td>
										<td>{{item.Proc_advice_Msg}}</td>
									</tr>
								</tbody>
							</table>
						</div>
					</TabPane>
				</template>
			</Tabs>
		</div>
		
		<Modal v-model="sureModal" title="确认处理该事件吗？" @on-ok="sureModalFun" @on-cancel="cancel" class="modalAlert">
            <h1 v-model="EventMsg" :title="EventMsg">事件：<span>{{EventMsg}}</span></h1>
            <input type="hidden" v-model="Time" />
            <p>请输入处理意见（100字以内）：</p>
            <Input type="textarea" :rows="4" v-model="msgValue"></Input>
            <Checkbox  label="是" style="margin: 10px 0;" v-model="isSendSms">是否发送短信？</Checkbox>
            <CheckboxGroup class="groupCheck" v-show="isSendSms" v-model="atorMobiles">
              <Checkbox v-for="(item,index) of atorMsgInfo" :key="index" class="groupCheckChild" :label="item.MobileTel" >{{item.MobileTel}}({{item.Administrator}})</Checkbox>
            </CheckboxGroup>
        </Modal>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				btnInfo: [],
				tableInfo: [],
				atorMsgInfo: [],
				event_Level_list: '',
				msgValue: '',
				sureModal: false,
				isSendSms: false,
				atorMobiles: [],
				EventMsg: '',
				Time: '',
				tabPaneValue: '-1',
			}
		},
		mounted() {
			this.getAlarmConfig()
		},
		methods: {
			updateCardInfo() {
				this.getRealTimeEvent();
			},
			getIMG(level) {
				var url="";
				if(level=="故障"){
					url = "/static/infor/Errors.png";
				}else if(level=="警告"){
					url = "/static/infor/Warnings.png";
				}else if(level=="信息"){
					url = "/static/infor/Informations.png";
				}else if(level=="设置"){
					url = "/static/infor/Settings.png";
				}else if(level=="资产"){
					url = "/static/infor/Assets.png";
				}
				return url;
			},
			//获取事件的报警配置
			getAlarmConfig() {
				this.Axios.post('/api/event/alarm_config')
					.then(res => {
						let data = res.data.HttpData;
						if(data.code == 200) {
							let resultData = data.data;
							let listAddData = [{
								spanId: -1,
								spanName: "全部",
								btnStatus: true,
								btnValue: "-1",
								btnCount: "",
								isActive: true
							}];
							for(var i = 0; i < resultData.length; i++) {
								var btnStatus = resultData[i].IsShow == 1 ? true : false;
								var btnValue = [];
								for(var j = resultData[i].SnapshotLevelMin; j <= resultData[i].SnapshotLevelMax; j++) {
									btnValue += j + ",";
								}
								this.event_Level_list += btnValue;
								btnValue = btnValue.substring(0, btnValue.length - 1);
								listAddData.push({
									spanId: resultData[i].ID,
									spanName: resultData[i].SnapshotName,
									btnStatus: btnStatus,
									btnValue: btnValue,
									btnCount: "",
									isActive: false
								});
							}
							this.event_Level_list = this.event_Level_list.substring(0, this.event_Level_list.length - 1);
							this.btnInfo = listAddData;
							this.getRealTimeEventCount();
							setInterval(this.getRealTimeEventCount, 5000);
						}
					}).catch(err => {
						console.log(err)
					})
			},
			//获取当前实时报警事件的总数
			getRealTimeEventCount() {
				let btnInfoLevels = "";
				for(let i = 0; i < this.btnInfo.length; i++) {
					if(this.btnInfo[i].btnValue != "-1") {
						btnInfoLevels += this.btnInfo[i].btnValue + ";"
					}
				}
				btnInfoLevels = btnInfoLevels.substring(0, btnInfoLevels.length - 1);
				this.Axios.post('/api/event/real_evt_count', {
					levels: btnInfoLevels
				}).then(res => {
					let data = res.data.HttpData;
					if(data.code == 200) {
						this.getRealTimeEvent();
						let resultData = data.data;
						let resultDataArr = resultData.toString().split(",");
						let sumValue = 0;
						for(let i = 0; i < resultDataArr.length; i++) {
							this.btnInfo[i + 1].btnCount = this.btnInfo[i + 1].spanName + " " + resultDataArr[i];
							sumValue += parseInt(resultDataArr[i]);
						}
						this.btnInfo[0].btnCount = this.btnInfo[0].spanName + " " + sumValue;
					}
				}).catch(err => {
					console.log(err)
				})
			},
			//获取当前系统报警的实时事件
			getRealTimeEvent() {
				var tabPaneValue = this.tabPaneValue;
				var levels = "";
				if(tabPaneValue == "-1") {
					levels = this.event_Level_list;
				}else{
					levels=tabPaneValue;
				}console.log(tabPaneValue)
				this.Axios.post('/api/event/real_evt', {
					levels: levels
				}).then(res => {
					let data = res.data.HttpData;
					if(data.code == 200) {
						let resultData = data.data;
						let tableListData = [];
						for(var i = 0; i < resultData.length; i++) {
							var strLevel = "";
							var btnInfo = this.btnInfo;
							for(var j = 0; j < btnInfo.length; j++) {
								var btnInfoArr = btnInfo[j].btnValue.split(",");
								for(var m = 0; m < btnInfoArr.length; m++) {
									if(btnInfoArr[m] == resultData[i].Level) {
										strLevel = btnInfo[j].spanName;
										break;
									}
								}
							}
							tableListData.push({
								EventMsg: resultData[i].EventMsg,
								Proc_advice_Msg: resultData[i].Proc_advice_Msg,
								Time: resultData[i].Time.replace("T"," "),
								formatTime: this.formatDate(resultData[i].Time),
								Level: strLevel,
								bConfirmed: resultData[i].bConfirmed,
								Equipno: resultData[i].Equipno,
								Ycyxno: resultData[i].Ycyxno
							});
						}
						this.tableInfo = tableListData;
						this.atorMsgDataFun();
					}
				}).catch(err => {
					console.log(err)
				})
			},
			atorMsgDataFun() {
				this.Axios.post('/api/GWServiceWebAPI/get_DataByTableName', {
					TableName: "Administrator"
				}).then(res => {
					let data = res.data.HttpData;
					if(data.code == 200) {
						let resultData = data.data;
						let atorMsgInfoData = [];
						for(var i = 0; i < resultData.length; i++) {
							atorMsgInfoData.push({
								Administrator: resultData[i].Administrator,
								MobileTel: resultData[i].MobileTel
							});
						}
						this.atorMsgInfo = atorMsgInfoData;
					}
				}).catch(err => {
					console.log(err)
				})
			},
			showModalFun(EventMsg, Time) {
				this.EventMsg = EventMsg;
				this.Time = Time;
				this.msgValue = "";
				this.isSendSms = false;
				this.atorMobiles = [];
				this.sureModal = true;
			},
			sureModalFun() {
				this.Axios.post('/api/event/confirm_evt', {
					msg: this.msgValue,
					shortmsg: this.isSendSms,
					tel: this.atorMobiles.join(','),
					evtname: this.EventMsg,
					time: this.Time
				}).then(res => {
					let data = res.data.HttpData;
					if(data.code == 200) {
						let resultData = data.data;
						this.getRealTimeEvent();
						this.cancel();
					} else {
						alert("提交失败！");
					}
				}).catch(err => {
					console.log(err)
				})
			},
			formatDate(time) {
				var newTime = time.replace("T", " ")
				return newTime.substring(0, 19);
			},
			ok() {

			},
			cancel() {

			}
		}
	}
</script>

<style lang="css" src="@assets/styles/timetask.css"></style>
<style lang="scss" src="../../assets/styles/sass/home.scss"></style>