<template>
	<div class="projects">
		<Card :bordered="false" :dis-hover="false" class="projects-menu" v-for="(item, index) of projectList" :class="getCardWidthFun(item.children.length)">
			<p slot="title" class="projects-menu-title">
				<i class="iconfont icon-deep projects-menu-title-icon"></i> {{item.title}}
			</p>
			<Card class="menu-card" v-for="(itemChildren, indexChildren) of item.children">
				<p slot="title" class="menu-card-title" @click="jumpOtherPage(itemChildren)">{{itemChildren.title}}</p>
				<div class="menu-card-box" @click="jumpOtherPage(itemChildren)">
					<div class="menu-card-box-text">
						<div class="ctext1">
							{{itemChildren.title}}
						</div>
						<div class="ctext2">
							{{itemChildren.introduce}}
						</div>
						<div class="ctext3">
							{{itemChildren.desc}}
						</div>
					</div>
				</div>
			</Card>
		</Card>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				projectList: [{
						title: "劲嘉物联网运营管理平台",
						children: [{
								title: "智慧业务",
								introduce: "Smart business",
								desc: "环保首页是集监控和统计于一体的综合管理平台",
								href: "http://120.79.147.93/Views/GWJinJiaWeb/performance.html"
							},
							{
								title: "智慧产品",
								introduce: "Intelligent products",
								desc: "环保首页是集监控和统计于一体的综合管理平台",
								href: "http://120.79.147.93/Views/GWJinJiaWeb/product.html"
							},
							{
								title: "智慧园区",
								introduce: "Smart Park",
								desc: "环保首页是集监控和统计于一体的综合管理平台",
								href: "http://120.79.147.93/Views/GWClubEnergy/index.html"
							},
							{
								title: "今日资源统计",
								introduce: "Resource Statistics Today",
								desc: "环保首页是集监控和统计于一体的综合管理平台",
								href: "http://120.79.147.93/Views/GWJinJiaWeb/cloudhost_first.html"
							},
							{
								title: "云资源使用情况",
								introduce: "Cloud resource usage",
								desc: "环保首页是集监控和统计于一体的综合管理平台",
								href: "http://120.79.147.93/Views/GWJinJiaWeb/cloudhost_second.html"
							}
						],
					},
					{
						title: "富士康智慧展厅",
						children: [{
								title: "富士康实时数据图表",
								introduce: "Real-time Data Chart",
								desc: "环保首页是集监控和统计于一体的综合管理平台",
								href: "http://120.79.147.93/Views/GWFuShiKangWeb/home.html"
							},
							{
								title: "“无人工厂”演示场景",
								introduce: "Unmanned Factory Scene",
								desc: "环保首页是集监控和统计于一体的综合管理平台",
								href: "http://120.79.147.93/Views/GWFuShiKangWeb/factory.html"
							},
							{
								title: "智能中控系统 - 雾小脑",
								introduce: "center system-foggy",
								desc: "环保首页是集监控和统计于一体的综合管理平台",
								href: "http://120.79.147.93/Views/GWFuShiKangWeb/fogBrain.html"
							},
							{
								title: "高铁铁轨智能修磨铣刀",
								introduce: "Intelligent high-speed rail",
								desc: "环保首页是集监控和统计于一体的综合管理平台",
								href: "http://120.79.147.93/Views/GWFuShiKangWeb/highIronRail.html"
							}
						],
					},
					{
						title: "清远市电梯大数据综合管理平台",
						children: [{
								title: "清远市电梯地图首页",
								introduce: "Elevator Map Home Page",
								desc: "环保首页是集监控和统计于一体的综合管理平台",
								href: "http://120.79.147.93/Views/GWElevatorToQY/index_map.html"
							},
							{
								title: "清远大数据统计",
								introduce: "Big Data Statistics",
								desc: "环保首页是集监控和统计于一体的综合管理平台",
								href: "http://120.79.147.93/Views/GWElevatorToQY/index.html"
							},
							{
								title: "清远今日状况",
								introduce: "Today's Situation",
								desc: "环保首页是集监控和统计于一体的综合管理平台",
								href: "http://120.79.147.93/Views/GWElevatorToQY/index2.html"
							}
						],
					},
					{
						title: "安诺智慧管理平台",
						children: [{
							title: "安诺地图总览",
							introduce: "Anno Map Overview",
							desc: "环保首页是集监控和统计于一体的综合管理平台",
							href: "http://120.79.171.70:8088/Views/AnNuoWebComputer/index_map.html"
						}],
					},
					{
						title: "乐从智慧环保综合管理平台",
						children: [{
								title: "智慧环保首页",
								introduce: "Environment Monitor",
								desc: "环保首页是集监控和统计于一体的综合管理平台",
								href: "http://120.79.147.93/Views/waterQuality/waterQuality.html"
							},
							{
								title: "水质报警预案",
								introduce: "Water quality alarm plan",
								desc: "介绍河流区域监测点污染企业分布情况及报警解决方案",
								href: "http://120.79.147.93/Views/waterQuality/waterQuality_warn.html"
							}
						],
					},
					{
						title: "重庆市电力运维大数据平台",
						children: [{
								title: "电力运维大数据平台",
								introduce: "Electric Power Platform",
								desc: "电力运维首页是集监控和统计于一体的综合管理平台",
								href: "http://120.79.147.93/Views/ChongqingPower/index.html"
							},
							{
								title: "电力运维大数据统计",
								introduce: "Statistics of Electric Power",
								desc: "介绍河流区域监测点污染企业分布情况及报警解决方案",
								href: "http://120.79.147.93/Views/ChongqingPower/home.html"
							}
						],
					},
					{
						title: "龙岗智慧展厅",
						children: [{
								title: "智慧总览",
								introduce: "Overview of wisdom",
								desc: "环保首页是集监控和统计于一体的综合管理平台",
								href: "http://120.79.147.93/Views/GWWisdomToLG/index.html"
							},
							{
								title: "产业联盟",
								introduce: "Industrial Alliance",
								desc: "环保首页是集监控和统计于一体的综合管理平台",
								href: "http://120.79.147.93/Views/test/1.html"
							}
						],
					},
					{
						title: "智慧路灯",
						children: [{
								title: "灯杆大数据",
								introduce: "Big data of lamp pole",
								desc: "环保首页是集监控和统计于一体的综合管理平台",
								href: "http://120.79.147.93/Views/GWStreetLampLight/home.html"
							},
							{
								title: "照明大数据",
								introduce: "Large illumination data",
								desc: "环保首页是集监控和统计于一体的综合管理平台",
								href: "http://120.79.147.93/Views/GWStreetLampLight/index.html"
							}
						],
					}
				]
			};
		},
		methods: {
			jumpOtherPage(item) {
				if(item.href) {
					window.open(item.href, "_blank");
				}
			},
			getCardWidthFun(itemLength) {
				if(itemLength == 1) {
					return "samll-half-width-menu";
				} else if(itemLength == 2) {
					return "half-width-menu";
				} else if(itemLength == 3) {
					return "three-half-width-menu";
				} else {
					return "all-width-menu";
				}
			}

		},
	};
