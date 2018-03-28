<template>
  <div class="event-query">
     <Row>
        <Col span="3" class="itemList">

          左侧列表
        </Col>
        <Col span="21" class="itemDetail">
        	
          <div class="common-tab">
              <Tabs type="card">
                <TabPane label="设备事件" >
                  <div class="common-table">
                    <table>
                      <thead>
                        <tr>
                          <th>设备名称</th>
                          <th>设备事件</th>
                          <th>时间</th>
                          
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          
                          <td>过低</td>
                          <td>过低</td>
                          <td>过低</td>
                          
                        </tr>
                       
                      </tbody>
                    </table>
                  </div>
                </TabPane>

                <TabPane label="设置事件">
                  <div class="common-table">
                      <table>
                         <thead>
                            <tr>
                              <th>设备名称</th>
                              <th>设置事件</th>
                              <th>操作人员</th>
                              <th>时间 </th>
                             
                            </tr>
                          </thead>
                          <tbody>
                              <tr>
                                <td>1</td>
                                <td>2</td>
                                <td>3</td>
                               <td>3</td>
                              </tr>

                          </tbody>
                      </table>
                    </div>
                </TabPane>
                <TabPane label="系统事件">
                  <div class="common-table">
                   <table>
                         <thead>
                            <tr>
                              <th>系统事件</th>
                              <th>时间</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>1</td>
                              <td>2</td>
                             
                            </tr>
                          </tbody>
                      </table>
                    </div>
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
    return {}
  }
}
</script>

<style scope>
.event-query{}
.system-conf .itemList{border:1px solid red;color:red;}
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
  
  .common-table table {
    width:100%;
    margin: 0;
    padding: 0;
    /*border:1px solid #dddee1;*/
  }
  
  .common-table table thead tr {
    background: #fff;
  }
  
  .common-table table thead tr th {
    padding: 17px 0;
    width:auto;
    color: #858585;
    font-size: 16px;
    font-weight: 500;
    text-align: center;
  }
  
  .common-table table thead tr th:first-child {
    text-align: center;
  }
  
  .common-table table tbody tr td {
    padding: 11px 0;
    color: #2e2e2e;
    font-size: 16px;
    font-weight: 500;
    text-align: center;
    /*min-width: 168px;*/
  }
  
  .common-table table tbody tr td:first-child {
    text-align: center;
  }
  
  .common-table table tbody tr td>i {
    width: 20px;
    height: 20px;
    font-size: 18px;
  }
  
  .common-table table tbody tr td>button {
    padding: 8px 9px;
    background: #05a3e5;
    font-size: 14px;
    color: #fff;
    border: 0;
  }
  
  .common-table table tbody tr {
    /*-webkit-transition: all 300ms linear 0s;-moz-transition: all 300ms linear 0s;-o-transition: all 300ms linear 0s;transition: all 300ms linear 0s;*/
  }
  
  .common-table table tbody tr:nth-child(even) {
    background: #fff;
  }
  
  .common-table table tbody tr:nth-child(odd) {
    background: #f9f9f9;
  }
  
  .common-table table tbody>.even {
    background: rgba(0, 0, 0, .13)!important;
  }
  
  .common-table table tbody>.odd {
    background-color: transparent!important;
  }
  
  .common-table table tbody tr:hover {
    background: rgba(255, 255, 255, .2)!important;
  }
  
  .common-table table tbody>.active {
    background: rgba(255, 255, 255, .2)!important;
  }
  
  .common-table table tbody>.hiddentd {
    background: rgba(0, 0, 0, .13)!important;
  }
  
  .common-table table tbody>.hiddentd:hover {
    background: rgba(0, 0, 0, .13)!important;
  }
  
  .common-table table tbody>.hiddentd td {
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
    box-sizing: border-box;
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
    border-top: 1px solid #dddee1;
    border-left: 1px solid #dddee1;
    /*position: absolute;*/
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
