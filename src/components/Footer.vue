<template>
  <footer class="footer glass-effect">
    <div class="container">
      <div class="footer-content">
        <div class="footer-info">
          <div class="footer-logo">
            <img src="../assets/img/logo.png" alt="SnowDreamXUE" class="logo-img">
          </div>
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
              <li>
                <router-link to="/">首页</router-link>
              </li>
              <li>
                <router-link to="/projects">项目经历</router-link>
              </li>
              <li>
                <router-link to="/about">关于我</router-link>
              </li>
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
        <div class="icp">
          <a href="https://icp.gov.moe/?keyword=20251505" target="_blank">萌ICP备20251505号</a>
        </div>
        <div class="update-info">
          最后更新于: 2025-09-28
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
  height: 30px;
}

.logo-img {
  width: 200px;
}

.footer-desc {
  color: #666;
  margin-bottom: 1.2rem;
  line-height: 1.5;
}

.footer-social {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.footer-social a {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 44px;
  height: 44px;
  background-color: rgba(140, 158, 255, 0.1);
  border-radius: 50%;
  color: var(--primary-color);
  transition: all 0.3s ease;
  font-size: 1.1rem;
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
  margin-bottom: 0.8rem;
}

.links-group ul a {
  text-decoration: none;
  color: #666;
  transition: color 0.3s ease;
  line-height: 1.4;
  word-break: break-all;
}

.links-group ul a:hover {
  color: var(--primary-color);
}

.footer-bottom {
  padding-top: 1.5rem;
  border-top: 1px solid rgba(0, 0, 0, 0.05);
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #777;
  font-size: 0.9rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.icp {
  display: flex;
  align-items: center;
  justify-content: center;
}

.icp a {
  color: #777;
  text-decoration: none;
  transition: color 0.3s ease;
  position: relative;
}

.icp a:hover {
  color: var(--primary-color);
}

.icp a::before {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 1px;
  background: var(--gradient-bg);
  transition: width 0.3s ease;
}

.icp a:hover::before {
  width: 100%;
}

.update-info {
  font-style: italic;
}

/* Mobile Optimizations */
@media (max-width: 768px) {
  .footer {
    padding: 2rem 0 1rem;
  }

  .footer-content {
    grid-template-columns: 1fr;
    gap: 2rem;
    text-align: center;
  }

  .footer-social {
    justify-content: center;
  }

  .footer-social a {
    width: 48px;
    height: 48px;
    font-size: 1.2rem;
  }

  .footer-links {
    grid-template-columns: 1fr;
    gap: 2rem;
    text-align: left;
  }

  .footer-bottom {
    flex-direction: column;
    text-align: center;
    gap: 1rem;
  }

  .footer-bottom > div {
    width: 100%;
  }
}

@media (max-width: 480px) {
  .footer {
    padding: 1.5rem 0 1rem;
  }

  .footer-logo {
    font-size: 1.3rem;
  }

  .footer-desc {
    font-size: 0.9rem;
  }

  .footer-social a {
    width: 42px;
    height: 42px;
    font-size: 1rem;
  }

  .links-group h4 {
    font-size: 1rem;
  }

  .links-group ul a {
    font-size: 0.9rem;
  }

  .footer-bottom {
    font-size: 0.8rem;
  }
}
</style>
