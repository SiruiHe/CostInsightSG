<template>
  <div class="px-5 py-3">
    <div class="flex flex-wrap justify-between items-end gap-y-2 gap-x-4">
      <div class="flex items-start">
      </div>
      <div class="grow mb-1">
        <ul ref="legend" class="flex flex-wrap gap-x-4 sm:justify-end"></ul>
      </div>
    </div>
  </div>
  <!-- Chart built with Chart.js 3 -->
  <div class="grow">
    <canvas ref="canvas" :data="data" :width="width" :height="height"></canvas>
  </div>  
</template>

<script>
import { ref, watch, onMounted, onUnmounted } from 'vue'
import { useDark } from '@vueuse/core'
import { getChartColors } from './ChartjsConfig'

import {
  Chart, LineController, LineElement, Filler, PointElement, LinearScale, TimeScale, Tooltip,
} from 'chart.js'
import 'chartjs-adapter-moment'
import annotationPlugin from 'chartjs-plugin-annotation'

// Import utilities
import { formatValue } from '../utils/Utils'

Chart.register(LineController, LineElement, Filler, PointElement, LinearScale, TimeScale, Tooltip, annotationPlugin)

export default {
  name: 'LineChart02',
  props: ['data', 'width', 'height'],
  setup(props) {

    const canvas = ref(null)
    const legend = ref(null)
    let chart = null
    const darkMode = useDark()
    const { textColor, gridColor, tooltipBodyColor, tooltipBgColor, tooltipBorderColor } = getChartColors()
    
    onMounted(() => {
      const ctx = canvas.value
      chart = new Chart(ctx, {
        type: 'line',
        data: props.data,
        options: {
          layout: {
            padding: 20,
          },
          scales: {
            y: {
              border: {
                display: false,
              },
              beginAtZero: false,
              ticks: {
                maxTicksLimit: 10,
                // callback: (value) => formatValue(value),
                color: darkMode.value ? textColor.dark : textColor.light,
              },
              grid: {
                color: darkMode.value ? gridColor.dark : gridColor.light,
              },              
            },
            x: {
              type: 'time',
              time: {
                parser: 'YYYY',
                unit: 'year',
                displayFormats: {
                  month: 'YYYY',
                },
              },
              border: {
                display: false,
              },
              grid: {
                display: false,
              },
              ticks: {
                autoSkipPadding: 48,
                maxRotation: 0,
                color: darkMode.value ? textColor.dark : textColor.light,
              },
            },
          },
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              callbacks: {
                title: () => false, // Disable tooltip title
                // label: (context) => formatValue(context.parsed.y),
              },
              bodyColor: darkMode.value ? tooltipBodyColor.dark : tooltipBodyColor.light,
              backgroundColor: darkMode.value ? tooltipBgColor.dark : tooltipBgColor.light,
              borderColor: darkMode.value ? tooltipBorderColor.dark : tooltipBorderColor.light,
            },
            annotation: {
              annotations: {
                line2019: {
                  type: 'line',
                  xMin: '2019',
                  xMax: '2019',
                  borderColor: darkMode.value ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)',
                  borderWidth: 1,
                  borderDash: [5, 5],
                  label: {
                    display: true,
                    content: 'Base Year (2019)',
                    position: 'end',
                    yAdjust: 155,
                    backgroundColor: darkMode.value ? 'rgba(180, 180, 180, 0.7)' : 'rgba(255, 255, 255, 0.7)',
                    color: darkMode.value ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)',
                    font: {
                      size: 12
                    }
                  }
                }
              }
            }
          },
          interaction: {
            intersect: false,
            mode: 'nearest',
          },
          maintainAspectRatio: false,
          resizeDelay: 200,
        },
        plugins: [{
          id: 'htmlLegend',
          afterUpdate(c, args, options) {
            const ul = legend.value
            if (!ul) return
            // Remove old legend items
            while (ul.firstChild) {
              ul.firstChild.remove()
            }
            // Reuse the built-in legendItems generator
            const items = c.options.plugins.legend.labels.generateLabels(c)
            items.slice(0, 3).forEach((item) => {
              const li = document.createElement('li')
              // Button element
              const button = document.createElement('button')
              button.style.display = 'inline-flex'
              button.style.alignItems = 'center'
              button.style.opacity = item.hidden ? '.3' : ''
              button.onclick = () => {
                c.setDatasetVisibility(item.datasetIndex, !c.isDatasetVisible(item.datasetIndex))
                c.update()
              }
              // Color box
              const box = document.createElement('span')
              box.style.display = 'block'
              box.style.width = '12px'
              box.style.height = '12px'
              box.style.borderRadius = 'calc(infinity * 1px)'
              box.style.marginRight = '8px'
              box.style.borderWidth = '3px'
              box.style.borderColor = c.data.datasets[item.datasetIndex].borderColor
              box.style.pointerEvents = 'none'
              // Label
              const label = document.createElement('span')
              label.classList.add('text-gray-500', 'dark:text-gray-400')
              label.style.fontSize = '14px'
              label.style.lineHeight = 'calc(1.25 / 0.875)'
              const labelText = document.createTextNode(item.text)
              label.appendChild(labelText)
              li.appendChild(button)
              button.appendChild(box)
              button.appendChild(label)
              ul.appendChild(li)
            })
          },
        }],
      })
    })

    onUnmounted(() => chart.destroy())

    watch(
      () => props.data,
      (newData) => {
        if (chart) {
          chart.data = newData
          chart.update()
        }
      }
    )

    watch(
      () => darkMode.value,
      () => {
        if (darkMode.value) {
          chart.options.scales.x.ticks.color = textColor.dark
          chart.options.scales.y.ticks.color = textColor.dark
          chart.options.scales.y.grid.color = gridColor.dark
          chart.options.plugins.tooltip.bodyColor = tooltipBodyColor.dark
          chart.options.plugins.tooltip.backgroundColor = tooltipBgColor.dark
          chart.options.plugins.tooltip.borderColor = tooltipBorderColor.dark
          
          // Update annotation colors for dark mode
          chart.options.plugins.annotation.annotations.line2019.borderColor = 'rgba(255, 255, 255, 0.5)'
          chart.options.plugins.annotation.annotations.line2019.label.backgroundColor = 'rgba(0, 0, 0, 0.7)'
          chart.options.plugins.annotation.annotations.line2019.label.color = 'rgba(255, 255, 255, 0.8)'
        } else {
          chart.options.scales.x.ticks.color = textColor.light
          chart.options.scales.y.ticks.color = textColor.light
          chart.options.scales.y.grid.color = gridColor.light
          chart.options.plugins.tooltip.bodyColor = tooltipBodyColor.light
          chart.options.plugins.tooltip.backgroundColor = tooltipBgColor.light
          chart.options.plugins.tooltip.borderColor = tooltipBorderColor.light
          
          // Update annotation colors for light mode
          chart.options.plugins.annotation.annotations.line2019.borderColor = 'rgba(0, 0, 0, 0.5)'
          chart.options.plugins.annotation.annotations.line2019.label.backgroundColor = 'rgba(255, 255, 255, 0.7)'
          chart.options.plugins.annotation.annotations.line2019.label.color = 'rgba(0, 0, 0, 0.8)'
        }
        chart.update('none')
      })      

    return {
      canvas,
      legend,
    }
  }
}
</script>