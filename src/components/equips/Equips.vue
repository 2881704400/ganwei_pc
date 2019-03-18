<template>
	<div class="equips">
		<Row class="wrap">
			<Col span="5" class="itemList">
			<aside class="equip-left">
				<nav class="equip-list">
					<Tree v-if="navList.length" :data="navList" :render="renderNavItem"></Tree>
				</nav>
			</aside>
			</Col>
			<Col span="19" class="itemDetail">
			<gw-tabs :navList="tabData" @tabsNavClick="tabClick">
				<Icon slot="nav-icon-0" class="tab-alarm" type="android-warning" v-if="tabData[0].hasAlarm"></Icon>
				<Icon slot="nav-icon-1" class="tab-alarm" type="android-warning" v-if="tabData[1].hasAlarm"></Icon>
				<div :slot="tabData[0].name" class="visual">
					<table class="gw-table yc">
						<thead>
							<tr>
								<th v-for="(th, index) of tabData[0].tbHead" :key="index" v-text="th"></th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="(line, lineIdx) of tabData[0].tbList" :key="lineIdx">
								<td class="status">
									<span :class="getEquipYcYxStatus(line,0)"></span>
								</td>
								<td v-text="line.m_iYCNo"></td>
								<td v-text="line.m_YCNm"></td>
								<td v-text="line.m_YCValue + line.m_Unit"></td>
								<td class="chart">
									<Button type="primary" icon="stats-bars" @click="openChart(line)"></Button>
								</td>
								<td v-text="line.m_AdviceMsg"></td>
							</tr>
						</tbody>
					</table>
				</div>
				<div :slot="tabData[1].name" class="state">
					<table class="gw-table yx">
						<thead>
							<tr>
								<th v-for="(th, index) of tabData[1].tbHead" :key="index" v-text="th"></th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="(line, lineIdx) of tabData[1].tbList" :key="lineIdx">
								<td class="status">
									<span :class="getEquipYcYxStatus(line,1)"></span>
								</td>
								<td v-text="line.m_iYXNo"></td>
								<td v-text="line.m_YXNm"></td>
								<td v-text="line.m_YXState"></td>
								<td v-text="line.m_AdviceMsg"></td>
							</tr>
						</tbody>
					</table>
				</div>
				<div :slot="tabData[2].name" class="tab-set">
					<Card title="操作命令" :dis-hover="true">
						<Button icon="ios-search" v-for="(btn, btnIndex) of tabData[2].setList" :key="btnIndex" v-text="btn.set_nm" @click="doSet(btn)"></Button>
					</Card>
				</div>
			</gw-tabs>
			</Col>
		</Row>
		<Modal v-model="showChart" :title=chartTitle @on-cancel="closeChart">
			<div id="realData"></div>
		</Modal>
		<Modal v-model="showSet" title="设置" @on-ok="setConfirm">
			<Form :label-width="100" v-if="setEquip !== null" class="set-form">
				<FormItem :label="setEquip.set_nm + '：'">
					<Input v-model="setEquip.newVal"></Input>
				</FormItem>
			</Form>
		</Modal>
		<!--<gw-loading v-if="isLoading"></gw-loading>-->
	</div>
</template>

