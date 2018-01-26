<template>
  <div id="app">
    <div class="temperature clear">
      <div class="real">
        <div class="chart" id="chart">

        </div>
      </div>
      <div class="average">
        <h2>平均温度</h2>
        <div class="circle">
          <div class="inner" id="innerC">
            <div class="txt t">
              0<sup>℃</sup>
            </div>
            <div class="txt r">
              25<sup>℃</sup>
            </div>
            <div class="txt b">
              50<sup>℃</sup>
            </div>
            <div class="txt l">
              75<sup>℃</sup>
            </div>
            <div class="num">
              <span class="n" v-text="averageTemp"></span><span class="c">℃</span>
            </div>
            <div class="point" id="tempPoint"></div>
          </div>
        </div>
      </div> 
    </div>
    <div class="electric clear">
      <div class="left">
        <div class="voltage">
          <dl class="clear">
            <dt>供<br/>电<br/>状<br/>态</dt>
            <dd v-for="(item, i) in voltage" :key="i">
              <div class="val">
                <span v-text="item.val"></span><span>V</span>
              </div>
              <div class="title" v-text="item.describe"></div>
            </dd>
          </dl>
        </div>
        <div class="ampere">
          <dl class="clear">
            <dt>市<br/>电</dt>
            <dd v-for="(item, i) in ampere" :key="i">
              <div class="val">
                <span v-text="item.val"></span>
              </div>
              <div class="title" v-text="item.describe"></div>
            </dd>
          </dl>
        </div>
      </div>
      <div class="right">
        <div class="water">
          <h2>漏水状态</h2>
          <div class="line"></div>
          <p v-text="waterStatu"></p>
        </div>
        <div class="notice clear">
          <div class="err">
            <h3>错误</h3>
            <div class="num">
              0
            </div>
          </div>
          <div class="warn">
            <h3>报警</h3>
            <div class="num">
              10
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import Echarts from 'echarts'
import chartConf from './data/chartConf.json'
export default {
  name: 'app',
  data () {
    return {
      chart: null,
      chartOpt: null,
      averageTemp: 27,
      waterStatu: '正常',
      voltage: [{
        describe: 'A相电压',
        val: '223V'
      }, {
        describe: 'B相电压',
        val: '222V'
      }, {
        describe: 'C相电压',
        val: '200v'
      }],
      ampere: [{
        describe: 'A相电流',
        val: '22.3A'
      }, {
        describe: 'B相电流',
        val: '22.3A'
      }, {
        describe: 'C相电流',
        val: '22.3A'
      }],
      tempT: null
    }
  },
  methods: {
    chartInit () {
      const chartDiv = this.$el.querySelector('#chart')
      this.chart = Echarts.init(chartDiv)
      this.chartOpt = chartConf
      this.chartOpt['tooltip'] = {
        trigger: 'axis',
        formatter: function (params) {
          params = params[0]
          var date = new Date(params.name)
          return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + ' : ' + params.value[1]
        },
        axisPointer: {
          animation: false
        }
      }
    },
    updateData () {
      this.chart.setOption(this.chartOpt)
      setInterval(() => {
        this.chart.setOption({
          series: [{
            data: data
          }]
        })
      }, 1200)
    },
    changeTemp () {
      clearTimeout(this.tempT)
      this.tempT = setTimeout(() => {
        this.averageTemp = this.getRand(30)
        this.setTempPoint()
      }, 5000)
    },
    setTempPoint () {
      let l = $('#innerC').get(0).offsetHeight / 2 + $('#tempPoint').height() / 2
      let deg = Math.round((this.averageTemp / 100) * 360) + 'deg'
      $('#tempPoint').css('transformOrigin', '50% ' + l + 'px')
      $('#tempPoint').css('transform', 'rotate(' + deg + ')')
      setTimeout(() => {
        this.changeTemp()
      }, 400)
    },
    getRand (max) {
      return Math.round(Math.random() * max)
    },
    randData () {
      now = new Date(+now + 1000)
      value = value + Math.random() * 21 - 10
      return {
        name: now.toString(),
        value: [
          now,           
          Math.round(value)
        ]
      }
    }
  },
  created () {
    this.changeTemp()
  },
  mounted () {
    this.chartInit()
  }
}
</script>

