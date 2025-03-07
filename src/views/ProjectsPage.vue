<template>
  <div class="projects-page">
    <section class="section page-header">
      <div class="container">
        <h1 class="page-title">项目经历</h1>
        <p class="page-description">以下是我参与设计和开发的一些项目。</p>
      </div>
    </section>

    <section class="section projects-list">
      <div class="container">
        <!-- 项目过滤器 -->
        <div class="projects-filter glass-effect">
          <button
              v-for="category in categories"
              :key="category"
              :class="['filter-btn', { active: activeCategory === category }]"
              @click="filterProjects(category)"
          >
            {{ category }}
          </button>
        </div>

        <!-- 项目网格 -->
        <div class="projects-grid">
          <ProjectCard
              v-for="(project, index) in filteredProjects"
              :key="index"
              :project="project"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import ProjectCard from '@/components/ProjectCard.vue'

export default {
  name: 'ProjectsPage',
  components: {
    ProjectCard
  },
  data() {
    return {
      activeCategory: '全部',
      categories: ['全部', '前端', '后端', 'Hexo'],
      projects: [
        {
          title: 'Authority-System-vue',
          description: '基于vue-admin-element二次开发的后台权限管理系统前端部分',
          technologies: ['Vue.js', 'Element-UI', 'Vuex', 'Vue-router'],
          category: ['前端'],
          demoUrl: null,
          codeUrl: 'https://gitee.com/SnowDreamXUE/authority-system-vue'
        },
        {
          title: 'Authority-System',
          description: '前后端分离的权限管理系统，包含⽤⼾管理、菜单管理、部⻔管理和⻆⾊管理功能。采⽤ SpringBoot 和 SpringSecurity 实现认证授权',
          technologies: ['Java', 'SpringBoot', 'SpringSecurity', 'MybatisPlus', 'Redis'],
          category: ['后端'],
          demoUrl: null,
          codeUrl: 'https://gitee.com/SnowDreamXUE/authority-system'
        },
        {
          title: 'BiliBiliDownloader',
          description: 'BiliBiliDownloader 是⼀款专注于哔哩哔哩（B站）视频下载的⼯具，⽀持扫码登录、视频链接解析以及视频⾳频分离下载',
          technologies: ['Vue.js', 'SpringBoot', 'ffmpeg'],
          category: ['前端', '后端'],
          demoUrl: null,
          codeUrl: 'https://github.com/SnowDreamXUE/BiliBliliDownloader'
        },
        {
          title: 'Vue-Study-Demo',
          description: '在学习Vue过程中，制作的一些小项目',
          technologies: ['Vue.js', 'Element-UI'],
          category: ['前端'],
          demoUrl: null,
          codeUrl: 'https://github.com/SnowDreamXUE/vue-study-demo'
        },
        {
          title: 'Hexo博客',
          description: '使用Hexo搭建的博客，加入了Github-Action完成自动部署',
          technologies: ['Hexo', 'Github-Action'],
          category: ['Hexo'],
          demoUrl: null,
          codeUrl: 'https://github.com/SnowDreamXUE/SnowDreamXUE.github.io'
        }
      ]
    }
  },
  computed: {
    filteredProjects() {
      if (this.activeCategory === '全部') {
        return this.projects;
      }
      return this.projects.filter(project => {
        // 统一将分类转为数组格式
        const categories = Array.isArray(project.category)
            ? project.category
            : [project.category];
        return categories.includes(this.activeCategory);
      });
    }
  },
  methods: {
    filterProjects(category) {
      this.activeCategory = category;
    }
  }
}
</script>

<style scoped>
.page-header {
  background: var(--gradient-bg);
  color: white;
  padding: 4rem 0;
  border-radius: 0 0 var(--border-radius) var(--border-radius);
  text-align: center;
}

.page-title {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.page-description {
  max-width: 700px;
  margin: 0 auto;
  font-size: 1.1rem;
  opacity: 0.9;
}

.projects-filter {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 3rem;
  gap: 1rem;
  padding: 1.5rem;
  border-radius: var(--border-radius);
}

.glass-effect {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.filter-btn {
  padding: 0.6rem 1.2rem;
  background-color: var(--white);
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 30px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.filter-btn:hover, .filter-btn.active {
  background: var(--gradient-bg);
  color: white;
  border-color: transparent;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 2rem;
}

@media (max-width: 768px) {
  .page-title {
    font-size: 2rem;
  }

  .projects-filter {
    margin-bottom: 2rem;
  }
}
</style>
