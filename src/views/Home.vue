<template>
  <el-row>
    <el-col :span="8" style="padding-right: 10px">
      <el-card class="user-card">
        <div class="user">
          <img src="@/assets/images/user.png" alt="" />
          <div class="userinfo">
            <p class="name">{{this.name}}</p>
            <p class="access">{{this.access}}</p>
          </div>
        </div>
        <div class="login-info">
          <p>上次登陆时间:<span>2023-01-01</span></p>
          <p>上次登陆地点:<span>上海市杨浦区</span></p>
        </div>
      </el-card>
      <el-card class="table-card" style="margin-top: 20px; height: 460px;">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column v-for="(val, key, index) in tableLabel" :prop="key" :label="val" :key="index" />
        </el-table>
      </el-card>
    </el-col>
    <el-col :span="16" style="padding-left: 10px">
      <div class="num">
        <el-card v-for="item in countData" :key="item.name" :body-style="{ display: 'flex', padding: 0 }">
          <i class="icon" :class="`el-icon-${item.icon}`" :style="{ background: item.color }"></i>
          <div class="detail">
            <p class="price">￥{{ item.value }}</p>
            <p class="desc">{{ item.name }}</p>
          </div>
        </el-card>
      </div>
      <el-card style="height: 280px">
        <!-- 折线图 -->
        <div id="linechart" style="height: 280px"></div>
      </el-card>
      <div class="graph">
        <el-card style="height: 262.5px" id="barchart"></el-card>
        <el-card style="height: 262.5px" id="piechart"></el-card>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { getData } from '@/api'
import * as echarts from 'echarts'
import Cookie from 'js-cookie'
export default {
  data() {
    return {
      tableData: [],
      orderData: [],
      userData: [],
      videoDta:[],
      tableLabel: {
        name: '品牌',
        todayBuy: '今日购买',
        monthBuy: '本月购买',
        totalBuy: '累计购买'
      },
      countData: [
        {
          name: "今日支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "今日收藏订单",
          value: 210,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "今日未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef",
        },
        {
          name: "本月支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "本月收藏订单",
          value: 210,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "本月未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef",
        },
      ],
      name: '',
      access: ''
    }
  },
  mounted() {
    getData().then((data) => {
      const { tableData, orderData, userData, videoData } = data.data.data
      this.tableData = tableData
      this.orderData = orderData
      this.userData = userData
      this.videoData = videoData
      this.name = Cookie.get('userName')
      this.access = Cookie.get('userAccess')
      // 折线图
      // 基于准备好的dom, 初始化echars实例
      const linechart = echarts.init(document.getElementById('linechart'))
      // 指定图表的配置项和数据
      var linechartOption = {}
      // 处理数据xAxis
      const xAxis = Object.keys(orderData.data[0])
      linechartOption.xAxis = { data: xAxis }
      linechartOption.yAxis = {}
      linechartOption.legend = { data: xAxis }
      linechartOption.series = []
      xAxis.forEach(key => {
        linechartOption.series.push({
          name: key,
          data: orderData.data.map(item => item[key]),
          type: 'line'
        })
      })
      // console.log(linechartOption)
      linechart.setOption(linechartOption)

      // 柱状图
      const barchart = echarts.init(document.getElementById('barchart'))
      var barchartOption = {
        legend: {
          // 图例文字颜色
          textStyle: {
            color: "#333",
          },
        },
        grid: {
          left: "20%",
        },
        // 提示框
        tooltip: {
          trigger: "axis",
        },
        xAxis: {
          type: "category", // 类目轴
          data: userData.map(item => item.date),
          axisLine: {
            lineStyle: {
              color: "#17b3a3",
            },
          },
          axisLabel: {
            interval: 0,
            color: "#333",
          },
        },
        yAxis: [
          {
            type: "value",
            axisLine: {
              lineStyle: {
                color: "#17b3a3",
              },
            },
          },
        ],
        color: ["#2ec7c9", "#b6a2de"],
        series: [
          {
            name: '新增用户',
            data: userData.map(item => item.new),
            type: 'bar',
          },
          {
            name: '活跃用户',
            data: userData.map(item => item.active),
            type: 'bar',
          }
        ],
      }
      barchart.setOption(barchartOption)

      // 饼图
      const piechart = echarts.init(document.getElementById('piechart'))
      var piechartOption = {
        tooltip: {
            trigger: "item",
          },
          color: [
            "#0f78f4",
            "#dd536b",
            "#9462e5",
            "#a6a6a6",
            "#e1bb22",
            "#39c362",
            "#3ed1cf",
          ],
          series: [
          {
            data: videoData,
            type: 'pie',
          }
        ],
      }
      piechart.setOption(piechartOption)
    })

  }
}
</script>

<style lang="less"scoped>
.user {
  padding-bottom: 20px;
  margin-bottom: 20px;
  border-bottom: 1px solid #ccc;
  display: flex;
  align-items: center;

  img {
    margin-right: 40px;
    width: 150px;
    height: 150px;
    border-radius: 50%;
  }

  .userinfo {
    .name {
      font-size: 32px;
      margin-bottom: 10px;
    }

    .access {
      color: #999;
    }
  }
}

.login-info {
  p {
    line-height: 28px;
    font-size: 14px;
    color: #999;

    span {
      color: #666;
      margin-left: 60px;
    }
  }
}
.num {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .icon {
    width: 80px;
    height: 80px;
    font-size: 30px;
    text-align: center;
    line-height: 80px;
    color: #fff;
  }
  .detail {
    margin-left: 15px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .price {
      font-size: 30px;
      margin-bottom: 10px;
      line-height: 30px;
      height: 30px;
    }
    .desc{
      font-size: 14px;
      color: #999;
      text-align: center;
    }
  }
  .el-card {
    width: 32%;
    margin-bottom: 20px;
  }
}
.graph {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  .el-card{
    width: 48%;
  }
}
</style>