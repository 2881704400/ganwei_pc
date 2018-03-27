<template>
	<div class="snapashot">
		<div class="common-tab tab-content-border">
			<Tabs type="card">
				<TabPane label="普通任务">
					<div class="three-content">
						<div class="table-toolbar">
							<span>普通任务列表</span>
							<button>保存</button>
							<button>删除</button>
							<button>添加</button>
						</div>
						<div class="common-smalltable">
							<table>
								<thead>
									<tr>
										<th>普通任务名称</th>
										<th>说明</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td>定时开门</td>
										<td>每天早上8点开门禁</td>
									</tr>
									<tr>
										<td>定时开门</td>
										<td>每天早上8点开门禁</td>
									</tr>
									<tr>
										<td>定时开门</td>
										<td>每天早上8点开门禁</td>
									</tr>
									<tr>
										<td>定时开门</td>
										<td>每天早上8点开门禁</td>
									</tr>
									<tr>
										<td>定时开门</td>
										<td>每天早上8点开门禁</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
					<div class="three-content">
						<div class="table-toolbar">
							<span>系统控制</span>
							<button>删除</button>
							<button>添加</button>
						</div>
						<div class="common-smalltable">
							<table>
								<thead>
									<tr>
										<th>时间</th>
										<th>系统控制</th>
										<th>有效时段</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td>17:10:38</td>
										<td>数据报表抄表</td>
										<td>00:00:04</td>
									</tr>
									<tr>
										<td>17:10:38</td>
										<td>数据报表抄表</td>
										<td>00:00:04</td>
									</tr>
									<tr>
										<td>17:10:38</td>
										<td>数据报表抄表</td>
										<td>00:00:04</td>
									</tr>
									<tr>
										<td>17:10:38</td>
										<td>数据报表抄表</td>
										<td>00:00:04</td>
									</tr>
									<tr>
										<td>17:10:38</td>
										<td>数据报表抄表</td>
										<td>00:00:04</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
					<div class="three-content">
						<div class="table-toolbar">
							<span>设备列表</span>
							<button>删除</button>
							<button>添加</button>
						</div>
						<div class="common-smalltable">
							<table>
								<thead>
									<tr>
										<th>时间</th>
										<th>设备控制</th>
										<th>有效时段</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td>17:10:38</td>
										<td>视频中心 33开始倍数增加</td>
										<td>00:00:04</td>
									</tr>
									<tr>
										<td>17:10:38</td>
										<td>视频中心 33开始倍数增加</td>
										<td>00:00:04</td>
									</tr>
									<tr>
										<td>17:10:38</td>
										<td>视频中心 33开始倍数增加</td>
										<td>00:00:04</td>
									</tr>
									<tr>
										<td>17:10:38</td>
										<td>视频中心 33开始倍数增加</td>
										<td>00:00:04</td>
									</tr>
									<tr>
										<td>17:10:38</td>
										<td>视频中心 33开始倍数增加</td>
										<td>00:00:04</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</TabPane>
				<TabPane label="循环任务">
					<div class="table-toolbar">
							<span>设备列表</span>
							<button>删除</button>
							<button>添加</button>
						</div>
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
				<TabPane label="每周任务安排">
				</TabPane>
				<TabPane label="特殊日期安排">

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