<style lang="scss" scoped>
@import './assets/styles/public';
#app {
  padding: 20px;
  background-color: rgba(20,35,56,1);
  .temperature{
    .real{
      width: 70%;
      float: left;
      background-color: rgba(78,245,253,0.2);
      box-shadow: 0 0 2px 2px rgb(128, 200, 212);
      overflow: hidden;

      .chart{
        width: 80%;
        height: 400px;
        margin: 0 auto;
        margin: 20px auto;
      }

    }
    .average{
      width: 30%;
      float: left;
      overflow: hidden;
      padding: 10px;

      h2{
        text-align: center;
        color: #fff;
        font-size: 24px;
        font-weight: normal;
        margin: 8px auto;
      }

      .circle{
        margin: 40px auto;
        width: 60%;
        height: 0;
        padding-bottom: 60%;
        position: relative;

        .inner{
          position: absolute;
          left: 0;
          right: 0;
          top: 0;
          bottom: 0;
          padding-bottom: 100%;
          box-shadow: 0 0 2px 2px rgba(88, 194, 236, 0.8) inset;
          border-radius: 50%;
          margin: auto;

          $size: 40px;
          $harfSize: $size / 2;

          .txt{
            position: absolute;
            color: #fff;
            font-size: 16px;
            width: $size;
            height: $size;
            line-height: 30px;
            text-align: center;

            &.t{
              top: -$size;
              left: 50%;
              margin-left: -$harfSize;
            }
            &.r{
              right: -$size;
              top: 50%;
              margin-top: -$harfSize;
            }
            &.b{
              bottom: -$size;
              left: 50%;
              margin-left: -$harfSize;
            }
            &.l{
              left: -$size;
              top: 50%;
              margin-top: -$harfSize;
            }
          }

          .num{
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            width: 66px;
            height: 50px;
            font-weight: 700;
            margin: auto;
            text-align: center;
            line-height: 50px;

            .n{
              color: rgb(0,237,255);
              font-size: 36px;
            }

            .c{
              color: rgb(85,207,137);
              font-size: 16px;
              position: absolute;
              right: -5px;
              top: 0;
              line-height: 16px;
            }
          }

          .point{
            position: absolute;
            width: 12px;
            height: 12px;
            background-color: #fff;
            border-radius: 50%;
            left: 50%;
            margin-left: -6px;
            top: -6px;
            box-shadow: 0 0 3px 3px rgba(255,255,255,0.2);
            transition: all 400ms;
          }
        }
      }
    }
  }

  .electric{
    $textColor: rgb(0,223,255);
    $statuColor: rgb(0,254,70);

    width: 100%;

    .left{
      width: 70%;
      background-color: rgba(78,245,253,0.2);
      box-shadow: 0 0 2px 2px rgb(128, 200, 212);
      float: left;

      .voltage{
        width: 100%;
        dl{
          width: 100%;
          text-align: center;

          dt{
            width: 10%;
            display: flex;
            color: $textColor;
            flex-direction: column;
            float: left;
            font-size: 32px;
            line-height: 36px;
          }

          dd{
            float: left;
            width: 30%;

            .val{
              color: rgb(245,227,23);
              font-size: 48px;
              font-weight: 600;
            }

            .title{
              color: #fff;
              font-size: 26px;
            }
          }

        }
      }

      .ampere{
        @extend .voltage;
        dl{

          dt{
            color: $statuColor;
            font-size: 42px;
            line-height: 46px;
          }

          dd{

          }

        }
      }
    }

    .right{
      float: left;
      width: 30%;
      overflow: hidden;

      .water{
        width: 80%;
        margin: 10px auto;
        text-align: center;
        background-color: rgba(255,255,255,0.1);
        border-radius: 8px;
        padding: 26px 8px;
        box-shadow: 0 0 2px 0 rgba(1,255,253,0.8), 2px 2px 16px 4px rgba(0,0,0,0.36);

        h2{
          color: $textColor;
          font-size: 32px;
          font-weight: normal;
          margin: 4px auto 10px;
        }

        .line{
          height: 2px;
          margin: 26px auto 8px;
          border-radius: 1px;
          background: -webkit-linear-gradient(left, transparent, transparent, rgba(255,255,255,0.6), transparent, transparent);
          background: -o-linear-gradient(left, transparent, transparent, rgba(255,255,255,0.6), transparent, transparent);
          background: -moz-linear-gradient(left, transparent, transparent, rgba(255,255,255,0.6), transparent, transparent);
          background: linear-gradient(left, transparent, transparent, rgba(255,255,255,0.6), transparent, transparent);
        }

        p{
          color: $statuColor;
          font-size: 40px;
        }
      }

      .notice{
        margin: 20px auto;
        text-align: center;
        width: 80%;

        .err{
          float: left;
          width: 50%;
          h3{
            color: $textColor;
            font-weight: normal;
            font-size: 32px;
          }

          .num{
            color: #fff;
          }
        }

        .warn{
          @extend .err;
        }
      }

    }
  }
}
</style>