</script>

<style>
	.projects {
		height: 100%;
		width: 100%;
		margin: 0 auto;
		overflow-y: auto;
		position: relative;
		background: #FAFAFA;
	}
	
	.projects .projects-menu {
		box-shadow: 0 2px 1px -1px rgba(0, 0, 0, .2), 0 1px 1px 0 rgba(0, 0, 0, .14), 0 1px 3px 0 rgba(0, 0, 0, .12);
	}
	
	.all-width-menu {
		width: 98%;
		clear: both;
		margin: 0 auto;
		margin-bottom: 24px;
	}
	
	.half-width-menu {
		width: 48%;
		float: left;
		margin: 0 1% 24px;
	}
	
	.three-half-width-menu {
		width: 73%;
		float: left;
		margin: 0 1% 24px;
	}
	
	.samll-half-width-menu {
		width: 23%;
		float: left;
		margin: 0 1% 24px;
	}
	
	.projects .projects-menu .ivu-card-body {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-around;
	}
	
	.projects .projects-menu .projects-menu-title {
		font-size: 1.375rem;
		font-weight: 500;
		line-height: 30px;
		height: 30px;
	}
	
	.projects .projects-menu .projects-menu-title-icon {
		color: #2196f3;
		margin-right: 5px;
		font-size: 1.375rem;
		position: relative;
		top: -1px;
	}
	
	.projects .projects-menu .menu-card {
		width: 220px;
		margin: 20px 0px;
		float: left;
		display: block;
		cursor: pointer;
	}
	
	.projects .projects-menu .menu-card .ivu-card-head {
		text-align: center;
		background: linear-gradient(19deg, #21D4FD, #B721FF);
	}
	
	.projects .projects-menu:nth-child(2) .menu-card .ivu-card-head {
		background: linear-gradient(90deg, #a40df3, #d7b1ea, #a40df3);
	}
	
	.projects .projects-menu:nth-child(3) .menu-card .ivu-card-head {
		background: linear-gradient(19deg, #08AEEA, #2AF598);
	}
	
	.projects .projects-menu:nth-child(4) .menu-card .ivu-card-head {
		/*background: linear-gradient(90deg, #F76B1C, #FAD961, #F76B1C);*/
		background: linear-gradient(19deg, #08AEEA, #2AF598);
	}
	
	.projects .projects-menu:nth-child(5) .menu-card .ivu-card-head,
	.projects .projects-menu:nth-child(6) .menu-card .ivu-card-head {
		background: linear-gradient(19deg, #f77062, #FC00FF);
	}
	
	.projects .projects-menu:nth-child(7) .menu-card .ivu-card-head,
	.projects .projects-menu:nth-child(8) .menu-card .ivu-card-head {
		background: linear-gradient(90deg, #5d3477, #c695e6, #5d3477);
	}
	
	.projects .menu-card .menu-card-title {
		color: white !important;
		font-size: 1.125rem;
		line-height: 30px;
		height: 30px;
	}
	
	.projects .menu-card .ivu-card-body {
		height: 180px;
		display: flex;
	}
	
	.projects .menu-card .menu-card-box {
		display: flex;
		flex: 1 1 auto;
		position: relative;
	}
	
	.projects .menu-card .menu-card-box-text {
		width: 90%;
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		margin: auto;
		-webkit-box-pack: start;
		-ms-flex-pack: start;
		justify-content: start;
		-webkit-box-orient: vertical;
		-webkit-box-direction: normal;
		-ms-flex-direction: column;
		flex-direction: column;
		-webkit-box-align: center;
		-ms-flex-align: center;
		align-items: center;
		font-size: 12px;
		text-align: center;
	}
	
	.projects .menu-card .ctext1 {
		font-size: 1.375rem;
		line-height: 32px;
		color: #333;
	}
	
	.projects .menu-card .ctext2 {
		margin-top: 5px;
		font-size: 0.813rem;
		line-height: 18px;
		color: #555;
	}
	
	.projects .menu-card .ctext3 {
		margin-top: 5px;
		font-size: 0.813rem;
		line-height: 180%;
		color: #888;
	}
</style>