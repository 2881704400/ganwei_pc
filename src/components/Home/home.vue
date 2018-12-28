<template>
  <div class="home">
    <h1 v-text="projectName"></h1>
    <div class="homeContent">
      
    </div>
    <!-- <ul class="homeContent">
      <li v-for="item in menuType">
        <h5 class="navigationTitle">{{item}}</h5>
        <div class="homeMenu">
            <span v-for="item_child in menuNameArray" v-if="(item == item_child.modulName)&&item_child.isSelect">
              <a @click="homeMenuClick(rootSave,item_child_in)" v-for="item_child_in in rootSave" v-show="item_child_in.node.title==item_child.menuName"><i :class="item_child.iconName"></i>{{item_child.menuName}}</a>
            </span>
        </div>
      </li>               
    </ul>
    <Modal v-model="menu_modal" :title="alertTitle"  class="Modalmenu"  :mask-closable="false">
      <ul class="alertMenu">
            <li v-for="(modul_item,index) in menuNameArray" :key="index" v-if="alertTitle == modul_item.modulName">
                <Checkbox  v-model="checkoutSelect[index]" :id='"checkConf_"+index'  @on-change="">{{modul_item.menuName}}</Checkbox>
            </li>
        </ul>
        <div slot="footer">
            <Button type="text" size="large" @click="cancalUpdateMenu">取消</Button>
            <Button type="primary" size="large" @click="saveUpdateMenu(alertTitle)" id="user_ok" :disabled="false">确定</Button>
        </div>                        
    </Modal> -->

  </div>
</template>

