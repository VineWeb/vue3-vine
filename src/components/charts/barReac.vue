<script setup lang="ts">
import * as echarts from "echarts";
import axios from "axios";
import { onMounted } from "vue";
onMounted(() => {
  initChart();
});
async function initChart() {
  type EChartsOption = echarts.EChartsOption;

  var chartDom = document.getElementById("bar-reac")!;
  var myChart = echarts.init(chartDom);
  var option: EChartsOption;

  const data: number[] = [];
  for (let i = 0; i < 5; ++i) {
    data.push(Math.round(Math.random() * 200));
  }
  option = {
    xAxis: {
      max: "dataMax",
    },
    yAxis: {
      type: "category",
      data: ["A", "B", "C", "D", "E"],
      inverse: true,
      animationDuration: 300,
      animationDurationUpdate: 300,
      max: 2,
    },
    series: [
      {
        realtimeSort: true,
        name: "条形",
        type: "bar",
        data: data,
        label: {
          show: true,
          position: "right",
          valueAnimation: true,
        },
      },
    ],
    legend: {
      show: true,
    },
    animationDuration: 0,
    animationDurationUpdate: 3000,
    animationEasing: "linear",
    animationEasingUpdate: "linear",
  };

  function run() {
    for (var i = 0; i < data.length; ++i) {
      if (Math.random() > 0.9) {
        data[i] += Math.round(Math.random() * 2000);
      } else {
        data[i] += Math.round(Math.random() * 200);
      }
    }
    myChart.setOption<echarts.EChartsOption>({
      series: [
        {
          type: "bar",
          data,
        },
      ],
    });
  }

  setTimeout(function () {
    run();
  }, 0);
  setInterval(function () {
    run();
  }, 3000);

  option && myChart.setOption(option);
}
</script>

<template>
  <div id="bar-reac"></div>
</template>

<style scoped lang="scss">
#bar-reac {
  height: 100%;
}
</style>
