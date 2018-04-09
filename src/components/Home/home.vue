<template>
  <div class="home">
       <h1>深圳市敢为软件技术有限公司</h1>
       <ul>
         <li v-for="(item,index) in numbers">
           <div :class="'snaBtn'+index">
              <h4>{{item.title}}</h4>
              <Row>
                <Col span="12" class="infoTop"><span>{{item.sum}}</span>个</Col>
                <Col span="12" class="infoBottom">
                   <p>已处理<span>132</span></p>
                   <p>未处理<span>12</span></p>
                </Col>
              </Row>
           </div>
          </li>
       </ul>

  </div>
</template>

<script>
export default {
  data () {
    return {
      numbers: [
        {title:'报警',sum:15,Alreadyprocessed: 0,Untreated: 0},
        {title:'故障',sum:15,Alreadyprocessed: 0,Untreated: 0},
        {title:'信息',sum:15,Alreadyprocessed: 0,Untreated: 0},
        {title:'设置',sum:15,Alreadyprocessed: 0,Untreated: 0},
        {title:'资产',sum:15,Alreadyprocessed: 0,Untreated: 0},
      ],
      
    }
  },
  methods: {
   
  }
}
</script>
<style lang="scss" src="../../assets/styles/sass/home.scss"></style>