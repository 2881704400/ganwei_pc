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
							<button>增加</button>
						</div>
						<div class="common-smalltable">
							<table>
								<thead>
									<tr>
										<th>普通</th>
										<th>说明</th>
									</tr>
								</thead>
								<tbody>
									<tr v-for="(item,index) of CommonTaskList" :key="index" :class="{activeTable:index==selecteTable}" @click="SelecteTableFun(index)">
										<td>
											<div class="spanContent" v-show="item.isCommonSpan">
												{{item.TableName}}
											</div>
											<div class="inputContent" v-show="!item.isCommonSpan">
												<input type="text" :value="item.TableName" @input="updateCommonFun(index,$event,'TableName')" />
											</div>
										</td>
										<td>
											<div class="spanContent" v-show="item.isCommonSpan">
												{{item.Comment}}
											</div>
											<div class="inputContent" v-show="!item.isCommonSpan">
												<input type="text" :value="item.Comment" @input="updateCommonFun(index,$event,'Comment')"/>
											</div>
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
					<div class="three-content">
						<div class="table-toolbar">
							<span>系统控制</span>
							<button>删除</button>
							<button>增加</button>
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
									<tr v-for="(item,index) of CommonTaskSystemControl" :key="index">
										<td><Input size="large" :value="item.Time"></Input></td>
										<td>
											<Select v-model="item.proc_code" size="large" filterable>
								                <Option v-for="(itemProc,indexProc) in ProcCmdList" :value="itemProc.proc_code" :key="indexProc">{{ itemProc.cmd_nm }}</Option>
								            </Select>
										</td>
										<td><Input size="large" :value="item.TimeDur"></Input></td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
					<div class="three-content">
						<div class="table-toolbar">
							<span>设备列表</span>
							<button>删除</button>
							<button>增加</button>
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
									<tr v-for="(item,index) of CommonTaskEquipControl" :key="index">
										<td><Input :value="item.Time"></Input></td>
										<td style="padding: 0;">
											<Select v-model="item.set_nm"  filterable>
								                <Option v-for="(itemEquip,indexEquip) in EquipControlList" :value="itemEquip.set_nm" :key="indexEquip">{{ itemEquip.set_nm }}</Option>
								            </Select>
										</td>
										<td><Input :value="item.TimeDur"></Input></td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</TabPane>
				<TabPane label="循环任务">
					<div class="table-toolbar">
							<!--<span>循环任务</span>-->
							<button>修改</button>
							<button>删除</button>
							<button>增加</button>
						</div>
						<div class="common-smalltable">
						<table>
							<thead>
								<tr>
									<th>循环任务名称</th>
									<th>有效起始时间</th>
									<th>有效结束时间</th>
									<th>开始执行时间</th>
									<th>是否必须执行完整</th>
									<th>最大循环次数</th>
								</tr>
							</thead>
							<tbody>
								<tr v-for="(item,index) of LoopTaskList" :key="index">
									<td><Input :value="item.TableName" readonly></Input></td>
									<td><Input :value="formatDate(item.BeginTime)" readonly></Input></td>
									<td><Input :value="formatDate(item.EndTime)" readonly></Input></td>
									<td><Input :value="item.ExecuteTime" readonly></Input></td>
									<td><Input :value="item.CycleMustFinish=='0'?'否':'是'" readonly></Input></td>
									<td><Input :value="item.MaxCycleNum=='0'?'不受限制':item.MaxCycleNum" readonly></Input></td>
								</tr>
							</tbody>
						</table>
					</div>
				</TabPane>
				<TabPane label="每周任务安排">
					<div class="table-toolbar">
							<button>保存</button>
						</div>
						<div class="common-smalltable common-smalltable-checkbox">
						<table>
							<thead>
								<tr>
									<th>星期一</th>
									<th>星期二</th>
									<th>星期三</th>
									<th>星期四</th>
									<th>星期五</th>
									<th>星期六</th>
									<th>星期日</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td><font>普通任务：</font></td>
									<td><font>普通任务：</font></td>
									<td><font>普通任务：</font></td>
									<td><font>普通任务：</font></td>
									<td><font>普通任务：</font></td>
									<td><font>普通任务：</font></td>
									<td><font>普通任务：</font></td>
								</tr>
								<tr v-for="(item,index) of WeekTaskPlanCommonList">
									<td><Checkbox :label="item.TableName" :key="item.TableID">{{item.TableName}}</Checkbox></td>
									<td><Checkbox :label="item.TableName" :key="item.TableID">{{item.TableName}}</Checkbox></td>
									<td><Checkbox :label="item.TableName" :key="item.TableID">{{item.TableName}}</Checkbox></td>
									<td><Checkbox :label="item.TableName" :key="item.TableID">{{item.TableName}}</Checkbox></td>
									<td><Checkbox :label="item.TableName" :key="item.TableID">{{item.TableName}}</Checkbox></td>
									<td><Checkbox :label="item.TableName" :key="item.TableID">{{item.TableName}}</Checkbox></td>
									<td><Checkbox :label="item.TableName" :key="item.TableID">{{item.TableName}}</Checkbox></td>
								</tr>
								<tr>
									<td><font>循环任务：</font></td>
									<td><font>循环任务：</font></td>
									<td><font>循环任务：</font></td>
									<td><font>循环任务：</font></td>
									<td><font>循环任务：</font></td>
									<td><font>循环任务：</font></td>
									<td><font>循环任务：</font></td>
								</tr>
								<tr v-for="(itemLoop,indexLoop) of WeekTaskPlanLoopList" >
									<td><Checkbox :label="itemLoop.TableName" :key="itemLoop.TableID">{{itemLoop.TableName}}</Checkbox></td>
									<td><Checkbox :label="itemLoop.TableName" :key="itemLoop.TableID">{{itemLoop.TableName}}</Checkbox></td>
									<td><Checkbox :label="itemLoop.TableName" :key="itemLoop.TableID">{{itemLoop.TableName}}</Checkbox></td>
									<td><Checkbox :label="itemLoop.TableName" :key="itemLoop.TableID">{{itemLoop.TableName}}</Checkbox></td>
									<td><Checkbox :label="itemLoop.TableName" :key="itemLoop.TableID">{{itemLoop.TableName}}</Checkbox></td>
									<td><Checkbox :label="itemLoop.TableName" :key="itemLoop.TableID">{{itemLoop.TableName}}</Checkbox></td>
									<td><Checkbox :label="itemLoop.TableName" :key="itemLoop.TableID">{{itemLoop.TableName}}</Checkbox></td>
								</tr>
							</tbody>
						</table>
					</div>
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

<script src="./TimeTask.js"></script>

<style lang="scss">
	@import url("../../../static/common_dengjf.css");
</style>