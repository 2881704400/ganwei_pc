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
	.time-task {}
	
	.three-content {
		width: 32%;
		height: 100%;
		float: left;
		margin-right: 2%;
	}
	
	.three-content:last-child {
		margin-right: 0;
	}
	
	.three-content .table-toolbar {
		width: 100%;
		height: auto;
		margin-top: 12px;
	}
	
	.table-toolbar span {
		font-size: 16px;
		padding: 8.5px;
		display: flex;
		align-items: center;
	}
	
	.table-toolbar button {
		padding: 8.5px 21.5px;
		background: #05a3e5;
		font-size: 14px;
		color: #fff;
		border: 0;
		float: right;
		margin-left: 10px;
		position: relative;
		top: -32px;
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
		/*-webkit-transition: color .2s linear, background-color .2s linear, border .2s linear, -webkit-box-shadow .2s linear;
		transition: color .2s linear, background-color .2s linear, border .2s linear, -webkit-box-shadow .2s linear;
		transition: color .2s linear, background-color .2s linear, border .2s linear, box-shadow .2s linear;
		transition: color .2s linear, background-color .2s linear, border .2s linear, box-shadow .2s linear, -webkit-box-shadow .2s linear;
		color: #495060;
		background-color: #f7f7f7;
		border-color: #dddee1*/
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
	
	.common-smalltable{
		position: relative;
		top: -16px;
	}
	
	.common-smalltable table {
		width: 100%;
		margin: 0;
		padding: 0;
	}
	
	.common-smalltable table thead tr {
		background: #f9f9f9;
	}
	
	.common-smalltable table thead tr th {
		padding: 12px 10px;
		color: #858585;
		font-size: 13px;
		font-weight: 500;
		text-align: center;
	}
	
	.common-smalltable table tbody tr td {
		padding: 11px 10px;
		color: #2e2e2e;
		font-size: 14px;
		font-weight: 500;
		text-align: center;
	}
	
	.common-smalltable table tbody tr td>i {
		width: 20px;
		height: 20px;
		font-size: 18px;
	}
	
	.common-smalltable table tbody tr td>button {
		padding: 8px 9px;
		background: #05a3e5;
		font-size: 14px;
		color: #fff;
		border: 0;
	}
	
	.common-smalltable table tbody tr {
		/*-webkit-transition: all 300ms linear 0s;-moz-transition: all 300ms linear 0s;-o-transition: all 300ms linear 0s;transition: all 300ms linear 0s;*/
	}
	
	.common-smalltable table tbody tr:nth-child(even) {
		background: #f9f9f9;
	}
	
	.common-smalltable table tbody tr:nth-child(odd) {
		background: #fff;
	}
	
	.common-smalltable table tbody>.even {
		background: rgba(0, 0, 0, .13)!important;
	}
	
	.common-smalltable table tbody>.odd {
		background-color: transparent!important;
	}
	
	.common-smalltable table tbody tr:hover {
		background: rgba(255, 255, 255, .2)!important;
	}
	
	.common-smalltable table tbody>.active {
		background: rgba(255, 255, 255, .2)!important;
	}
	
	.common-smalltable table tbody>.hiddentd {
		background: rgba(0, 0, 0, .13)!important;
	}
	
	.common-smalltable table tbody>.hiddentd:hover {
		background: rgba(0, 0, 0, .13)!important;
	}
	
	.common-smalltable table tbody>.hiddentd td {
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
	}
	/* tab列表高度 */
	
	.common-tab .ivu-tabs.ivu-tabs-card>.ivu-tabs-bar .ivu-tabs-nav-container {
		height: 50px;
	}
	/* tab内容高度 */
	
	.common-tab .ivu-tabs-card>.ivu-tabs-content {
		height: 820px;
		margin-top: -16px;
	}
	/* tab内容背景色、边框 */
	
	.common-tab .ivu-tabs-card>.ivu-tabs-content>.ivu-tabs-tabpane {
		background: #fff;
		border: 1px solid #dddee1;
	}
	
	.tab-content-border .ivu-tabs-card>.ivu-tabs-content>.ivu-tabs-tabpane {
		background: #fff;
		border: 1px solid #fff;
		border-top: 1px solid #dddee1;
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