<script>
	import { mapState } from 'vuex'
	import gwTabs from "@page/public/GwTabs"
	import gwLoading from "@page/public/GwLoading"
	import { formatDate } from "../../assets/js/date.js";

	export default {
		name: 'equips',
		data() {
			return {
				navList: [],
				isLoading: true,
				tabData: [{
						name: 'ycData',
						title: '遥测量',
						isActive: false,
						isShow: false,
						hasAlarm: false,
						equipState: -1,
						tbHead: ['报警状态', '模拟量ID', '名称', '当前值', '实时数据', '备注'],
						tbList: []
					},
					{
						name: 'yxData',
						title: '遥信量',
						isActive: false,
						isShow: false,
						hasAlarm: false,
						tbHead: ['报警状态', '状态量ID', '名称', '当前状态', '备注'],
						tbList: []
					},
					{
						name: 'setData',
						title: '设置',
						isShow: false,
						isActive: false,
						hasSet: false,
						setList: []
					}
				],
				showSet: false,
				showChart: false,
				setEquip: null,
				chart: null,
				realData: [],
				chartTitle: '',
				openEquip: -1,
				hubConn: null,
				hubProxy: null,
				timer: null,
				isAlarmFlag: false
			}
		},
		components: {
			gwTabs,
			gwLoading
		},
		computed: mapState({
			equipNo: state => state.curEquip.equipNo
		}),
		mounted() {
			this.init();
		},
		methods: {
			init() {
				this.loadNavList(this.navList, rt => {
					rt.forEach(item => {
						this.navList[0].children.push(item)
					});
					let nThis = this;
					let navListChildren = this.navList[0].children;
					let equipState = this.getEquipStateFun(navListChildren);
					this.navList[0].alarmState = equipState;
					let equipNo = this.getEquipNoFun(navListChildren);
					let nowHrefEquipNo = this.$route.hash.substr(1);
					if(nowHrefEquipNo) {
						this.$store.commit('setEquipNo', nowHrefEquipNo);
						this.$router.push("equips#" + nowHrefEquipNo);
					} else if(equipNo) {
						this.$store.commit('setEquipNo', equipNo);
						this.$router.push("equips#" + equipNo);
					}
					this.getAllState();
					this.connectServer(this.equipNo);
				});
			},
			getEquipYcYxStatus(item, type) {
				let equipState = this.tabData[type].equipState;
				let alarmState = "offline";
				if(equipState == 1) {
					if(item.m_IsAlarm) {
						alarmState = 'alarm'
					} else {
						alarmState = 'fine'
					}
				} else if(equipState == 2) {
					if(item.m_IsAlarm) {
						alarmState = 'alarm'
					} else {
						alarmState = 'fine'
					}
				} else {
					alarmState = 'offline'
				}
				return alarmState;
			},
			getEquipItemChildrenFun(navListData, m_equipNo) {
				let nThis = this;
				let data;
				let navListDataChildren = [];
				for(var i = 0; i < navListData.length; i++) {
					let navListDataInfo = navListData[i];
					for(let k = 0; k < navListDataInfo.length; k++) {
						if(navListDataInfo[k].children.length > 0) {
							navListDataChildren.push(navListDataInfo[k].children);
							let m_item = this.getEquipItemChildrenFun(navListDataChildren, m_equipNo);
							if(m_item) {
								return m_item;
							}
						} else {
							if(navListDataInfo[k].equipNo) {
								navListDataInfo[k].selected = false;
								if(navListDataInfo[k].equipNo == m_equipNo) {
									data = navListDataInfo[k];
									return data;
								}
							}
						}
					}
				}
				console.log(data)
				if(navListDataChildren.length > 0 && !data) {
					let m_item = this.getEquipItemChildrenFun(navListDataChildren, m_equipNo);
					if(m_item) {
						return m_item;
					}
				}
				if(data) {
					return data;
				}
			},
			getEquipItemFun(navListData, m_equipNo) {
				let nThis = this;
				let data;
				let navListDataChildren = [];
				for(var i = 0; i < navListData.length; i++) {
					if(navListData[i].children.length > 0) {
						navListDataChildren.push(navListData[i].children);
						let m_item = this.getEquipItemChildrenFun(navListDataChildren, m_equipNo);
						if(m_item) {
							return m_item;
						}
					} else {
						if(navListData[i].equipNo) {
							navListData[i].selected = false;
							if(navListData[i].equipNo == m_equipNo) {
								data = navListData[i];
								return data;
							}
						}
					}
				}
				if(navListDataChildren.length > 0 && !data) {
					let m_item = this.getEquipItemChildrenFun(navListDataChildren, m_equipNo);
					if(m_item) {
						return m_item;
					}
				}
				return data;
			},
			//获取设备列表当前是否存在报警项 多节点下递归获取
			getEquipStateChildrenFun(navListData) {
				let nThis = this;
				let alarmState = "";
				let navListDataChildren = [];
				for(let i = 0; i < navListData.length; i++) {
					let navListDataInfo = navListData[i];
					for(let k = 0; k < navListDataInfo.length; k++) {
						if(navListDataInfo[k].children.length > 0) {
							navListDataChildren.push(navListDataInfo[k].children);
							let m_alarmState = this.getEquipStateChildrenFun(navListDataChildren);
							if(m_alarmState) {
								return m_alarmState;
							}
						} else {
							if(navListDataInfo[k].alarmState == "alarm") {
								alarmState = navListDataInfo[k].alarmState;
								return alarmState;
							}
						}
					}
				}
				if(navListDataChildren.length > 0 && !alarmState) {
					let m_alarmState = this.getEquipStateChildrenFun(navListDataChildren);
					if(m_alarmState) {
						return m_alarmState;
					}
				}
				if(alarmState) {
					return alarmState;
				}
			},
			//获取设备列表当前是否存在报警项
			getEquipStateFun(navListData) {
				let nThis = this;
				let alarmState = "fine";
				let navListDataChildren = [];
				for(let i = 0; i < navListData.length; i++) {
					if(navListData[i].children.length > 0) {
						navListDataChildren.push(navListData[i].children);
						let m_alarmState = this.getEquipStateChildrenFun(navListDataChildren);
						if(m_alarmState) {
							return m_alarmState;
						}
					} else {
						if(navListData[i].alarmState == "alarm") {
							alarmState = navListData[i].alarmState;
							return alarmState;
						}
					}
				}
				if(navListDataChildren.length > 0 && !alarmState) {
					let m_alarmState = this.getEquipStateChildrenFun(navListDataChildren);
					if(m_alarmState) {
						return m_alarmState;
					}
				}
				return alarmState;
			},
			//获取设备列表第一个设备 多节点下递归获取
			getEquipNoChildrenFun(navListData) {
				let nThis = this;
				let equipNo = "";
				let navListDataChildren = [];
				for(let i = 0; i < navListData.length; i++) {
					let navListDataInfo = navListData[i];
					for(let k = 0; k < navListDataInfo.length; k++) {
						if(navListDataInfo[k].children.length > 0) {
							navListDataChildren.push(navListDataInfo[k].children);
							let m_equipNo = this.getEquipNoChildrenFun(navListDataChildren);
							if(m_equipNo) {
								return m_equipNo;
							}
						} else {
							if(navListDataInfo[k].equipNo) {
								equipNo = navListDataInfo[k].equipNo;
								return equipNo;
							}
						}
					}
				}
				if(navListDataChildren.length > 0 && !equipNo) {
					let m_equipNo = this.getEquipNoChildrenFun(navListDataChildren);
					if(m_equipNo) {
						return m_equipNo;
					}
				}
				if(equipNo) {
					return equipNo;
				}
			},
			//获取设备列表第一个设备
			getEquipNoFun(navListData) {
				let nThis = this;
				let equipNo = "";
				let navListDataChildren = [];
				for(let i = 0; i < navListData.length; i++) {
					if(navListData[i].children.length > 0) {
						navListDataChildren.push(navListData[i].children);
						let m_equipNo = this.getEquipNoChildrenFun(navListDataChildren);
						if(m_equipNo) {
							return m_equipNo;
						}
					} else {
						if(navListData[i].equipNo) {
							equipNo = navListData[i].equipNo;
							return equipNo;
						}
					}
				}
				if(navListDataChildren.length > 0 && !equipNo) {
					let m_equipNo = this.getEquipNoChildrenFun(navListDataChildren);
					if(m_equipNo) {
						return m_equipNo;
					}
				}
				return equipNo;
			},
			loadNavList(navItem, callback) {
				// 异步获取列表节点
				this.Axios.all([this.Axios.post("/api/real/equip_tree"), this.Axios.post('/api/GWServiceWebAPI/getEquipList'), this.Axios.get('/api/GWServiceWebAPI/getEquipState')])
					.then(this.Axios.spread((treeRes, equipRes, stateRes) => {
						let treeRt = treeRes.data.HttpData,
							equipRt = equipRes.data.HttpData,
							stateRt = stateRes.data.HttpData;
						// console.log(treeRt, "aaaa")
						// console.log(equipRt,"aaaa") 
						// console.log(stateRt,"aaaa")
						if(treeRt.code === 200 && equipRt.code === 200 && stateRt.code === 200) {
							let treeData = []
							let equipData = equipRt.data
							let stateData = stateRt.data
							treeData = treeRt.data.GWEquipTreeItems
							//获取下拉的内容
							let resultData = []
							this.navList = [{
								alarmState: "fine",
								children: [],
								equipNo: treeRt.data.EquipNo,
								href: "equips",
								nodeKey: 0,
								selected: false,
								title: treeRt.data.Name,
								render: (h, {
									root,
									node,
									data
								}) => {
									return h(
										"div", {
											style: {
												fontSize: "14px",
												cursor: "pointer",
												position: "relative",
												paddingLeft: "30px"
											},
											class: ["nav-item", data.selected ? "selected" : ""],
											on: {
												click: () => {
													this.$set(data, "expand", !data.expand);
												}
											}
										}, [
											h("Icon", {
												style: {
													width: "20px",
													height: "20px",
													lineHeight: "20px",
													textAlign: "center"
												},
												class: [
													"ivu-icon",
													data.expand ?
													"ivu-icon-arrow-down-b" :
													"ivu-icon-arrow-right-b"
												]
											}),
											h(
												"span", {
													style: {
														display: "inline-block",
														verticalAlign: "middle",
														width: "16px",
														height: "16px",
														borderRadius: "50%",
														marginRight: "6px"
													},
													class: 'alarm-state ' + data.alarmState
												}
											),
											h(
												"span", {
													style: {
														lineHeight: "50px"
													}
												},
												data.title
											)
										]
									);
								}
							}];
							this.dealNavList(treeData, equipData, resultData, stateData)
							callback(resultData)
						} else {
							this.$Message.destroy();
							this.$Message.warning('获取设备列表失败，请重试！')
							console.log(treeRt, equipRt, stateRt)
						}
					}))
					.catch(err => {
						console.log(err)
					})
					.then(() => {
						let equipNo = parseInt(this.$route.hash.substring(1))
						this.findEquip(this.navList, equipNo)
					})
			},
			findEquip(arr, equipNo) {
				for(let i = 0; i < arr.length; i++) {
					if(equipNo === parseInt(arr[i].equipNo)) {
						arr[i].selected = true
						this.$store.commit('setCurpage', {
							isHome: false,
							name: '设备数据',
							childName: arr[i].title
						})
						break
					} else {
						if(arr[i].children.length > 0) {
							this.$set(arr[i], 'expand', true)
							this.findEquip(arr[i].children, equipNo)
						}
					}
				}
			},
			dealNavList(arrData, equipList, result, stateList = []) {
				// 处理设备数据子列表
				arrData = arrData.filter(item => {
					if(equipList.some(equip => {
							return equip.equip_no === parseInt(item.EquipNo) || item.EquipNo === ''
						})) {
						return item
					}
				}).filter(item => {
					if(item.EquipNo === '1005' && item.Image === '精密空调.png') {
						return false
					} else {
						return true
					}
				})

				arrData.forEach((dt, index) => {
					if(dt.GWEquipTreeItems && dt.GWEquipTreeItems.length) {
						// 设置报警状态
						let alarmNum = 0
						let alarmState = ''
						let equipTreeArr = dt.GWEquipTreeItems.filter(item => {
							if(equipList.some(equip => {
									return equip.equip_no === parseInt(item.EquipNo) || item.EquipNo === ''
								})) {
								return item
							}
						})
						equipTreeArr.forEach(item => {
							if(item.EquipNo) {
								alarmNum += (stateList.filter(state => state.m_iEquipNo === parseInt(item.EquipNo))[0].m_State === 2) ? 1 : 0
							}
						})
						alarmState = (alarmNum > 0) ? 'alarm' : 'fine'
						result.push({
							alarmState: alarmState,
							title: dt.Name,
							children: [],
							selected: false,
							render: (h, {
								root,
								node,
								data
							}) => {
								return h(
									"div", {
										style: {
											fontSize: "14px",
											cursor: "pointer",
											position: "relative",
											paddingLeft: "30px"
										},
										class: ["nav-item", data.selected ? "selected" : ""],
										on: {
											click: () => {
												this.$set(data, "expand", !data.expand);
											}
										}
									}, [
										h("Icon", {
											style: {
												width: "20px",
												height: "20px",
												lineHeight: "20px",
												marginLeft: "8px",
												textAlign: "center"
											},
											class: [
												"ivu-icon",
												data.expand ?
												"ivu-icon-arrow-down-b" :
												"ivu-icon-arrow-right-b"
											]
										}),
										h(
											"span", {
												style: {
													display: "inline-block",
													verticalAlign: "middle",
													width: "16px",
													height: "16px",
													borderRadius: "50%",
													marginRight: "6px"
												},
												class: 'alarm-state ' + data.alarmState
											}
										),
										h(
											"span", {
												style: {
													lineHeight: "50px"
												}
											},
											data.title
										)
									]
								);
							}
						});
						this.dealNavList(dt.GWEquipTreeItems, equipList, result[index].children, stateList)
					} else {
						let equipNo = parseInt(dt.EquipNo)
						let alarmState = ''
						var stateNum = stateList.filter(item => item.m_iEquipNo === equipNo)
						stateNum.length > 0 ? stateNum = stateNum[0].m_State : stateNum = 6;
						switch(stateNum) {
							case 0:
								alarmState = 'offline' //离线 灰色
								break;
							case 1:
								alarmState = 'fine' //正常 绿色
								break;
							case 2:
								alarmState = 'alarm' //报警 红色
								break;
							case 3:
								alarmState = 'setting' //设置中 黄色
								break;
							case 4:
								alarmState = 'initial' //初始化 蓝色
								break;
							case 5:
								alarmState = 'withdrawing' //   橙色
								break;
							default:
								alarmState = 'unknown' //未知 灰色
								break;
						}
						//						if(equipNo === 300) {
						//							dt.Name = '场景控制'
						//						} else if(equipNo === 1005) {
						//							dt.Name = '虚拟设备'
						//						}
						result.push({
							title: dt.Name,
							equipNo: dt.EquipNo,
							href: "equips",
							alarmState: alarmState,
							children: [],
							selected: false,
							render: (h, {
								root,
								node,
								data
							}) => {
								return h(
									"div", {
										style: {
											fontSize: "14px",
											cursor: "pointer",
											position: "relative",
											paddingLeft: "30px"
										},
										class: ["nav-item", data.selected ? "selected" : ""],
										on: {
											click: () => {
												//  if(data.alarmState === "fine"){
												if(data.selected) return false
												let obj = {
													isHome: false,
													name: '设备数据',
													childName: data.title
												}
												this.$store.commit('setCurpage', obj)
												root.forEach(ele => {
													if(ele.nodeKey !== 1) {
														ele.node.selected = false
													}
												});
												data.selected = true;
												this.$router.push({
													path: "equips#" + data.equipNo
												});
											}
										}
										//}
									}, [
										h(
											"span", {
												style: {
													display: "inline-block",
													verticalAlign: "middle",
													width: "16px",
													height: "16px",
													borderRadius: "50%",
													marginLeft: "28px",
													marginRight: "6px"
												},
												class: 'alarm-state ' + data.alarmState
											}
										),
										h(
											"span", {
												style: {
													lineHeight: "50px"
												}
											},
											data.title
										)
									]
								);
							}
						});
					}
				});
			},
			renderNavItem(h, {
				root,
				node,
				data
			}) {
				this.rootSave = root;
				// leftNav节点渲染
				if(data.hasChild) {
					return h(
						"div", {
							style: {
								fontSize: "16px",
								paddingLeft: "34px",
								position: "relative",
								cursor: "pointer"
							},
							class: ["nav-item", data.selected ? "selected" : ""],
							on: {
								click: () => {
									this.navItemClick(root, data)
								}
							}
						}, [
							h("Icon", {
								style: {
									width: "20px",
									height: "20px",
									lineHeight: "20px",
									position: "absolute",
									top: "50%",
									left: "10px",
									marginTop: "-10px",
									textAlign: "center"
								},
								class: [
									"ivu-icon",
									data.expand ? "ivu-icon-arrow-down-b" : "ivu-icon-arrow-right-b"
								]
							}),
							h("Icon", {
								props: {
									type: data.iconClass,
									size: 28
								},
								style: {
									verticalAlign: "middle",
									width: "22px"
								}
							}),
							h(
								"span", {
									style: {
										verticalAlign: "middle",
										lineHeight: "60px",
										marginLeft: "20px"
									}
								},
								data.title
							),
							h("Spin", {
								props: {
									fix: true
								},
								style: [data.loading ? {
									"z-index": "71"
								} : {
									"z-index": "-1"
								}]
							})
						]
					);
				} else {
					return h(
						"div", {
							style: {
								fontSize: "16px",
								paddingLeft: "34px",
								position: "relative",
								cursor: "pointer",
								transition: "all 400ms"
							},
							class: ["nav-item", data.selected ? "selected" : ""],
							on: {
								click: () => {
									let obj = data.title === '首页' ? {
										isHome: true
									} : {
										isHome: false,
										name: data.title
									}
									this.$store.commit('setCurpage', obj)
									if(data.selected) return false
									root.forEach(ele => {
										if(ele.node.expand) ele.node.expand = false
										ele.node.selected = false
									})
									data.selected = true
									this.$router.push(data.href)
								}
							}
						}, [
							h("Icon", {
								props: {
									type: data.iconClass,
									size: 28
								},
								style: {
									verticalAlign: "middle",
									width: "22px"
								}
							}),
							h(
								"span", {
									style: {
										verticalAlign: "middle",
										lineHeight: "60px",
										marginLeft: "20px"
									}
								},
								data.title
							)
						]
					);
				}
			},
			tabClick(navList, nv) {
				navList.forEach(nv => {
					nv.isActive = false
				})
				this.$set(nv, "isActive", true)
			},
			getAllState() {
				let nowHrefEquipNo = this.$route.hash.substr(1);
				let navList = this.navList[0].children;
				for(var i = 0; i < navList.length; i++) {
					if(navList[i].equipNo == nowHrefEquipNo) {
						this.navList[0].children[i].selected = true;
					} else {
						this.navList[0].children[i].selected = false;
					}
				}
				this.isLoading = true;
				this.Axios.post('/api/real/equip_item_state', {
					equip_no: this.equipNo
				}).then(res => {
					let rt = res.data.HttpData

					if(rt.code === 200) {
						let data = rt.data
						let ychasAlarm = false
						let yxhasAlarm = false
						this.tabData[0].tbList.splice(0, this.tabData[0].tbList.length)
						this.tabData[1].tbList.splice(0, this.tabData[1].tbList.length)
						for(let key in data.YCItemDict) {
							this.tabData[0].tbList.push(data.YCItemDict[key])
							if(!ychasAlarm && data.YCItemDict[key].m_IsAlarm) {
								ychasAlarm = true;
							}
						}
						this.tabData[0].hasAlarm = ychasAlarm
						if(this.tabData[0].tbList.length > 0) {
							this.tabClick(this.tabData, this.tabData[0])
							this.tabData[0].isShow = true
							this.tabData[0].equipState = data.EquipItem.m_State
						} else {
							this.tabData[0].isActive = false
							this.tabData[0].isShow = false
							this.tabData[0].equipState = -1
						}
						for(let key in data.YXItemDict) {
							this.tabData[1].tbList.push(data.YXItemDict[key])
							if(!yxhasAlarm && data.YXItemDict[key].m_IsAlarm) {
								yxhasAlarm = true;
							}
						}
						this.tabData[1].hasAlarm = yxhasAlarm
						if(this.tabData[1].tbList.length > 0) {
							this.tabData[1].isShow = true
							this.tabData[1].equipState = data.EquipItem.m_State
							if(!this.tabData[0].isActive) {
								this.tabClick(this.tabData, this.tabData[1])
							}
						} else {
							this.tabData[1].isActive = false
							this.tabData[1].isShow = false
							this.tabData[1].equipState = -1
						}
						this.tabData[2].equipInfo = data.EquipItem
						this.getSetopt(this.tabData[2].equipInfo.m_iEquipNo)
					} else {
						this.$Message.destroy();
						if(rt.code === 1003) {
							this.$Message.warning('当前设备节点无设备信息！')
						} else {
							this.$Message.warning('数据获取失败，请重试！')
						}
						this.isLoading = false
						console.log(rt)
					}
				}).catch(err => {
					this.$Message.destroy();
					this.$Message.warning('token验证失败，请检查登陆信息!')
					console.log(err)
				})
			},
			getSetopt(equipNo) {
				const reqData = {
					findEquip: true,
					equipNo: equipNo
				}
				this.Axios.post('/api/GWServiceWebAPI/getSetparmList', reqData)
					.then(res => {
						let rt = res.data.HttpData
						if(rt.code === 200) {
							let data = rt.data
							if(data.length > 0) {
								this.tabData[2].hasSet = true
								this.tabData[2].isShow = true
								this.tabData[2].setList = data
								if(!this.tabData[0].isShow && !this.tabData[1].isShow) {
									this.tabClick(this.tabData, this.tabData[2])
								}
							} else {
								this.tabData[2].hasSet = false
								this.tabData[2].isShow = false
							}
							this.tabData[2].setList = this.tabData[2].setList.sort((a, b) => {
								return a.set_no - b.set_no
							})
							this.isLoading = false
						} else {
							this.isLoading = false;
							this.$Message.destroy();
							this.$Message.warning('获取设置操作列表失败，请重试！');
						}
					})
					.catch(err => {
						this.isLoading = false
						console.log(err)
					})
			},
			doSet(equip) {
				if(equip.set_type === 'V') {
					this.setEquip = equip
					this.$set(this.setEquip, 'newVal', this.setEquip.value)
					this.showSet = true
				} else {
					this.$Modal.confirm({
						title: '执行操作',
						content: '<p>确定执行操作：<span style="color:#f90">' + equip.set_nm + '</span></p>',
						onOk: () => {
							const reqData = {
								equip_no: '' + equip.equip_no,
								main_instr: equip.main_instruction,
								mino_instr: equip.minor_instruction || "-",
								value: equip.value
							}
							this.Axios.post('/api/real/setup', reqData)
								.then(res => {
									this.$Message.destroy();
									const rt = res.data.HttpData;
									if(rt.code === 201) {
										this.$Message.success(rt.message)

										// this.getAllState()
									} else {
										console.log(rt)
										this.$Message.warning('操作失败，请重试')
									}
								})
								.catch(err => {
									console.log(err)
								})
						}
					})
				}
			},
			setConfirm() {
				if(isNaN(parseInt(this.setEquip.newVal))) {
					this.$Message.destroy();
					this.$Message.warning('设置失败，请输入正确格式')
				} else {
					const reqData = {
						equip_no: '' + this.setEquip.equip_no,
						main_instr: this.setEquip.main_instruction,
						mino_instr: this.setEquip.minor_instruction,
						value: this.setEquip.newVal
					}
					this.Axios.post('/api/real/setup', reqData)
						.then(res => {
							const rt = res.data.HttpData;
							this.$Message.destroy();
							if(rt.code === 201) {
								this.$Message.success(rt.message)
								// this.getAllState()
							} else {
								console.log(rt)
								this.$Message.warning('操作失败，请重试')
							}
						})
						.catch(err => {
							console.log(err)
						})
				}
			},
			connectServer(equipNo) {
				this.hubConn = null
				this.hubConn = $.hubConnection()
				this.hubProxy = this.hubConn.createHubProxy('ServerHub')
				this.hubProxy.on('sendConnect', data => {
					//连接
				});

				// 来自广播新消息类型和数据
				this.hubProxy.on('sendAll', (data, type) => {
					// console.log('ycyxall--------------' + type, data)
					if(type == "message") {
						//console.log(type + "：" + data);
						return true;
					}
					// 更新报警状态
					let rt = JSON.parse(data)
					if(rt.length > 0) {
						if(type === 'ycp') {
							let equipState = this.tabData[0].equipState
							this.tabData[0].hasAlarm = rt.some(item => item.m_IsAlarm === 'True')
							if(this.tabData[0].hasAlarm) {
								this.isAlarmFlag = true
								this.updateNavAlarm(2)
							} else {
								this.isAlarmFlag = false
								this.updateNavAlarm(equipState)
							}
						} else if(type === 'yxp' && !this.isAlarmFlag) {
							let equipState = this.tabData[1].equipState
							this.tabData[1].hasAlarm = rt.some(item => item.m_IsAlarm === 'True')
							if(this.tabData[1].hasAlarm) {
								this.updateNavAlarm(2)
							} else {
								this.updateNavAlarm(equipState)
							}
						}
					}
				});

				// ycp有广播消息
				this.hubProxy.on('sendYcpSingle', data => {
					// console.log('yccccp----------------', data)
					// 更新ycp实时数据
					this.tabData[0].tbList.forEach(item => {
						let rt = data.split(',')
						if(item.m_iYCNo === parseInt(rt[0])) {
							item.m_YCValue = rt[2]
							item.m_IsAlarm = rt[4] === 'True' ? true : false

							item.m_AdviceMsg = rt[3]
							this.tabData[0].hasAlarm = item.m_IsAlarm
						}
					})
				});

				// yxp有广播消息
				this.hubProxy.on('sendYxpSingle', data => {
					// console.log('yxxxxp-------------------', data)
					// 更新yxp实时数据
					this.tabData[1].tbList.forEach(item => {
						let rt = data.split(',')
						if(item.m_iYXNo === parseInt(rt[0])) {
							item.m_YXState = rt[2]
							item.m_IsAlarm = rt[4] === 'True' ? true : false
							item.m_AdviceMsg = rt[3]
							this.tabData[1].hasAlarm = item.m_IsAlarm
						}
					})
				});

				// 监听设备状态
				this.hubProxy.on('sendEquipSingle', data => {
					//					console.log('equip-------------------', data)
					let rt = data.split(',')
					if(rt[2] === 'HaveAlarm') {
						this.updateNavOtherAlarm(rt[0], 2)
					} else if(rt[2] === 'CommunicationOK') {
						this.updateNavOtherAlarm(rt[0], 1)
					} else if(rt[2] === 'NoCommunication') {
						this.updateNavOtherAlarm(rt[0], 0)
					}

				});

				this.hubConn.stop()
				// 开始连接signalr
				this.hubConn.start()
					.done(() => {
						// console.log('start!')
						this.hubProxy.invoke('Connect')
						this.hubProxy.invoke('ListenEquipAll', window.localStorage.gw_token.split('-')[0], window.localStorage.gw_token.split('-')[1])
						this.hubProxy.invoke('StartListen', equipNo, window.localStorage.gw_token.split('-')[0], window.localStorage.gw_token.split('-')[1])
					})
					.fail(err => {
						console.log('错误-------:', err)
					})

				// signalr重连
				this.hubConn.reconnecting(() => {
					this.hubConn.stop();
					this.hubConn.start()
						.done(() => {
							// console.log('start!')
							this.hubProxy.invoke('Connect')
							this.hubProxy.invoke('ListenEquipAll', window.localStorage.gw_token.split('-')[0], window.localStorage.gw_token.split('-')[1])
							this.hubProxy.invoke('StartListen', equipNo, window.localStorage.gw_token.split('-')[0], window.localStorage.gw_token.split('-')[1])
						})
						.fail(err => {
							console.log('错误-------:', err)
						})
				})
				// signalr断开连接
				this.hubConn.disconnected(() => {
					this.hubConn.stop()
					//      alert(1)点击设备数据的时候触发
				})
				// 高频连接触发
				this.hubConn.connectionSlow((err) => {
					// console.log(err)
				})
				// 收到signalr消息触发
				this.hubConn.received((err) => {
					//            console.log(err,"shoudaoxiaoxi")
				})
			},
			connectHub(equipNo) {
				// console.log('reflash conn')
				if(!this.hubConn) {
					return false;
				}
				this.hubConn.stop()
				// 开始连接signalr
				this.hubConn.start()
					.done(() => {
						// console.log('start!')
						this.hubProxy.invoke('Connect')
						this.hubProxy.invoke('ListenEquipAll', window.localStorage.gw_token.split('-')[0], window.localStorage.gw_token.split('-')[1])
						this.hubProxy.invoke('StartListen', equipNo, window.localStorage.gw_token.split('-')[0], window.localStorage.gw_token.split('-')[1])
					})
					.fail(err => {
						console.log('错误-------:', err)
					})
			},
			closeChart() {
				this.chart = null
				clearInterval(this.timer)
			},
			openChart(lineObj) {
				if(this.chart === null) {
					this.chart = this.$echart.init(document.getElementById('realData'))
				}
				this.openEquip = lineObj.m_iYCNo
				this.realData.splice(0, this.realData.length)

				this.chartTitle = lineObj.m_YCNm
				this.showChart = !this.showChart
				let xData = [];
				let realChartData = [];
				for(var i = 0; i < this.realData.length; i++) {
					let commonTime = formatDate(new Date(this.realData[i][0]), "hh:mm:ss");
					xData.push(commonTime);
					realChartData.push(this.realData[i][1]);
				}
				this.chart.setOption({
					title: {
						show: false,
						text: lineObj.m_YCNm,
						textStyle: {
							width: '100%',
							fontSize: 16,
							align: 'center'
						}
					},
					tooltip: {},
					xAxis: {
						type: 'category',
						splitLine: {
							show: false
						},
						axisLabel: {
							margin: 12
						},
						data: xData
					},
					yAxis: [{
						name: lineObj.m_Unit,
						nameTextStyle: {
							align: 'right',
							padding: [0, 30, 0, 0]
						},
						nameGap: 30,
						type: 'value',
						scale: true,
						axisLine: {
							show: false
						},
						axisTick: {
							show: false
						},
						axisLabel: {
							margin: 12
						},
						// boundaryGap: ['20%', '20%']
						min: value => value.min - 1,
						max: value => value.max + 1
					}],
					series: [{
						name: lineObj.m_Unit,
						type: 'line',
						smooth: true,
						itemStyle: {
							color: '#7BB4EB',
							borderColor: '#7BB4EB',
							borderWidth: 4
						},
						label: {
							show: true,
							distance: 8,
							color: '#333',
							formatter: (item) => item.value + lineObj.m_Unit
						},
						lineStyle: {
							color: '#7BB4EB'
						},
						data: realChartData
					}]
				})
				if(this.timer) clearInterval(this.timer)
				this.updateChart([new Date().getTime(), parseInt(lineObj.m_YCValue)])
				if(this.chart !== null) {
					this.timer = setInterval(() => {
						this.updateChart([new Date().getTime(), parseInt(lineObj.m_YCValue)])
					}, 3000)
				}
			},
			updateChart(newData) {
				this.realData.push(newData)
				if(this.realData.length > 5) {
					this.realData.shift()
				}
				let xData = [];
				let realChartData = [];
				for(var i = 0; i < this.realData.length; i++) {
					let commonTime = formatDate(new Date(this.realData[i][0]), "hh:mm:ss");

					xData.push(commonTime);
					realChartData.push(this.realData[i][1]);
				}

				this.chart.setOption({
					xAxis: {
						data: xData
					},
					series: [{
						data: realChartData
					}]
				})
			},
			updateNavOtherAlarm(equipNo, state) {
				let m_equipNo = this.equipNo;
				let alarmState = "";
				switch(state) {
					case 0:
						alarmState = 'offline' //离线 灰色
						break;
					case 1:
						alarmState = 'fine' //正常 绿色
						break;
					case 2:
						alarmState = 'alarm' //报警 红色
						break;
					case 3:
						alarmState = 'setting' //设置中 黄色
						break;
					case 4:
						alarmState = 'initial' //初始化 蓝色
						break;
					case 5:
						alarmState = 'withdrawing' //   橙色
						break;
					default:
						alarmState = 'unknown' //未知 灰色
						break;
				}
				if(m_equipNo == equipNo) {
					let data = this.getEquipItemFun(this.navList[0].children, equipNo);
					if(data.selected) {
						return false;
					}
					let obj = {
						isHome: false,
						name: '设备数据',
						childName: data.title
					}
					this.$store.commit('setCurpage', obj)
					data.selected = true;
					this.$router.push({
						path: "equips#" + data.equipNo
					});
				}
				this.doNavState(equipNo, alarmState);
			},
			updateNavAlarm(state) {
				let alarmState = "";
				switch(state) {
					case 0:
						alarmState = 'offline' //离线 灰色
						break;
					case 1:
						alarmState = 'fine' //正常 绿色
						break;
					case 2:
						alarmState = 'alarm' //报警 红色
						break;
					case 3:
						alarmState = 'setting' //设置中 黄色
						break;
					case 4:
						alarmState = 'initial' //初始化 蓝色
						break;
					case 5:
						alarmState = 'withdrawing' //   橙色
						break;
					default:
						alarmState = 'unknown' //未知 灰色
						break;
				}
				this.doNavState(this.equipNo, alarmState);
			},
			doNavState(equipNo, state) {
				if(this.navList[0].children.length) {
					this.dealNavState(this.navList[0].children, equipNo, state)
					this.dealSumState(this.navList[0].children)
				}
			},
			dealNavState(list, equipNo, state) { //更新本身节点状态
				list.forEach(item => {
					if(item.children.length) {
						this.dealNavState(item.children, equipNo, state)
					} else {
						if(parseInt(item.equipNo) === parseInt(equipNo)) {
							item.alarmState = state
						}
					}
				})
			},
			dealSumState(list) { //更新父节点状态
				let listType = 0;
				let equipState = this.tabData[0].equipState;
				list.forEach(item => {
					if(item.children.length) {
						let alarmNum = 0
						item.children.forEach(nav => {
							alarmNum += (nav.alarmState === 'alarm') ? 1 : 0
						})
						//						item.alarmState = (alarmNum > 0) ? 'alarm' : 'fine'
						if(alarmNum > 0) {
							item.alarmState = 'alarm'
							listType++;
						} else {
							if(equipState == 1 | equipState == 2) {
								item.alarmState = 'fine'
							}
						}
						this.dealSumState(item.children)
					}
				});
				this.navList[0].alarmState = (listType > 0) ? 'alarm' : 'fine'
			},
		},
		beforeRouteUpdate(to, from, next) {
			this.$store.commit('setEquipNo', to.hash.substr(1))
			next()
			this.getAllState()
			this.connectHub(this.equipNo)
		},
		beforeRouteLeave(to, from, next) {
			if(this.hubConn) {
				this.hubConn.stop()
				next()
			}
		},
		beforeDestroy() {
			if(this.hubConn) {
				this.hubConn.stop()
			}
		}
		//		mounted() {
		//			this.$store.commit('setEquipNo', this.$route.hash.substr(1))
		//			this.getAllState()
		//			this.connectServer(this.equipNo)
		//		}
	}
</script>

<style lang="scss" src="@assets/styles/sass/equips.scss"></style>