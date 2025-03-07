<template>
  <footer class="footer glass-effect">
    <div class="container">
      <div class="footer-content">
        <div class="footer-info">
          <div class="footer-logo">SnowDreamXUE</div>
          <p class="footer-desc">我只想在雪夜的樱花树下做个好梦</p>
          <div class="footer-social">
            <a href="https://github.com/SnowDreamXUE" target="_blank" aria-label="GitHub">
              <i class="fab fa-github"></i>
            </a>
            <a href="https://blog.csdn.net/SnowDreamXUE" target="_blank" aria-label="CSDN">
              <i class="fab fa-blogger"></i>
            </a>
            <a href="https://blog.snowdreamxue.top" target="_blank" aria-label="个人博客">
              <i class="fas fa-globe"></i>
            </a>
            <a href="mailto:SnowDreamXUE@outlook.com" aria-label="Email">
              <i class="far fa-envelope"></i>
            </a>
          </div>
        </div>

        <div class="footer-links">
          <div class="links-group">
            <h4>导航</h4>
            <ul>
              <li><router-link to="/">首页</router-link></li>
              <li><router-link to="/projects">项目经历</router-link></li>
              <li><router-link to="/about">关于我</router-link></li>
            </ul>
          </div>
          <div class="links-group">
            <h4>联系我</h4>
            <ul>
              <li><a href="mailto:SnowDreamXUE@outlook.com">SnowDreamXUE@outlook.com</a></li>
              <li><a href="https://github.com/SnowDreamXUE">GitHub: SnowDreamXUE</a></li>
              <li><a href="https://blog.csdn.net/SnowDreamXUE">CSDN博客</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <div class="copyright">
          © {{ new Date().getFullYear() }} SnowDreamXUE. All rights reserved.
        </div>
        <div class="update-info">
          最后更新于: 2025-03-07
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<style scoped>
.footer {
  padding: 3rem 0 1.5rem;
  margin-top: 2rem;
  border-top: 1px solid rgba(0, 0, 0, 0.05);
}

.glass-effect {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-top: 1px solid rgba(255, 255, 255, 0.2);
}

.footer-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  margin-bottom: 2rem;
}

.footer-info {
  display: flex;
  flex-direction: column;
}

.footer-logo {
  font-size: 1.5rem;
  font-weight: 700;
  background: var(--gradient-bg);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 0.8rem;
}

.footer-desc {
  color: #666;
  margin-bottom: 1.2rem;
}

.footer-social {
  display: flex;
  gap: 1rem;
}

.footer-social a {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 36px;
  height: 36px;
  background-color: rgba(140, 158, 255, 0.1);
  border-radius: 50%;
  color: var(--primary-color);
  transition: all 0.3s ease;
}

.footer-social a:hover {
  background: var(--gradient-bg);
  color: var(--white);
  transform: translateY(-3px);
}

.footer-links {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

.links-group h4 {
  font-size: 1.1rem;
  color: var(--primary-color);
  margin-bottom: 1rem;
  position: relative;
  padding-bottom: 0.5rem;
}

.links-group h4::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  width: 30px;
  height: 2px;
  background: var(--gradient-bg);
}

.links-group ul {
  list-style: none;
}

.links-group ul li {
  margin-bottom: 0.5rem;
}

.links-group ul a {
  text-decoration: none;
  color: #666;
  transition: color 0.3s ease;
}

.links-group ul a:hover {
  color: var(--primary-color);
}

.footer-bottom {
  padding-top: 1.5rem;
  border-top: 1px solid rgba(0, 0, 0, 0.05);
  display: flex;
  justify-content: space-between;
  color: #777;
  font-size: 0.9rem;
}

.update-info {
  font-style: italic;
}

@media (max-width: 768px) {
  .footer-content {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .footer-bottom {
    flex-direction: column;
    text-align: center;
    gap: 0.5rem;
  }
}
</style>
