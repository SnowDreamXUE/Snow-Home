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
        <h2 class="section-title">精选项目</h2>
        <div class="projects-grid">
          <ProjectCard
              v-for="(project, index) in featuredProjects"
              :key="index"
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
          <div class="skill-category glass-effect">
            <h3><i class="fas fa-code"></i> 前端开发</h3>
            <div class="skill-tags">
              <span class="skill-tag">HTML5 / CSS3</span>
              <span class="skill-tag">JavaScript</span>
              <span class="skill-tag">Vue.js</span>
              <span class="skill-tag">响应式设计</span>
            </div>
          </div>

          <div class="skill-category glass-effect">
            <h3><i class="fas fa-paint-brush"></i> 语言</h3>
            <div class="skill-tags">
              <span class="skill-tag">Java</span>
              <span class="skill-tag">C++</span>
              <span class="skill-tag">Python</span>
              <span class="skill-tag">Markdown</span>
              <span class="skill-tag">Vue</span>
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

export default {
  name: 'HomePage',
  components: {
    ProjectCard
  },
  data() {
    return {
      featuredProjects: [
        {
          title: 'Authority-System-vue',
          description: '基于vue-admin-element二次开发的后台权限管理系统前端部分',
          technologies: ['Vue.js', 'Element-UI', 'Vuex', 'Vue-router'],
          demoUrl: null,
          codeUrl: 'https://gitee.com/SnowDreamXUE/authority-system-vue'
        },
        {
          title: 'Authority-System',
          description: '前后端分离的权限管理系统，包含⽤⼾管理、菜单管理、部⻔管理和⻆⾊管理功能。采⽤ SpringBoot 和 SpringSecurity 实现认证授权',
          technologies: ['Java', 'SpringBoot', 'SpringSecurity', 'MybatisPlus', 'Redis'],
          demoUrl: null,
          codeUrl: 'https://gitee.com/SnowDreamXUE/authority-system'
        },
        {
          title: 'BiliBiliDownloader',
          description: 'BiliBiliDownloader 是⼀款专注于哔哩哔哩（B站）视频下载的⼯具，⽀持扫码登录、视频链接解析以及视频⾳频分离下载',
          technologies: ['Vue.js', 'SpringBoot', 'ffmpeg'],
          demoUrl: null,
          codeUrl: 'https://github.com/SnowDreamXUE/BiliBliliDownloader'
        },
      ]
    }
  },
  mounted() {
    // 打字机效果在组件挂载后启动
    this.initTypewriter();
  },
  methods: {
    initTypewriter() {
      const text = "SnowDreamXUE";
      const typewriterText = this.$refs.typewriterText;

      if (typewriterText) {
        typewriterText.textContent = ''; // 清空内容以准备打字效果

        let i = 0;
        const speed = 150; // 打字速度

        function type() {
          if (i < text.length) {
            typewriterText.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
          }
        }

        // 开始打字效果
        setTimeout(type, 1000); // 延迟1秒后开始
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
  margin-top: -80px; /* 抵消header高度，使hero真正全屏 */
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
  flex-direction: column; /* 确保名字在不同行 */
  gap: 0.5rem;
}

/* 打字机效果相关样式 - 新的实现方式 */
.highlight {
  color: var(--secondary-color);
  position: relative;
  display: block; /* 确保在新行显示 */
}

.typewriter-container {
  display: inline-flex; /* 使文本和光标在同一行 */
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

/* 其余样式保持不变 */
.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.more-projects, .more-skills {
  text-align: center;
  margin-top: 2rem;
}

.skills-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
}

.skill-category {
  border-radius: var(--border-radius);
  box-shadow: var(--shadow);
  padding: 1.5rem;
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

@media (max-width: 768px) {
  .hero-container {
    flex-direction: column;
    justify-content: center;
    text-align: center;
    padding: 2rem 0;
    height: auto;
    min-height: calc(100vh - 80px);
  }

  .hero-content {
    max-width: 100%;
    margin-bottom: 3rem;
  }

  .hero-title {
    font-size: 2.5rem;
    align-items: center;
  }

  .hero-subtitle {
    font-size: 1.2rem;
  }

  .hero-buttons {
    justify-content: center;
  }

  .hero-avatar {
    flex: 0 0 auto;
  }

  .avatar-container {
    width: 250px;
    height: 250px;
  }

  .skills-container {
    grid-template-columns: 1fr;
  }
}
</style>
