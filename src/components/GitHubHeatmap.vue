<template>
  <div class="github-heatmap">
    <div class="heatmap-header">
      <h3 class="heatmap-title"><i class="fab fa-github"></i><span>GitHub 提交活动</span></h3>
    </div>

    <div class="heatmap-container" v-if="heatmapData && !loading">
      <div class="heatmap-grid">
        <div
            v-for="week in weeks"
            :key="week.index"
            class="week-column"
        >
          <div
              v-for="day in week.days"
              :key="day.date"
              class="day-cell"
              :class="`level-${day.level}`"
              :title="`${day.date}: ${day.count} 次提交`"
              @mouseenter="showTooltip($event, day)"
              @mouseleave="hideTooltip"
          >
          </div>
        </div>
      </div>

      <div class="heatmap-footer">
        <div class="total-commits" v-if="heatmapData">
          总计 {{ heatmapData.total_commits }} 次提交
        </div>

        <div class="heatmap-legend">
          <span class="legend-text">少</span>
          <div class="legend-levels">
            <div class="legend-cell level-0"></div>
            <div class="legend-cell level-1"></div>
            <div class="legend-cell level-2"></div>
            <div class="legend-cell level-3"></div>
            <div class="legend-cell level-4"></div>
          </div>
          <span class="legend-text">多</span>
        </div>

        <div class="last-updated" v-if="heatmapData">
          最后更新: {{ formatDate(heatmapData.generated_at) }}
        </div>
      </div>
    </div>

    <div v-else-if="loading" class="loading-state">
      <div class="loading-spinner"></div>
      <span>加载提交数据中...</span>
    </div>

    <div v-else class="error-state">
      <i class="fas fa-exclamation-triangle"></i>
      <span>无法加载GitHub提交数据</span>
    </div>

    <div
        ref="tooltip"
        class="heatmap-tooltip"
        v-show="tooltip.visible"
        :style="{ left: tooltip.x + 'px', top: tooltip.y + 'px' }"
    >
      <div class="tooltip-date">{{ tooltip.date }}</div>
      <div class="tooltip-count">{{ tooltip.count }} 次提交</div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue'

export default {
  name: 'GitHubHeatmap',
  setup() {
    const heatmapData = ref(null)
    const loading = ref(true)
    const tooltip = ref({
      visible: false,
      x: 0,
      y: 0,
      date: '',
      count: 0
    })

    const fetchHeatmapData = async () => {
      try {
        loading.value = true
        const response = await fetch('https://raw.githubusercontent.com/SnowDreamXUE/GitHub-stats-data/refs/heads/main/commit-heatmap.json')
        const data = await response.json()
        heatmapData.value = data
      } catch (error) {
        console.error('Failed to fetch heatmap data:', error)
      } finally {
        loading.value = false
      }
    }

    const weeks = computed(() => {
      if (!heatmapData.value) return []

      const dataMap = new Map()
      heatmapData.value.data.forEach(item => {
        dataMap.set(item.date, item)
      })

      const weeks = []
      const startDate = new Date()
      startDate.setDate(startDate.getDate() - 364) // 显示过去一年

      // 找到周一
      const startDay = startDate.getDay()
      const mondayOffset = startDay === 0 ? 6 : startDay - 1
      startDate.setDate(startDate.getDate() - mondayOffset)

      for (let weekIndex = 0; weekIndex < 53; weekIndex++) {
        const week = {
          index: weekIndex,
          days: []
        }

        for (let dayIndex = 0; dayIndex < 7; dayIndex++) {
          const currentDate = new Date(startDate)
          currentDate.setDate(startDate.getDate() + weekIndex * 7 + dayIndex)

          const dateString = currentDate.toISOString().split('T')[0]
          const dayData = dataMap.get(dateString) || { date: dateString, count: 0, level: 0 }

          week.days.push(dayData)
        }

        weeks.push(week)
      }

      return weeks
    })

    const formatDate = (dateString) => {
      return new Date(dateString).toLocaleDateString('zh-CN')
    }

    const showTooltip = (event, day) => {
      tooltip.value = {
        visible: true,
        x: event.pageX + 10,
        y: event.pageY - 40,
        date: day.date,
        count: day.count
      }
    }

    const hideTooltip = () => {
      tooltip.value.visible = false
    }

    onMounted(() => {
      fetchHeatmapData()
    })

    return {
      heatmapData,
      loading,
      weeks,
      tooltip,
      formatDate,
      showTooltip,
      hideTooltip
    }
  }
}
</script>

