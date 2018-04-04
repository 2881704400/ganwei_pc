export default {
	data() {
		return {
			selecteTable: 0,
			CommonTaskTableID: "",
			CommonTaskSystemID: '',
			systemProcCode: '',
			CommonTaskList: [],
			CommonTaskSystemControl: [],
			ProcCmdList: [],
			CommonTaskEquipControl: [],
			EquipControlList: [],
			LoopTaskList: [],
			WeekTaskPlanCommonList: [],
			WeekTaskPlanLoopList: [],
			sureModal: false,
			isCommonUpdate: true
		}
	},
	mounted() {
		//获取所有数据
		this.getCommonTaskList(),
			this.getCommonTaskProcCmd(),
			this.getCommonTaskSetParm(),
			this.getLoopTaskList();
		this.getWeekTaskPlan();
	},
	methods: {
		//------获取每周任务安排表---------
		getWeekTaskPlan() {
			this.Axios.post('/api/GWServiceWebAPI/get_DataByTableName', {
				TableName: "GWProcWeekTable"
			}).then(res => {
				let data = res.data.HttpData;
				if(data.code == 200) {
					let resultData = data.data;
					console.log(resultData)
					let WeekTaskPlanCommonListData = [];
					let WeekTaskPlanLoopListData = [];
					for(var i = 0; i < resultData.length; i++) {
						//							WeekTaskPlanListData.push({
						//								Mon: resultData[i].Mon,
						//								Tues: resultData[i].Tues,
						//								Thurs: resultData[i].Thurs,
						//								Wed: resultData[i].Wed,
						//								Fri: resultData[i].Fri,
						//								Sat: resultData[i].Sat,
						//								Sun: resultData[i].Sun
						//							});
					}
					let CommonTaskListData = this.CommonTaskList;
					for(var i = 0; i < CommonTaskListData.length; i++) {
						WeekTaskPlanCommonListData.push({
							TableID: CommonTaskListData[i].TableID,
							TableName: CommonTaskListData[i].TableName
						});
					}

					let LoopTaskListData = this.LoopTaskList;
					for(var i = 0; i < LoopTaskListData.length; i++) {
						WeekTaskPlanLoopListData.push({
							TableID: LoopTaskListData[i].TableID,
							TableName: LoopTaskListData[i].TableName
						});
					}
					console.log()
					this.WeekTaskPlanCommonList = WeekTaskPlanCommonListData;
					this.WeekTaskPlanLoopList = WeekTaskPlanLoopListData;
				}
			}).catch(err => {
				console.log(err)
			})
		},
		//------获取循环任务---------
		getLoopTaskList() {
			this.Axios.post('/api/GWServiceWebAPI/get_DataByTableName', {
				TableName: "GWProcCycleTList"
			}).then(res => {
				let data = res.data.HttpData;
				if(data.code == 200) {
					let resultData = data.data;
					let LoopTaskListData = [];
					let strExecute = "";
					for(var i = 0; i < resultData.length; i++) {
						let zDo = resultData[i].ZhenDianDo + "," + resultData[i].ZhidingDo;
						if(zDo == "0,0") {
							strExecute = "立即开始执行";
						} else if(zDo == "1,0") {
							strExecute = "整点开始执行";
						} else {
							strExecute = this.formatDate(resultData[i].ZhidingTime);
						}
						LoopTaskListData.push({
							TableName: resultData[i].TableName,
							BeginTime: resultData[i].BeginTime,
							EndTime: resultData[i].EndTime,
							ExecuteTime: strExecute,
							ZhenDingDo: resultData[i].ZhenDianDo,
							ZhidingDo: resultData[i].ZhidingDo,
							ZhidingTime: resultData[i].ZhidingTime,
							CycleMustFinish: resultData[i].CycleMustFinish,
							ZhenDingTime: resultData[i].ZhenDianDo,
							MaxCycleNum: resultData[i].MaxCycleNum
						});
					}
					this.LoopTaskList = LoopTaskListData;
				}
			}).catch(err => {
				console.log(err)
			})
		},
		//------获取普通任务:设备控制 下拉数据---------
		getCommonTaskSetParm() {
			this.Axios.post('/api/GWServiceWebAPI/get_DataByTableName', {
				TableName: "SetParm"
			}).then(res => {
				let data = res.data.HttpData;
				if(data.code == 200) {
					let resultData = data.data;
					let EquipControlListData = [];
					for(var i = 0; i < resultData.length; i++) {
						EquipControlListData.push({
							equop_no: resultData[i].equop_no,
							set_no: resultData[i].set_no,
							set_nm: resultData[i].set_nm
						});
					}
					this.EquipControlList = EquipControlListData;
				}
			}).catch(err => {
				console.log(err)
			})
		},
		//------获取普通任务:设备控制---------
		getCommonTaskEquipControl() {
			this.Axios.post('/api/GWServiceWebAPI/get_CommonTaskEquipControl', {
				TableID: this.CommonTaskTableID
			}).then(res => {
				let data = res.data.HttpData;
				if(data.code == 200) {
					let resultData = data.data;
					let CommonTaskEquipControlData = [];
					for(var i = 0; i < resultData.length; i++) {
						CommonTaskEquipControlData.push({
							TableID: resultData[i].TableID,
							Time: this.formatDate(resultData[i].Time),
							set_nm: resultData[i].set_nm,
							TimeDur: this.formatDate(resultData[i].TimeDur),
						});
					}
					this.CommonTaskEquipControl = CommonTaskEquipControlData;
				}
			}).catch(err => {
				console.log(err)
			})
		},
		//------获取普通任务:系统控制 下拉数据---------
		getCommonTaskProcCmd() {
			this.Axios.post('/api/GWServiceWebAPI/get_DataByTableName', {
				TableName: "GWExProcCmd"
			}).then(res => {
				let data = res.data.HttpData;
				if(data.code == 200) {
					let resultData = data.data;
					let ProcCmdListData = [];
					for(var i = 0; i < resultData.length; i++) {
						ProcCmdListData.push({
							proc_code: resultData[i].proc_code,
							cmd_nm: resultData[i].cmd_nm
						});
					}
					this.ProcCmdList = ProcCmdListData;
				}
			}).catch(err => {
				console.log(err)
			})
		},
		//系统控制:表格内容编辑事件
		updateCommonSystemFun(index, newContent, TableType) {
			if(TableType == "Time") {
				this.CommonTaskSystemControl[index].Time = newContent.target.value;
			} else if(TableType == "proc_code") {
				this.CommonTaskSystemControl[index].proc_code = newContent.target.value;
			} else {
				this.CommonTaskSystemControl[index].TimeDur = newContent.target.value;
			}
			this.CommonTaskSystemControl[index].isUpdateFlag=true;
		},
		//系统控制:选中点击行,背景变色
		SelecteTableFun(index, TableID) {
			for(var i = 0; i < this.CommonTaskSystemControl.length; i++) {
				this.CommonTaskSystemControl[i].isCommonSpan = true;
			}
			if(this.selecteTable == index) {
				if(this.CommonTaskSystemControl[index].isCommonSpan) {
					this.CommonTaskSystemControl[index].isCommonSpan = false;
				}
			}
			this.selecteTable = index;
		},
		//------获取普通任务:系统控制---------
		getCommonTaskSystemControl() {
			this.Axios.post('/api/GWServiceWebAPI/get_DataByTableNameAndID', {
				TableName: "GWProcTimeSysTable",
				TableID: this.CommonTaskTableID
			}).then(res => {
				let data = res.data.HttpData;
				if(data.code == 200) {
					let resultData = data.data;
					let CommonTaskSystemControlData = [];
					for(var i = 0; i < resultData.length; i++) {
						CommonTaskSystemControlData.push({
							TableID: resultData[i].TableID,
							Time: resultData[i].Time,
							proc_code: resultData[i].proc_code,
							cmd_nm: resultData[i].cmd_nm,
							TimeDur: resultData[i].TimeDur,
							isCommonSpan: true,
							isUpdateFlag: false
						});
					}
					this.CommonTaskSystemControl = CommonTaskSystemControlData;
				}
			}).catch(err => {
				console.log(err)
			})
		},
		//普通任务列表:保存编辑信息
		saveCommonTaskFun() {
			let CommonTaskList=this.CommonTaskList;
			for(let i=0;i<CommonTaskList.length;i++){
				if(CommonTaskList[i].isUpdateFlag){
					this.Axios.post('/api/GWServiceWebAPI/set_BatchUpdate', {
						tableName: "GWProcTimeTList",
						cellName: "TableName",
						cellDataList: " TableName='"+CommonTaskList[i].TableName+"', Comment='"+CommonTaskList[i].Comment+"'",
						ifDataList: " TableID ="+CommonTaskList[i].TableID
					}).then(res => {
						let data = res.data.HttpData;
						if(data.code == 200) {
							let resultData = data.data;
							if(resultData=="1"){
								alert("保存成功");
							}else{
								alert("保存失败");
							}
							
						}
					}).catch(err => {
						console.log(err)
					})
				}
			}
		},
		//普通任务列表:表格内容编辑事件
		updateCommonFun(index, newContent, TableType) {
			if(TableType == "TableName") {
				this.CommonTaskList[index].TableName = newContent.target.value;
			} else {
				this.CommonTaskList[index].Comment = newContent.target.value;
			}
			this.CommonTaskList[index].isUpdateFlag=true;
		},
		//普通任务列表:选中点击行，获取相应数据
		SelecteTableFun(index, TableID) {
			for(var i = 0; i < this.CommonTaskList.length; i++) {
				this.CommonTaskList[i].isCommonSpan = true;
			}
			if(this.selecteTable == index) {
				if(this.CommonTaskList[index].isCommonSpan) {
					this.CommonTaskList[index].isCommonSpan = false;
				}
			}
			this.selecteTable = index;
			this.CommonTaskTableID = this.CommonTaskList[index].TableID;
			this.getCommonTaskSystemControl(),
				this.getCommonTaskEquipControl()
		},
		//------获取普通任务:列表---------
		getCommonTaskList() {
			this.Axios.post('/api/GWServiceWebAPI/get_DataByTableName', {
				TableName: "GWProcTimeTList"
			}).then(res => {
				let data = res.data.HttpData;
				if(data.code == 200) {
					let resultData = data.data;
					let CommonTaskListData = [];
					for(var i = 0; i < resultData.length; i++) {
						if(i == 0) {
							this.CommonTaskTableID = resultData[i].TableID;
						}
						CommonTaskListData.push({
							TableID: resultData[i].TableID,
							TableName: resultData[i].TableName,
							Comment: resultData[i].Comment,
							isCommonSpan: true,
							isUpdateFlag: false
						});
					}
					this.CommonTaskList = CommonTaskListData;
					this.getCommonTaskSystemControl(),
					this.getCommonTaskEquipControl()
				}
			}).catch(err => {
				console.log(err)
			})
		},
		formatDate(time) {
			var newTime = time.replace("T", " ")
			return newTime.substring(11, 19);
		},
		ok() {

		},
		cancel() {

		}
	}
}