export default {
	data() {
		return {
			selecteTable: 0,
			selecteSystem: -1,
			SystemStatus: true,
			selecteEquip: -1,
			EquipStatus: true,
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
				if(data.code == 200 && data.data != null) {
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
				if(data.code == 200 && data.data != null) {
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
				if(data.code == 200 && data.data != null) {
					let resultData = data.data;
					let EquipControlListData = [];
					for(var i = 0; i < resultData.length; i++) {
						EquipControlListData.push({
							equop_no: resultData[i].equop_no,
							set_no: resultData[i].set_no,
							set_nm: resultData[i].set_nm,
							set_nom: resultData[i].equip_no + "," + resultData[i].set_no,
						});
					}
					this.EquipControlList = EquipControlListData;
				}
			}).catch(err => {
				console.log(err)
			})
		},

		//------获取普通任务:设备控制--表格内容编辑事件---------
		updateCommonEquipFun(index, newContent, TableType) {
			console.log(index, newContent, TableType)
			if(TableType == "Time") {
				this.CommonTaskEquipControl[index].Time = this.CommonTaskEquipControl[index].Time.substring(0, 10) + " " + newContent;
			} else if(TableType == "set_no") {
				this.CommonTaskEquipControl[index].set_no = newContent;
			} else {
				this.CommonTaskEquipControl[index].TimeDur = this.CommonTaskEquipControl[index].TimeDur.substring(0, 10) + " " + newContent;
			}
			this.CommonTaskEquipControl[index].isUpdateFlag = true;
		},
		//删除一行设备控制
		delEquipFun() {
			let selecteEquip = this.selecteEquip;
			let CommonTaskEquipControl = this.CommonTaskEquipControl;
			let newArr = [];
			if(selecteEquip != -1) {
				for(let i = 0; i < CommonTaskEquipControl.length; i++) {
					if(i !== selecteEquip) {
						newArr.push(CommonTaskEquipControl[i])
					} else {
						if(CommonTaskEquipControl[i].TableName != "") {
							this.Axios.post('/api/GWServiceWebAPI/set_DeleteTableData', {
								tableName: "GWProcTimeEqpTable",
								tableVlue: " ID=" + CommonTaskEquipControl[i].ID + ""
							}).then(res => {
								let data = res.data.HttpData;
								if(data.code == 200 && data.data != null) {
									let resultData = data.data;
									if(resultData == "1") {
										alert("删除成功");
									} else {
										alert("删除失败");
									}

								}
							}).catch(err => {
								console.log(err)
							})
						}
					}
				}
				this.CommonTaskEquipControl = newArr;
			}

		},
		//------增加一行设备控制
		addEquipFun() {
			let date = this.getNowFormatDate();
			console.log(date)
			this.CommonTaskEquipControl.push({
				ID: "",
				TableID: "",
				Time: date,
				set_no: "",
				set_nm: "",
				TimeDur: "1900-01-01T00:00:04",
				isCommonSpan: false,
				isUpdateFlag: true
			});

		},
		//------设备控制:选中点击行，获取相应数据
		SelecteEquipFun(index) {
			let ID;
			for(var i = 0; i < this.CommonTaskEquipControl.length; i++) {
				ID = this.CommonTaskEquipControl[i].ID;
				if(ID != "") {
					this.CommonTaskEquipControl[i].isCommonSpan = true;
					this.CommonTaskEquipControl[i].isUpdateFlag = false;
				}
			}
			if(this.selecteEquip == index) {
				if(this.CommonTaskEquipControl[index].isCommonSpan) {
					this.CommonTaskEquipControl[index].isCommonSpan = false;
				}
			}
			this.selecteEquip = index;
			this.EquipStatus = false;
		},
		//------获取普通任务:设备控制---------
		getCommonTaskEquipControl() {
			this.Axios.post('/api/GWServiceWebAPI/get_CommonTaskEquipControl', {
				TableID: this.CommonTaskTableID
			}).then(res => {
				let data = res.data.HttpData;
				if(data.code == 200 && data.data != null) {
					let resultData = data.data;
					let CommonTaskEquipControlData = [];
					for(var i = 0; i < resultData.length; i++) {
						CommonTaskEquipControlData.push({
							ID: resultData[i].ID,
							TableID: resultData[i].TableID,
							Time: resultData[i].Time,
							set_no: resultData[i].set_no,
							set_nm: resultData[i].set_nm,
							equip_no: resultData[i].equip_no,
							set_nom: resultData[i].equip_no + "," + resultData[i].set_no,
							TimeDur: resultData[i].TimeDur,
							isCommonSpan: true,
							isUpdateFlag: false
						});
					}
					console.log(CommonTaskEquipControlData)
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
				if(data.code == 200 && data.data != null) {
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
		//------系统控制:表格内容编辑事件
		updateCommonSystemFun(index, newContent, TableType) {
			console.log(index, newContent, TableType)
			if(TableType == "Time") {
				this.CommonTaskSystemControl[index].Time = this.CommonTaskSystemControl[index].Time.substring(0, 10) + "T" + newContent;
			} else if(TableType == "proc_code") {
				this.CommonTaskSystemControl[index].proc_code = newContent;
			} else {
				this.CommonTaskSystemControl[index].TimeDur = this.CommonTaskSystemControl[index].TimeDur.substring(0, 10) + "T" + newContent;
			}
			this.CommonTaskSystemControl[index].isUpdateFlag = true;
			console.log(this.CommonTaskSystemControl[index].Time)
		},
		//删除一行系统控制
		delSystemFun() {
			let selecteSystem = this.selecteSystem;
			let CommonTaskSystemControl = this.CommonTaskSystemControl;
			let newArr = [];
			if(selecteSystem != -1) {
				for(let i = 0; i < CommonTaskSystemControl.length; i++) {
					if(i !== selecteSystem) {
						newArr.push(CommonTaskSystemControl[i])
					} else {
						if(CommonTaskSystemControl[i].TableName != "") {
							this.Axios.post('/api/GWServiceWebAPI/set_DeleteTableData', {
								tableName: "GWProcTimeSysTable",
								tableVlue: " ID=" + CommonTaskSystemControl[i].ID + ""
							}).then(res => {
								let data = res.data.HttpData;
								if(data.code == 200 && data.data != null) {
									let resultData = data.data;
									if(resultData == "1") {
										alert("删除成功");
									} else {
										alert("删除失败");
									}

								}
							}).catch(err => {
								console.log(err)
							})
						}
					}
				}
				this.CommonTaskSystemControl = newArr;
			}

		},
		//------增加一行普通任务列表
		addSystemTask() {
			let date = this.getNowFormatDate();
			console.log(date)
			this.CommonTaskSystemControl.push({
				ID: "",
				TableID: "",
				Time: date,
				proc_code: "",
				cmd_nm: "",
				TimeDur: "1900-01-01T00:00:04",
				isCommonSpan: false,
				isUpdateFlag: true
			});

		},
		//------系统控制:选中点击行，获取相应数据
		SelecteSystemFun(index) {
			let ID;
			for(var i = 0; i < this.CommonTaskSystemControl.length; i++) {
				ID = this.CommonTaskSystemControl[i].ID;
				if(ID != "") {
					this.CommonTaskSystemControl[i].isCommonSpan = true;
					this.CommonTaskSystemControl[i].isUpdateFlag = false;
				}
			}
			if(this.selecteSystem == index) {
				if(this.CommonTaskSystemControl[index].isCommonSpan) {
					this.CommonTaskSystemControl[index].isCommonSpan = false;
				}
			}
			this.selecteSystem = index;
			this.SystemStatus = false;
		},
		//------系统控制---------
		getCommonTaskSystemControl() {
			this.Axios.post('/api/GWServiceWebAPI/get_DataByTableNameAndID', {
				TableName: "GWProcTimeSysTable",
				TableID: this.CommonTaskTableID
			}).then(res => {
				let data = res.data.HttpData;
				if(data.code == 200 && data.data != null) {
					let resultData = data.data;
					let CommonTaskSystemControlData = [];
					for(var i = 0; i < resultData.length; i++) {
						CommonTaskSystemControlData.push({
							ID: resultData[i].ID,
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
		//------普通任务列表:保存编辑信息
		saveCommonTaskFun() {
			//设备列表
			let CommonTaskEquipControl = this.CommonTaskEquipControl;
			for(let i = 0; i < CommonTaskEquipControl.length; i++) {
				if(CommonTaskEquipControl[i].isUpdateFlag) {
					let set_nom = CommonTaskEquipControl[i].set_nom;
					let equip_no = set_nom.split(",")[0];
					let set_no = set_nom.split(",")[0];
					console.log(equip_no, set_no)
					if(CommonTaskEquipControl[i].ID != "") {
						this.Axios.post('/api/GWServiceWebAPI/set_BatchUpdate', {
							tableName: "GWProcTimeEqpTable",
							cellDataList: " Time='" + CommonTaskEquipControl[i].Time + "', TimeDur='" + CommonTaskEquipControl[i].TimeDur + "', equip_no='" + equip_no + "', set_no='" + set_no + "' ",
							ifDataList: " ID =" + CommonTaskEquipControl[i].ID
						}).then(res => {
							let data = res.data.HttpData;
							if(data.code == 200 && data.data != null) {
								let resultData = data.data;
								if(resultData == "1") {
									alert("更新成功");
								} else {
									alert("更新失败");
								}

							}
						}).catch(err => {
							console.log(err)
						})
					} else {
						if(CommonTaskEquipControl[i].set_no != "") {
							this.Axios.post('/api/GWServiceWebAPI/set_InsertNewTable', {
								tableName: "GWProcTimeEqpTable(TableID,Time,TimeDur,equip_no,set_no)",
								tableVlue: " select " + this.CommonTaskTableID + ",'" + CommonTaskEquipControl[i].Time + "','" + CommonTaskEquipControl[i].TimeDur + "'," + equip_no + "," + set_no + " "

							}).then(res => {
								let data = res.data.HttpData;
								if(data.code == 200 && data.data != null) {
									let resultData = data.data;
									if(resultData == "1") {
										alert("增加成功");
									} else {
										alert("增加失败");
									}

								}
							}).catch(err => {
								console.log(err)
							})
						}
					}

				}
			}
			//系统控制
			let CommonTaskSystemControl = this.CommonTaskSystemControl;
			for(let i = 0; i < CommonTaskSystemControl.length; i++) {
				if(CommonTaskSystemControl[i].isUpdateFlag) {
					if(CommonTaskSystemControl[i].ID != "") {
						this.Axios.post('/api/GWServiceWebAPI/set_BatchUpdate', {
							tableName: "GWProcTimeSysTable",
							cellDataList: " Time='" + CommonTaskSystemControl[i].Time + "', TimeDur='" + CommonTaskSystemControl[i].TimeDur + "', proc_code='" + CommonTaskSystemControl[i].proc_code + "' ",
							ifDataList: " TableID =" + CommonTaskSystemControl[i].TableID + " and ID=" + CommonTaskSystemControl[i].ID
						}).then(res => {
							let data = res.data.HttpData;
							if(data.code == 200 && data.data != null) {
								let resultData = data.data;
								if(resultData == "1") {
									alert("更新成功");
								} else {
									alert("更新失败");
								}

							}
						}).catch(err => {
							console.log(err)
						})
					} else {
						//						if(CommonTaskSystemControl[i])
						if(CommonTaskSystemControl[i].proc_code != "") {
							this.Axios.post('/api/GWServiceWebAPI/set_InsertNewTable', {
								tableName: "GWProcTimeSysTable(TableID,Time,TimeDur,proc_code)",
								tableVlue: " select " + this.CommonTaskTableID + ",'" + CommonTaskSystemControl[i].Time + "','" + CommonTaskSystemControl[i].TimeDur + "'," + CommonTaskSystemControl[i].proc_code + " "
							}).then(res => {
								let data = res.data.HttpData;
								if(data.code == 200 && data.data != null) {
									let resultData = data.data;
									if(resultData == "1") {
										alert("增加成功");
									} else {
										alert("增加失败");
									}

								}
							}).catch(err => {
								console.log(err)
							})
						} else {
							alert("请选择控制类型")
						}
					}
				}
			}
			//普通任务列表
			let CommonTaskList = this.CommonTaskList;
			for(let i = 0; i < CommonTaskList.length; i++) {
				if(CommonTaskList[i].isUpdateFlag) {
					if(CommonTaskList[i].TableID != "") {
						this.Axios.post('/api/GWServiceWebAPI/set_BatchUpdate', {
							tableName: "GWProcTimeTList",
							cellDataList: " TableName='" + CommonTaskList[i].TableName + "', Comment='" + CommonTaskList[i].Comment + "'",
							ifDataList: " TableID =" + CommonTaskList[i].TableID
						}).then(res => {
							let data = res.data.HttpData;
							if(data.code == 200 && data.data != null) {
								let resultData = data.data;
								if(resultData == "1") {
									alert("更新成功");
								} else {
									alert("更新失败");
								}

							}
						}).catch(err => {
							console.log(err)
						})
					} else {
						if(CommonTaskList[i].Time.ind)
							if(CommonTaskList[i].TableName != "") {
								this.Axios.post('/api/GWServiceWebAPI/set_InsertNewTable', {
									tableName: "GWProcTimeTList(TableID,TableName,Comment)",
									tableVlue: " select max(TableID)+1,'" + CommonTaskList[i].TableName + "','" + CommonTaskList[i].Comment + "' from GWProcTimeTList"
								}).then(res => {
									let data = res.data.HttpData;
									if(data.code == 200 && data.data != null) {
										let resultData = data.data;
										if(resultData == "1") {
											alert("增加成功");
										} else {
											alert("增加失败");
										}

									}
								}).catch(err => {
									console.log(err)
								})
							} else {
								alert("任务名称不能为空");
							}

					}
				}
			}
		},
		//------删除一行普通任务列表
		delCommonTask() {
			let selecteTable = this.selecteTable;
			let CommonTaskList = this.CommonTaskList;
			let newArr = [];
			for(let i = 0; i < CommonTaskList.length; i++) {
				if(i !== selecteTable) {
					newArr.push(CommonTaskList[i])
				} else {
					if(CommonTaskList[i].TableName != "") {
						this.Axios.post('/api/GWServiceWebAPI/set_DeleteTableData', {
							tableName: "GWProcTimeTList",
							tableVlue: " TableID=" + CommonTaskList[i].TableID + ""
						}).then(res => {
							let data = res.data.HttpData;
							if(data.code == 200 && data.data != null) {
								let resultData = data.data;
								if(resultData == "1") {
									alert("删除成功");
								} else {
									alert("删除失败");
								}

							}
						}).catch(err => {
							console.log(err)
						})
					}
				}
			}
			this.CommonTaskList = newArr;
		},
		//------增加一行普通任务列表
		addCommonTask() {
			this.CommonTaskList.push({
				TableID: "",
				TableName: "",
				Comment: "",
				isCommonSpan: false,
				isUpdateFlag: true
			});

		},

		//------普通任务列表:表格内容编辑事件
		updateCommonFun(index, newContent, TableType) {
			if(TableType == "TableName") {
				this.CommonTaskList[index].TableName = newContent.target.value;
			} else {
				this.CommonTaskList[index].Comment = newContent.target.value;
			}
			this.CommonTaskList[index].isUpdateFlag = true;
		},
		//------普通任务列表:选中点击行，获取相应数据
		SelecteTableFun(index) {
			let TableID;
			for(var i = 0; i < this.CommonTaskList.length; i++) {
				TableID = this.CommonTaskList[i].TableID;
				if(TableID != "") {
					this.CommonTaskList[i].isCommonSpan = true;
					this.CommonTaskList[i].isUpdateFlag = false;
				}
			}
			if(this.selecteTable == index) {
				if(this.CommonTaskList[index].isCommonSpan) {
					this.CommonTaskList[index].isCommonSpan = false;
				}
			}
			this.selecteTable = index;
			this.SystemStatus = true;
			this.EquipStatus = true;
			this.selecteSystem = -1;
			this.selecteEquip = -1;
			this.CommonTaskTableID = this.CommonTaskList[index].TableID;
			this.getCommonTaskSystemControl();
			this.getCommonTaskEquipControl();
		},
		//------获取普通任务:列表---------
		getCommonTaskList() {
			this.Axios.post('/api/GWServiceWebAPI/get_DataByTableName', {
				TableName: "GWProcTimeTList"
			}).then(res => {
				let data = res.data.HttpData;
				if(data.code == 200 && data.data != null) {
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
		getNowFormatDate() {
			var date = new Date();
			var seperator1 = "-";
			var seperator2 = ":";
			var month = date.getMonth() + 1;
			var strDate = date.getDate();
			if(month >= 1 && month <= 9) {
				month = "0" + month;
			}
			if(strDate >= 0 && strDate <= 9) {
				strDate = "0" + strDate;
			}
			var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate +
				"T" + date.getHours() + seperator2 + date.getMinutes() +
				seperator2 + date.getSeconds();
			return currentdate;
		},
		getNewValue(value1, value2) {
			return parseInt(value1 + value2)
		},
		ok() {

		},
		cancel() {

		}
	}
}