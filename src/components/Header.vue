<template>
  <header class="header">
    <div class="container header-container">
      <div class="logo">
        <router-link to="/"><img src="../assets/img/logo.png" alt="#" class="logo-img"></router-link>
      </div>

      <!-- Mobile menu button -->
      <button
          class="mobile-menu-btn"
          @click="toggleMobileMenu"
          :class="{ active: isMobileMenuOpen }"
          aria-label="Toggle navigation menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <nav class="nav" :class="{ 'mobile-open': isMobileMenuOpen }">
        <ul class="nav-list">
          <li><router-link to="/" :class="{ active: $route.path === '/' }" @click="closeMobileMenu">首页</router-link></li>
          <li><router-link to="/projects" :class="{ active: $route.path === '/projects' }" @click="closeMobileMenu">项目经历</router-link></li>
          <li><router-link to="/about" :class="{ active: $route.path === '/about' }" @click="closeMobileMenu">关于我</router-link></li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      isMobileMenuOpen: false
    }
  },
  methods: {
    toggleMobileMenu() {
      this.isMobileMenuOpen = !this.isMobileMenuOpen
    },
    closeMobileMenu() {
      this.isMobileMenuOpen = false
    }
  },
  mounted() {
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!this.$el.contains(e.target)) {
        this.isMobileMenuOpen = false
      }
    })
  }
}
</script>

<style scoped>
.header {
  position: sticky;
  top: 0;
  z-index: 100;
  height: 80px;
  display: flex;
  align-items: center;
  background-color: var(--white);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
}

.logo {
  display: flex;
  align-items: center;
  justify-items: center;
}

.logo a {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-color);
  text-decoration: none;
  background: var(--gradient-bg);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  height: 40px;
  margin-top: 5px;
}

.logo-img {
  height: 40px;
}

.mobile-menu-btn {
  display: none;
  flex-direction: column;
  justify-content: space-around;
  width: 30px;
  height: 30px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 101;
}

.mobile-menu-btn span {
  width: 100%;
  height: 3px;
  background-color: var(--primary-color);
  border-radius: 2px;
  transition: all 0.3s ease;
  transform-origin: center;
}

.mobile-menu-btn.active span:nth-child(1) {
  transform: rotate(45deg) translate(7px, 7px);
}

.mobile-menu-btn.active span:nth-child(2) {
  opacity: 0;
}

.mobile-menu-btn.active span:nth-child(3) {
  transform: rotate(-45deg) translate(7px, -7px);
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
  .mobile-menu-btn {
    display: flex;
  }

  .nav {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background-color: var(--white);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    border-radius: 0 0 var(--border-radius) var(--border-radius);
    transform: translateY(-100%);
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
  }

  .nav.mobile-open {
    transform: translateY(0);
    opacity: 1;
    visibility: visible;
  }

  .nav-list {
    flex-direction: column;
    gap: 0;
    padding: 1rem 0;
  }

  .nav-list li {
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  }

  .nav-list li:last-child {
    border-bottom: none;
  }

  .nav-list a {
    display: block;
    padding: 1rem 2rem;
    font-size: 1.1rem;
  }

  .nav-list a::after {
    display: none;
  }
}
</style>
