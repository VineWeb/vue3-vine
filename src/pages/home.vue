<script setup lang="ts">
import * as echarts from "echarts";
import axios from "axios";
import { onMounted } from "vue";
import lineReac from 'comp/charts/lineReac.vue'
import barReac from 'comp/charts/barReac.vue'
async function initChart() {
  var ROOT_PATH = "/charts";
  type EChartsOption = echarts.EChartsOption;

  var chartDom = document.getElementById("main")!;
  var myChart = echarts.init(chartDom);
  var option: EChartsOption;

  const updateFrequency = 2000;
  const dimension = 0;

  const countryColors: Record<string, string> = {
    Australia: "#00008b",
    Canada: "#f00",
    China: "#ffde00",
    Cuba: "#002a8f",
    Finland: "#003580",
    France: "#ed2939",
    Germany: "#000",
    Iceland: "#003897",
    India: "#f93",
    Japan: "#bc002d",
    "North Korea": "#024fa2",
    "South Korea": "#000",
    "New Zealand": "#00247d",
    Norway: "#ef2b2d",
    Poland: "#dc143c",
    Russia: "#d52b1e",
    Turkey: "#e30a17",
    "United Kingdom": "#00247d",
    "United States": "#b22234",
  };
  const res0 = await axios
    .get("https://fastly.jsdelivr.net/npm/emoji-flags@1.3.0/data.json")
    .then((res) => {
      return res.data;
    });
  const res1 = await axios
    .get(ROOT_PATH + "/data/asset/data/life-expectancy-table.json")
    .then((res) => {
      return res.data;
    });
  interface Flag {
    name: string;
    emoji: string;
  }
  const flags: Flag[] = res0;
  const data = res1;
  const years: string[] = [];
  for (let i = 0; i < data.length; ++i) {
    if (years.length === 0 || years[years.length - 1] !== data[i][4]) {
      years.push(data[i][4]);
    }
  }

  function getFlag(countryName: string) {
    if (!countryName) {
      return "";
    }
    return (
      flags.find(function (item) {
        return item.name === countryName;
      }) || {}
    ).emoji;
  }
  let startIndex = 10;
  let startYear = years[startIndex];
  option = {
    grid: {
      top: 10,
      bottom: 30,
      left: 150,
      right: 80,
    },
    xAxis: {
      max: "dataMax",
      axisLabel: {
        formatter: function (n: number) {
          return Math.round(n) + "";
        },
      },
    },
    dataset: {
      source: data.slice(1).filter(function (d: string[]) {
        return d[4] === startYear;
      }),
    },
    yAxis: {
      type: "category",
      inverse: true,
      max: 10,
      axisLabel: {
        show: true,
        fontSize: 14,
        formatter: function (value: any) {
          return value + "{flag|" + getFlag(value) + "}";
        },
        rich: {
          flag: {
            fontSize: 25,
            padding: 5,
          },
        },
      },
      animationDuration: 300,
      animationDurationUpdate: 300,
    },
    series: [
      {
        realtimeSort: true,
        seriesLayoutBy: "column",
        type: "bar",
        itemStyle: {
          color: function (param) {
            return countryColors[(param.value as number[])[3]] || "#5470c6";
          },
        },
        encode: {
          x: dimension,
          y: 3,
        },
        label: {
          show: true,
          precision: 1,
          position: "right",
          valueAnimation: true,
          fontFamily: "monospace",
        },
      },
    ],
    animationDuration: 0,
    animationDurationUpdate: updateFrequency,
    animationEasing: "linear",
    animationEasingUpdate: "linear",
    graphic: {
      elements: [
        {
          type: "text",
          right: 160,
          bottom: 60,
          style: {
            text: startYear,
            font: "bolder 80px monospace",
            fill: "rgba(100, 100, 100, 0.25)",
          },
          z: 100,
        },
      ],
    },
  };
  myChart.setOption<echarts.EChartsOption>(option);

  for (let i = startIndex; i < years.length - 1; ++i) {
    (function (i) {
      setTimeout(function () {
        updateYear(years[i + 1]);
      }, (i - startIndex) * updateFrequency);
    })(i);
  }

  function updateYear(year: string) {
    let source = data.slice(1).filter(function (d: string[]) {
      return d[4] === year;
    });
    (option as any).series[0].data = source;
    (option as any).graphic.elements[0].style.text = year;
    myChart.setOption<echarts.EChartsOption>(option);
  }
  option && myChart.setOption(option);
}

onMounted(() => {
  initChart();
});
</script>
<template>
  <div class="home">
    <div id="main"></div>
    <div class="home-bottom">
      <line-reac />
      <bar-reac />
    </div>
  </div>
</template>

<style scoped lang="scss">
.home {
  height: 100%;
  width: 100%;
  display: flex;
  flex-flow: column;
  #main {
    width: 100%;
    height: 50%;
  }
  .home-bottom {
    flex: 1;
    width: 100%;
    display: flex;
    div {
      width: 50%;
    }
  }
}
</style>
