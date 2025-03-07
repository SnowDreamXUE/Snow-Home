<template>
  <div class="project-card glass-effect">
    <div class="project-content">
      <h3 class="project-title">{{ project.title }}</h3>
      <p class="project-description">{{ project.description }}</p>
      <div class="project-tech">
        <span v-for="(tech, index) in project.technologies" :key="index" class="tech-tag">
          {{ tech }}
        </span>
      </div>
      <div class="project-links">
        <a v-if="project.demoUrl" :href="project.demoUrl" target="_blank" class="project-link">
          <i class="fas fa-external-link-alt"></i> 查看演示
        </a>
        <a v-if="project.codeUrl" :href="project.codeUrl" target="_blank" class="project-link">
          <i class="fab fa-github"></i> 查看代码
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProjectCard',
  props: {
    project: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
.project-card {
  margin-bottom: 2rem;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: 100%;
  border-left: 4px solid var(--primary-color);
  border-radius: var(--border-radius);
}

.glass-effect {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: var(--shadow);
}

.project-content {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.project-title {
  margin-top: 0;
  font-size: 1.5rem;
  color: var(--text-color);
  margin-bottom: 0.5rem;
}

.project-description {
  color: #555;
  margin-bottom: 1rem;
  flex-grow: 1;
}

.project-tech {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.tech-tag {
  background: rgba(140, 158, 255, 0.1);
  color: var(--primary-color);
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
}

.project-links {
  display: flex;
  gap: 1rem;
}

.project-link {
  text-decoration: none;
  color: var(--primary-color);
  font-weight: 500;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: color 0.2s ease;
}

.project-link:hover {
  color: var(--secondary-color);
}
</style>
