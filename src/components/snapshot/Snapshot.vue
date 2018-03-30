<template>
	<div class="snapashot">
		<div class="common-tab">
			<Tabs type="card">
				<TabPane label="全部">
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
								<tr>
									<td><i class="iconfont icon-dian color-error"></i></td>
									<td>2017-03-26 15:18:11</td>
									<td>设备数量</td>
									<td><button @click="sureModal = true">请确认</button></td>
									<td>过低</td>
								</tr>
								<tr>
									<td><i class="iconfont icon-dian color-warn"></i></td>
									<td>2017-03-26 15:18:11</td>
									<td>设备数量</td>
									<td><button @click="sureModal = true">请确认</button></td>
									<td>过低</td>
								</tr>
								<tr>
									<td><i class="iconfont icon-dian color-info"></i></td>
									<td>2017-03-26 15:18:11</td>
									<td>设备数量</td>
									<td><button @click="sureModal = true">请确认</button></td>
									<td>过低</td>
								</tr>
							</tbody>
						</table>
					</div>
				</TabPane>
				<TabPane label="故障">
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
								<tr>
									<td><i class="iconfont icon-dian color-error"></i></td>
									<td>2017-03-26 15:18:11</td>
									<td>设备数量</td>
									<td><button @click="sureModal = true">请确认</button></td>
									<td>过低</td>
								</tr>
								<tr>
									<td><i class="iconfont icon-dian color-warn"></i></td>
									<td>2017-03-26 15:18:11</td>
									<td>设备数量</td>
									<td><button @click="sureModal = true">请确认</button></td>
									<td>过低</td>
								</tr>
								<tr>
									<td><i class="iconfont icon-dian color-info"></i></td>
									<td>2017-03-26 15:18:11</td>
									<td>设备数量</td>
									<td><button @click="sureModal = true">请确认</button></td>
									<td>过低</td>
								</tr>
							</tbody>
						</table>
					</div>
				</TabPane>
				<TabPane label="警告">
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
								<tr>
									<td><i class="iconfont icon-dian color-error"></i></td>
									<td>2017-03-26 15:18:11</td>
									<td>设备数量</td>
									<td><button @click="sureModal = true">请确认</button></td>
									<td>过低</td>
								</tr>
								<tr>
									<td><i class="iconfont icon-dian color-warn"></i></td>
									<td>2017-03-26 15:18:11</td>
									<td>设备数量</td>
									<td><button @click="sureModal = true">请确认</button></td>
									<td>过低</td>
								</tr>
								<tr>
									<td><i class="iconfont icon-dian color-info"></i></td>
									<td>2017-03-26 15:18:11</td>
									<td>设备数量</td>
									<td><button @click="sureModal = true">请确认</button></td>
									<td>过低</td>
								</tr>
							</tbody>
						</table>
					</div>
				</TabPane>
				<TabPane label="信息">
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
								<tr>
									<td><i class="iconfont icon-dian color-error"></i></td>
									<td>2017-03-26 15:18:11</td>
									<td>设备数量</td>
									<td><button @click="sureModal = true">请确认</button></td>
									<td>过低</td>
								</tr>
								<tr>
									<td><i class="iconfont icon-dian color-warn"></i></td>
									<td>2017-03-26 15:18:11</td>
									<td>设备数量</td>
									<td><button @click="sureModal = true">请确认</button></td>
									<td>过低</td>
								</tr>
								<tr>
									<td><i class="iconfont icon-dian color-info"></i></td>
									<td>2017-03-26 15:18:11</td>
									<td>设备数量</td>
									<td><button @click="sureModal = true">请确认</button></td>
									<td>过低</td>
								</tr>
							</tbody>
						</table>
					</div>
				</TabPane>
				<TabPane label="设置">
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
								<tr>
									<td><i class="iconfont icon-dian color-error"></i></td>
									<td>2017-03-26 15:18:11</td>
									<td>设备数量</td>
									<td><button @click="sureModal = true">请确认</button></td>
									<td>过低</td>
								</tr>
								<tr>
									<td><i class="iconfont icon-dian color-warn"></i></td>
									<td>2017-03-26 15:18:11</td>
									<td>设备数量</td>
									<td><button @click="sureModal = true">请确认</button></td>
									<td>过低</td>
								</tr>
								<tr>
									<td><i class="iconfont icon-dian color-info"></i></td>
									<td>2017-03-26 15:18:11</td>
									<td>设备数量</td>
									<td><button @click="sureModal = true">请确认</button></td>
									<td>过低</td>
								</tr>
							</tbody>
						</table>
					</div>
				</TabPane>
			</Tabs>
		</div>
		<Modal v-model="sureModal" title="设备配置" @on-ok="ok" @on-cancel="cancel" class="common-moal">
			<p>Content of dialog</p>
			<p>Content of dialog</p>
			<p>Content of dialog</p>
		</Modal>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				sureModal: false
			}
		},
		methods: {
			getRealTimeEvent() {
				this.Axios.post('/api/GWServiceWebAPI/get_AlarmConfig')
					.then(res => {
						let data = res.data.HttpData
						console.log(data)
						if(data.code === 200) {
							this.listAdd = data.map(item => {
								return {
									value: item.equip_no,
									label: item.equip_nm,
									loading: false,
									children: []
								}
							})
							console.log(this.listAdd)
						}
					}).catch(err => {
						console.log(err)
					})
			},
			getEquips() {
				this.Axios.post('/api/real/equip_state')
					.then(res => {
						let rt = res.data.HttpData
						if(rt.code === 200) {
							let data = rt.data
							this.listAdd = data.map(item => {
								return {
									value: item.m_iEquipNo,
									label: item.m_EquipNm,
									loading: false,
									children: []
								}
							})
							console.log(this.listAdd)
						} else {
							this.$Message.warning(rt.message)
						}
					})
					.catch(err => {
						console.log(err)
					})
			},
			ok() {
				this.$Message.info('Clicked ok');
			},
			cancel() {
				this.$Message.info('Clicked cancel');
			}
		}
	}
</script>

<style lang="scss">
	@import url("../../../static/common_dengjf.css");
</style>