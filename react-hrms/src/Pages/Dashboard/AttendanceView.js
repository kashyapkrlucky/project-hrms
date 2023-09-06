import React from 'react'

import ReactECharts from 'echarts-for-react';
import { cards } from '../../Utils/Classes';

function AttendanceView({data}) {
    const option = {
        title: {
            text: 'All Attendance',
            subtext: 'Today',
            x: 'center'
        },
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            bottom: 'bottom',
            data: ['In Office', 'Remote', 'Absent']
        },
        series: [
            {
                name: 'Attendance',
                type: 'pie',
                radius: '55%',
                center: ['50%', '60%'],
                data: data,
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };

    function onChartReady(echarts) {
        // console.log('echarts is ready', echarts);
    }

    function onChartClick(param, echarts) {
        // console.log(param, echarts);
    };

    function onChartLegendselectchanged(param, echarts) {
        // console.log(param, echarts);
    };
    return (
        <div className={cards + ' h-80 gap-4'}>
            <ReactECharts
                option={option}
                style={{ height: 300 }}
                onChartReady={onChartReady}
                onEvents={{
                    'click': onChartClick,
                    'legendselectchanged': onChartLegendselectchanged
                }}
            />
        </div>
    )
}

export default AttendanceView