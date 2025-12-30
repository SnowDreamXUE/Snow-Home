import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'
import { execSync } from 'child_process'

// 获取 Git 最后提交时间
function getGitLastUpdateTime() {
  try {
    const timestamp = execSync('git log -1 --format=%ci').toString().trim()
    const date = new Date(timestamp)
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  } catch (e) {
    return new Date().toISOString().split('T')[0]
  }
}

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  define: {
    __LAST_UPDATE_TIME__: JSON.stringify(getGitLastUpdateTime())
  }
})