<script>
import { formatDate } from "../../assets/js/date.js";
export default {
  props: ['rootSave'],
  data () {
    return {
      projectName:'',
      menu_modal: false,
      alertTitle: '',
      menuType: [],
      menuNameArray: [],
      menuStatusArray: [],
      checkoutSelect:[],
    }
  },
  mounted() {
     this.getProjectNmae();
    //  this.getMenu();
		},
  methods:{
    homeMenuClick(root,item){
      var data = item.node;
      let obj = data.title === '首页' ? {
        isHome: true
      } : {
        isHome: false,
        name: data.title
      }
      if (data.selected) return false
      root.forEach(ele => {
        if (ele.node.expand) ele.node.expand = false
        ele.node.selected = false
      })
      var dt = this;
      if(data.hasChild)
      {  
        this.$parent.isFold = false
        this.$parent.navItemClick(root, data)           
      }
      else
      {
        this.$store.commit('setCurpage', obj)
        data.selected = true
        data.expand = true
        this.$router.push(data.href);
      }
    },
    callback: function(){
      console.log("success");
    },
    getProjectNmae: function(){
      var dt = this;
      let urlna = "/api/server/auth_name";
      this.Axios.get(urlna).then(response => {
            if(response.data.HttpData.code == 200)
              dt.projectName =response.data.HttpData.data;
            else
              this.$Message.success("获取授权名失败");
        })
        .catch(error => {
        });
    },
    openModal(value){
        var h=0,dt = this;
        this.menu_modal = true;
        this.alertTitle = value;
        this.menuNameArray.forEach(function(el,index){
           dt.checkoutSelect[index] = el.isSelect;
        });
    },
    cancalUpdateMenu(){
      this.menu_modal = false;
      },
    saveUpdateMenu(value){
      this.delMenu(value);
      this.menu_modal = false;
      var url,data,dt = this; 
      url = "set_InsertNewTable";
      data = {
      getDataTable: "GW_HOME_Menu_Status(userName,modulName,status)",
      tableVlue: " values('" + window.localStorage.getItem('login_msg') +"','"+ value +"','"+ dt.transformBoolean(value)+"')",
      };         
      this.XHRPost(url,data,_success);
      function _success(response) {
        let arrayLike = response.data.HttpData.data;
        let code = response.data.HttpData.code;
        if(code == 200)
        {        
            dt.checkoutSelect.forEach(function(el,index){
              dt.menuNameArray[index].isSelect = el;
            });
        }
        else
        { 
            dt.saveUpdateMenu();
        }
      }
    },
    delMenu(value){
      var url = "set_DeleteTableData",data={getDataTable: "GW_HOME_Menu_Status",tableVlue:" userName ='" + window.localStorage.getItem('login_msg') +"' and  modulName='"+ value + "'",};
      this.XHRPost(url,data,_success);
      function _success(response) {
        
      }
    },
    //返回菜单
    getMenu: function() {
      var dt = this;
      let url = "/api/GWServiceWebAPI/get_HOME_MenuData";
      this.XHRGet(url, _success);
      function _success(response) {
        dt.menuNameArray.length = 0;
        let arrayLike = response.data.HttpData.data;
        let code = response.data.HttpData.code;
        if(code == 200)
        {        
            let getmenuNameArrayLength = arrayLike.length;
            for (var i = 0; i < getmenuNameArrayLength; i++) {
              let menuNameArray_data = {
                groupID: arrayLike[i].groupID,
                modulName: arrayLike[i].modulName,
                menuName: arrayLike[i].menuName,
                iconName: arrayLike[i].iconName,
                isSelect: false,
              };
              dt.menuNameArray.push(menuNameArray_data);
              dt.menuType.push(arrayLike[i].modulName);
            }
            console.log( dt.menuType);
            dt.getStatusMenu();
            dt.menuType=Array.from(new Set(dt.menuType));
        }
        else
        { 
            dt.getMenu();
        }
      }
    },
    //设置状态
    getStatusMenu: function() {
      var dt = this;
      let url = "get_MenuDataByUserName";
      let data = {getDataTable: window.localStorage.getItem('login_msg')}
      this.XHRPost(url, data,_success);
      function _success(response) {
        dt.menuStatusArray.length = 0;
        let arrayLike = response.data.HttpData.data;
        let code = response.data.HttpData.code; 
        if(code == 200)
        {           
            let getmenuStatusArrayLength = arrayLike.length;
            for (var i = 0; i < getmenuStatusArrayLength; i++) {
              if(arrayLike[i].userName ==window.localStorage.getItem('login_msg'))
              {
                let menuStatusArray_data = {
                  userName: arrayLike[i].userName,
                  modulName: arrayLike[i].modulName,
                  status: arrayLike[i].status,
                };
                dt.menuStatusArray.push(menuStatusArray_data);
              }
            }
            //处理menuNameArray
            arrayLike.length==0?"":dt.init_menuNameArray();
        }
        else
        { 
            dt.getStatusMenu();
        }
      }
    },    
    //发送请求
    XHRPost: function(api, updateJson, _success) {
      var msg = this.$Message;
      let urlna = "/api/GWServiceWebAPI/" + api;
      this.Axios.post(urlna, updateJson, {
        headers: { "Content-type": "application/json" }
      })
        .then(response => {
          // msg.success("操作成功");
          _success(response); 
        })
        .catch(error => {
          console.log(error);
        });
    },
    XHRGet: function(url, _success) {
      var msg = this.$Message;
      this.Axios({
        method: "get",
        url: url,
        headers: {
          "Content-type": "application/x-www-form-urlencoded"
        }
      })
        .then(response => {
          // msg.info("执行成功");
          _success(response);
        })
        .catch(error => {
          console.log(error);
        });
    },  
    init_menuNameArray(){
      var h,that = this;
       that.menuStatusArray.forEach(function(el,index){
          h = 0;
          that.menuNameArray.forEach(function(el_in,index_in){
               if(el.modulName == el_in.modulName)
               {
                  el.status[h] == 1? el_in.isSelect = true: el_in.isSelect = false; 
                  h++;
               }
          });         
       });
    },
    transformBoolean(value){
      var transformstringValue="";
      var dt = this;
      dt.menuNameArray.forEach(function(el,index){
        if(el.modulName == value) 
         {
           transformstringValue += dt.checkoutSelect[index] === true?'1':'0';
         }
      });
 console.log(transformstringValue);
      return transformstringValue;
    },
  },


}
</script>
<style lang="scss" src="../../assets/styles/sass/home.scss"></style>
