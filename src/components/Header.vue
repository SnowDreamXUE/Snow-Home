<template>
  <header class="header">
    <div class="container header-container">
      <div class="logo">
        <router-link to="/">SnowDreamXUE</router-link>
      </div>
      <nav class="nav">
        <ul class="nav-list">
          <li><router-link to="/" :class="{ active: $route.path === '/' }">首页</router-link></li>
          <li><router-link to="/projects" :class="{ active: $route.path === '/projects' }">项目经历</router-link></li>
          <li><router-link to="/about" :class="{ active: $route.path === '/about' }">关于我</router-link></li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header',
}
</script>

<style scoped>
.header {
  position: sticky;
  top: 0;
  z-index: 100;
  height: 80px; /* 固定高度以便于首页hero区域正确计算 */
  display: flex;
  align-items: center;
  background-color: var(--white);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo a {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-color);
  text-decoration: none;
  background: var(--gradient-bg);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.nav-list {
  display: flex;
  list-style: none;
  gap: 2rem;
}

.nav-list a {
  text-decoration: none;
  color: var(--text-color);
  font-weight: 500;
  padding: 0.5rem 0;
  position: relative;
  transition: all 0.3s ease;
}

.nav-list a:hover,
.nav-list a.active {
  color: var(--primary-color);
}

.nav-list a::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 2px;
  background: var(--gradient-bg);
  transition: width 0.3s ease;
}

.nav-list a:hover::after,
.nav-list a.active::after {
  width: 100%;
}

@media (max-width: 768px) {
  .header {
    height: auto;
  }

  .header-container {
    flex-direction: column;
    padding: 1rem 0;
  }

  .nav-list {
    margin-top: 1rem;
    gap: 1rem;
  }
}
</style>