<style scoped>
.github-heatmap {
  position: relative;
  padding: 1.5rem 1rem;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.05));
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: var(--border-radius, 20px);
  margin-top: 2rem;
  box-shadow: 0 8px 32px rgba(140, 158, 255, 0.1),
  0 4px 16px rgba(0, 0, 0, 0.1),
  inset 0 1px 0 rgba(255, 255, 255, 0.2);
}

.heatmap-title {
  font-size: 1.3rem;
  background: linear-gradient(135deg, var(--primary-color, #8c9eff), #667eea);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0;
  display: flex;
  align-items: center;
  font-weight: 600;
  line-height: 40px;
  height: 40px;
}

.heatmap-title i {
  color: var(--primary-color, #8c9eff);
  font-size: 1.3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  line-height: 40px;
  flex-shrink: 0;
}

.heatmap-title span {
  display: flex;
  align-items: center;
  height: 40px;
  padding-top: 4px;
}

.heatmap-container {
  overflow-x: auto;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.05);
  padding: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.heatmap-grid {
  display: flex;
  gap: 6px;
  min-width: 800px;
  justify-content: center;
  margin-bottom: 1rem;
}

.week-column {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.day-cell {
  width: 13px;
  height: 13px;
  border-radius: 3px;
  cursor: pointer;
  transition: opacity 0.2s ease;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.day-cell.level-0 {
  background: rgba(200, 200, 200, 0.3);
  border: 1px solid rgba(150, 150, 150, 0.5);
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.05);
}

.day-cell.level-1 {
  background: rgba(140, 158, 255, 0.4);
  border-color: rgba(140, 158, 255, 0.5);
}

.day-cell.level-2 {
  background: rgba(140, 158, 255, 0.6);
  border-color: rgba(140, 158, 255, 0.7);
}

.day-cell.level-3 {
  background: rgba(140, 158, 255, 0.8);
  border-color: rgba(140, 158, 255, 0.9);
}

.day-cell.level-4 {
  background: var(--primary-color, #8c9eff);
  border-color: var(--primary-color, #8c9eff);
  box-shadow: 0 0 6px rgba(140, 158, 255, 0.3);
}

.heatmap-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 1rem;
  gap: 1rem;
}

.total-commits {
  font-weight: 600;
  color: var(--primary-color, #8c9eff);
  padding: 0.5rem 1rem;
  font-size: 0.95rem;
  white-space: nowrap;
}

.heatmap-legend {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.85rem;
  color: rgba(0, 0, 0, 0.9);
  padding: 0.75rem 1rem;
  backdrop-filter: blur(10px);
  flex-shrink: 0;
}

.legend-levels {
  display: flex;
  gap: 4px;
}

.legend-cell {
  width: 12px;
  height: 12px;
  border-radius: 2px;
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.legend-cell.level-0 {
  background: rgba(200, 200, 200, 0.4);
  border: 1px solid rgba(200, 200, 200, 0.6);
}

.legend-cell.level-1 {
  background: rgba(140, 158, 255, 0.4);
  border-color: rgba(140, 158, 255, 0.6);
}

.legend-cell.level-2 {
  background: rgba(140, 158, 255, 0.6);
  border-color: rgba(140, 158, 255, 0.8);
}

.legend-cell.level-3 {
  background: rgba(140, 158, 255, 0.8);
  border-color: rgba(140, 158, 255, 1);
}

.legend-cell.level-4 {
  background: var(--primary-color, #8c9eff);
  border-color: var(--primary-color, #8c9eff);
  box-shadow: 0 0 4px rgba(140, 158, 255, 0.4);
}

.last-updated {
  padding: 0.75rem 1rem;
  font-size: 0.85rem;
  color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);
  white-space: nowrap;
}

.loading-state,
.error-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  padding: 4rem 2rem;
  color: var(--text-color, #333);
  opacity: 0.8;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 3px solid rgba(140, 158, 255, 0.2);
  border-top: 3px solid var(--primary-color, #8c9eff);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.error-state i {
  font-size: 2.5rem;
  color: #ff6b6b;
  opacity: 0.8;
}

.heatmap-tooltip {
  position: absolute;
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.8));
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  color: white;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  font-size: 0.85rem;
  pointer-events: none;
  z-index: 1000;
  white-space: nowrap;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
}

.tooltip-date {
  font-weight: 600;
  margin-bottom: 0.25rem;
  color: var(--primary-color, #8c9eff);
}

.tooltip-count {
  opacity: 0.9;
}
</style>