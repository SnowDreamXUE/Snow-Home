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
import {useProjectsStore} from '@/stores/projectsStore'
import {storeToRefs} from 'pinia'
import {ref,computed} from 'vue'

export default {
  name: 'ProjectsPage',
  components: {
    ProjectCard
  },
  setup() {
    const projectsStore = useProjectsStore()
    const {categories} = storeToRefs(projectsStore)

    const activeCategory = ref('全部')

    const filteredProjects = computed(() => {
      return projectsStore.getProjectsByCategory(activeCategory.value)
    })

    function filterProjects(category) {
      activeCategory.value = category;
    }

    return {
      activeCategory,
      categories,
      filteredProjects,
      filterProjects
    }
  },
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
  line-height: 1.5;
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
  padding: 0.8rem 1.5rem;
  background-color: var(--white);
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 30px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  min-height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.filter-btn:hover, .filter-btn.active {
  background: var(--gradient-bg);
  color: white;
  border-color: transparent;
  transform: translateY(-2px);
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
}

/* Mobile Optimizations */
@media (max-width: 768px) {
  .page-header {
    padding: 3rem 0;
  }

  .page-title {
    font-size: 2rem;
  }

  .page-description {
    font-size: 1rem;
    padding: 0 1rem;
  }

  .projects-filter {
    margin-bottom: 2rem;
    padding: 1rem;
    gap: 0.8rem;
  }

  .filter-btn {
    padding: 0.7rem 1.2rem;
    font-size: 0.85rem;
    min-width: 80px;
  }

  .projects-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
}

@media (max-width: 480px) {
  .page-header {
    padding: 2.5rem 0;
  }

  .page-title {
    font-size: 1.8rem;
  }

  .projects-filter {
    padding: 0.8rem;
    gap: 0.6rem;
  }

  .filter-btn {
    padding: 0.6rem 1rem;
    font-size: 0.8rem;
    flex: 1;
    min-width: 70px;
  }
}
</style>
