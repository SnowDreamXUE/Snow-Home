<template>
  <div class="about-page">
    <section class="section page-header">
      <div class="container">
        <h1 class="page-title">关于我</h1>
        <p class="page-description">了解更多关于我的经历、技能和专业知识</p>
      </div>
    </section>

    <section class="section profile">
      <div class="container">
        <div class="profile-content">
          <div class="profile-image glass-effect">
            <div class="avatar-container">
              <img src="@/assets/img/avatar.jpg" alt="Profile Image">
            </div>
          </div>
          <div class="profile-text glass-effect">
            <h2 class="section-title">你好，我是 SnowDreamXUE</h2>
            <p>一只拥有好奇心的猫猫</p>
            <p>喜欢绝大多数美观的事物，也喜欢探索新奇的事物</p>
            <p>个性签名 —— 我只想在雪夜的樱花树下做个好梦</p>
            <div class="email-container">
              <a href="mailto:SnowDreamXUE@outlook.com" class="email-link">
                <i class="far fa-envelope"></i> SnowDreamXUE@outlook.com
              </a>
            </div>
            <div class="social-links">
              <a href="https://github.com/SnowDreamXUE" target="_blank" class="social-link">
                <i class="fab fa-github"></i> GitHub
              </a>
              <a href="https://blog.csdn.net/SnowDreamXUE" target="_blank" class="social-link">
                <i class="fab fa-blogger"></i> CSDN博客
              </a>
              <a href="https://blog.snowdreamxue.top" target="_blank" class="social-link">
                <i class="fas fa-globe"></i> Hexo博客
              </a>
              <a href="https://notion.snowdreamxue.top" target="_blank" class="social-link">
                <i class="fas fa-globe"></i> Notion博客
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section skills">
      <div class="container">
        <h2 class="section-title">专业技能</h2>

        <div class="skills-categories">
          <div
              v-for="category in skillCategories"
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
      </div>
    </section>
  </div>
</template>

<script>
import { useSkillsStore } from '@/stores/skillsStore'
import { storeToRefs } from 'pinia'

export default {
  name: 'AboutPage',
  setup() {
    const skillsStore = useSkillsStore()
    const { skillCategories } = storeToRefs(skillsStore)

    return {
      skillCategories
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

.profile-content {
  display: flex;
  gap: 3rem;
  align-items: center;
}

.profile-image {
  flex: 0 0 300px;
  display: flex;
  justify-content: center;
  padding: 1.5rem;
  border-radius: var(--border-radius);
}

.glass-effect {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.avatar-container {
  width: 300px;
  height: 300px;
  border-radius: 50%;
  overflow: hidden;
  border: 5px solid rgba(255, 255, 255, 0.3);
  box-shadow: var(--shadow);
}

.avatar-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.profile-text {
  flex: 1;
  padding: 2rem;
  border-radius: var(--border-radius);
}

.profile-text p {
  margin-bottom: 1rem;
}

.email-container {
  margin: 1.5rem 0;
}

.email-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.8rem 1.5rem;
  background-color: rgba(140, 158, 255, 0.1);
  border-radius: var(--border-radius);
  text-decoration: none;
  color: var(--primary-color);
  font-weight: 500;
  transition: all 0.3s ease;
}

.email-link:hover {
  background-color: var(--primary-color);
  color: white;
  transform: translateY(-3px);
}

.social-links {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 1.5rem;
}

.social-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: var(--white);
  border-radius: var(--border-radius);
  text-decoration: none;
  color: var(--text-color);
  font-weight: 500;
  transition: all 0.3s ease;
  box-shadow: var(--shadow);
  margin-bottom: 0.5rem;
}

.social-link:hover {
  transform: translateY(-3px);
  color: var(--primary-color);
}

.skills-categories {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.skill-category {
  border-radius: var(--border-radius);
  box-shadow: var(--shadow);
  padding: 1.5rem;
}

.skill-category h3 {
  font-size: 1.3rem;
  color: var(--primary-color);
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.skill-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.skill-tag {
  background: rgba(140, 158, 255, 0.1);
  color: var(--primary-color);
  padding: 0.7rem 1.2rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.3s ease;
}

.skill-tag:hover {
  background: var(--gradient-bg);
  color: white;
  transform: translateY(-3px);
}

@media (max-width: 768px) {
  .profile-content {
    flex-direction: column;
    text-align: center;
  }

  .avatar-container {
    width: 250px;
    height: 250px;
  }

  .email-link {
    justify-content: center;
  }

  .social-links {
    justify-content: center;
  }
}

@media (max-width: 576px) {
  .page-title {
    font-size: 2rem;
  }
}
</style>
