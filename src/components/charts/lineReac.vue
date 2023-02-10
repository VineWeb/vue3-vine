
<script setup lang="ts">

import * as echarts from 'echarts';
import axios from 'axios'
import {onMounted} from 'vue'
onMounted(() => {
    initChart()
})
async function initChart () {

    var ROOT_PATH = '/charts';
    type EChartsOption = echarts.EChartsOption;

    var chartDom = document.getElementById('line-reac')!;
    var myChart = echarts.init(chartDom);
    var option: EChartsOption;
    const _rawData = await axios.get(ROOT_PATH + '/data/asset/data/life-expectancy-table.json').then(res => res.data);
    run(_rawData)
    function run(_rawData: any) {
    var countries = ['Australia', 'Canada', 'China', 'Cuba', 'Finland', 'France', 'Germany', 'Iceland', 'India', 'Japan', 'North Korea', 'South Korea', 'New Zealand', 'Norway', 'Poland', 'Russia', 'Turkey', 'United Kingdom', 'United States'];
    // const countries = [
    //     'Finland',
    //     'France',
    //     'Germany',
    //     'Iceland',
    //     'Norway',
    //     'Poland',
    //     'Russia',
    //     'United Kingdom'
    // ];
    const datasetWithFilters: echarts.DatasetComponentOption[] = [];
    const seriesList: echarts.SeriesOption[] = [];
    echarts.util.each(countries, function (country) {
        var datasetId = 'dataset_' + country;
        datasetWithFilters.push({
        id: datasetId,
        fromDatasetId: 'dataset_raw',
        transform: {
            type: 'filter',
            config: {
            and: [
                { dimension: 'Year', gte: 1950 },
                { dimension: 'Country', '=': country }
            ]
            }
        }
        });
        seriesList.push({
        type: 'line',
        datasetId: datasetId,
        showSymbol: false,
        name: country,
        endLabel: {
            show: true,
            formatter: function (params: any) {
            return params.value[3] + ': ' + params.value[0];
            }
        },
        labelLayout: {
            moveOverlap: 'shiftY'
        },
        emphasis: {
            focus: 'series'
        },
        encode: {
            x: 'Year',
            y: 'Income',
            label: ['Country', 'Income'],
            itemName: 'Year',
            tooltip: ['Income']
        }
        });
    });

    option = {
        animationDuration: 10000,
        dataset: [
        {
            id: 'dataset_raw',
            source: _rawData
        },
        ...datasetWithFilters
        ],
        title: {
        text: 'Income of Germany and France since 1950'
        },
        tooltip: {
        order: 'valueDesc',
        trigger: 'axis'
        },
        xAxis: {
        type: 'category',
        nameLocation: 'middle'
        },
        yAxis: {
        name: 'Income'
        },
        grid: {
        right: 140
        },
        series: seriesList
    };

    myChart.setOption(option);

    option && myChart.setOption(option);

    }
}
</script>

<template>
    <div id="line-reac"></div>
</template>


<style scoped lang="scss">
#line-reac {
    height: 100%;
}
</style>