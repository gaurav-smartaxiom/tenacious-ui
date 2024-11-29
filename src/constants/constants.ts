export const ConstantVariables = {
  limit: 20,
  ENDPOINT: {
    LABEL1: 'IMPACT Tracker',
    LABEL2: 'IMPACT Trackers',
  },
  SHIPMENT: 'Shipment',
  NOTIFICATION_SOUND: '/assets/audio/alert.wav'
}

export const sparklineChartOption = {
  responsive: false,
  maintainAspectRatio: false,
  legend: { display: false },
  showScale: false,
  elements: {
    point: { radius: 1 },
  },
  scales: {
    xAxes: [{ display: false }],
    yAxes: [{
      display: false,
      ticks: {
        beginAtZero: true
      }
    }],
  },
};

export function getEchartConfig(res: any[], lineColor: string, bgColor: string) {
  return {
    grid: {
      top: 0,
      left: 0,
      right: 0,
      bottom: 0
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'line',
      }
    },
    xAxis: {
      type: 'category',
      data: (res as any[]).map(() => ''),
    },
    yAxis: {
      type: 'value',
      show: false,
    },
    series: [
      {
        data: res,
        type: 'line',
        areaStyle: {
          color: bgColor
        },
        showSymbol: false,
        lineStyle: { color: lineColor }
      },
    ],
  };
}

