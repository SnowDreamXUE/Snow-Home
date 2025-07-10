<template>
  <div class="home-page">
    <!-- Hero Section -->
    <section class="hero">
      <div class="container hero-container">
        <div class="hero-content">
          <h1 class="hero-title">
            <div>你好，我是</div>
            <div class="highlight typewriter-container">
              <span ref="typewriterText" class="typewriter-text"></span>
              <span class="cursor">|</span>
            </div>
          </h1>
          <p class="hero-subtitle">一只喜欢新奇事物的猫猫</p>
          <p class="hero-description">
            个性签名 —— 我只想在雪夜的樱花树下做个好梦
          </p>
          <div class="hero-buttons">
            <router-link to="/projects" class="btn">查看我的项目</router-link>
            <router-link to="/about" class="btn btn-outline">了解更多</router-link>
          </div>
        </div>
        <div class="hero-avatar">
          <div class="avatar-container">
            <img src="@/assets/img/avatar.jpg" alt="Profile avatar">
          </div>
        </div>
      </div>
    </section>

    <section class="section featured-projects">
      <div class="container">
        <h2 class="section-title">项目展示</h2>
        <div class="projects-grid">
          <ProjectCard
              v-for="project in randomProjects"
              :key="project.id"
              :project="project"
          />
        </div>
        <div class="more-projects">
          <router-link to="/projects" class="btn">查看更多项目</router-link>
        </div>
      </div>
    </section>

    <!-- Skills Overview Section -->
    <section class="section skills-overview">
      <div class="container">
        <h2 class="section-title">技能概览</h2>
        <div class="skills-container">
          <div
              v-for="category in homepageSkillCategories"
              :key="category.id"
              class="skill-category glass-effect"
          >
            <h3><i :class="category.icon"></i> {{ category.name }}</h3>
            <div class="skill-tags">
              <span
                  v-for="skill in category.skills"
                  :key="skill.id"
                  class="skill-tag"
              >
                {{ skill.name }}
              </span>
            </div>
          </div>
        </div>
        <div class="more-skills">
          <router-link to="/about" class="btn">了解更多技能</router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import ProjectCard from '@/components/ProjectCard.vue'
import { useProjectsStore } from '@/stores/projectsStore'
import { useSkillsStore } from '@/stores/skillsStore'
import { storeToRefs } from 'pinia'
import { ref, computed, onMounted } from 'vue'

export default {
  name: 'HomePage',
  components: {
    ProjectCard
  },
  setup() {
    const projectsStore = useProjectsStore()
    const skillsStore = useSkillsStore()

    const randomProjects = computed(() => projectsStore.randomProjects)
    const { homepageSkills: homepageSkillCategories } = storeToRefs(skillsStore)

    return {
      randomProjects,
      homepageSkillCategories
    }
  },
  mounted() {
    this.initTypewriter();
  },
  methods: {
    initTypewriter() {
      const text = "SnowDreamXUE";
      const typewriterText = this.$refs.typewriterText;

      if (typewriterText) {
        typewriterText.textContent = '';

        let i = 0;
        const speed = 150;

        function type() {
          if (i < text.length) {
            typewriterText.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
          }
        }

        setTimeout(type, 1000);
      }
    }
  }
}
</script>

<style scoped>
.hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
  background: var(--gradient-bg);
  color: white;
  position: relative;
  overflow: hidden;
  margin-top: -80px;
  padding-top: 80px;
}

.hero::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('data:image/svg+xml;charset=utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800"><rect fill="none" width="800" height="800"/><path fill="rgba(255,255,255,0.07)" d="M769 229L1037 260.9M927 880L731 737 520 660 309 538 40 599 295 764 126.5 879.5 40 599-197 493 102 382-31 229 126.5 79.5-69-63"/><path fill="rgba(255,255,255,0.05)" d="M-31 229L237 261 390 382 731 737M695 764L574 538 40 599 309 538 390 382 102 382 40 599 -69 737 127 880"/><path fill="rgba(255,255,255,0.05)" d="M520 660L578 842 731 737 840 599 603 493 520 660 295 764 40 599 520 660 578 842 927 880 769 229 520 660 295 764 40 599"/></svg>');
  background-size: cover;
  opacity: 0.2;
}

.hero-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: calc(100vh - 80px);
}

.hero-content {
  max-width: 600px;
  z-index: 1;
  padding: 2.5rem;
  border-radius: var(--border-radius);
}

.hero-title {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.highlight {
  color: var(--secondary-color);
  position: relative;
  display: block;
}

.typewriter-container {
  display: inline-flex;
  align-items: center;
  position: relative;
}

.typewriter-text {
  position: relative;
}

.cursor {
  display: inline-block;
  margin-left: 1px;
  animation: blink 1s infinite;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

.hero-subtitle {
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  opacity: 0.9;
}

.hero-description {
  margin-bottom: 2rem;
  font-size: 1.1rem;
  opacity: 0.8;
}

.hero-buttons {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.btn {
  display: inline-block;
  padding: 0.8rem 2rem;
  background: var(--gradient-bg);
  color: white;
  text-decoration: none;
  border-radius: var(--border-radius);
  font-weight: 500;
  transition: all 0.3s ease;
  text-align: center;
  min-width: 140px;
}

.btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
}

.btn-outline {
  background: transparent;
  border: 2px solid white;
  color: white;
}

.btn-outline:hover {
  background: rgba(255, 255, 255, 0.1);
}

.hero-avatar {
  flex: 0 0 350px;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: var(--border-radius);
  padding: 2rem;
}

.avatar-container {
  width: 300px;
  height: 300px;
  border-radius: 50%;
  overflow: hidden;
  border: 5px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.avatar-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.more-projects, .more-skills {
  text-align: center;
  margin-top: 2rem;
}

.skills-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
}

.skill-category {
  border-radius: var(--border-radius);
  box-shadow: var(--shadow);
  padding: 1.5rem;
}

.glass-effect {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.skill-category h3 {
  font-size: 1.3rem;
  color: var(--primary-color);
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.skill-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
}

.skill-tag {
  background: rgba(140, 158, 255, 0.1);
  color: var(--primary-color);
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
}

/* Mobile Optimizations */
@media (max-width: 768px) {
  .hero {
    margin-top: -80px;
    padding-top: 100px;
  }

  .hero-container {
    flex-direction: column;
    justify-content: center;
    text-align: center;
    padding: 2rem 1rem;
    height: auto;
    min-height: calc(100vh - 80px);
    gap: 2rem;
  }

  .hero-content {
    max-width: 100%;
    padding: 1.5rem;
    margin-bottom: 2rem;
  }

  .hero-title {
    font-size: 2.2rem;
    align-items: center;
    line-height: 1.2;
  }

  .hero-subtitle {
    font-size: 1.1rem;
    margin-bottom: 1rem;
  }

  .hero-description {
    font-size: 1rem;
    margin-bottom: 1.5rem;
  }

  .hero-buttons {
    justify-content: center;
    gap: 0.8rem;
  }

  .btn {
    padding: 0.7rem 1.5rem;
    font-size: 0.9rem;
    min-width: 120px;
  }

  .hero-avatar {
    flex: 0 0 auto;
    padding: 1rem;
  }

  .avatar-container {
    width: 220px;
    height: 220px;
  }

  .projects-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .skills-container {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .skill-category {
    padding: 1.2rem;
  }

  .skill-tags {
    gap: 0.6rem;
  }

  .skill-tag {
    padding: 0.4rem 0.8rem;
    font-size: 0.85rem;
  }
}

@media (max-width: 480px) {
  .hero-title {
    font-size: 1.8rem;
  }

  .hero-subtitle {
    font-size: 1rem;
  }

  .hero-description {
    font-size: 0.9rem;
  }

  .hero-buttons {
    flex-direction: column;
    align-items: center;
  }

  .btn {
    width: 100%;
    max-width: 200px;
  }

  .avatar-container {
    width: 180px;
    height: 180px;
  }

  .hero-content {
    padding: 1rem;
  }
}
</style>
